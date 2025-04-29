import { isThemeColor, ThyThemeColor } from 'ngx-tethys/core';

import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Renderer2,
    Signal,
    ViewEncapsulation,
    computed,
    effect,
    inject,
    input
} from '@angular/core';

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
        '[class.dot-theme-fill]': 'theme() === "fill"',
        '[class.dot-theme-outline]': 'theme() === "outline"',
        '[class.dot-shape-square]': 'shape() === "square"',
        '[class.dot-shape-circle]': 'shape() === "circle"',
        '[class.dot-size-md]': 'size() === "md"',
        '[class.dot-size-sm]': 'size() === "sm"',
        '[class.dot-size-xs]': 'size() === "xs"',
        '[class.dot-size-lg]': 'size() === "lg"',
        '[class.dot-size-xlg]': 'size() === "xlg"'
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
    readonly thyColor = input<ThyColorType>(DEFAULT_COLOR_NAME);

    /**
     * 大小
     * @type xs | sm | md | lg | xlg
     */
    readonly thySize = input<ThySizeType>(DEFAULT_SIZE_NAME);

    size: Signal<ThySizeType> = computed(() => this.thySize() || DEFAULT_SIZE_NAME);

    /**
     * 主题
     * @type outline(线框) | fill(填充)
     */
    readonly thyTheme = input<ThyThemeType>(DEFAULT_THEME_NAME);

    theme: Signal<ThyThemeType> = computed(() => this.thyTheme() || DEFAULT_THEME_NAME);

    /**
     * 形状
     * @type circle(圆形) | square(方形)
     */
    readonly thyShape = input<ThyShapeType>(DEFAULT_SHAPE_NAME);

    shape: Signal<ThyShapeType> = computed(() => this.thyShape() || DEFAULT_SHAPE_NAME);

    updateColorStyle() {
        Array.from(this.nativeElement.classList)
            .filter(it => /^dot-color-[\w]+$/.test(it))
            .forEach(it => this.renderer.removeClass(this.nativeElement, it));

        const color = this.thyColor() || DEFAULT_COLOR_NAME;
        if (isThemeColor(color)) {
            this.renderer.setStyle(this.nativeElement, 'borderColor', 'none');
            this.renderer.addClass(this.nativeElement, `dot-color-${color}`);
        } else {
            this.renderer.setStyle(this.nativeElement, 'borderColor', color);
        }
    }
}
