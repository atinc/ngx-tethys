import { TemplateRef, Input, ElementRef, ViewContainerRef } from '@angular/core';
import { ThyTooltipPlacement } from '../tooltip/interface';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { TooltipService } from '../tooltip/tooltip.service';

export class FlexibleTextBase {
    isOverflow = false;

    private $subject: Subject<boolean>;

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

    constructor(public tooltipService: TooltipService) {}

    init(elementRef: ElementRef, viewContainerRef: ViewContainerRef) {
        const nativeElement = elementRef.nativeElement;
        this.$subject = new Subject<boolean>();
        this.$subject.pipe(debounceTime(1000)).subscribe(() => {
            if (nativeElement.clientWidth < nativeElement.scrollWidth) {
                this.isOverflow = true;
            } else {
                this.isOverflow = false;
            }
            this.tooltipService.thyTooltipDirective.thyTooltipDisabled = !this.isOverflow;
        });

        this.tooltipService.attach(elementRef, viewContainerRef, this.trigger);
        if (this.placement) {
            this.tooltipService.thyTooltipDirective.placement = this.placement;
        }
        this.tooltipService.thyTooltipDirective.thyContent = this.content;
        this.tooltipService.thyTooltipDirective.thyTooltipDisabled = true;
        this.$subject.next(true);
    }

    applyOverflow() {
        if (this.$subject) {
            this.$subject.next();
        }
    }
}
