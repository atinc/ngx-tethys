import { Directive, ElementRef, EventEmitter, HostListener, Inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { coerceElement } from '@angular/cdk/coercion';
import { ThyNotifyService } from 'ngx-tethys/notify';
import { ThyTooltipDirective } from 'ngx-tethys/tooltip';
import { coerceBooleanProperty } from 'ngx-tethys/util';

export interface ThyCopyEvent {
    isSuccess: boolean;
    event: Event;
}

/**
 * @name thyCopy
 */
@Directive({
    selector: '[thyCopy]',
    hostDirectives: [ThyTooltipDirective],
    standalone: true
})
export class ThyCopyDirective implements OnInit, OnDestroy {
    /**
     * 默认为点击标签，可传复制目标标签
     */
    @Output() thyCopy = new EventEmitter<ThyCopyEvent>();

    /**
     * 复制成功时的文案
     */
    @Input() thyCopySuccessText = '复制成功';

    /**
     * 提示文案
     */
    @Input() thyCopyTips = '点击复制';

    /**
     * 偏移量
     */
    @Input() thyCopyTipsOffset: number;

    /**
     * 当为 string 时，复制的是传入的内容；当为 ElementRef | HTMLElement 时，复制的是 dom 节点的 value 或者 textContent
     */
    @Input() thyCopyContent: string | ElementRef | HTMLElement;

    /**
     * 是否展示通知
     */
    @Input({ transform: coerceBooleanProperty }) thyShowNotify = true;

    constructor(
        @Inject(DOCUMENT) private document: any,
        public tooltipDirective: ThyTooltipDirective,
        private notifyService: ThyNotifyService
    ) {}

    ngOnInit() {
        this.tooltipDirective.content = this.thyCopyTips ? this.thyCopyTips : '点击复制';
        this.tooltipDirective.tooltipOffset = this.thyCopyTipsOffset;
    }

    private getContent(event: Event) {
        if (typeof this.thyCopyContent === 'string') {
            return this.thyCopyContent;
        } else {
            const target = this.thyCopyContent ? coerceElement(this.thyCopyContent) : event.target;
            return target.value || target.textContent;
        }
    }

    @HostListener('click', ['$event'])
    public onClick(event: Event) {
        const textarea = this.document.createElement('textarea');
        this.document.body.appendChild(textarea);
        textarea.value = this.getContent(event);
        textarea.select();
        try {
            document.execCommand('copy', false, null);
            this.thyCopy.emit({ isSuccess: true, event });
            if (this.thyShowNotify) {
                this.notifyService.success(this.thyCopySuccessText);
            }
        } catch (err) {
            this.thyCopy.emit({ isSuccess: false, event });
            if (this.thyShowNotify) {
                this.notifyService.error('复制失败');
            }
        } finally {
            textarea.remove();
        }
    }

    ngOnDestroy() {
        this.tooltipDirective.hide();
    }
}
