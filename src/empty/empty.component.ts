import { ThyTranslate, UpdateHostClassService } from 'ngx-tethys/core';
import { coerceBooleanProperty } from 'ngx-tethys/util';

import {
    AfterViewInit,
    Component,
    ContentChild,
    ElementRef,
    OnChanges,
    Input,
    NgZone,
    OnInit,
    Renderer2,
    TemplateRef,
    SimpleChanges
} from '@angular/core';

import { ThyEmptyConfig } from './empty.config';
import { PRESET_SVG } from './svgs';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeAny } from 'ngx-tethys/types';

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

@Component({
    selector: 'thy-empty',
    templateUrl: './empty.component.html',
    providers: [UpdateHostClassService]
})
export class ThyEmptyComponent implements OnInit, AfterViewInit, OnChanges {
    // 显示的文本，优先级 100 最高
    @Input() thyMessage: string;

    // 显示文本的多语言 Key 优先级 99
    @Input() thyTranslationKey: string;

    @Input() thyTranslationValues: any;

    // 显示默认提示信息，替换目标名称
    @Input() thyEntityName: string;

    // 显示默认提示信息，替换目标名称的 translateKey
    @Input() thyEntityNameTranslateKey: string;

    @Input() thyIconName: string;

    @Input()
    set thySize(value: string) {
        this.size = value;
        if (this._initialized) {
            this.updateClass();
        }
    }

    @Input() thyMarginTop: number | string;

    @Input() thyTopAuto: boolean;

    @Input() thyContainer: ElementRef;

    @Input() thyImageUrl: string;

    @Input() thyImageLoading?: ThyEmptyImageLoading;

    @Input() thyImageFetchPriority?: ThyEmptyImageFetchPriority;

    @Input() thyDescription: string;

    private size: string = 'md';

    private _initialized = false;

    presetSvg: SafeAny;

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
        } else {
            return this.thyTranslate.instant(this.thyEmptyConfig.noResultTranslateKey);
        }
    }

    private _calculatePosition() {
        const sizeOptions = sizeMap[this.thySize || 'md'];
        const topAuto = coerceBooleanProperty(this.thyTopAuto);
        let marginTop = null;
        if (topAuto) {
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
            this.renderer.setStyle(this.elementRef.nativeElement, 'marginTop', marginTop + 'px');
        }
    }

    constructor(
        private thyTranslate: ThyTranslate,
        private thyEmptyConfig: ThyEmptyConfig,
        private elementRef: ElementRef,
        private renderer: Renderer2,
        private ngZone: NgZone,
        private updateHostClassService: UpdateHostClassService,
        private sanitizer: DomSanitizer
    ) {
        this.updateHostClassService.initializeElement(elementRef.nativeElement);
    }

    ngOnInit() {
        this.updateClass();
        this._initialized = true;
        this.setPresetSvg(this.thyIconName);
    }

    updateClass() {
        const classList = sizeClassMap[this.size] || sizeClassMap['md'];
        if (classList) {
            this.updateHostClassService.updateClass(classList);
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

        this.presetSvg = this.sanitizer.bypassSecurityTrustHtml(presetSvg);
    }
}
