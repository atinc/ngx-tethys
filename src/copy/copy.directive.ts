import { InputBoolean } from 'ngx-tethys/core';
import { ThyNotifyService } from 'ngx-tethys/notify';
import { TooltipService } from 'ngx-tethys/tooltip';

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
    ViewContainerRef
} from '@angular/core';

export interface ThyCopyEvent {
    isSuccess: boolean;
    event: Event;
}

@Directive({
    selector: '[thyCopy]',
    providers: [TooltipService]
})
export class ThyCopyDirective implements OnInit, OnDestroy {
    // 默认为点击标签，可传复制目标标签
    @Output() thyCopy = new EventEmitter<ThyCopyEvent>();

    @Input() thyCopySuccessText = '复制成功';

    @Input() thyCopyTips = '点击复制';

    /**
     *  偏移量
     * @default 4
     */
    @Input() thyCopyTipsOffset: number;

    @Input() thyCopyContent: string | ElementRef | HTMLElement;

    @Input() @InputBoolean() thyShowNotify = true;

    constructor(
        @Inject(DOCUMENT) private document: any,
        public tooltipService: TooltipService,
        private elementRef: ElementRef<HTMLElement>,
        private viewContainerRef: ViewContainerRef,
        private notifyService: ThyNotifyService
    ) {}

    ngOnInit() {
        this.tooltipService.attach(this.elementRef, this.viewContainerRef, 'hover');
        this.tooltipService.thyTooltipDirective.content = this.thyCopyTips ? this.thyCopyTips : '点击复制';
        this.tooltipService.thyTooltipDirective.tooltipOffset = this.thyCopyTipsOffset;
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
        this.tooltipService.detach();
    }
}
