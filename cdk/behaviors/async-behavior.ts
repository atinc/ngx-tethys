import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { Behavior, BehaviorContext, createBehaviorFromFunction, handleBehaviorError, pickBehaviorCallbacks } from './behavior';

import { ErrorFn, ExtractObservableValue, SuccessFn } from './types';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Signal, WritableSignal, computed, signal } from '@angular/core';

export interface AsyncBehavior<R> {
    loadingDone: Signal<boolean>;
    loading: Signal<boolean>;
    state: Signal<'pending' | 'loading' | 'success' | 'error'>;
    error?: Signal<Error>;
    value?: Signal<R>;
    execute(success?: SuccessFn<R>, error?: ErrorFn): void;
    execute(context: BehaviorContext<R>): void;
    execute(successOrContext: SuccessFn<R> | BehaviorContext<R>, error?: ErrorFn): void;
}

class AsyncBehaviorImpl<T, A extends (...args: any) => Observable<T>> implements AsyncBehavior<T> {
    loading: WritableSignal<boolean> = signal(false);

    loadingDone: Signal<boolean> = computed(() => !this.loading());

    value?: WritableSignal<T>;

    state: WritableSignal<'pending' | 'loading' | 'success' | 'error'> = signal('pending');

    error?: WritableSignal<Error>;

    executeParams!: Parameters<A>;

    takeUntilDestroyed = takeUntilDestroyed();

    constructor(
        private action: A,
        private context: BehaviorContext<T>
    ) {}

    execute(success?: SuccessFn<T>, error?: ErrorFn): void;
    execute(context: BehaviorContext<T>): void;
    execute(successOrContext?: SuccessFn<T> | BehaviorContext<T>, error?: ErrorFn): void {
        this.setLoadingState(true);
        this.state.set('loading');
        const callbacks = pickBehaviorCallbacks(this.context, successOrContext as any, error);
        try {
            this.action
                .apply(undefined, this.executeParams)
                .pipe(
                    this.takeUntilDestroyed,
                    finalize(() => {
                        this.setLoadingState(false);
                    }),
                    tap(value => {
                        if (this.value) {
                            this.value.set(value as T);
                        } else {
                            this.value = signal(value as T);
                        }
                        this.state.set('success');
                        this.setLoadingState(false);
                    })
                )
                .subscribe({
                    next: (value: unknown) => {
                        callbacks.success && callbacks.success(value as T);
                    },
                    error: err => {
                        this.state.set('error');
                        if (this.error) {
                            this.error.set(err as Error);
                        } else {
                            this.error = signal(err as Error);
                        }
                        handleBehaviorError(err as Error, callbacks.error);
                    }
                });
        } catch (error) {
            this.state.set('error');
            const err = error as Error;
            if (this.error) {
                this.error.set(err);
            } else {
                this.error = signal(err);
            }
            this.setLoadingState(false);
            handleBehaviorError(err, callbacks.error);
        }
    }

    setLoadingState(loading: boolean) {
        this.loading.set(loading);
    }
}

export function asyncBehavior<A extends (...args: any) => Observable<any> = (...args: any) => Observable<any>>(
    action: A,
    context: BehaviorContext<ExtractObservableValue<ReturnType<A>>> = {}
): Behavior<Parameters<A>, AsyncBehavior<ExtractObservableValue<ReturnType<A>>>> & AsyncBehavior<ExtractObservableValue<ReturnType<A>>> {
    const behavior = new AsyncBehaviorImpl(action, context);

    const fn = function (...params: Parameters<A>) {
        (fn as any)['executeParams'] = params;
        return fn;
    };
    return createBehaviorFromFunction(fn, {
        context: context,
        action: action,
        takeUntilDestroyed: behavior.takeUntilDestroyed,
        execute: behavior.execute.bind(fn),
        setLoadingState: behavior.setLoadingState.bind(fn),
        loadingDone: behavior.loadingDone,
        loading: behavior.loading,
        state: behavior.state,
        error: behavior.error,
        value: behavior.value
    }) as unknown as Behavior<Parameters<A>, AsyncBehavior<ExtractObservableValue<ReturnType<A>>>> &
        AsyncBehavior<ExtractObservableValue<ReturnType<A>>>;
}
