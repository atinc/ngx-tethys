import { Directive, contentChildren, effect, DestroyRef, inject } from '@angular/core';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { merge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/**
 * @private
 */
@Directive({
    selector: '[thyDragDrop]'
})
export class ThyDragDropDirective {
    readonly draggables = contentChildren(CdkDrag, { descendants: true });

    private destroyRef = inject(DestroyRef);

    private ngUnsubscribe$ = new Subject<void>();

    constructor() {
        effect(() => {
            const draggables = this.draggables();
            this.ngUnsubscribe$.next();
            this.ngUnsubscribe$.complete();
            this.ngUnsubscribe$ = new Subject();

            if (!draggables.length) {
                return;
            }

            merge(...draggables.map(dragRef => dragRef.started))
                .pipe(takeUntil(this.ngUnsubscribe$))
                .subscribe(() => {
                    document.body.classList.add('thy-dragging-body');
                });

            merge(...draggables.map(dragRef => dragRef.released))
                .pipe(takeUntil(this.ngUnsubscribe$))
                .subscribe(() => {
                    document.body.classList.remove('thy-dragging-body');
                });
        });

        this.destroyRef.onDestroy(() => {
            this.ngUnsubscribe$.next();
            this.ngUnsubscribe$.complete();
        });
    }
}
