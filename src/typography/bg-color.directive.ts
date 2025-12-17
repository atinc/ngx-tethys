import { Directive, ElementRef, effect, inject, input } from '@angular/core';
import { isBgColor, isThemeColor, ThyBgColor, ThyThemeColor } from 'ngx-tethys/core';
import { useHostRenderer } from '@tethys/cdk/dom';

/**
 * @name thyBgColor
 * @order 30
 */
@Directive({
    selector: '[thyBgColor]',
    exportAs: 'thyBgColor'
})
export class ThyBackgroundColorDirective {
    private elementRef = inject(ElementRef);

    private bgColor: ThyThemeColor | ThyBgColor | string = '';

    private hostRenderer = useHostRenderer();

    /**
     *  @type ThyThemeColor | ThyBgColor | string
     *  @description 背景颜色，支持设置主题色和自定义颜色值，主题色为 `primary`、`success`、`info`、`danger`、`warning`、`dark`、`secondary`、`light`、`lighter`、`bright`、`content`、`white`、`transparent`
     */
    readonly thyBgColor = input<ThyThemeColor | ThyBgColor | string>();

    constructor() {
        effect(() => {
            const bgColor = this.thyBgColor();
            this.clearBgColor();
            this.bgColor = bgColor!;
            this.setBgColor();
        });
    }

    private setBgColor() {
        if (isThemeColor(this.bgColor) || isBgColor(this.bgColor)) {
            this.hostRenderer.addClass(`bg-${this.bgColor}`);
        } else {
            this.hostRenderer.setStyle('background-color', this.bgColor);
        }
    }

    private clearBgColor() {
        this.hostRenderer.setStyle('background-color', '');
        if (isThemeColor(this.bgColor) || isBgColor(this.bgColor)) {
            this.hostRenderer.removeClass(`bg-${this.bgColor}`);
        }
    }
}
