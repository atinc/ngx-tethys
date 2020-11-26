import { Directive, AfterContentInit, ContentChildren, QueryList, OnDestroy } from '@angular/core';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { merge, Subject } from 'rxjs';
import { MixinBase, mixinUnsubscribe } from 'ngx-tethys/core';
import { takeUntil, startWith } from 'rxjs/operators';
import { $ } from 'ngx-tethys/typings';

@Directive({
    selector: '[thyDragDrop]'
})
export class ThyDragDropDirective extends mixinUnsubscribe(MixinBase) implements AfterContentInit, OnDestroy {
    @ContentChildren(CdkDrag, { descendants: true }) draggables: QueryList<CdkDrag>;

    constructor() {
        super();
    }

    ngAfterContentInit() {
        if (this.draggables) {
            this.draggables.changes.pipe(startWith(this.draggables)).subscribe(() => {
                super.ngOnDestroy();
                this.ngUnsubscribe$ = new Subject();
                merge(
                    ...this.draggables.toArray().map(dragRef => {
                        return dragRef.started;
                    })
                )
                    .pipe(takeUntil(this.ngUnsubscribe$))
                    .subscribe(() => {
                        $('body').addClass('thy-dragging-body');
                    });

                merge(...this.draggables.toArray().map(dragRef => dragRef.released))
                    .pipe(takeUntil(this.ngUnsubscribe$))
                    .subscribe(() => {
                        $('body').removeClass('thy-dragging-body');
                    });
            });
        }
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }
}
