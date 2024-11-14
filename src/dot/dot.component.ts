import { isThemeColor, ThyThemeColor } from 'ngx-tethys/core';

import { ChangeDetectionStrategy, Component, ElementRef, Input, Renderer2, ViewEncapsulation, inject } from '@angular/core';

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
        '[class.dot-theme-fill]': 'theme === "fill"',
        '[class.dot-theme-outline]': 'theme === "outline"',
        '[class.dot-shape-square]': 'shape === "square"',
        '[class.dot-shape-circle]': 'shape === "circle"',
        '[class.dot-size-md]': 'size === "md"',
        '[class.dot-size-sm]': 'size === "sm"',
        '[class.dot-size-xs]': 'size === "xs"',
        '[class.dot-size-lg]': 'size === "lg"',
        '[class.dot-size-xlg]': 'size === "xlg"'
    },
    standalone: true
})
export class ThyDot {
    private el = inject(ElementRef);
    private renderer = inject(Renderer2);

    public size: ThySizeType = DEFAULT_SIZE_NAME;
    public theme: ThyThemeType = DEFAULT_THEME_NAME;
    public shape: ThyShapeType = DEFAULT_SHAPE_NAME;
    public color: ThyColorType = DEFAULT_COLOR_NAME;
    private nativeElement: HTMLElement;
    constructor() {
        this.nativeElement = this.el.nativeElement;
        this.updateColorStyle();
    }

    /**
     * 颜色，可选值为：`primary` `success` `info` `warning` `danger` `default` `light`和自定义颜色，如`#2cccda` `red`  `rgb(153, 153, 153)`
     * @type ThyThemeColor | string
     * @default primary
     */
    @Input()
    set thyColor(value: ThyColorType) {
        if (value) {
            this.color = value;
            this.updateColorStyle();
        }
    }

    /**
     * 大小
     * @type xs | sm | md | lg | xlg
     * @default sm
     */
    @Input()
    set thySize(value: ThySizeType) {
        if (value) {
            this.size = value;
        }
    }

    /**
     * 主题
     * @type outline(线框) | fill(填充)
     * @default fill
     */
    @Input()
    set thyTheme(value: ThyThemeType) {
        if (value) {
            this.theme = value;
        }
    }

    /**
     * 形状
     * @type circle(圆形) | square(方形)
     * @default circle
     */
    @Input()
    set thyShape(value: ThyShapeType) {
        if (value) {
            this.shape = value;
        }
    }

    updateColorStyle() {
        Array.from(this.nativeElement.classList)
            .filter(it => /^dot-color-[\w]+$/.test(it))
            .forEach(it => this.renderer.removeClass(this.nativeElement, it));

        if (isThemeColor(this.color)) {
            this.renderer.setStyle(this.nativeElement, 'borderColor', 'none');
            this.renderer.addClass(this.nativeElement, `dot-color-${this.color}`);
        } else {
            this.renderer.setStyle(this.nativeElement, 'borderColor', this.color);
        }
    }
}
