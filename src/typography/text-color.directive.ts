import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { isTextColor, isThemeColor, ThyTextColor, ThyThemeColor } from 'ngx-tethys/core';
import { useHostRenderer } from '@tethys/cdk/dom';

@Directive({
    selector: '[thyTextColor]',
    exportAs: 'thyTextColor'
})
export class ThyTextColorDirective implements OnInit {
    private color: ThyThemeColor | ThyTextColor | string = '';

    private hostRenderer = useHostRenderer();

    /**
     * @type ThyThemeColor | ThyTextColor | string
     * @description 文本颜色，支持设置主题色和自定义颜色值，主题色为 default、primary、success、info、warning、danger、light、secondary、muted、desc、placeholder
     */
    @Input() set thyTextColor(value: ThyThemeColor | ThyTextColor | string) {
        this.clearColor();
        this.color = value;
        this.setColor();
    }

    constructor(private elementRef: ElementRef) {}

    ngOnInit(): void {}

    private setColor() {
        if (isThemeColor(this.color) || isTextColor(this.color)) {
            this.hostRenderer.addClass(`text-${this.color}`);
        } else {
            this.hostRenderer.setStyle('color', this.color);
        }
    }

    private clearColor() {
        this.hostRenderer.setStyle('color', '');
        if (isThemeColor(this.color) || isTextColor(this.color)) {
            this.hostRenderer.removeClass(`text-${this.color}`);
        }
    }
}
