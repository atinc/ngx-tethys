import { Component, TemplateRef, ChangeDetectionStrategy, input, contentChild, effect, computed } from '@angular/core';
import { hexToRgb } from 'ngx-tethys/util';
import { useHostRenderer } from '@tethys/cdk/dom';
import { NgTemplateOutlet, NgStyle } from '@angular/common';

export type ThyStatisticColorType = 'primary' | 'success' | 'warning' | 'danger' | 'info';

export type ThyStatisticShape = 'card';

export type ThyStatisticSizes = 'default';

export type ThyStatisticTitlePosition = 'top' | 'bottom';

/**
 * 用于展示数据统计
 * @name thy-statistic
 */
@Component({
    selector: 'thy-statistic',
    templateUrl: './statistic.component.html',
    imports: [NgTemplateOutlet, NgStyle],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { '[class.thy-statistic]': 'true' }
})
export class ThyStatistic {
    /**
     * @description 展示数据
     * @type number | string
     */
    readonly thyValue = input<number | string>();

    /**
     * @description 展示数据的 css 样式
     * @type { [key: string]: string; }
     */
    readonly thyValueStyle = input<{ [key: string]: string }>({});

    /**
     * @description 展示数据的前缀
     * @type string
     */
    readonly thyPrefix = input<string>();

    /**
     * @description 展示数据的后缀
     * @type string
     */
    readonly thySuffix = input<string>();

    /**
     * @description 展示数据的标题
     * @type string
     */
    readonly thyTitle = input<string>();

    /**
     * @description 展示数据标题的位置，可设置 `top`｜`bottom`
     * @type ThyStatisticTitlePosition
     */
    readonly thyTitlePosition = input<ThyStatisticTitlePosition>('bottom');

    /**
     * @description 展示形状
     * @type ThyStatisticShape
     * @default card
     */
    readonly thyShape = input<ThyStatisticShape>();

    /**
     * @description 主题颜色，可以使用提供的主题色，也可以自定义颜色。 `ThyStatisticColorType` 中包含 `primary` | `success` | `warning` | `danger` | `info`
     * @type ThyStatisticColorType ｜ string
     */
    readonly thyColor = input<string | ThyStatisticColorType>();

    /**
     * @description 前缀和展示数据字体大小
     * @type ThyStatisticSizes
     * @default default
     */
    readonly thySize = input<ThyStatisticSizes>('default');

    /**
     * @description 自定义展示数据模板
     * @type TemplateRef<void>
     */
    readonly thyValueTemplate = input<TemplateRef<void>>();

    /**
     * @description 自定义标题模板
     * @type TemplateRef<void>
     */
    readonly thyTitleTemplate = input<TemplateRef<void>>();

    /**
     * @description 自定义前缀模板
     * @type TemplateRef<void>
     */
    readonly thyPrefixTemplate = input<TemplateRef<void>>();

    /**
     * @description 自定义后缀模板
     * @type TemplateRef<void>
     */
    readonly thySuffixTemplate = input<TemplateRef<void>>();

    /**
     * @description 自定义展示数据模板
     * @type TemplateRef<void>
     */
    readonly contentValueTemplate = contentChild<TemplateRef<void>>('value');

    /**
     * @description 自定义标题模板
     * @type TemplateRef<void>
     */
    readonly contentTitleTemplate = contentChild<TemplateRef<void>>('title');

    /**
     * @description 自定义前缀模板
     * @type TemplateRef<void>
     */
    readonly contentPrefixTemplate = contentChild<TemplateRef<void>>('prefix');

    /**
     * @description 自定义后缀模板
     * @type TemplateRef<void>
     */
    readonly contentSuffixTemplate = contentChild<TemplateRef<void>>('suffix');

    valueTemplate = computed(() => {
        return this.thyValueTemplate() || this.contentValueTemplate();
    });

    titleTemplate = computed(() => {
        return this.thyTitleTemplate() || this.contentTitleTemplate();
    });

    prefixTemplate = computed(() => {
        return this.thyPrefixTemplate() || this.contentPrefixTemplate();
    });

    suffixTemplate = computed(() => {
        return this.thySuffixTemplate() || this.contentSuffixTemplate();
    });

    private hostRenderer = useHostRenderer();

    constructor() {
        effect(() => {
            this.setClassesByType();
        });
    }

    private setClassesByType() {
        const classNames = [];
        if (this.thyColor()) {
            if (RegExp(/^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/).test(this.thyColor())) {
                this.setColor(this.thyColor());
            } else {
                classNames.push(`thy-statistic-${this.thyColor()}`);
            }
        }
        if (this.thyShape()) {
            classNames.push(`thy-statistic-${this.thyShape()}`);
        }
        classNames.push(`thy-statistic-${this.thySize()}`);

        this.hostRenderer.setStyle('font-size', this.thySize());
        this.hostRenderer.updateClass(classNames);
    }

    private setColor(color: string) {
        this.hostRenderer.setStyle('color', color);
        if (this.thyShape() === 'card') {
            this.hostRenderer.setStyle('border-color', color);
            this.hostRenderer.setStyle('background-color', hexToRgb(color, 0.05));
        }
    }
}
