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
    error?: Signal<Error | null>;
    value?: Signal<R | null>;
    execute(success?: SuccessFn<R>, error?: ErrorFn): void;
    execute(context: BehaviorContext<R>): void;
    execute(successOrContext: SuccessFn<R> | BehaviorContext<R>, error?: ErrorFn): void;
}

class AsyncBehaviorImpl<T, A extends (...args: any) => Observable<T>> implements AsyncBehavior<T> {
    loading: WritableSignal<boolean> = signal(false);

    loadingDone: Signal<boolean> = computed(() => !this.loading());

    value: WritableSignal<T | null> = signal(null);

    state: WritableSignal<'pending' | 'loading' | 'success' | 'error'> = signal('pending');

    error: WritableSignal<Error | null> = signal(null);

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
        const callbacks = pickBehaviorCallbacks(this.context, successOrContext, error);
        try {
            const observable = this.action.apply(undefined, this.executeParams).pipe(
                this.takeUntilDestroyed,
                finalize(() => {
                    this.setLoadingState(false);
                }),
                tap(value => {
                    this.value.set(value as T);
                    this.state.set('success');
                    this.setLoadingState(false);
                })
            );
            (observable as Observable<unknown>).subscribe({
                next: (value: unknown) => {
                    if (callbacks && callbacks.success) {
                        callbacks.success(value as T);
                    }
                },
                error: (error: unknown) => {
                    this.state.set('error');
                    this.error.set(error instanceof Error ? error : new Error(String(error)));
                    handleBehaviorError(error instanceof Error ? error : new Error(String(error)), callbacks?.error);
                }
            });
        } catch (error) {
            this.state.set('error');
            this.error.set(error instanceof Error ? error : new Error(String(error)));
            this.setLoadingState(false);
            handleBehaviorError(error instanceof Error ? error : new Error(String(error)), callbacks?.error);
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
        execute: behavior.execute.bind(behavior),
        setLoadingState: behavior.setLoadingState.bind(behavior),
        loadingDone: behavior.loadingDone,
        loading: behavior.loading,
        state: behavior.state,
        error: behavior.error,
        value: behavior.value
    }) as unknown as Behavior<Parameters<A>, AsyncBehavior<ExtractObservableValue<ReturnType<A>>>> &
        AsyncBehavior<ExtractObservableValue<ReturnType<A>>>;
}
