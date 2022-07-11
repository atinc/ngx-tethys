import { Component, Input, OnChanges, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'thy-virtual-list, [thyVirtualList]',
    templateUrl: './virtual-list.component.html',
    // changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'thy-virtual-list-wrap'
        // '[class.thy-tag-pill]': 'thyShape === "pill"',
    },
    providers: []
})
export class ThyVirtualListComponent implements OnInit, OnChanges {
    range: number = null;
    direction: string = 'horizontal';
    isHorizontal: boolean;
    directionKey: string;
    @Input() pageMode: boolean = false;

    private document: Document;

    constructor(@Inject(DOCUMENT) document: any) {
        this.document = document;
        this.isHorizontal = this.direction === 'horizontal';
        this.directionKey = this.isHorizontal ? 'scrollLeft' : 'scrollTop';

        fromEvent(window, '#fuck')
            // .pipe(debounceTime(100), takeUntil(this.destroy$))
            .subscribe(() => {
                console.log(111);
                // this.setSlideContainerStyles();
            });

        // this.installVirtual();
    }
    installVirtual() {
        fromEvent(window, 'scroll')
            // .pipe(debounceTime(100), takeUntil(this.destroy$))
            .subscribe(() => {
                console.log(111);
                // this.setSlideContainerStyles();
            });

        // this.document.addEventListener('scroll', () => {
        //     console.log(1);
        // });
    }
    onScroll() {
        console.log(111);
        // this.getOffset();
        // const offset = this.getOffset()
        // const clientSize = this.getClientSize()
        // const scrollSize = this.getScrollSize()
    }
    // return current scroll offset
    getOffset() {
        console.log(document.documentElement[this.directionKey]);
        // if (this.pageMode) {
        //     return document.documentElement[this.directionKey] || document.body[this.directionKey];
        // } else {
        //     document.documentElement[this.directionKey]
        //     // const { root } = this.$refs;
        //     // return root ? Math.ceil(root[this.directionKey]) : 0;
        // }
    }
    ngOnInit(): void {
        // this.document.addEventListener('scroll', () => {
        //     console.log(122);
        // });
    }
    ngOnChanges(): void {}
}
