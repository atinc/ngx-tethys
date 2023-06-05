import { InputBoolean, InputNumber } from 'ngx-tethys/core';
import { ThyNotifyService } from 'ngx-tethys/notify';
import { TooltipService } from 'ngx-tethys/tooltip';
import { timer } from 'rxjs';

import { Clipboard } from '@angular/cdk/clipboard';
import { coerceElement } from '@angular/cdk/coercion';
import { DOCUMENT } from '@angular/common';
import {
    Directive,
    ElementRef,
    EventEmitter,
    HostListener,
    Inject,
    Input,
    OnDestroy,
    OnInit,
    Output,
    Renderer2,
    ViewContainerRef
} from '@angular/core';

import { helpers } from '../util';

export enum ThyCopyFeedbackMode {
    notify = 'notify',
    replace = 'replace',
    append = 'append',
    none = 'none'
}
export interface ThyCopyEvent {
    isSuccess: boolean;
    event: Event;
}

/**
 * @name thyCopy
 */
@Directive({
    selector: '[thyCopy]',
    providers: [TooltipService],
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
    @Input() thyCopy: string | ElementRef | HTMLElement;

    /**
     * 复制反馈模式 'notify' 弹窗提示 | 'replace' 替换host元素为成功图标 | 'append' 追加成功图标 | 'none' 不设置
     */
    @Input() thyCopyFeedbackMode: ThyCopyFeedbackMode = ThyCopyFeedbackMode.notify;

    /**
     * 反馈持续时间
     */
    @Input() @InputNumber() thyCopyFeedbackDuration = 3000;

    /**
     * 复制成功时的文案
     */
    @Input() thyCopySuccessText = '复制成功';

    /**
     * 提示文案
     */
    @Input() thyCopyTips = '点击复制';

    /**
     * @deprecated 使用 thyCopy 代替
     * 当为 string 时，复制的是传入的内容；当为 ElementRef | HTMLElement 时，复制的是 dom 节点的 value 或者 textContent
     */
    @Input() thyCopyContent: string | ElementRef | HTMLElement;

    /**
     * @deprecated 使用 thyCopyFeedbackMode 传入 notify 代替
     * 是否展示通知
     */
    @Input() @InputBoolean() thyShowNotify = true;

    private successComponent: HTMLElement;

    private hostComponent: HTMLElement;

    constructor(
        @Inject(DOCUMENT) private document: any,
        public tooltipService: TooltipService,
        private elementRef: ElementRef<HTMLElement>,
        private viewContainerRef: ViewContainerRef,
        private notifyService: ThyNotifyService,
        private clipboard: Clipboard,
        private renderer: Renderer2
    ) {}

    ngOnInit() {
        if (!helpers.isUndefinedOrNull(this.thyCopyTips) || this.thyCopyTips !== '') {
            this.tooltipService.attach(this.elementRef, this.viewContainerRef, 'hover');
            this.tooltipService.thyTooltipDirective.content = this.thyCopyTips;
        }
        this.successComponent = this.getFeedbackComponent();
        this.hostComponent = this.elementRef.nativeElement;
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
        const copySuccess = this.clipboard.copy(this.getContent(event));
        if (copySuccess) {
            this.handleCopySuccess();
        } else {
            this.handleCopyError();
        }
    }

    handleCopySuccess() {
        this.thyCopied.emit({ isSuccess: true, event });
        switch (this.thyCopyFeedbackMode) {
            case ThyCopyFeedbackMode.notify:
                this.thyShowNotify && this.notifyService.success(this.thyCopySuccessText);
                break;
            case ThyCopyFeedbackMode.replace:
                this.setFeedbackIcon(ThyCopyFeedbackMode.replace);
            case ThyCopyFeedbackMode.append:
                this.setFeedbackIcon();
                break;
        }
    }

    handleCopyError() {
        this.thyCopied.emit({ isSuccess: false, event });
        if (this.thyCopyFeedbackMode === ThyCopyFeedbackMode.notify && this.thyShowNotify) {
            this.notifyService.error('复制失败');
        }
    }

    private getFeedbackComponent(): HTMLElement {
        const copySuccessComponent = this.renderer.createElement('div');
        copySuccessComponent.className = 'thy-copy-success';

        const innerDiv = this.renderer.createElement('div');
        innerDiv.className = 'thy-copy-success-inner';

        this.renderer.appendChild(copySuccessComponent, innerDiv);

        return copySuccessComponent;
    }

    private setFeedbackIcon(mode: ThyCopyFeedbackMode = ThyCopyFeedbackMode.append) {
        if (mode === ThyCopyFeedbackMode.replace) {
            // 隐藏宿主元素
            this.renderer.setStyle(this.hostComponent, 'display', 'none');
            this.renderer.appendChild(this.hostComponent, this.successComponent);
        } else {
            // 添加成功图标
            this.renderer.appendChild(this.hostComponent.parentNode, this.successComponent);
        }

        timer(0).subscribe(() => {
            this.renderer.addClass(this.successComponent, 'thy-copy-success-show');
        });

        timer(this.thyCopyFeedbackDuration).subscribe(() => {
            if (mode === ThyCopyFeedbackMode.replace) {
                // 显示宿主元素
                this.renderer.setStyle(this.hostComponent, 'display', '');
            }

            // 移除成功图标
            this.renderer.removeClass(this.successComponent, 'thy-copy-success-show');
            this.renderer.removeChild(this.hostComponent.parentNode, this.successComponent);
        });
    }

    ngOnDestroy() {
        this.tooltipService.detach();
    }
}
