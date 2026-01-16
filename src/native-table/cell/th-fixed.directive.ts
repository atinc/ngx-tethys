import {
    booleanAttribute,
    computed,
    Directive,
    ElementRef,
    inject,
    input,
    Input,
    linkedSignal,
    OnChanges,
    Renderer2,
    signal
} from '@angular/core';

@Directive({
    selector: 'th[thyFixedRight],th[thyFixedLeft]',
    host: {
        '[class.thy-table-cell-fix-right]': `thyFixedRight()`,
        '[class.thy-table-cell-fix-left]': `thyFixedLeft()`,
        '[class.thy-table-cell-fix-left-last]': `thyFixedLeft() && isLastLeft()`,
        '[class.thy-table-cell-fix-right-first]': `thyFixedRight() && isFirstRight()`,
        '[style.position]': `isFixed() ? 'sticky' : null`
    }
})
export class ThyNativeTableThFixedDirective {
    private renderer = inject(Renderer2);

    public element: HTMLElement = inject(ElementRef<HTMLElement>).nativeElement;

    readonly thyFixedRight = input(false, { transform: booleanAttribute });

    readonly thyFixedLeft = input(false, { transform: booleanAttribute });

    public isLastLeft = signal(false);

    public isFirstRight = signal(false);

    public fixedLeftWidth = signal<string | null>(null);

    public fixedRightWidth = signal<string | null>(null);

    public isFixed = computed(() => {
        return this.thyFixedLeft() || this.thyFixedRight();
    });

    public changes = computed(() => {
        return !!(this.thyFixedLeft() || this.thyFixedRight());
    });

    setAutoLeftWidth(autoLeft: string | null): void {
        this.fixedLeftWidth.set(autoLeft);
        this.renderer.setStyle(this.element, 'left', autoLeft);
    }

    setAutoRightWidth(autoRight: string | null): void {
        this.fixedRightWidth.set(autoRight);
        this.renderer.setStyle(this.element, 'right', autoRight);
    }

    setIsFirstRight(isFirstRight: boolean): void {
        this.isFirstRight.set(isFirstRight);
    }

    setIsLastLeft(isLastLeft: boolean): void {
        this.isLastLeft.set(isLastLeft);
    }
}
