import { booleanAttribute, computed, Directive, ElementRef, inject, input, Input, OnChanges, Renderer2, signal } from '@angular/core';

@Directive({
    selector: 'td[thyCellFixedRight],th[thyHeaderCellFixedRight],td[thyCellFixedLeft],th[thyHeaderCellFixedLeft]',
    host: {
        '[class.thy-table-cell-fix-right]': `thyFixedRight()`,
        '[class.thy-table-cell-fix-left]': `thyFixedLeft()`,
        '[class.thy-table-cell-fix-left-last]': `thyFixedLeft() && isLastLeft()`,
        '[class.thy-table-cell-fix-right-first]': `thyFixedRight() && isFirstRight()`,
        '[style.position]': `isFixed() ? 'sticky' : null`
    }
})
export class ThyNativeTableCellFixedDirective {
    private renderer = inject(Renderer2);

    private element: HTMLElement = inject(ElementRef<HTMLElement>).nativeElement;

    readonly thyCellFixedRight = input(false, { transform: booleanAttribute });

    readonly thyCellFixedLeft = input(false, { transform: booleanAttribute });

    readonly thyHeaderCellFixedRight = input(false, { transform: booleanAttribute });

    readonly thyHeaderCellFixedLeft = input(false, { transform: booleanAttribute });

    public thyFixedLeft = computed(() => this.thyCellFixedLeft() || this.thyHeaderCellFixedLeft());

    public thyFixedRight = computed(() => this.thyCellFixedRight() || this.thyHeaderCellFixedRight());

    public isLastLeft = signal(false);

    public isFirstRight = signal(false);

    public isFixed = computed(() => {
        return this.thyFixedLeft() || this.thyFixedRight();
    });

    public changes = computed(() => {
        return !!(this.thyFixedLeft() || this.thyFixedRight());
    });

    setAutoLeftWidth(autoLeft: string | null): void {
        this.renderer.setStyle(this.element, 'left', autoLeft);
    }

    setAutoRightWidth(autoRight: string | null): void {
        this.renderer.setStyle(this.element, 'right', autoRight);
    }

    setIsFirstRight(isFirstRight: boolean): void {
        this.isFirstRight.set(isFirstRight);
    }

    setIsLastLeft(isLastLeft: boolean): void {
        this.isLastLeft.set(isLastLeft);
    }
}
