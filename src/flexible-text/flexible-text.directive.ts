import { OnInit, Directive, ElementRef, ViewContainerRef, OnDestroy, Input, TemplateRef } from '@angular/core';
import { TooltipService } from '../tooltip/tooltip.service';
import { UpdateHostClassService } from '../shared';
import { ThyTooltipPlacement } from '../tooltip/interface';
import { FlexibleTextBase } from './flexible-text.base';

@Directive({
    selector: '[thyFlexibleText]',
    providers: [TooltipService, UpdateHostClassService]
})
export class ThyFlexibleTextDirective extends FlexibleTextBase implements OnInit, OnDestroy {
    constructor(
        private elementRef: ElementRef,
        private viewContainerRef: ViewContainerRef,
        public tooltipService: TooltipService,
        private updateHostClassService: UpdateHostClassService
    ) {
        super(tooltipService);
    }
    ngOnInit() {
        this.init(this.elementRef, this.viewContainerRef);
        this.updateHostClassService.initializeElement(this.elementRef);
        this.updateHostClassService.addClass('flexible-text-container');
    }

    ngOnDestroy() {
        this.tooltipService.detach();
    }
}
