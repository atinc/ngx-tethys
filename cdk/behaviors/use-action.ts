import { Observable, of, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';

class ActionBehavior<T> {
    saving = false;

    constructor(private action: () => Observable<T>) {}

    execute(context: { next?: () => void; error?: (error: Error) => void } = {}): void {
        if (this.saving) {
            return;
        }
        this.saving = true;
        try {
            this.action()
                .pipe(
                    finalize(() => {
                        this.saving = false;
                    }),
                    tap(value => {
                        this.saving = false;
                    })
                )
                .subscribe({
                    next: context.next,
                    error: (error: Error) => {
                        this.saving = false;
                        context?.error(error);
                    }
                });
        } catch (error) {
            this.saving = false;
            context?.error(error);
        }
    }
}

export function useAction<T>(action: () => Observable<T>) {
    return new ActionBehavior(action);
}
