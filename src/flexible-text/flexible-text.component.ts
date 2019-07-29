import {
    Component,
    Input,
    TemplateRef,
    ElementRef,
    OnInit,
    ViewContainerRef,
    OnDestroy,
    AfterContentInit
} from '@angular/core';
import { timer, Subject, Subscription } from 'rxjs';
import { TooltipService } from '../tooltip/tooltip.service';
import { UpdateHostClassService } from '../shared/update-host-class.service';
import { ContentObserver } from '@angular/cdk/observers';
import { debounceTime } from 'rxjs/operators';
import { ThyPlacement } from '../core/overlay';

@Component({
    selector: 'thy-flexible-text,[thyFlexibleText]',
    exportAs: 'thyFlexibleText',
    templateUrl: './flexible-text.component.html',
    providers: [TooltipService, UpdateHostClassService]
})
export class ThyFlexibleTextComponent implements OnInit, AfterContentInit, OnDestroy {
    isOverflow = false;

    content: string | TemplateRef<HTMLElement>;

    placement: ThyPlacement;

    subscription: Subscription | null = null;

    @Input('thyTooltipTrigger') trigger: 'hover' | 'focus' | 'click';

    @Input('thyTooltipContent') set thyContent(value: string | TemplateRef<HTMLElement>) {
        this.content = value;
        if (this.tooltipService.thyTooltipDirective) {
            this.tooltipService.thyTooltipDirective.thyContent = this.content;
        }
    }

    @Input('thyTooltipPlacement') set thyPlacement(value: ThyPlacement) {
        this.placement = value;
        if (this.tooltipService.thyTooltipDirective) {
            this.tooltipService.thyTooltipDirective.placement = this.placement;
        }
    }

    constructor(
        private elementRef: ElementRef,
        private viewContainerRef: ViewContainerRef,
        public tooltipService: TooltipService,
        private updateHostClassService: UpdateHostClassService,
        private contentObserver: ContentObserver
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

    ngAfterContentInit() {
        this.subscription = this.contentObserver
            .observe(this.elementRef)
            .pipe(debounceTime(100))
            .subscribe((value: MutationRecord[]) => {
                this.applyOverflow();
            });
    }

    ngOnDestroy() {
        this.tooltipService.detach();
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    applyOverflow() {
        const nativeElement = this.elementRef.nativeElement;
        if (nativeElement.clientWidth < nativeElement.scrollWidth) {
            this.isOverflow = true;
        } else {
            this.isOverflow = false;
        }
        this.tooltipService.thyTooltipDirective.thyTooltipDisabled = !this.isOverflow;
    }
}
