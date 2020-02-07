import {
    Directive,
    ElementRef,
    OnInit,
    HostListener,
    Input,
    Inject,
    ViewContainerRef,
    OnDestroy,
    Output,
    EventEmitter
} from '@angular/core';

import { coerceElement } from '@angular/cdk/coercion';
import { DOCUMENT } from '@angular/common';
import { TooltipService } from '../tooltip/tooltip.service';
import { ThyNotifyService } from '../notify';

export interface ThyCopyEvent {
    isSuccess: boolean;
    event: Event;
}

@Directive({
    selector: '[thyCopy]',
    providers: [TooltipService, ThyNotifyService]
})
export class ThyCopyDirective implements OnInit, OnDestroy {
    // 默认为点击标签，可传复制目标标签
    @Output() thyCopy = new EventEmitter<ThyCopyEvent>();

    @Input() thyCopySuccessText = '复制成功';

    @Input() thyCopyContent: string | ElementRef | HTMLElement;

    constructor(
        @Inject(DOCUMENT) private document: any,
        private tooltipService: TooltipService,
        private elementRef: ElementRef<HTMLElement>,
        private viewContainerRef: ViewContainerRef,
        private notifyService: ThyNotifyService
    ) {}

    ngOnInit() {
        this.tooltipService.attach(this.elementRef, this.viewContainerRef, 'hover');
        this.tooltipService.thyTooltipDirective.content = '点击复制';
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
            this.notifyService.success(this.thyCopySuccessText);
        } catch (err) {
            this.thyCopy.emit({ isSuccess: false, event });
            this.notifyService.error('复制失败');
        } finally {
            textarea.remove();
        }
    }

    ngOnDestroy() {
        this.tooltipService.detach();
    }
}
