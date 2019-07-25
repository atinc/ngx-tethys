import { Directive, ElementRef, OnInit, HostListener, Input, Inject, ViewContainerRef, OnDestroy } from '@angular/core';

import { coerceElement } from '@angular/cdk/coercion';
import { DOCUMENT } from '@angular/common';
import { TooltipService } from '../tooltip/tooltip.service';

@Directive({
    selector: '[thyCopy]',
    providers: [TooltipService]
})
export class ThyCopyDirective implements OnInit, OnDestroy {
    // 默认为点击标签，可传复制目标标签
    @Input('thyCopy') targetElement: ElementRef | HTMLElement;

    @Input('thyCopyContent') content: string;

    constructor(
        @Inject(DOCUMENT) private document: any,
        private tooltipService: TooltipService,
        private elementRef: ElementRef<HTMLElement>,
        private viewContainerRef: ViewContainerRef
    ) {}

    ngOnInit() {
        this.tooltipService.attach(this.elementRef, this.viewContainerRef, 'click');
        this.tooltipService.thyTooltipDirective.thyContent = '点击复制';
    }

    @HostListener('click', ['$event'])
    public onClick(event: Event) {
        const target = this.targetElement ? coerceElement(this.targetElement) : event.target;
        const input = this.document.createElement('input');
        this.document.body.appendChild(input);
        input.value = this.content || target.value || target.textContent;
        input.select();
        if (this.document.execCommand && document.execCommand('copy', false, null)) {
            this.tooltipService.thyTooltipDirective.thyContent = '复制成功';
        } else {
            this.tooltipService.thyTooltipDirective.thyContent = '复制失败';
        }
        input.remove();
        setTimeout(() => {
            this.tooltipService.thyTooltipDirective.hide();
        }, 2000);
    }

    ngOnDestroy() {
        this.tooltipService.detach();
    }
}
