import { Observable, of, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { Behavior, BehaviorContext, createBehaviorFromFunction, handleBehaviorError, pickBehaviorCallbacks } from './behavior';
import { getDefaultErrorHandler } from './error-handler';
import { ErrorFn, ExtractObservableValue, SuccessFn } from './types';

interface ActionBehavior<R> {
    saving: boolean;

    execute(success?: SuccessFn<R>, error?: ErrorFn): void;
    execute(context: BehaviorContext<R>): void;
    execute(successOrContext: SuccessFn<R> | BehaviorContext<R>, error?: ErrorFn): void;
}

class ActionBehaviorImpl<R, A extends (...args: any) => Observable<R>> implements ActionBehavior<R> {
    saving = false;

    private executeParams: Parameters<A>;
    constructor(private action: A, private context: BehaviorContext<R>) {}

    execute(success?: SuccessFn<R>, error?: ErrorFn): void;
    execute(context: BehaviorContext<R>): void;
    execute(successOrContext: SuccessFn<R> | BehaviorContext<R>, error?: ErrorFn): void {
        if (this.saving) {
            return;
        }
        this.saving = true;
        const callbacks = pickBehaviorCallbacks(this.context, successOrContext, error);
        try {
            return this.action
                .apply(undefined, this.executeParams)
                .pipe(
                    finalize(() => {
                        this.saving = false;
                        this.executeParams = undefined;
                    }),
                    tap(value => {
                        this.saving = false;
                        this.executeParams = undefined;
                    })
                )
                .subscribe({
                    next: callbacks?.success,
                    error: (error: Error) => {
                        this.saving = false;
                        handleBehaviorError(error, callbacks.error);
                    }
                });
        } catch (error) {
            this.saving = false;
            handleBehaviorError(error, callbacks.error);
        }
    }
}

export function useAction<A extends (...args: any) => Observable<any> = (...args: any) => Observable<any>>(
    action: A,
    context: BehaviorContext<ExtractObservableValue<ReturnType<A>>> = {}
) {
    const behavior = new ActionBehaviorImpl(action, context);

    const fn = function (...params: Parameters<A>) {
        fn['executeParams'] = params;
        return fn;
    };
    return createBehaviorFromFunction(fn, {
        context: context,
        action: action,
        execute: behavior.execute,
        saving: behavior.saving
    }) as unknown as Behavior<Parameters<A>, ActionBehavior<ExtractObservableValue<ReturnType<A>>>> &
        ActionBehavior<ExtractObservableValue<ReturnType<A>>>;
}
