import { Directive, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { coerceElement } from '@angular/cdk/coercion';
import { ThyNotifyService } from 'ngx-tethys/notify';
import { ThyTooltipDirective } from 'ngx-tethys/tooltip';
import { coerceBooleanProperty } from 'ngx-tethys/util';
import { ThyI18nService } from 'ngx-tethys/i18n';

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
    private document = inject(DOCUMENT);
    tooltipDirective = inject(ThyTooltipDirective);
    private notifyService = inject(ThyNotifyService);
    private i18n = inject(ThyI18nService);

    /**
     * 默认为点击标签，可传复制目标标签
     */
    @Output() thyCopy = new EventEmitter<ThyCopyEvent>();

    /**
     * 复制成功时的文案
     * @default 复制成功
     */
    @Input() thyCopySuccessText = '';

    /**
     * 提示文案
     * @default 点击复制
     */
    @Input() thyCopyTips = '';

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

    ngOnInit() {
        this.tooltipDirective.content = this.thyCopyTips ? this.thyCopyTips : this.i18n.translate('copy.tips');
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
                this.notifyService.success(this.thyCopySuccessText || this.i18n.translate('copy.success'));
            }
        } catch (err) {
            this.thyCopy.emit({ isSuccess: false, event });
            if (this.thyShowNotify) {
                this.notifyService.error(this.i18n.translate('copy.error'));
            }
        } finally {
            textarea.remove();
        }
    }

    ngOnDestroy() {
        this.tooltipDirective.hide();
    }
}
