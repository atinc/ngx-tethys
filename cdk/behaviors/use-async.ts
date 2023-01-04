import { Observable, of } from 'rxjs';
import { finalize, tap, catchError } from 'rxjs/operators';

class AsyncBehavior<T> {
    loadingDone = false;

    value: T;

    state: 'pending' | 'loading' | 'success' | 'error' = 'pending';

    error?: Error;

    constructor(private action: () => Observable<T>) {}

    execute() {
        this.loadingDone = false;
        this.state = 'loading';
        return this.action().pipe(
            finalize(() => {
                this.loadingDone = true;
            }),
            catchError(error => {
                this.state = 'error';
                this.error = error;
                throw error;
            }),
            tap(value => {
                this.value = value;
                this.state = 'success';
            })
        );
    }
}

export function useAsync<T>(action: () => Observable<T>) {
    return new AsyncBehavior(action);
}
