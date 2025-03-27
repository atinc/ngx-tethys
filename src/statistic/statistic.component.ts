import { OnInit, Component, Input, HostBinding, ElementRef, TemplateRef, ContentChild, inject } from '@angular/core';
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
    imports: [NgTemplateOutlet, NgStyle]
})
export class ThyStatistic implements OnInit {
    private elementRef = inject(ElementRef);

    _shape: ThyStatisticShape;

    _initialized = false;

    _size: ThyStatisticSizes;

    prefixTemplate: TemplateRef<void>;

    suffixTemplate: TemplateRef<void>;

    valueTemplate: TemplateRef<void>;

    titleTemplate: TemplateRef<void>;

    private hostRenderer = useHostRenderer();

    @HostBinding(`class.thy-statistic`) class = true;

    /**
     * @description 展示数据
     * @type number | string
     */
    @Input() thyValue: number | string;

    /**
     * @description 展示数据的 css 样式
     * @type { [key: string]: string; }
     */
    @Input() thyValueStyle: { [key: string]: string } = {};

    /**
     * @description 展示数据的前缀
     * @type string
     */
    @Input() thyPrefix: string;

    /**
     * @description 展示数据的后缀
     * @type string
     */
    @Input() thySuffix: string;

    /**
     * @description 展示数据的标题
     * @type string
     */
    @Input() thyTitle: string;

    /**
     * @description 展示数据标题的位置，可设置 `top`｜`bottom`
     * @type ThyStatisticTitlePosition
     */
    @Input() thyTitlePosition: ThyStatisticTitlePosition = 'bottom';

    /**
     * @description 展示形状
     * @type ThyStatisticShape
     * @default card
     */
    @Input()
    set thyShape(value: ThyStatisticShape) {
        this._shape = value;
        if (this._initialized) {
            this._setClassesByType();
        }
    }

    /**
     * @description 主题颜色，可以使用提供的主题色，也可以自定义颜色。 `ThyStatisticColorType` 中包含 `primary` | `success` | `warning` | `danger` | `info`
     * @type ThyStatisticColorType ｜ string
     */
    @Input() thyColor: string | ThyStatisticColorType;

    /**
     * @description 前缀和展示数据字体大小
     * @type ThyStatisticSizes
     * @default default
     */
    @Input()
    set thySize(value: ThyStatisticSizes) {
        this._size = value;
        if (this._initialized) {
            this._setClassesByType();
        }
    }

    /**
     * @description 自定义展示数据模板
     * @type TemplateRef<void>
     */
    @Input() set thyValueTemplate(value: TemplateRef<void>) {
        this.valueTemplate = value;
    }

    /**
     * @description 自定义展示数据模板
     * @type TemplateRef<void>
     */
    @ContentChild('value', { static: true }) set value(value: TemplateRef<void>) {
        this.valueTemplate = value;
    }

    /**
     * @description 自定义标题模板
     * @type TemplateRef<void>
     */
    @Input() set thyTitleTemplate(value: TemplateRef<void>) {
        this.titleTemplate = value;
    }

    /**
     * @description 自定义标题模板
     * @type TemplateRef<void>
     */
    @ContentChild('title', { static: true }) set title(value: TemplateRef<void>) {
        this.titleTemplate = value;
    }

    /**
     * @description 自定义前缀模板
     * @type TemplateRef<void>
     */
    @Input() set thyPrefixTemplate(value: TemplateRef<void>) {
        this.prefixTemplate = value;
    }

    /**
     * @description 自定义前缀模板
     * @type TemplateRef<void>
     */
    @ContentChild('prefix', { static: true }) set prefix(value: TemplateRef<void>) {
        this.prefixTemplate = value;
    }

    /**
     * @description 自定义后缀模板
     * @type TemplateRef<void>
     */
    @Input() set thySuffixTemplate(value: TemplateRef<void>) {
        this.suffixTemplate = value;
    }
    /**
     * @description 自定义后缀模板
     * @type TemplateRef<void>
     */
    @ContentChild('suffix', { static: true }) set suffix(value: TemplateRef<void>) {
        this.suffixTemplate = value;
    }

    ngOnInit() {
        this._setClassesByType();
        this._initialized = true;
    }

    setColor(color: string) {
        this.hostRenderer.setStyle('color', color);
        if (this._shape === 'card') {
            this.hostRenderer.setStyle('border-color', color);
            this.hostRenderer.setStyle('background-color', hexToRgb(color, 0.05));
        }
    }

    _setClassesByType() {
        const classNames = [];
        if (this.thyColor) {
            if (RegExp(/^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/).test(this.thyColor)) {
                this.setColor(this.thyColor);
            } else {
                classNames.push(`thy-statistic-${this.thyColor}`);
            }
        }
        if (this._shape) {
            classNames.push(`thy-statistic-${this._shape}`);
        }
        if (!this._size) {
            this._size = 'default';
        }
        classNames.push(`thy-statistic-${this._size}`);

        this.hostRenderer.setStyle('font-size', this.thySize);
        this.hostRenderer.updateClass(classNames);
    }
}
