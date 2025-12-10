import { Directive, ElementRef, Renderer2, inject, input, OnChanges, computed } from '@angular/core';

@Directive({
    selector: 'td[thyFixedRight],th[thyFixedRight],td[thyFixedLeft],th[thyFixedLeft]',
    standalone: true,
    host: {
        '[class.thy-native-table-cell-fix-right]': 'thyFixedRight()',
        '[class.thy-native-table-cell-fix-left]': 'thyFixedLeft()',
        '[style.position]': 'isFixed() ? "sticky" : null'
    }
})
export class ThyNativeTableCellFixedDirective implements OnChanges {
    private renderer = inject(Renderer2);
    private el: HTMLElement = inject(ElementRef<HTMLElement>).nativeElement;

    readonly thyFixedRight = input<boolean>(false);

    readonly thyFixedLeft = input<boolean>(false);

    isFixed = computed(() => this.thyFixedLeft() || this.thyFixedRight());

    setAutoLeft(autoLeft: string | null): void {
        this.renderer.setStyle(this.el, 'left', autoLeft);
    }

    setAutoRight(autoRight: string | null): void {
        this.renderer.setStyle(this.el, 'right', autoRight);
    }

    ngOnChanges(): void {}
}
