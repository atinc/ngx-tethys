import { Component, Input, TemplateRef, ElementRef, OnInit, ViewContainerRef, OnDestroy } from '@angular/core';
import { ThyTooltipPlacement } from '../tooltip';
import { timer, Subject } from 'rxjs';
import { TooltipService } from '../tooltip/tooltip.service';
import { UpdateHostClassService } from '../shared/update-host-class.service';

@Component({
    selector: 'thy-flexible-text,[thyFlexibleText]',
    exportAs: 'thyFlexibleText',
    templateUrl: './flexible-text.component.html',
    providers: [TooltipService, UpdateHostClassService]
})
export class ThyFlexibleTextComponent implements OnInit, OnDestroy {
    isOverflow = false;

    content: string | TemplateRef<HTMLElement>;

    placement: ThyTooltipPlacement;

    @Input('thyTooltipTrigger') trigger: 'hover' | 'focus' | 'click';

    @Input('thyTooltipContent') set thyContent(value: string | TemplateRef<HTMLElement>) {
        this.content = value;
        this.applyOverflow();
        if (this.tooltipService.thyTooltipDirective) {
            this.tooltipService.thyTooltipDirective.thyContent = this.content;
        }
    }

    @Input('thyTooltipPlacement') set thyPlacement(value: ThyTooltipPlacement) {
        this.placement = value;
        if (this.tooltipService.thyTooltipDirective) {
            this.tooltipService.thyTooltipDirective.placement = this.placement;
        }
    }

    constructor(
        private elementRef: ElementRef,
        private viewContainerRef: ViewContainerRef,
        public tooltipService: TooltipService,
        private updateHostClassService: UpdateHostClassService
    ) {}

    ngOnInit() {
        this.updateHostClassService.initializeElement(this.elementRef);
        this.updateHostClassService.addClass('flexible-text-container');

        this.tooltipService.attach(this.elementRef, this.viewContainerRef, this.trigger);
        if (this.placement) {
            this.tooltipService.thyTooltipDirective.placement = this.placement;
        }
        this.tooltipService.thyTooltipDirective.thyContent = this.content;
        this.tooltipService.thyTooltipDirective.thyTooltipDisabled = true;
    }

    ngOnDestroy() {
        this.tooltipService.detach();
    }

    applyOverflow() {
        timer(200).subscribe(() => {
            const nativeElement = this.elementRef.nativeElement;
            if (nativeElement.clientWidth < nativeElement.scrollWidth) {
                this.isOverflow = true;
            } else {
                this.isOverflow = false;
            }
            this.tooltipService.thyTooltipDirective.thyTooltipDisabled = !this.isOverflow;
        });
    }
}
