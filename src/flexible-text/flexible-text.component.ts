import { ContentObserver } from '@angular/cdk/observers';
import { AfterContentInit, Component, ElementRef, Input, NgZone, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { InputNumber, ThyPlacement } from 'ngx-tethys/core';
import { ThyTooltipDirective, ThyTooltipService } from 'ngx-tethys/tooltip';
import { isUndefinedOrNull } from 'ngx-tethys/util';
import { useHostRenderer } from '@tethys/cdk/dom';
import { from, Observable, Subject, Subscription } from 'rxjs';
import { debounceTime, take, takeUntil } from 'rxjs/operators';
import { Platform } from '@angular/cdk/platform';
import { FocusMonitor } from '@angular/cdk/a11y';

/**
 * 文本提示组件，支持组件 thy-flexible-text 和指令 [thyFlexibleText] 两种方式
 * @name thy-flexible-text,[thyFlexibleText]
 */
@Component({
    selector: 'thy-flexible-text,[thyFlexibleText]',
    exportAs: 'thyFlexibleText',
    templateUrl: './flexible-text.component.html',
    providers: [ThyTooltipService],
    standalone: true
})
export class ThyFlexibleTextComponent implements OnInit, AfterContentInit, OnDestroy {
    isOverflow = false;

    content: string | TemplateRef<HTMLElement>;

    placement: ThyPlacement;

    containerClass: string;

    subscription: Subscription | null = null;

    offset: number;

    /**
     * 触发提示方式
     * @type hover | focus | click
     * @default hover
     */
    @Input('thyTooltipTrigger') trigger: 'hover' | 'focus' | 'click' = 'hover';

    /**
     * 自定义class类，如果不设置默认会包含 `flexible-text-container`
     */
    @Input('thyContainerClass')
    set thyContainerClass(value: string) {
        this.containerClass = value;
        this.updateContainerClass();
    }

    get thyContainerClass(): string {
        return this.containerClass;
    }

    /**
     * 需要展示的全部内容
     * @type string | TemplateRef<HTMLElement>
     */
    @Input('thyTooltipContent') set thyContent(value: string | TemplateRef<HTMLElement>) {
        this.content = value;
        if (this.thyTooltipDirective) {
            this.thyTooltipDirective.content = this.content;
        }
    }

    /**
     * tooltip 的提示位置
     * @type top | bottom | left | right
     * @default top
     */
    @Input('thyTooltipPlacement') set thyPlacement(value: ThyPlacement) {
        this.placement = value;
        if (this.thyTooltipDirective) {
            this.thyTooltipDirective.placement = this.placement;
        }
    }

    /**
     * tooltip 偏移量
     */
    @Input('thyTooltipOffset') @InputNumber() set thyOffset(value: number) {
        this.offset = value;
        if (this.thyTooltipDirective) {
            this.thyTooltipDirective.tooltipOffset = this.offset;
        }
    }

    thyTooltipDirective: ThyTooltipDirective;

    private destroy$ = new Subject<void>();

    private hostRenderer = useHostRenderer();

    constructor(
        private elementRef: ElementRef,
        private viewContainerRef: ViewContainerRef,
        private contentObserver: ContentObserver,
        private ngZone: NgZone,
        private platform: Platform,
        private focusMonitor: FocusMonitor,
        public thyTooltipService: ThyTooltipService
    ) {}

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
        this.attachTooltip();
    }

    attachTooltip() {
        this.thyTooltipDirective = new ThyTooltipDirective(
            this.elementRef,
            this.ngZone,
            this.platform,
            this.focusMonitor,
            this.viewContainerRef,
            this.thyTooltipService
        );
        if (this.placement) {
            this.thyTooltipDirective.placement = this.placement;
        }
        if (this.offset) {
            this.thyTooltipDirective.tooltipOffset = this.offset;
        }
        this.thyTooltipDirective.thyTooltipDisabled = true;
        this.thyTooltipDirective.content = this.content;

        this.thyTooltipDirective.trigger = this.trigger;

        this.thyTooltipDirective.ngOnInit();
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
        this.thyTooltipDirective.ngOnDestroy();
    }

    applyOverflow() {
        const nativeElement = this.elementRef.nativeElement;
        if (nativeElement.clientWidth < nativeElement.scrollWidth || nativeElement.clientHeight < nativeElement.scrollHeight) {
            this.isOverflow = true;
        } else {
            this.isOverflow = false;
        }
        this.thyTooltipDirective.thyTooltipDisabled = !this.isOverflow;
    }

    updateContainerClass() {
        const containerClass = isUndefinedOrNull(this.containerClass) ? 'flexible-text-container' : this.containerClass;
        const flexibleTextClass = {
            'text-truncate': true,
            [containerClass]: containerClass !== ''
        };
        this.hostRenderer.updateClassByMap(flexibleTextClass);
    }
}
