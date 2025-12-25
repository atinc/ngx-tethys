import { computed, Directive, effect, ElementRef, inject, input, OnChanges, Renderer2, signal, SimpleChanges } from '@angular/core';
import { ThyNativeTableThInfo } from '../services/table-style.service';

/* eslint-disable @angular-eslint/directive-selector */
@Directive({
    selector: 'th'
})
export class ThyNativeTableThDirective implements ThyNativeTableThInfo {
    private renderer = inject(Renderer2);
    private el: HTMLElement = inject(ElementRef<HTMLElement>).nativeElement;

    public changes = computed(() => {
        return !!(this.thyWidth() || this.thyColspan() || this.thyColSpan());
    });

    readonly thyWidth = input<string | number | null>(null);

    readonly thyColspan = input<string | number | null>(null);

    readonly thyColSpan = input<string | number | null>(null);

    readonly thyRowspan = input<string | number | null>(null);

    readonly thyRowSpan = input<string | number | null>(null);

    get colspan(): number | string | null {
        return this.thyColspan() || this.thyColSpan() || null;
    }

    get colSpan(): number | string | null {
        return this.thyColspan() || this.thyColSpan() || null;
    }

    constructor() {
        effect(() => {
            if (this.thyColspan() || this.thyColSpan()) {
                const col = this.colspan;
                if (col !== null && col !== undefined) {
                    this.renderer.setAttribute(this.el, 'colspan', `${col}`);
                } else {
                    this.renderer.removeAttribute(this.el, 'colspan');
                }
            }

            if (this.thyRowspan() || this.thyRowSpan()) {
                const row = this.thyRowspan() || this.thyRowSpan() || null;
                if (row !== null && row !== undefined) {
                    this.renderer.setAttribute(this.el, 'rowspan', `${row}`);
                } else {
                    this.renderer.removeAttribute(this.el, 'rowspan');
                }
            }
        });
    }
}
