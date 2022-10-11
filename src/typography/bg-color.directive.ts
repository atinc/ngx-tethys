import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { isBgColor, isThemeColor, ThyBgColor, ThyThemeColor } from 'ngx-tethys/core';

@Directive({
    selector: '[thyBgColor]',
    exportAs: 'thyBgColor'
})
export class ThyBackgroundColorDirective {
    private bgColor: ThyThemeColor | ThyBgColor | string = '';

    /**
     *  @type ThyThemeColor | ThyBgColor | string
     *  @description 背景颜色，支持设置主题色和自定义颜色值，主题色为 primary、success、info、danger、warning、dark、secondary、light、lighter、bright、content、white、transparent
     */
    @Input() set thyBgColor(value: ThyThemeColor | ThyBgColor | string) {
        this.clearBgColor();
        this.bgColor = value;
        this.setBgColor();
    }

    constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

    private setBgColor() {
        if (isThemeColor(this.bgColor) || isBgColor(this.bgColor)) {
            this.renderer.addClass(this.elementRef.nativeElement, `bg-${this.bgColor}`);
        } else {
            this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', this.bgColor);
        }
    }

    private clearBgColor() {
        this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', '');
        if (isThemeColor(this.bgColor) || isBgColor(this.bgColor)) {
            this.renderer.removeClass(this.elementRef.nativeElement, `bg-${this.bgColor}`);
        }
    }
}
