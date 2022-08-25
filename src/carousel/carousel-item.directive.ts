import { Directive, ElementRef, Renderer2 } from '@angular/core';@Directive({    selector: '[thy-carousel-item],[thyCarouselItem]',    exportAs: 'thyCarouseItem'})export class ThyCarouselItemDirective {    readonly el: HTMLElement;    private _active = false;    set isActive(value: boolean) {        this._active = value;        if (this.isActive) {            this.renderer.addClass(this.el, 'slide-active');        } else {            this.renderer.removeClass(this.el, 'slide-active');        }    }    get isActive(): boolean {        return this._active;    }    constructor(elementRef: ElementRef, private renderer: Renderer2) {        this.el = elementRef.nativeElement;        this.renderer.addClass(elementRef.nativeElement, 'carousel-slide');    }}