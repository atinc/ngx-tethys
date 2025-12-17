import { Directive, AfterContentInit, ContentChildren, QueryList, OnDestroy } from '@angular/core';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { merge, Subject } from 'rxjs';
import { takeUntil, startWith } from 'rxjs/operators';

/**
 * @private
 */
@Directive({
    selector: '[thyDragDrop]'
})
export class ThyDragDropDirective implements AfterContentInit, OnDestroy {
    @ContentChildren(CdkDrag, { descendants: true }) draggables?: QueryList<CdkDrag>;

    private ngUnsubscribe$ = new Subject<void>();

    constructor() {}

    ngAfterContentInit() {
        if (this.draggables) {
            this.draggables.changes.pipe(startWith(this.draggables)).subscribe(() => {
                this.ngUnsubscribe$.next();
                this.ngUnsubscribe$.complete();

                this.ngUnsubscribe$ = new Subject();
                merge(
                    ...this.draggables!.toArray().map(dragRef => {
                        return dragRef.started;
                    })
                )
                    .pipe(takeUntil(this.ngUnsubscribe$))
                    .subscribe(() => {
                        document.body.classList.add('thy-dragging-body');
                    });

                merge(...this.draggables!.toArray().map(dragRef => dragRef.released))
                    .pipe(takeUntil(this.ngUnsubscribe$))
                    .subscribe(() => {
                        document.body.classList.remove('thy-dragging-body');
                    });
            });
        }
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe$.next();
        this.ngUnsubscribe$.complete();
    }
}
