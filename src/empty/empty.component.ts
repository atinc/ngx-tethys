import { ThyTranslate } from 'ngx-tethys/core';
import { coerceBooleanProperty } from 'ngx-tethys/util';

import {
    AfterViewInit,
    Component,
    ContentChild,
    ElementRef,
    HostBinding,
    Input,
    NgZone,
    OnInit,
    Renderer2,
    TemplateRef
} from '@angular/core';

import { ThyEmptyConfig } from './empty.config';

const sizeClassMap: any = {
    lg: ['thy-empty-state', 'thy-empty-state--lg'],
    md: ['thy-empty-state'],
    sm: ['thy-empty-state', 'thy-empty-state--sm']
};
const sizeMap: any = {
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
        offsetTop: 20,
        defaultMarginTop: 10
    }
};

@Component({
    selector: 'thy-empty',
    templateUrl: './empty.component.html'
})
export class ThyEmptyComponent implements OnInit, AfterViewInit {
    @HostBinding('class') sizeClass = sizeClassMap['md'].join(' ');

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
        const classList = sizeClassMap[value || 'md'];
        if (classList) {
            this.sizeClass = classList.join(' ');
        }
    }

    @Input() thyMarginTop: number | string;

    @Input() thyTopAuto: boolean;

    @Input() thyContainer: ElementRef;

    @Input() thyImageUrl: string;

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

    _calculatePosition() {
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
            // marginTop = (containerElement.offsetHeight - emptyStateHeight) / 2 - sizeOptions.offsetTop;
            marginTop = containerElement.offsetHeight - emptyStateHeight;
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
        private ngZone: NgZone
    ) {}

    ngOnInit() {}

    ngAfterViewInit() {
        this.ngZone.runOutsideAngular(() => {
            setTimeout(() => {
                this._calculatePosition();
            }, 50);
        });
    }
}
