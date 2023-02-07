import { Observable, of } from 'rxjs';
import { finalize, tap, catchError } from 'rxjs/operators';
import { getDefaultErrorHandler } from './error-handler';

class AsyncBehavior<T, A extends (...args: any) => Observable<T>> {
    loadingDone = false;

    value: T;

    state: 'pending' | 'loading' | 'success' | 'error' = 'pending';

    error?: Error;

    constructor(private action: A) {}

    execute(...params: Parameters<A>): ReturnType<A> {
        this.loadingDone = false;
        this.state = 'loading';
        return this.action.apply(undefined, params).pipe(
            finalize(() => {
                this.loadingDone = true;
            }),
            catchError(error => {
                this.state = 'error';
                this.error = error;
                const defaultErrorHandler = getDefaultErrorHandler();
                defaultErrorHandler && defaultErrorHandler(error);
                throw error;
            }),
            tap(value => {
                this.value = value as T;
                this.state = 'success';
            })
        );
    }
}

export function useAsync<T, A extends (...args: any) => Observable<T>>(action: A) {
    return new AsyncBehavior(action);
}
