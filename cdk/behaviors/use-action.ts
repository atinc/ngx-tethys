import { Observable, of, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';

export interface ActionBehaviorContext<T> {
    success?: (result: T) => void;
    error?: (error: Error) => void;
}

class ActionBehavior<T, A extends (...args: any) => Observable<T>> {
    saving = false;

    constructor(private action: A, private context: ActionBehaviorContext<T>) {}

    execute(...params: Parameters<A>): void {
        if (this.saving) {
            return;
        }
        this.saving = true;
        try {
            return this.action
                .apply(null, params)
                .pipe(
                    finalize(() => {
                        this.saving = false;
                    }),
                    tap(value => {
                        debugger;
                        this.saving = false;
                    })
                )
                .subscribe({
                    next: this.context?.success,
                    error: (error: Error) => {
                        this.saving = false;
                        this.context?.error(error);
                    }
                });
        } catch (error) {
            this.saving = false;
            this.context?.error(error);
        }
    }

    success(successFn: (result: T) => void) {
        this.context.success = successFn;
        return this;
    }

    error(errorFn: (error: Error) => void) {
        this.context.error = errorFn;
        return this;
    }
}

export function useAction<T, A extends (...args: any) => Observable<T> = (...args: any) => Observable<T>>(
    action: A,
    context: ActionBehaviorContext<T> = {}
) {
    return new ActionBehavior(action, context);
}
