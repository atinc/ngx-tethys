import { isThemeColor, ThyThemeColor } from 'ngx-tethys/core';

import { Component, computed, effect, ElementRef, inject, input, Renderer2, ViewEncapsulation } from '@angular/core';

export type ThyDotColor = ThyThemeColor | string;
export type ThyDotSize = 'xs' | 'sm' | 'md' | 'lg' | 'xlg';
export type ThyDotAppearance = 'outline' | 'fill';
export type ThyDotShape = 'square' | 'circle';

/** @deprecated please use ThyDotColor, will be removed in v23 */
export type ThyColorType = ThyDotColor;

/** @deprecated please use ThyDotSize, will be removed in v23 */
export type ThySizeType = ThyDotSize;

/** @deprecated please use ThyDotAppearance, will be removed in v23 */
export type ThyThemeType = ThyDotAppearance;

/** @deprecated please use ThyDotShape, will be removed in v23 */
export type ThyShapeType = ThyDotShape;

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
    host: {
        class: 'thy-dot',
        '[class.dot-theme-fill]': 'appearance() === "fill"',
        '[class.dot-theme-outline]': 'appearance() === "outline"',
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
     * @type ThyDotColor
     */
    readonly thyColor = input<ThyDotColor, ThyDotColor>(DEFAULT_COLOR_NAME, {
        transform: (value: ThyDotColor) => value || DEFAULT_COLOR_NAME
    });

    /**
     * 大小
     * @type xs | sm | md | lg | xlg
     */
    readonly thySize = input<ThyDotSize, ThyDotSize>(DEFAULT_SIZE_NAME, {
        transform: (value: ThyDotSize) => value || DEFAULT_SIZE_NAME
    });

    /**
     * 主题（已废弃），请使用 thyAppearance
     * @deprecated please use thyAppearance
     * @type outline(线框) | fill(填充)
     */
    readonly thyTheme = input<ThyThemeType>();

    /**
     * 外观
     * @type outline(线框) | fill(填充)
     * @default fill
     */
    readonly thyAppearance = input<ThyDotAppearance>();

    readonly appearance = computed(() => this.thyAppearance() || this.thyTheme() || DEFAULT_THEME_NAME);

    /**
     * 形状
     * @type circle(圆形) | square(方形)
     */
    readonly thyShape = input<ThyDotShape, ThyDotShape>(DEFAULT_SHAPE_NAME, {
        transform: (value: ThyDotShape) => value || DEFAULT_SHAPE_NAME
    });

    updateColorStyle() {
        Array.from(this.nativeElement.classList)
            .filter(it => /^dot-color-[\w]+$/.test(it))
            .forEach(it => this.renderer.removeClass(this.nativeElement, it));

        if (isThemeColor(this.thyColor())) {
            this.renderer.removeStyle(this.nativeElement, 'borderColor');
            this.renderer.addClass(this.nativeElement, `dot-color-${this.thyColor()}`);
        } else {
            this.renderer.setStyle(this.nativeElement, 'borderColor', this.thyColor());
        }
    }
}
