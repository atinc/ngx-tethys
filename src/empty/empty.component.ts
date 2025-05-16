import {
    AfterViewInit,
    Component,
    computed,
    contentChild,
    effect,
    ElementRef,
    inject,
    input,
    NgZone,
    Signal,
    TemplateRef
} from '@angular/core';
import { useHostRenderer } from '@tethys/cdk/dom';
import { ThyTranslate } from 'ngx-tethys/core';

import { NgClass, NgTemplateOutlet } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { injectLocale, ThyEmptyLocale } from 'ngx-tethys/i18n';
import { ThyIcon } from 'ngx-tethys/icon';
import { SafeAny } from 'ngx-tethys/types';
import { coerceBooleanProperty } from 'ngx-tethys/util';
import { ThyEmptyConfig } from './empty.config';
import { PRESET_SVG } from './svgs';

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
    imports: [ThyIcon, NgClass, NgTemplateOutlet]
})
export class ThyEmpty implements AfterViewInit {
    private thyTranslate = inject(ThyTranslate);
    private thyEmptyConfig = inject(ThyEmptyConfig);
    private elementRef = inject(ElementRef);
    private ngZone = inject(NgZone);
    private sanitizer = inject(DomSanitizer);
    private locale: Signal<ThyEmptyLocale> = injectLocale('empty');

    /**
     * 显示文本提示信息。同时传入 thyMessage，thyTranslationKey，thyEntityName，thyEntityNameTranslateKey 时优先级最高
     * @default 暂无数据
     */
    readonly thyMessage = input<string>();

    /**
     * 已废弃。显示文本提示信息多语言 Key。同时传入 thyTranslationKey，thyEntityName，thyEntityNameTranslateKey 时优先级最高
     * @deprecated
     */
    readonly thyTranslationKey = input<string>();

    /**
     * 已废弃。显示文本提示信息多语言 Key 的 Values。传入 thyTranslationKey 后，传入这个才会生效
     * @deprecated
     */
    readonly thyTranslationValues = input<any>();

    /**
     * 已废弃。显示默认提示信息，替换默认提示信息的目标对象，比如：没有 {thyEntityName}。同时传入 thyEntityName，thyEntityNameTranslateKey 时优先级较高
     * @deprecated
     */
    readonly thyEntityName = input<string>();

    /**
     * 已废弃。thyEntityName 的多语言 Key。thyMessage，thyTranslationKey，thyEntityName 均未传入时才会生效
     * @deprecated
     */
    readonly thyEntityNameTranslateKey = input<string>();

    /**
     * 提示图标名
     */
    readonly thyIconName = input<string>();

    /**
     * 大小
     * @type sm | md | lg
     * @default md
     */
    readonly thySize = input<string>('md');

    /**
     * 距上距离
     */
    readonly thyMarginTop = input<number | string>();

    /**
     * 是否自动根据父容器计算高度，垂直居中
     * @default false
     */
    readonly thyTopAuto = input(false, { transform: coerceBooleanProperty });

    /**
     * 自动计算高度垂直居中(即 thyTopAuto 为 true)时，支持传入自定义父容器
     */
    readonly thyContainer = input<ElementRef>();

    /**
     * 提示图片链接
     */
    readonly thyImageUrl = input<string>();

    readonly thyImageLoading = input<ThyEmptyImageLoading>();

    readonly thyImageFetchPriority = input<ThyEmptyImageFetchPriority>();

    /**
     * 显示文本描述
     */
    readonly thyDescription = input<string>();

    private hostRenderer = useHostRenderer();

    /**
     * 除提示图片，文本外的其他信息传入模板
     * @type TemplateRef
     */
    readonly extraTemplateRef = contentChild<TemplateRef<SafeAny>>('extra');

    protected readonly presetSvg = computed(() => {
        let presetSvg = this.thyIconName() ? PRESET_SVG[this.thyIconName() as keyof typeof PRESET_SVG] : PRESET_SVG.default;

        return presetSvg ? this.sanitizer.bypassSecurityTrustHtml(presetSvg) : '';
    });

    protected readonly displayText = computed(() => {
        if (this.thyMessage()) {
            return this.thyMessage();
        } else if (this.thyTranslationKey()) {
            return this.thyTranslate.instant(this.thyTranslationKey(), this.thyTranslationValues());
        } else if (this.thyEntityName()) {
            return this.thyTranslate.instant(this.thyEmptyConfig.noResultWithTargetTranslateKey, {
                target: this.thyEntityName()
            });
        } else if (this.thyEntityNameTranslateKey()) {
            return this.thyTranslate.instant(this.thyEmptyConfig.noResultWithTargetTranslateKey, {
                target: this.thyTranslate.instant(this.thyEntityNameTranslateKey())
            });
        } else if (this.thyTranslate.instant(this.thyEmptyConfig.noResultTranslateKey) !== 'common.tips.NO_RESULT') {
            return this.thyTranslate.instant(this.thyEmptyConfig.noResultTranslateKey);
        } else {
            return this.locale().noDataText;
        }
    });

    constructor() {
        effect(() => {
            this.updateClass();
        });
    }

    private _calculatePosition() {
        const sizeOptions = sizeMap[(this.thySize() as keyof typeof sizeMap) || 'md'];
        let marginTop = null;
        if (this.thyTopAuto()) {
            // 选择参考父容器居中
            const thyContainer = this.thyContainer();
            const containerElement = thyContainer ? thyContainer.nativeElement : this.elementRef.nativeElement.parentElement;
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
            const thyMarginTop = this.thyMarginTop();
            if (thyMarginTop) {
                marginTop = thyMarginTop;
            } else {
                marginTop = 0; // sizeOptions.defaultMarginTop;
            }
        }
        if (marginTop) {
            this.hostRenderer.setStyle('marginTop', marginTop + 'px');
        }
    }

    updateClass() {
        const classList = sizeClassMap[(this.thySize() as keyof typeof sizeClassMap) || 'md'];
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
}
