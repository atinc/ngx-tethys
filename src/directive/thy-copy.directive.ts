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

    @Input('thyCopyContent') thyCopyContent: string | ElementRef | HTMLElement;

    constructor(
        @Inject(DOCUMENT) private document: any,
        private tooltipService: TooltipService,
        private elementRef: ElementRef<HTMLElement>,
        private viewContainerRef: ViewContainerRef
    ) {}

    ngOnInit() {
        this.tooltipService.attach(this.elementRef, this.viewContainerRef, 'hover');
        this.tooltipService.thyTooltipDirective.thyContent = '点击复制';
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
        const input = this.document.createElement('input');
        this.document.body.appendChild(input);
        input.value = this.getContent(event);
        input.select();
        try {
            document.execCommand('copy', false, null);
            this.thyCopy.emit({ isSuccess: true, event });
        } catch (err) {
            this.thyCopy.emit({ isSuccess: false, event });
        } finally {
            input.remove();
        }
    }

    ngOnDestroy() {
        this.tooltipService.detach();
    }
}
