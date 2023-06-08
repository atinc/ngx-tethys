import { InputBoolean } from 'ngx-tethys/core';
import { ThyNotifyService } from 'ngx-tethys/notify';
import { ThyTooltipDirective, ThyTooltipService } from 'ngx-tethys/tooltip';

import { Clipboard } from '@angular/cdk/clipboard';
import { coerceElement } from '@angular/cdk/coercion';
import { DOCUMENT } from '@angular/common';
import {
    Directive,
    ElementRef,
    EventEmitter,
    HostListener,
    Inject,
    inject,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewContainerRef
} from '@angular/core';

export interface ThyCopyEvent {
    isSuccess: boolean;
    event: Event;
}

export interface ThyCopyConfig {
    copySuccessText?: string;
    copyTooltips?: string;
}

export const DEFAULT_COPY_CONFIG: ThyCopyConfig = {
    copySuccessText: '复制成功',
    copyTooltips: '点击复制'
};

/**
 * @name thyCopy
 */
@Directive({
    selector: '[thyCopy]',
    providers: [ThyTooltipService],
    hostDirectives: [
        {
            directive: ThyTooltipDirective
        }
    ],
    standalone: true
})
export class ThyCopyDirective implements OnInit, OnDestroy {
    /**
     * 复制成功事件
     */
    @Output() thyCopied = new EventEmitter<ThyCopyEvent>();

    /**
     * 默认为点击标签，可传复制目标标签
     * 当为 string 时，复制的是传入的内容；当为 ElementRef | HTMLElement 时，复制的是 dom 节点的 value 或者 textContent
     */
    @Input() set thyCopy(value: string | ElementRef | HTMLElement) {
        this.thyCopyContent = value;
    }

    /**
     * 复制成功时的文案
     */
    @Input() thyCopySuccessText = DEFAULT_COPY_CONFIG.copySuccessText;

    /**
     * 提示文案
     */
    @Input() set thyCopyTips(value: string) {
        this.copyTips = value;
        this.tooltipDirective.content = value;
    }

    copyTips = DEFAULT_COPY_CONFIG.copyTooltips;

    /**
     * 当为 string 时，复制的是传入的内容；当为 ElementRef | HTMLElement 时，复制的是 dom 节点的 value 或者 textContent
     */
    @Input() thyCopyContent: string | ElementRef | HTMLElement;

    @Input() @InputBoolean() thyShowNotify = true;

    tooltipDirective = inject(ThyTooltipDirective);

    constructor(
        @Inject(DOCUMENT) private document: any,
        public tooltipService: ThyTooltipService,
        private elementRef: ElementRef<HTMLElement>,
        private viewContainerRef: ViewContainerRef,
        private notifyService: ThyNotifyService,
        private clipboard: Clipboard
    ) {}

    ngOnInit() {
        this.tooltipDirective.content = this.copyTips;
    }

    private getContent(event: Event) {
        const content = this.thyCopy || this.thyCopyContent;
        if (typeof content === 'string') {
            return content;
        } else {
            const target = content ? coerceElement(content) : event.target;
            return target.value || target.textContent;
        }
    }
    @HostListener('click', ['$event'])
    public onClick(event: Event) {
        console.log('click');
        const copySuccess = this.clipboard.copy(this.getContent(event));
        if (copySuccess) {
            this.thyCopied.emit({ isSuccess: true, event });
            if (this.thyShowNotify) {
                this.notifyService.success(this.thyCopySuccessText);
            }
        } else {
            this.thyCopied.emit({ isSuccess: false, event });
            if (this.thyShowNotify) {
                this.notifyService.error('复制失败');
            }
        }
    }

    ngOnDestroy() {}
}
