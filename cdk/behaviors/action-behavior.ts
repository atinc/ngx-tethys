import { Signal, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { Behavior, BehaviorContext, createBehaviorFromFunction, handleBehaviorError, pickBehaviorCallbacks } from './behavior';
import { ErrorFn, ExtractObservableValue, SuccessFn } from './types';

export interface ActionBehavior<R> {
    saving: Signal<boolean>;

    execute(success?: SuccessFn<R>, error?: ErrorFn): void;
    execute(context: BehaviorContext<R>): void;
    execute(successOrContext: SuccessFn<R> | BehaviorContext<R>, error?: ErrorFn): void;
}

class ActionBehaviorImpl<R, A extends (...args: any) => Observable<R>> implements ActionBehavior<R> {
    saving = signal(false);

    executeParams: Parameters<A>;

    takeUntilDestroyed = takeUntilDestroyed();

    constructor(private action: A, private context: BehaviorContext<R>) {}

    execute(success?: SuccessFn<R>, error?: ErrorFn): void;
    execute(context: BehaviorContext<R>): void;
    execute(successOrContext: SuccessFn<R> | BehaviorContext<R>, error?: ErrorFn): void {
        if (this.saving()) {
            return;
        }
        this.saving.set(true);
        const callbacks = pickBehaviorCallbacks(this.context, successOrContext, error);
        try {
            return this.action
                .apply(undefined, this.executeParams)
                .pipe(
                    this.takeUntilDestroyed,
                    finalize(() => {
                        this.saving.set(false);
                        this.executeParams = undefined;
                    }),
                    tap(value => {
                        this.saving.set(false);
                        this.executeParams = undefined;
                    })
                )
                .subscribe({
                    next: callbacks?.success,
                    error: (error: Error) => {
                        this.saving.set(false);
                        handleBehaviorError(error, callbacks.error);
                    }
                });
        } catch (error) {
            this.saving.set(false);
            handleBehaviorError(error, callbacks.error);
        }
    }
}

export function useAction<A extends (...args: any) => Observable<any> = (...args: any) => Observable<any>>(
    action: A,
    context: BehaviorContext<ExtractObservableValue<ReturnType<A>>> = {}
): Behavior<Parameters<A>, ActionBehavior<ExtractObservableValue<ReturnType<A>>>> & ActionBehavior<ExtractObservableValue<ReturnType<A>>> {
    const behavior = new ActionBehaviorImpl(action, context);

    const fn = function (...params: Parameters<A>) {
        fn['executeParams'] = params;
        return fn;
    };
    return createBehaviorFromFunction(fn, {
        context: context,
        action: action,
        takeUntilDestroyed: behavior.takeUntilDestroyed,
        execute: behavior.execute.bind(fn),
        saving: behavior.saving
    }) as unknown as Behavior<Parameters<A>, ActionBehavior<ExtractObservableValue<ReturnType<A>>>> &
        ActionBehavior<ExtractObservableValue<ReturnType<A>>>;
}
