import { Directive, AfterContentInit, ContentChildren, QueryList } from '@angular/core';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { merge, Subject } from 'rxjs';
import { takeUntil, startWith } from 'rxjs/operators';

/**
 * @private
 */
@Directive({
    selector: '[thyDragDrop]',
    standalone: true
})
export class ThyDragDropDirective implements AfterContentInit {
    @ContentChildren(CdkDrag, { descendants: true }) draggables: QueryList<CdkDrag>;

    private ngUnsubscribe$ = new Subject();

    constructor() {}

    ngAfterContentInit() {
        if (this.draggables) {
            this.draggables.changes.pipe(startWith(this.draggables)).subscribe(() => {
                this.ngUnsubscribe$.next();
                this.ngUnsubscribe$.complete();

                this.ngUnsubscribe$ = new Subject();
                merge(
                    ...this.draggables.toArray().map(dragRef => {
                        return dragRef.started;
                    })
                )
                    .pipe(takeUntil(this.ngUnsubscribe$))
                    .subscribe(() => {
                        document.body.classList.add('thy-dragging-body');
                    });

                merge(...this.draggables.toArray().map(dragRef => dragRef.released))
                    .pipe(takeUntil(this.ngUnsubscribe$))
                    .subscribe(() => {
                        document.body.classList.remove('thy-dragging-body');
                    });
            });
        }
    }
}
