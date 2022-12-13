import { ContentObserver } from '@angular/cdk/observers';
import { AfterContentInit, Component, ElementRef, Input, NgZone, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { ThyPlacement, UpdateHostClassService } from 'ngx-tethys/core';
import { TooltipService } from 'ngx-tethys/tooltip';
import { isUndefinedOrNull } from 'ngx-tethys/util';
import { from, Observable, Subject, Subscription } from 'rxjs';
import { debounceTime, take, takeUntil } from 'rxjs/operators';

/**
 * 文本提示组件，支持组件 thy-flexible-text 和指令 [thyFlexibleText] 两种方式
 * @name thy-flexible-text,[thyFlexibleText]
 */
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

    /**
     * 触发提示方式，hover, focus, click
     * @default hover
     */
    @Input('thyTooltipTrigger') trigger: 'hover' | 'focus' | 'click';

    /**
     * 自定义class类，如果不设置默认会包含flexible-text-container
     */
    @Input('thyContainerClass')
    get thyContainerClass(): string {
        return this.containerClass;
    }

    set thyContainerClass(value: string) {
        this.containerClass = value;
        this.updateContainerClass();
    }

    /**
     * 需要展示的全部内容
     * @type string | TemplateRef<HTMLElement>
     */
    @Input('thyTooltipContent') set thyContent(value: string | TemplateRef<HTMLElement>) {
        this.content = value;
        if (this.tooltipService.thyTooltipDirective) {
            this.tooltipService.thyTooltipDirective.content = this.content;
        }
    }

    /**
     * tooltip 的提示位置，top | bottom | left | right
     * @default top
     */
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

    static createResizeObserver(element: HTMLElement) {
        return new Observable(observer => {
            const resize = new ResizeObserver(entries => {
                observer.next(entries);
            });
            resize.observe(element);
            return () => {
                resize.disconnect();
            };
        });
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
                this.contentObserver
                    .observe(this.elementRef)
                    .pipe(debounceTime(100), takeUntil(this.destroy$))
                    .subscribe(() => {
                        this.applyOverflow();
                    });

                ThyFlexibleTextComponent.createResizeObserver(this.elementRef.nativeElement)
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
        if (nativeElement.clientWidth < nativeElement.scrollWidth || nativeElement.clientHeight < nativeElement.scrollHeight) {
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
