import { Component, HostBinding, TemplateRef, ElementRef, Input, OnInit, AfterViewInit, Renderer2 } from '@angular/core';
import { ThyTranslate } from '../shared';
import { ThyEmptyConfig } from './empty.config';
import { inputValueToBoolean } from '../util/helpers';

const sizeClassMap: any = {
    'lg': ['empty-state', 'empty-state--lg'],
    'md': ['empty-state'],
    'sm': ['empty-state', 'empty-state--sm']
};
const sizeMap: any = {
    'lg': {
        height: 164, // 空提示的高度
        offsetTop: 30,// 空提示图标和大小之间的空白距离，需要除去，否则会不居中
        defaultMarginTop: 120// 不自动计算默认的 top 距离
    },
    'md': {
        height: 91,
        offsetTop: 20,
        defaultMarginTop: 10
    },
    'sm': {
        height: 50,
        offsetTop: 10,
        defaultMarginTop: 0
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
    @Input() thyTranslationId: string;

    @Input() thyTranslationValues: any;

    // 显示默认提示信息，替换目标名称
    @Input() thyEntityName: string;

    // 显示默认提示信息，替换目标名称的 translateId
    @Input() thyEntityNameTranslateId: string;

    @Input() thyIconClass: string;

    @Input()
    set thySize(value: string) {
        const classList = sizeClassMap[value || 'md'];
        if (classList) {
            this.sizeClass = classList.join(' ');
        }
    }

    @Input() thyMarginTop: number | string;

    @Input() thyTopAuto: boolean;

    @Input() thyContainer: ElementRef<any>;

    get displayText() {
        if (this.thyMessage) {
            return this.thyMessage;
        } else if (this.thyTranslationId) {
            return this.thyTranslate.instant(this.thyTranslationId, this.thyTranslationValues);
        } else if (this.thyEntityName) {
            return this.thyTranslate.instant(this.thyEmptyConfig.noResultWithTargetTranslateId, {
                target: this.thyEntityName
            });
        } else if (this.thyEntityNameTranslateId) {
            return this.thyTranslate.instant(this.thyEmptyConfig.noResultWithTargetTranslateId, {
                target: this.thyTranslate.instant(this.thyEntityNameTranslateId)
            });
        } else {
            return this.thyTranslate.instant(this.thyEmptyConfig.noResultTranslateId);
        }
    }

    constructor(
        private thyTranslate: ThyTranslate,
        private thyEmptyConfig: ThyEmptyConfig,
        private elementRef: ElementRef,
        private renderer: Renderer2
    ) {

    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        const sizeOptions = sizeMap[this.thySize || 'md'];
        const topAuto = inputValueToBoolean(this.thyTopAuto);
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
            // if (marginTop < 0) {
            //     marginTop = sizeOptions.defaultMarginTop;
            // }
        } else {
            if (this.thyMarginTop) {
                marginTop = this.thyMarginTop;
            } else {
                // marginTop = sizeOptions.defaultMarginTop;
            }
        }
        if (marginTop) {
            this.renderer.setStyle(this.elementRef.nativeElement, 'marginTop', marginTop + 'px');
        }
    }

}
