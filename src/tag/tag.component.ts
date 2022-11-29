import { Component, ElementRef, OnChanges, Input, OnInit, ChangeDetectionStrategy, SimpleChanges } from '@angular/core';
import { InputBoolean, isThemeColor, ThyThemeColor, UpdateHostClassService } from 'ngx-tethys/core';
import { hexToRgb } from 'ngx-tethys/util';

export type ThyTagColor = ThyThemeColor | string;

export type ThyTagShape = 'pill' | 'rectangle';

export type ThyTagSize = 'sm' | 'md' | 'lg';

@Component({
    selector: 'thy-tag, [thyTag]',
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
    },
    providers: [UpdateHostClassService]
})
export class ThyTagComponent implements OnInit, OnChanges {
    private color: ThyTagColor = 'default';

    /**
     * 标签颜色，thyColor 的简写
     */
    @Input()
    set thyTag(value: ThyTagColor) {
        if (value) {
            this.color = value;
        }
    }

    /**
     * 标签形状，可选值为 `pill` 或 `rectangle`
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
     */
    @Input() thyTheme: 'outline' | 'fill' | 'weak-fill' = 'fill';

    /**
     * 标签大小
     */
    @Input() thySize: ThyTagSize = 'md';

    /**
     * 可 Hover 悬停的标签，设置为 true 时会有一个 Hover 效果
     */
    @Input()
    @InputBoolean()
    thyHoverable: boolean | string;

    constructor(private elementRef: ElementRef, private updateHostClassService: UpdateHostClassService) {
        this.updateHostClassService.initializeElement(this.elementRef);
    }

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
        this.updateHostClassService.updateClass([]);

        if (isThemeColor(this.color)) {
            this.updateHostClassService.updateClass([`thy-tag-${this.thyTheme === 'fill' ? '' : this.thyTheme + '-'}${this.color}`]);
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
