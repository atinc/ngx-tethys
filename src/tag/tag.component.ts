import { Component, ElementRef, OnChanges, Input, OnInit, ChangeDetectionStrategy, SimpleChanges, inject } from '@angular/core';
import { isThemeColor, ThyThemeColor } from 'ngx-tethys/core';
import { coerceBooleanProperty, hexToRgb } from 'ngx-tethys/util';
import { useHostRenderer } from '@tethys/cdk/dom';

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
        '[class.thy-tag-pill]': 'thyShape === "pill"',
        '[class.thy-tag-outline]': 'thyTheme === "outline"',
        '[class.thy-tag-hover]': 'thyHoverable',
        '[class.thy-tag-md]': 'thySize === "md"',
        '[class.thy-tag-sm]': 'thySize === "sm"',
        '[class.thy-tag-xs]': 'thySize === "xs"',
        '[class.thy-tag-lg]': 'thySize === "lg"'
    }
})
export class ThyTag implements OnInit, OnChanges {
    private elementRef = inject(ElementRef);

    private color: ThyTagColor = 'default';

    private hostRenderer = useHostRenderer();

    /**
     * 标签颜色，thyColor 的简写
     * @type primary | success | info | warning | danger | default | light | string
     * @default default
     */
    @Input()
    set thyTag(value: ThyTagColor) {
        if (value) {
            this.color = value;
        }
    }

    /**
     * 标签形状
     * @type pill | rectangle
     */
    @Input() thyShape: ThyTagShape = 'rectangle';

    /**
     * 标签颜色，支持设置主题色和颜色值，主题色为 default、primary、success、info、warning、danger
     */
    @Input()
    set thyColor(color: ThyTagColor) {
        this.color = color;
    }

    /**
     * 标签主题，fill 为颜色填充，outline 为线框，weak-fill 为背景色0.1透明度效果
     * @type outline | fill | weak-fill
     */
    @Input() thyTheme: 'outline' | 'fill' | 'weak-fill' = 'fill';

    /**
     * 标签大小
     * @type sm | md | lg
     */
    @Input() thySize: ThyTagSize = 'md';

    /**
     * 可 Hover 悬停的标签，设置为 true 时会有一个 Hover 效果
     * @default false
     */
    @Input({ transform: coerceBooleanProperty })
    thyHoverable: boolean | string;

    ngOnInit(): void {
        this.setColor();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.thyColor && changes.thyColor.currentValue && !changes.thyColor.firstChange) {
            this.setColor();
        }
        if (changes.thyTheme && changes.thyTheme.currentValue && !changes.thyTheme.firstChange) {
            this.setColor();
        }
    }

    private setColor(): void {
        this.elementRef.nativeElement.style.removeProperty('background-color');
        this.elementRef.nativeElement.style.removeProperty('border-color');
        this.elementRef.nativeElement.style.removeProperty('color');
        this.hostRenderer.updateClass([]);

        if (isThemeColor(this.color)) {
            this.hostRenderer.updateClass([`thy-tag-${this.thyTheme === 'fill' ? '' : this.thyTheme + '-'}${this.color}`]);
        } else {
            if (this.thyTheme === 'fill') {
                this.elementRef.nativeElement.style.backgroundColor = this.color;
            } else if (this.thyTheme === 'outline') {
                this.elementRef.nativeElement.style.color = this.color;
                this.elementRef.nativeElement.style['border-color'] = this.color;
            } else {
                this.elementRef.nativeElement.style.backgroundColor = hexToRgb(this.color, 0.1);
                this.elementRef.nativeElement.style.color = this.color;
            }
        }
    }
}
