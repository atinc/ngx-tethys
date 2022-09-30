import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { isTextColor, isThemeColor, ThyTextColor, ThyThemeColor } from 'ngx-tethys/core';

@Directive({
    selector: '[thyTextColor]',
    exportAs: 'thyTextColor'
})
export class ThyTextColorDirective implements OnInit {
    private color: ThyThemeColor | ThyTextColor | string = '';

    /**
     * @type ThyThemeColor | ThyTextColor | string
     * @description 文本颜色，支持设置主题色和自定义颜色值，主题色为 default、primary、success、info、warning、danger、light、secondary、muted、desc、placeholder
     */
    @Input() set thyTextColor(value: ThyThemeColor | ThyTextColor | string) {
        this.clearColor();
        this.color = value;
        this.setColor();
    }

    constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

    ngOnInit(): void {}

    private setColor() {
        if (isThemeColor(this.color) || isTextColor(this.color)) {
            this.renderer.addClass(this.elementRef.nativeElement, `text-${this.color}`);
        } else {
            this.renderer.setStyle(this.elementRef.nativeElement, 'color', this.color);
        }
    }

    private clearColor() {
        this.renderer.setStyle(this.elementRef.nativeElement, 'color', '');
        if (isThemeColor(this.color) || isTextColor(this.color)) {
            this.renderer.removeClass(this.elementRef.nativeElement, `text-${this.color}`);
        }
    }
}
