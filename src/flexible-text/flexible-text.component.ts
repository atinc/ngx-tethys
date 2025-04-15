import { ContentObserver } from '@angular/cdk/observers';
import {
    AfterContentInit,
    Component,
    ElementRef,
    Input,
    NgZone,
    OnDestroy,
    OnInit,
    TemplateRef,
    numberAttribute,
    inject
} from '@angular/core';
import { ThyPlacement } from 'ngx-tethys/core';
import { ThyTooltipDirective } from 'ngx-tethys/tooltip';
import { isUndefinedOrNull } from 'ngx-tethys/util';
import { useHostRenderer } from '@tethys/cdk/dom';
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
    hostDirectives: [ThyTooltipDirective]
})
export class ThyFlexibleText implements OnInit, AfterContentInit, OnDestroy {
    private elementRef = inject(ElementRef);
    private contentObserver = inject(ContentObserver);
    private ngZone = inject(NgZone);
    tooltipDirective = inject(ThyTooltipDirective);

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
    @Input('thyTooltipTrigger') trigger: 'hover' | 'focus' | 'click';

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
        if (this.tooltipDirective) {
            this.tooltipDirective.content = this.content;
        }
    }

    /**
     * tooltip 的提示位置
     * @type top | bottom | left | right
     * @default top
     */
    @Input('thyTooltipPlacement') set thyPlacement(value: ThyPlacement) {
        this.placement = value;
        if (this.tooltipDirective) {
            this.tooltipDirective.placement = this.placement;
        }
    }

    /**
     * tooltip 偏移量
     */
    @Input({ alias: 'thyTooltipOffset', transform: numberAttribute }) set thyOffset(value: number) {
        this.offset = value;
        if (this.tooltipDirective) {
            this.tooltipDirective.tooltipOffset = this.offset;
        }
    }

    private destroy$ = new Subject<void>();

    private hostRenderer = useHostRenderer();

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
        if (this.placement) {
            this.tooltipDirective.placement = this.placement;
        }
        if (this.offset) {
            this.tooltipDirective.tooltipOffset = this.offset;
        }
        if (this.trigger) {
            this.tooltipDirective.trigger = this.trigger;
        }
        this.tooltipDirective.content = this.content;
        this.tooltipDirective.thyTooltipDisabled = true;
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

                ThyFlexibleText.createResizeObserver(this.elementRef.nativeElement)
                    .pipe(debounceTime(100), takeUntil(this.destroy$))
                    .subscribe(() => {
                        this.applyOverflow();
                    });
            });
        });
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.tooltipDirective.hide();
    }

    applyOverflow() {
        const nativeElement = this.elementRef.nativeElement;
        if (nativeElement.clientWidth < nativeElement.scrollWidth || nativeElement.clientHeight < nativeElement.scrollHeight) {
            this.isOverflow = true;
        } else {
            this.isOverflow = false;
        }
        this.tooltipDirective.thyTooltipDisabled = !this.isOverflow;
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
