import { ContentObserver } from '@angular/cdk/observers';
import {
    AfterContentInit,
    Component,
    ElementRef,
    NgZone,
    OnDestroy,
    TemplateRef,
    numberAttribute,
    inject,
    input,
    effect
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
export class ThyFlexibleText implements AfterContentInit, OnDestroy {
    private elementRef = inject(ElementRef);
    private contentObserver = inject(ContentObserver);
    private ngZone = inject(NgZone);
    tooltipDirective = inject(ThyTooltipDirective);

    isOverflow = false;

    subscription: Subscription | null = null;

    /**
     * 触发提示方式
     * @type hover | focus | click
     * @default hover
     */
    readonly trigger = input<'hover' | 'focus' | 'click'>(undefined, { alias: 'thyTooltipTrigger' });

    /**
     * 自定义class类，如果不设置默认会包含 `flexible-text-container`
     */
    readonly thyContainerClass = input<string>();

    /**
     * 需要展示的全部内容
     * @type string | TemplateRef<HTMLElement>
     */
    readonly thyTooltipContent = input<string | TemplateRef<HTMLElement>>();

    /**
     * tooltip 的提示位置
     * @type top | bottom | left | right
     * @default top
     */
    readonly thyTooltipPlacement = input<ThyPlacement>();

    /**
     * tooltip 偏移量
     */
    readonly thyTooltipOffset = input<number, unknown>(undefined, { transform: numberAttribute });

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

    constructor() {
        effect(() => {
            this.updateContainerClass();
        });
        effect(() => {
            const content = this.thyTooltipContent();
            if (this.tooltipDirective && content) {
                this.tooltipDirective.setContent(content);
            }
        });
        effect(() => {
            const placement = this.thyTooltipPlacement();
            if (this.tooltipDirective && placement) {
                this.tooltipDirective.setPlacement(placement);
            }
        });
        effect(() => {
            const offset = this.thyTooltipOffset();
            if (this.tooltipDirective && !isUndefinedOrNull(offset)) {
                this.tooltipDirective.setOffset(offset);
            }
        });
        effect(() => {
            const trigger = this.trigger();
            if (this.tooltipDirective && trigger) {
                this.tooltipDirective.trigger = trigger;
            }
        });
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
        this.tooltipDirective.setDisabled(!this.isOverflow);
    }

    updateContainerClass() {
        const containerClass = isUndefinedOrNull(this.thyContainerClass()) ? 'flexible-text-container' : this.thyContainerClass()!;
        const flexibleTextClass = { 'text-truncate': true, [containerClass]: containerClass !== '' };
        this.hostRenderer.updateClassByMap(flexibleTextClass);
    }
}
