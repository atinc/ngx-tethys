import { ThyTranslate } from 'ngx-tethys/core';
import { useHostRenderer } from '@tethys/cdk/dom';
import {
    AfterViewInit,
    Component,
    ContentChild,
    ElementRef,
    OnChanges,
    Input,
    NgZone,
    OnInit,
    TemplateRef,
    SimpleChanges,
    inject,
    Signal
} from '@angular/core';

import { ThyEmptyConfig } from './empty.config';
import { PRESET_SVG } from './svgs';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeAny } from 'ngx-tethys/types';
import { ThyIcon } from 'ngx-tethys/icon';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { coerceBooleanProperty } from 'ngx-tethys/util';
import { injectLocale, ThyEmptyLocale } from 'ngx-tethys/i18n';

const sizeClassMap = {
    lg: ['thy-empty-state', 'thy-empty-state--lg'],
    md: ['thy-empty-state'],
    sm: ['thy-empty-state', 'thy-empty-state--sm']
};

const sizeMap = {
    lg: {
        height: 168, // 空提示的高度
        offsetTop: 30, // 空提示图标和大小之间的空白距离，需要除去，否则会不居中
        defaultMarginTop: 120 // 不自动计算默认的 top 距离
    },
    md: {
        height: 118,
        offsetTop: 20,
        defaultMarginTop: 10
    },
    sm: {
        height: 78,
        offsetTop: 10,
        defaultMarginTop: 10
    }
};

/** https://html.spec.whatwg.org/multipage/embedded-content.html#attr-img-loading */
export type ThyEmptyImageLoading = 'eager' | 'lazy';

/** https://wicg.github.io/priority-hints/#idl-index */
export type ThyEmptyImageFetchPriority = 'high' | 'low' | 'auto';

/**
 * 空页面组件
 * @name thy-empty
 * @order 10
 */
@Component({
    selector: 'thy-empty',
    templateUrl: './empty.component.html',
    standalone: true,
    imports: [ThyIcon, NgClass, NgTemplateOutlet]
})
export class ThyEmpty implements OnInit, AfterViewInit, OnChanges {
    private thyTranslate = inject(ThyTranslate);
    private thyEmptyConfig = inject(ThyEmptyConfig);
    private elementRef = inject(ElementRef);
    private ngZone = inject(NgZone);
    private sanitizer = inject(DomSanitizer);
    private locale: Signal<ThyEmptyLocale> = injectLocale('empty');

    /**
     * 空页面提示信息
     * @default 暂无数据
     */
    @Input() thyText = this.locale().text;

    /**
     * 已废弃，请使用 thyText。显示文本提示信息。同时传入 thyMessage，thyTranslationKey，thyEntityName，thyEntityNameTranslateKey 时优先级最高
     * @deprecated Please use thyText
     */
    @Input() thyMessage: string;

    /**
     * 已废弃。显示文本提示信息多语言 Key。同时传入 thyTranslationKey，thyEntityName，thyEntityNameTranslateKey 时优先级最高
     * @deprecated
     */
    @Input() thyTranslationKey: string;

    /**
     * 已废弃。显示文本提示信息多语言 Key 的 Values。传入 thyTranslationKey 后，传入这个才会生效
     * @deprecated
     */
    @Input() thyTranslationValues: any;

    /**
     * 已废弃。显示默认提示信息，替换默认提示信息的目标对象，比如：没有 {thyEntityName}。同时传入 thyEntityName，thyEntityNameTranslateKey 时优先级较高
     * @deprecated
     */
    @Input() thyEntityName: string;

    /**
     * 已废弃。thyEntityName 的多语言 Key。thyMessage，thyTranslationKey，thyEntityName 均未传入时才会生效
     * @deprecated
     */
    @Input() thyEntityNameTranslateKey: string;

    /**
     * 提示图标名
     */
    @Input() thyIconName: string;

    /**
     * 大小
     * @type sm | md | lg
     * @default md
     */
    @Input()
    set thySize(value: string) {
        this.size = value;
        if (this._initialized) {
            this.updateClass();
        }
    }

    /**
     * 距上距离
     */
    @Input() thyMarginTop: number | string;

    /**
     * 是否自动根据父容器计算高度，垂直居中
     * @default false
     */
    @Input({ transform: coerceBooleanProperty }) thyTopAuto: boolean;

    /**
     * 自动计算高度垂直居中(即 thyTopAuto 为 true)时，支持传入自定义父容器
     */
    @Input() thyContainer: ElementRef;

    /**
     * 提示图片链接
     */
    @Input() thyImageUrl: string;

    @Input() thyImageLoading?: ThyEmptyImageLoading;

    @Input() thyImageFetchPriority?: ThyEmptyImageFetchPriority;

    /**
     * 显示文本描述
     */
    @Input() thyDescription: string;

    private size: string = 'md';

    private _initialized = false;

    private hostRenderer = useHostRenderer();

    presetSvg: SafeAny;

    /**
     * 除提示图片，文本外的其他信息传入模板
     * @type TemplateRef
     */
    @ContentChild('extra') extraTemplateRef: TemplateRef<any>;

    get displayText() {
        if (this.thyMessage) {
            return this.thyMessage;
        } else if (this.thyTranslationKey) {
            return this.thyTranslate.instant(this.thyTranslationKey, this.thyTranslationValues);
        } else if (this.thyEntityName) {
            return this.thyTranslate.instant(this.thyEmptyConfig.noResultWithTargetTranslateKey, {
                target: this.thyEntityName
            });
        } else if (this.thyEntityNameTranslateKey) {
            return this.thyTranslate.instant(this.thyEmptyConfig.noResultWithTargetTranslateKey, {
                target: this.thyTranslate.instant(this.thyEntityNameTranslateKey)
            });
        } else if (this.thyTranslate.instant(this.thyEmptyConfig.noResultTranslateKey) !== 'common.tips.NO_RESULT') {
            return this.thyTranslate.instant(this.thyEmptyConfig.noResultTranslateKey);
        } else {
            return this.thyText;
        }
    }

    private _calculatePosition() {
        const sizeOptions = sizeMap[this.thySize || 'md'];
        let marginTop = null;
        if (this.thyTopAuto) {
            // 选择参考父容器居中
            const containerElement = this.thyContainer ? this.thyContainer.nativeElement : this.elementRef.nativeElement.parentElement;
            // containerElement.height;
            let emptyStateHeight = this.elementRef.nativeElement.offsetHeight;
            // 高度没有自动计算出来使用默认值
            if (emptyStateHeight <= 10) {
                emptyStateHeight = sizeOptions.height;
            }
            marginTop = (containerElement.offsetHeight - emptyStateHeight) / 2 - sizeOptions.offsetTop;
            // marginTop = (containerElement.offsetHeight - emptyStateHeight) / 2;
            if (marginTop < 0) {
                marginTop = 0; // sizeOptions.defaultMarginTop;
            }
        } else {
            if (this.thyMarginTop) {
                marginTop = this.thyMarginTop;
            } else {
                marginTop = 0; // sizeOptions.defaultMarginTop;
            }
        }
        if (marginTop) {
            this.hostRenderer.setStyle('marginTop', marginTop + 'px');
        }
    }

    ngOnInit() {
        this.updateClass();
        this._initialized = true;
        this.setPresetSvg(this.thyIconName);
    }

    updateClass() {
        const classList = sizeClassMap[this.size] || sizeClassMap['md'];
        if (classList) {
            this.hostRenderer.updateClass(classList);
        }
    }

    ngAfterViewInit() {
        this.ngZone.runOutsideAngular(() => {
            setTimeout(() => {
                this._calculatePosition();
            }, 50);
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.thyIconName && changes.thyIconName.currentValue && !changes.thyIconName.firstChange) {
            this.setPresetSvg(changes.thyIconName.currentValue);
        }
    }

    setPresetSvg(icon: string) {
        this.presetSvg = '';
        let presetSvg = icon ? PRESET_SVG[icon] : PRESET_SVG.default;

        this.presetSvg = presetSvg ? this.sanitizer.bypassSecurityTrustHtml(presetSvg) : '';
    }
}
