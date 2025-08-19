import { ChangeDetectionStrategy, Component, computed, effect, ElementRef, inject, input } from '@angular/core';
import { useHostRenderer } from '@tethys/cdk/dom';
import { isThemeColor, ThyThemeColor } from 'ngx-tethys/core';
import { coerceBooleanProperty, hexToRgb } from 'ngx-tethys/util';

export type ThyTagColor = ThyThemeColor | string;

export type ThyTagShape = 'pill' | 'rectangle';

export type ThyTagSize = 'sm' | 'md' | 'lg';

/**
 * 标签组件
 * @name thy-tag,[thyTag]
 */
@Component({
    selector: 'thy-tag,[thyTag]',
    templateUrl: './tag.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'thy-tag',
        '[class.thy-tag-pill]': 'thyShape() === "pill"',
        '[class.thy-tag-outline]': 'thyTheme() === "outline"',
        '[class.thy-tag-hover]': 'thyHoverable()',
        '[class.thy-tag-md]': 'thySize() === "md"',
        '[class.thy-tag-sm]': 'thySize() === "sm"',
        '[class.thy-tag-xs]': 'thySize() === "xs"',
        '[class.thy-tag-lg]': 'thySize() === "lg"'
    }
})
export class ThyTag {
    private elementRef = inject(ElementRef);

    private hostRenderer = useHostRenderer();

    /**
     * 标签颜色，thyColor 的简写
     * @type primary | success | info | warning | danger | default | light | string
     * @default default
     */
    readonly thyTag = input<ThyTagColor>('');

    /**
     * 标签形状
     * @type pill | rectangle
     */
    readonly thyShape = input<ThyTagShape>('rectangle');

    /**
     * 标签颜色，支持设置主题色和颜色值，主题色为 default、primary、success、info、warning、danger
     */
    readonly thyColor = input<ThyTagColor>('');

    /**
     * 标签主题，fill 为颜色填充，outline 为线框，weak-fill 为背景色0.1透明度效果
     * @type outline | fill | weak-fill
     */
    readonly thyTheme = input<'outline' | 'fill' | 'weak-fill'>('fill');

    /**
     * 标签大小
     * @type sm | md | lg
     */
    readonly thySize = input<ThyTagSize>('md');

    /**
     * 可 Hover 悬停的标签，设置为 true 时会有一个 Hover 效果
     * @default false
     */
    readonly thyHoverable = input(false, { transform: coerceBooleanProperty });

    protected readonly color = computed(() => this.thyColor() || this.thyTag() || 'default');

    constructor() {
        effect(() => {
            this.setColor();
        });
    }

    private setColor(): void {
        this.elementRef.nativeElement.style.removeProperty('background-color');
        this.elementRef.nativeElement.style.removeProperty('border-color');
        this.elementRef.nativeElement.style.removeProperty('color');
        this.hostRenderer.updateClass([]);

        if (isThemeColor(this.color())) {
            this.hostRenderer.updateClass([`thy-tag-${this.thyTheme() === 'fill' ? '' : `${this.thyTheme()}-`}${this.color()}`]);
        } else {
            if (this.thyTheme() === 'fill') {
                this.elementRef.nativeElement.style.backgroundColor = this.color();
            } else if (this.thyTheme() === 'outline') {
                this.elementRef.nativeElement.style.color = this.color();
                this.elementRef.nativeElement.style['border-color'] = this.color();
            } else {
                this.elementRef.nativeElement.style.backgroundColor = hexToRgb(this.color(), 0.1);
                this.elementRef.nativeElement.style.color = this.color();
            }
        }
    }
}
