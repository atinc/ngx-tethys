import { Directive, ElementRef, Renderer2 } from '@angular/core';

/**
 * @private
 */
@Directive({
    selector: '[thyCarouselItem],[thy-carousel-item]',
    exportAs: 'thyCarouseItem',
    standalone: true
})
export class ThyCarouselItemDirective {
    private _active = false;

    readonly el: HTMLElement;

    set isActive(value: boolean) {
        this._active = value;
        if (this.isActive) {
            this.renderer.addClass(this.el, 'thy-carousel-item-active');
        } else {
            this.renderer.removeClass(this.el, 'thy-carousel-item-active');
        }
    }

    get isActive(): boolean {
        return this._active;
    }

    constructor(
        elementRef: ElementRef,
        private renderer: Renderer2
    ) {
        this.el = elementRef.nativeElement;
        this.renderer.addClass(elementRef.nativeElement, 'thy-carousel-item');
    }
}
