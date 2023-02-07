import { Observable, of, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { getDefaultErrorHandler } from './error-handler';
import { ExtractObservableValue } from './types';

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
                        this.saving = false;
                    })
                )
                .subscribe({
                    next: this.context?.success,
                    error: (error: Error) => {
                        this.saving = false;
                        this.handleError(error);
                    }
                });
        } catch (error) {
            this.saving = false;
            this.handleError(error);
        }
    }

    success(successFn: (result: T) => void): this {
        this.context.success = successFn;
        return this;
    }

    error(errorFn: (error: Error) => void): this {
        this.context.error = errorFn;
        return this;
    }

    private handleError(error: Error) {
        const defaultErrorHandler = getDefaultErrorHandler();
        if (this.context.error) {
            this.context.error(error);
        } else if (defaultErrorHandler) {
            defaultErrorHandler(error);
        }
    }
}

export function useAction<T extends (...args: any) => Observable<any> = (...args: any) => Observable<any>>(
    action: T,
    context: ActionBehaviorContext<ExtractObservableValue<ReturnType<T>>> = {}
) {
    return new ActionBehavior(action, context);
}
