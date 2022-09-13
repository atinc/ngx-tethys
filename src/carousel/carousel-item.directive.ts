import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
    selector: '[thy-carousel-item],[thyCarouselItem]',
    exportAs: 'thyCarouseItem'
})
export class ThyCarouselItemDirective {
    private _active = false;

    readonly el: HTMLElement;

    set isActive(value: boolean) {
        this._active = value;
        if (this.isActive) {
            this.renderer.addClass(this.el, 'carousel-item-active');
        } else {
            this.renderer.removeClass(this.el, 'carousel-item-active');
        }
    }

    get isActive(): boolean {
        return this._active;
    }

    constructor(elementRef: ElementRef, private renderer: Renderer2) {
        this.el = elementRef.nativeElement;
        this.renderer.addClass(elementRef.nativeElement, 'carousel-item');
    }
}
