import { computed, Directive, effect, ElementRef, inject, input, Renderer2, signal } from '@angular/core';
import { ThyNativeTableStyleService } from '../services/table-style.service';

import { ThyNativeTableFixedInfo } from '../table.interface';

/* eslint-disable @angular-eslint/component-selector */

@Directive({
    selector: 'td',
    host: {
        '[class.thy-table-cell-fix-right]': `isFixedRight()`,
        '[class.thy-table-cell-fix-left]': `isFixedLeft()`,
        '[class.thy-table-cell-fix-left-last]': `isFixedLeft() && isLastLeft()`,
        '[class.thy-table-cell-fix-right-first]': `isFirstRight() && isFirstRight()`,
        '[style.position]': `isFixed() ? 'sticky' : null`
    }
})
export class ThyNativeTableTdDirective {
    private renderer = inject(Renderer2);

    public element: HTMLElement = inject(ElementRef<HTMLElement>).nativeElement;

    public isFixedLeft = signal(false);

    public isFixedRight = signal(false);

    public isLastLeft = signal(false);

    public isFirstRight = signal(false);

    public isFixed = computed(() => {
        return this.isFixedLeft() || this.isFixedRight();
    });

    private logicalColumnIndex = signal<number>(-1);

    private styleService = inject(ThyNativeTableStyleService, { optional: true });

    constructor() {
        effect(() => {
            if (!this.styleService) {
                this.clearFixedState();
                return;
            }
            const logicalIndex = this.logicalColumnIndex();
            if (logicalIndex < 0) {
                this.clearFixedState();
                return;
            }
            const listOfFixedInfo = this.styleService.listOfFixedInfo();
            if (listOfFixedInfo.length === 0) {
                this.clearFixedState();
                return;
            }

            if (logicalIndex >= listOfFixedInfo.length) {
                this.clearFixedState();
                return;
            }

            const fixedInfo = listOfFixedInfo[this.logicalColumnIndex()];
            if (fixedInfo.fixed === 'left') {
                this.applyLeftFixed(fixedInfo);
            } else if (fixedInfo.fixed === 'right') {
                this.applyRightFixed(listOfFixedInfo[this.logicalColumnIndex()]);
            } else {
                this.clearFixedState();
            }
        });
    }
    private applyLeftFixed(fixedInfo: ThyNativeTableFixedInfo): void {
        const isLastLeft = fixedInfo?.isLastLeft ?? false;
        this.isFixedLeft.set(true);
        this.isFixedRight.set(false);
        this.isLastLeft.set(isLastLeft);
        this.isFirstRight.set(false);
        this.setAutoLeftWidth(`${fixedInfo.leftPx}`);
    }

    private applyRightFixed(fixedInfo: ThyNativeTableFixedInfo): void {
        const isFirstRight = fixedInfo?.isFirstRight ?? false;
        this.isFixedLeft.set(false);
        this.isFixedRight.set(true);
        this.isLastLeft.set(false);
        this.isFirstRight.set(isFirstRight);
        this.setAutoRightWidth(`${fixedInfo.rightPx}`);
    }

    private clearFixedState(): void {
        this.isFixedLeft.set(false);
        this.isFixedRight.set(false);
        this.isLastLeft.set(false);
        this.isFirstRight.set(false);
        this.setAutoLeftWidth(null);
        this.setAutoRightWidth(null);
    }

    private setAutoLeftWidth(autoLeft: string | null): void {
        this.renderer.setStyle(this.element, 'left', autoLeft);
    }

    private setAutoRightWidth(autoRight: string | null): void {
        this.renderer.setStyle(this.element, 'right', autoRight);
    }

    setLogicalColumnIndex(index: number): void {
        this.logicalColumnIndex.set(index);
    }
}
