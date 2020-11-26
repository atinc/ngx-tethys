import { Directive, AfterContentInit, ContentChildren, QueryList, OnDestroy } from '@angular/core';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { merge, Subject } from 'rxjs';
import { Constructor, MixinBase, mixinUnsubscribe, ThyUnsubscribe } from 'ngx-tethys/core';
import { takeUntil, startWith } from 'rxjs/operators';
import { $ } from 'ngx-tethys/typings';

const _MixinBase: Constructor<ThyUnsubscribe> & typeof MixinBase = mixinUnsubscribe(MixinBase);
@Directive({
    selector: '[thyDragDrop]'
})
export class ThyDragDropDirective extends _MixinBase implements AfterContentInit, OnDestroy {
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
