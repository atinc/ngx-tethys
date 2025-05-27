import { Directive, ElementRef, HostListener, OnDestroy, OnInit, Signal, inject, input, output } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { coerceElement } from '@angular/cdk/coercion';
import { ThyNotifyService } from 'ngx-tethys/notify';
import { ThyTooltipDirective } from 'ngx-tethys/tooltip';
import { coerceBooleanProperty } from 'ngx-tethys/util';
import { injectLocale, ThyCopyLocale } from 'ngx-tethys/i18n';

export interface ThyCopyEvent {
    isSuccess: boolean;
    event: Event;
}

/**
 * @name thyCopy
 */
@Directive({
    selector: '[thyCopy]',
    hostDirectives: [ThyTooltipDirective]
})
export class ThyCopyDirective implements OnInit, OnDestroy {
    private document = inject(DOCUMENT);
    tooltipDirective = inject(ThyTooltipDirective);
    private notifyService = inject(ThyNotifyService);
    private locale: Signal<ThyCopyLocale> = injectLocale('copy');

    /**
     * 默认为点击标签，可传复制目标标签
     */
    readonly thyCopy = output<ThyCopyEvent>();

    /**
     * 复制成功时的文案
     */
    readonly thyCopySuccessText = input<string>(this.locale().success);

    /**
     * 提示文案
     */
    readonly thyCopyTips = input<string>(this.locale().tips);

    /**
     * 偏移量
     */
    readonly thyCopyTipsOffset = input<number>(undefined);

    /**
     * 当为 string 时，复制的是传入的内容；当为 ElementRef | HTMLElement 时，复制的是 dom 节点的 value 或者 textContent
     */
    readonly thyCopyContent = input<string | ElementRef | HTMLElement>(undefined);

    /**
     * 是否展示通知
     */
    readonly thyShowNotify = input(true, { transform: coerceBooleanProperty });

    ngOnInit() {
        const thyCopyTips = this.thyCopyTips();
        this.tooltipDirective.setContent(thyCopyTips ? thyCopyTips : this.locale().tips);
        this.tooltipDirective.setOffset(this.thyCopyTipsOffset());
    }

    private getContent(event: Event) {
        const thyCopyContent = this.thyCopyContent();
        if (typeof thyCopyContent === 'string') {
            return thyCopyContent;
        } else {
            const target = thyCopyContent ? coerceElement(thyCopyContent) : event.target;
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
            if (this.thyShowNotify()) {
                this.notifyService.success(this.thyCopySuccessText());
            }
        } catch (err) {
            this.thyCopy.emit({ isSuccess: false, event });
            if (this.thyShowNotify()) {
                this.notifyService.error(this.locale().error);
            }
        } finally {
            textarea.remove();
        }
    }

    ngOnDestroy() {
        this.tooltipDirective.hide();
    }
}
