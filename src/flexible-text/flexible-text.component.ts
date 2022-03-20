import { Component, Input, TemplateRef, ElementRef, OnInit, ViewContainerRef, OnDestroy, AfterContentInit, NgZone } from '@angular/core';
import { from, Subject, Subscription } from 'rxjs';
import { TooltipService } from 'ngx-tethys/tooltip';
import { UpdateHostClassService } from 'ngx-tethys/core';
import { ContentObserver } from '@angular/cdk/observers';
import { debounceTime, take, takeUntil } from 'rxjs/operators';
import { ThyPlacement } from 'ngx-tethys/core';
import { isUndefinedOrNull } from 'ngx-tethys/util';

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

    containerClass: string;

    subscription: Subscription | null = null;

    @Input('thyTooltipTrigger') trigger: 'hover' | 'focus' | 'click';

    @Input('thyContainerClass')
    get thyContainerClass(): string {
        return this.containerClass;
    }

    set thyContainerClass(value: string) {
        this.containerClass = value;
        this.updateContainerClass();
    }

    @Input('thyTooltipContent') set thyContent(value: string | TemplateRef<HTMLElement>) {
        this.content = value;
        if (this.tooltipService.thyTooltipDirective) {
            this.tooltipService.thyTooltipDirective.content = this.content;
        }
    }

    @Input('thyTooltipPlacement') set thyPlacement(value: ThyPlacement) {
        this.placement = value;
        if (this.tooltipService.thyTooltipDirective) {
            this.tooltipService.thyTooltipDirective.placement = this.placement;
        }
    }

    private destroy$ = new Subject<void>();

    constructor(
        private elementRef: ElementRef,
        private viewContainerRef: ViewContainerRef,
        public tooltipService: TooltipService,
        private updateHostClassService: UpdateHostClassService,
        private contentObserver: ContentObserver,
        private ngZone: NgZone
    ) {
        this.updateHostClassService.initializeElement(this.elementRef);
    }

    ngOnInit() {
        this.updateContainerClass();
        this.tooltipService.attach(this.elementRef, this.viewContainerRef, this.trigger);
        if (this.placement) {
            this.tooltipService.thyTooltipDirective.placement = this.placement;
        }
        this.tooltipService.thyTooltipDirective.content = this.content;
        this.tooltipService.thyTooltipDirective.thyTooltipDisabled = true;
    }

    ngAfterContentInit() {
        // Note: the zone may be nooped through `BootstrapOptions` when bootstrapping the root module. This means
        // the `onStable` will never emit any value.
        const onStable$ = this.ngZone.isStable ? from(Promise.resolve()) : this.ngZone.onStable.pipe(take(1));
        // Normally this isn't in the zone, but it can cause performance regressions for apps
        // using `zone-patch-rxjs` because it'll trigger a change detection when it unsubscribes.
        this.ngZone.runOutsideAngular(() => {
            // Wait for the next time period to avoid blocking the js thread.
            onStable$.pipe(takeUntil(this.destroy$)).subscribe(() => {
                this.applyOverflow();

                this.contentObserver
                    .observe(this.elementRef)
                    .pipe(debounceTime(100), takeUntil(this.destroy$))
                    .subscribe(() => {
                        this.applyOverflow();
                    });
            });
        });
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.tooltipService.detach();
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

    updateContainerClass() {
        const containerClass = isUndefinedOrNull(this.containerClass) ? 'flexible-text-container' : this.containerClass;
        const flexibleTextClass = {
            'text-truncate': true,
            [containerClass]: containerClass !== ''
        };
        this.updateHostClassService.updateClassByMap(flexibleTextClass);
    }
}
