import { ChangeDetectionStrategy, Component, ElementRef, Input, Renderer2, ViewEncapsulation } from '@angular/core';
import { isThemeColor, ThyThemeColor } from 'ngx-tethys/core';

export type ThyColorType = ThyThemeColor | string;
export type ThySizeType = 'xs' | 'sm' | 'md' | 'lg';
export type ThyThemeType = 'outline' | 'fill';
export type ThyShapeType = 'square' | 'circle';

export const COMPONENT_CLASS_NAME = 'thy-dot';

export const DEFAULT_COLOR_NAME = 'primary';
export const DEFAULT_SIZE_NAME = 'sm';
export const DEFAULT_THEME_NAME = 'fill';
export const DEFAULT_SHAPE_NAME = 'circle';
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
        '[class.dot-size-lg]': 'size === "lg"'
    }
})
export class ThyDotComponent {
    public size: ThySizeType = DEFAULT_SIZE_NAME;
    public theme: ThyThemeType = DEFAULT_THEME_NAME;
    public shape: ThyShapeType = DEFAULT_SHAPE_NAME;
    private nativeElement: HTMLElement;
    constructor(private el: ElementRef, private renderer: Renderer2) {
        this.nativeElement = this.el.nativeElement;
        this.updateColorStyle(DEFAULT_COLOR_NAME);
    }

    @Input()
    set thyColor(value: ThyColorType) {
        if (value) {
            this.updateColorStyle(value);
        }
    }

    @Input()
    set thySize(value: ThySizeType) {
        if (value) {
            this.size = value;
        }
    }

    @Input()
    set thyTheme(value: ThyThemeType) {
        if (value) {
            this.theme = value;
        }
    }

    @Input()
    set thyShape(value: ThyShapeType) {
        if (value) {
            this.shape = value;
        }
    }

    updateColorStyle(value: string) {
        Array.from(this.nativeElement.classList)
            .filter(it => /^dot-color-[\w]+$/.test(it))
            .forEach(it => this.renderer.removeClass(this.nativeElement, it));

        if (isThemeColor(value)) {
            this.renderer.setStyle(this.nativeElement, 'borderColor', 'none');
            this.renderer.addClass(this.nativeElement, `dot-color-${value}`);
        } else {
            this.renderer.setStyle(this.nativeElement, 'borderColor', value);
        }
    }
}
