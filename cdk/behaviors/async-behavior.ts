import { Observable, of } from 'rxjs';
import { finalize, tap, catchError } from 'rxjs/operators';
import { Behavior, BehaviorContext, createBehaviorFromFunction, handleBehaviorError, pickBehaviorCallbacks } from './behavior';
import { getDefaultErrorHandler } from './error-handler';
import { ErrorFn, ExtractObservableValue, SuccessFn } from './types';

export interface AsyncBehavior<R> {
    loadingDone: boolean;
    loading: boolean;
    state: 'pending' | 'loading' | 'success' | 'error';
    error?: Error;
    value?: R;
    execute(success?: SuccessFn<R>, error?: ErrorFn): void;
    execute(context: BehaviorContext<R>): void;
    execute(successOrContext: SuccessFn<R> | BehaviorContext<R>, error?: ErrorFn): void;
}

class AsyncBehaviorImpl<T, A extends (...args: any) => Observable<T>> implements AsyncBehavior<T> {
    loadingDone = true;

    loading = false;

    value: T;

    state: 'pending' | 'loading' | 'success' | 'error' = 'pending';

    error?: Error;

    private executeParams: Parameters<A>;

    constructor(private action: A, private context: BehaviorContext<T>) {}

    execute(success?: SuccessFn<T>, error?: ErrorFn): void;
    execute(context: BehaviorContext<T>): void;
    execute(successOrContext: SuccessFn<T> | BehaviorContext<T>, error?: ErrorFn): void {
        this.setLoadingState(true);
        this.state = 'loading';
        const callbacks = pickBehaviorCallbacks(this.context, successOrContext, error);
        try {
            return this.action
                .apply(undefined, this.executeParams)
                .pipe(
                    finalize(() => {
                        this.setLoadingState(false);
                    }),
                    tap(value => {
                        this.value = value as T;
                        this.state = 'success';
                        this.setLoadingState(false);
                    })
                )
                .subscribe({
                    next: callbacks.success,
                    error: error => {
                        this.state = 'error';
                        this.error = error;
                        handleBehaviorError(error, callbacks.error);
                    }
                });
        } catch (error) {
            this.state = 'error';
            this.error = error;
            this.setLoadingState(false);
            handleBehaviorError(error, callbacks.error);
        }
    }

    setLoadingState(loading: boolean) {
        this.loading = loading;
        this.loadingDone = !loading;
    }
}

export function useAsync<A extends (...args: any) => Observable<any> = (...args: any) => Observable<any>>(
    action: A,
    context: BehaviorContext<ExtractObservableValue<ReturnType<A>>> = {}
) {
    const behavior = new AsyncBehaviorImpl(action, context);

    const fn = function (...params: Parameters<A>) {
        fn['executeParams'] = params;
        return fn;
    };
    return createBehaviorFromFunction(fn, {
        context: context,
        action: action,
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
