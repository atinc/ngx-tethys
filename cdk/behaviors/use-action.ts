import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

class ActionBehavior<T> {
    saving = false;

    constructor(private action: () => Observable<T>) {}

    execute(context: { next?: () => void; error?: (error: Error) => void } = {}) {
        if (this.saving) {
            return;
        }
        this.saving = true;
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
                error: context.error,
                next: context.next
            });
    }
}

export function useAction<T>(action: () => Observable<T>) {
    return new ActionBehavior(action);
}
