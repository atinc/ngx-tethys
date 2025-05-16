import { isThemeColor, ThyThemeColor } from 'ngx-tethys/core';

import { ChangeDetectionStrategy, Component, ElementRef, Renderer2, ViewEncapsulation, effect, inject, input } from '@angular/core';

export type ThyColorType = ThyThemeColor | string;
export type ThySizeType = 'xs' | 'sm' | 'md' | 'lg' | 'xlg';
export type ThyThemeType = 'outline' | 'fill';
export type ThyShapeType = 'square' | 'circle';

export const COMPONENT_CLASS_NAME = 'thy-dot';

export const DEFAULT_COLOR_NAME = 'primary';
export const DEFAULT_SIZE_NAME = 'sm';
export const DEFAULT_THEME_NAME = 'fill';
export const DEFAULT_SHAPE_NAME = 'circle';

/**
 * 显示一个点的组件
 * @name thy-dot,[thy-dot],[thyDot]
 * @order 10
 */
@Component({
    selector: 'thy-dot,[thy-dot],[thyDot]',
    template: '',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'thy-dot',
        '[class.dot-theme-fill]': 'thyTheme() === "fill"',
        '[class.dot-theme-outline]': 'thyTheme() === "outline"',
        '[class.dot-shape-square]': 'thyShape() === "square"',
        '[class.dot-shape-circle]': 'thyShape() === "circle"',
        '[class.dot-size-md]': 'thySize() === "md"',
        '[class.dot-size-sm]': 'thySize() === "sm"',
        '[class.dot-size-xs]': 'thySize() === "xs"',
        '[class.dot-size-lg]': 'thySize() === "lg"',
        '[class.dot-size-xlg]': 'thySize() === "xlg"'
    }
})
export class ThyDot {
    private el = inject(ElementRef);
    private renderer = inject(Renderer2);
    private nativeElement: HTMLElement;

    constructor() {
        this.nativeElement = this.el.nativeElement;

        effect(() => {
            this.updateColorStyle();
        });
    }

    /**
     * 颜色，可选值为：`primary` `success` `info` `warning` `danger` `default` `light`和自定义颜色，如`#2cccda` `red`  `rgb(153, 153, 153)`
     * @type ThyThemeColor | string
     */
    readonly thyColor = input<ThyColorType, ThyColorType>(DEFAULT_COLOR_NAME, {
        transform: (value: ThyColorType) => value || DEFAULT_COLOR_NAME
    });

    /**
     * 大小
     * @type xs | sm | md | lg | xlg
     */
    readonly thySize = input<ThySizeType, ThySizeType>(DEFAULT_SIZE_NAME, {
        transform: (value: ThySizeType) => value || DEFAULT_SIZE_NAME
    });

    /**
     * 主题
     * @type outline(线框) | fill(填充)
     */
    readonly thyTheme = input<ThyThemeType, ThyThemeType>(DEFAULT_THEME_NAME, {
        transform: (value: ThyThemeType) => value || DEFAULT_THEME_NAME
    });

    /**
     * 形状
     * @type circle(圆形) | square(方形)
     */
    readonly thyShape = input<ThyShapeType, ThyShapeType>(DEFAULT_SHAPE_NAME, {
        transform: (value: ThyShapeType) => value || DEFAULT_SHAPE_NAME
    });

    updateColorStyle() {
        Array.from(this.nativeElement.classList)
            .filter(it => /^dot-color-[\w]+$/.test(it))
            .forEach(it => this.renderer.removeClass(this.nativeElement, it));

        if (isThemeColor(this.thyColor())) {
            this.renderer.setStyle(this.nativeElement, 'borderColor', 'none');
            this.renderer.addClass(this.nativeElement, `dot-color-${this.thyColor()}`);
        } else {
            this.renderer.setStyle(this.nativeElement, 'borderColor', this.thyColor());
        }
    }
}
