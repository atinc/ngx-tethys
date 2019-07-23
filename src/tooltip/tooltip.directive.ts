import { Directive, ElementRef, ViewContainerRef, NgZone, Input, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import {
    Overlay,
    ScrollDispatcher,
    OverlayRef,
    ScrollStrategy,
    FlexibleConnectedPositionStrategy,
    OriginConnectionPosition,
    OverlayConnectionPosition,
    HorizontalConnectionPos,
    VerticalConnectionPos,
    ConnectedOverlayPositionChange
} from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import { takeUntil, take } from 'rxjs/operators';

import { MixinBase, mixinUnsubscribe } from '../core/behaviors';
import { ThyTooltipOptions, DEFAULT_TOOLTIP_OPTIONS, ThyTooltipPosition, ThyTooltipPlacement } from './interface';
import { inputValueToBoolean, isString } from '../util/helpers';
import { ComponentPortal } from '@angular/cdk/portal';
import { ThyTooltipComponent } from './tooltip.component';
import { getFlexiblePosition, getKeyByPosition } from '../core/overlay/overlay-opsition-map';
import { fromEvent } from 'rxjs';
import { FocusMonitor } from '@angular/cdk/a11y';

const TOOLTIP_PANEL_CLASS = 'thy-tooltip-panel';
const SCROLL_THROTTLE_MS = 20;

@Directive({
    selector: '[thyTooltip],[thy-tooltip]',
    exportAs: 'thyTooltip'
})
export class ThyTooltipDirective extends mixinUnsubscribe(MixinBase) implements OnInit, OnDestroy {
    private manualListeners = new Map<string, EventListenerOrEventListenerObject>();
    private options: ThyTooltipOptions = DEFAULT_TOOLTIP_OPTIONS;
    private overlayRef: OverlayRef;
    private tooltipInstance: ThyTooltipComponent;
    private portal: ComponentPortal<ThyTooltipComponent>;
    private scrollStrategy: ScrollStrategy;
    private disabled = false;
    private tooltipClass: string | string[];

    content: string | TemplateRef<HTMLElement>;

    @Input('thyTooltip') set thyContent(value: string | TemplateRef<HTMLElement>) {
        this.content = value && isString(value) ? `${value}`.trim() : value;
    }

    // tslint:disable-next-line:no-input-rename
    @Input('thyTooltipPlacement') placement: ThyTooltipPlacement = 'top';

    @Input('thyTooltipClass')
    set thyTooltipClass(value: string | string[]) {
        this.tooltipClass = value;
        if (this.tooltipInstance) {
            this.setTooltipClass(this.tooltipClass);
        }
    }

    // tslint:disable-next-line:no-input-rename
    @Input('thyTooltipShowDelay') showDelay = this.options.showDelay;

    // tslint:disable-next-line:no-input-rename
    @Input('thyTooltipHideDelay') hideDelay = this.options.hideDelay;

    // tslint:disable-next-line:no-input-rename
    @Input('thyTooltipTrigger') trigger: 'hover' | 'focus' | 'click' = 'hover';

    /** Disables the display of the tooltip. */
    @Input('thyTooltipDisabled')
    set thyTooltipDisabled(value: boolean) {
        this.disabled = inputValueToBoolean(value);
        // If tooltip is disabled, hide immediately.
        if (this.disabled) {
            this.hide(0);
        }
    }

    @Input('thyTooltipTemplateContext') data: any;

    private detach() {
        if (this.overlayRef && this.overlayRef.hasAttached()) {
            this.overlayRef.detach();
        }

        this.tooltipInstance = null;
    }

    /** Create the overlay config and position strategy */
    private createOverlay(): OverlayRef {
        if (this.overlayRef) {
            return this.overlayRef;
        }

        const scrollableAncestors = this.scrollDispatcher.getAncestorScrollContainers(this.elementRef);

        // Create connected position strategy that listens for scroll events to reposition.
        const strategy = this.overlay
            .position()
            .flexibleConnectedTo(this.elementRef)
            .withTransformOriginOn('.thy-tooltip-content')
            .withFlexibleDimensions(false)
            .withViewportMargin(8);

        strategy.withScrollableContainers(scrollableAncestors);

        strategy.positionChanges.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(change => {
            if (this.tooltipInstance) {
                if (change.scrollableViewProperties.isOverlayClipped && this.tooltipInstance.isVisible()) {
                    // After position changes occur and the overlay is clipped by
                    // a parent scrollable then close the tooltip.
                    this.ngZone.run(() => this.hide(0));
                }
            }
        });

        this.overlayRef = this.overlay.create({
            positionStrategy: strategy,
            panelClass: TOOLTIP_PANEL_CLASS,
            scrollStrategy: this.scrollStrategy,
            hasBackdrop: this.trigger === 'click',
            backdropClass: 'thy-tooltip-backdrop'
        });

        this.updatePosition();

        this.overlayRef
            .detachments()
            .pipe(takeUntil(this.ngUnsubscribe$))
            .subscribe(() => this.detach());

        this.overlayRef.backdropClick().subscribe(() => {
            this.overlayRef.detachBackdrop();
            this.hide();
        });

        return this.overlayRef;
    }

    private updateTooltipContent() {
        // Must wait for the message to be painted to the tooltip so that the overlay can properly
        // calculate the correct positioning based on the size of the text.
        if (this.tooltipInstance) {
            this.tooltipInstance.content = this.content;
            this.tooltipInstance.data = this.data;
            this.tooltipInstance.markForCheck();

            this.ngZone.onMicrotaskEmpty
                .asObservable()
                .pipe(
                    take(1),
                    takeUntil(this.ngUnsubscribe$)
                )
                .subscribe(() => {
                    if (this.tooltipInstance) {
                        this.overlayRef.updatePosition();
                    }
                });
        }
    }

    /** Returns true if the tooltip is currently visible to the user */
    private isTooltipVisible(): boolean {
        return !!this.tooltipInstance && this.tooltipInstance.isVisible();
    }

    /** Updates the position of the current tooltip. */
    private updatePosition() {
        const position = this.overlayRef.getConfig().positionStrategy as FlexibleConnectedPositionStrategy;
        const connectionPosition = getFlexiblePosition(this.placement);
        position.withPositions(connectionPosition ? connectionPosition : getFlexiblePosition('top'));
        position.positionChanges.subscribe((positionChange: ConnectedOverlayPositionChange) => {
            const changedPlacement = getKeyByPosition(positionChange.connectionPair);
            this.tooltipInstance.placement = changedPlacement;
        });
    }

    private setTooltipClass(tooltipClass: string | string[]) {
        if (this.tooltipInstance) {
            this.tooltipInstance.setTooltipClass(tooltipClass);
        }
    }

    constructor(
        private overlay: Overlay,
        private elementRef: ElementRef<HTMLElement>,
        private scrollDispatcher: ScrollDispatcher,
        private viewContainerRef: ViewContainerRef,
        private ngZone: NgZone,
        private platform: Platform,
        private focusMonitor: FocusMonitor
    ) {
        super();
        this.options = DEFAULT_TOOLTIP_OPTIONS;
        this.scrollStrategy = overlay.scrollStrategies.reposition({ scrollThrottle: SCROLL_THROTTLE_MS });
    }

    ngOnInit() {
        const element: HTMLElement = this.elementRef.nativeElement;
        if (!this.platform.IOS && !this.platform.ANDROID) {
            if (this.trigger === 'hover') {
                let overlayElement: HTMLElement;
                this.manualListeners
                    .set('mouseenter', () => {
                        this.show();
                    })
                    .set('mouseleave', (event: MouseEvent) => {
                        // element which mouse moved to
                        const toElement = event.toElement || event.relatedTarget;
                        if (this.overlayRef && !overlayElement) {
                            overlayElement = this.overlayRef.overlayElement;
                            fromEvent(overlayElement, 'mouseleave')
                                .pipe(takeUntil(this.ngUnsubscribe$))
                                .subscribe(() => {
                                    this.hide();
                                });
                        }
                        // if element which moved to is in overlayElement, don't hide tooltip
                        if (overlayElement && overlayElement.contains) {
                            const toElementIsTooltip = overlayElement.contains(toElement as Element);
                            if (!toElementIsTooltip) {
                                this.hide();
                            }
                        }
                    });
            } else if (this.trigger === 'focus') {
                this.focusMonitor
                    .monitor(this.elementRef)
                    .pipe(takeUntil(this.ngUnsubscribe$))
                    .subscribe(origin => {
                        // Note that the focus monitor runs outside the Angular zone.
                        if (!origin) {
                            this.ngZone.run(() => this.hide(0));
                        } else if (origin === 'keyboard') {
                            this.ngZone.run(() => this.show());
                        }
                    });
                // this.manualListeners.set('focus', () => this.show());
                // this.manualListeners.set('blur', () => this.hide());
            } else if (this.trigger === 'click') {
                this.manualListeners.set('click', () => this.show());
            } else {
                throw new Error(`${this.trigger} is not support, only support hover | focus | click`);
            }
        } else {
            // Reserve extensions for mobile in the future
            this.manualListeners.set('touchstart', () => this.show());
        }

        this.manualListeners.forEach((listener, event) => element.addEventListener(event, listener));
    }

    /** Shows the tooltip after the delay in ms, defaults to tooltip-delay-show 200ms */
    show(delay: number = this.showDelay): void {
        if (
            this.disabled ||
            !this.content ||
            (this.isTooltipVisible() && !this.tooltipInstance.showTimeoutId && !this.tooltipInstance.hideTimeoutId)
        ) {
            return;
        }

        const overlayRef = this.createOverlay();

        this.detach();
        this.portal = this.portal || new ComponentPortal(ThyTooltipComponent, this.viewContainerRef);
        this.tooltipInstance = overlayRef.attach(this.portal).instance;
        this.tooltipInstance.placement = this.placement;
        this.tooltipInstance
            .afterHidden()
            .pipe(takeUntil(this.ngUnsubscribe$))
            .subscribe(() => this.detach());
        this.setTooltipClass(this.tooltipClass);
        this.updateTooltipContent();
        this.tooltipInstance.show(delay);
    }

    /** Hides the tooltip after the delay in ms, defaults to tooltip-delay-hide 100ms */
    hide(delay: number = this.hideDelay): void {
        if (this.tooltipInstance) {
            this.tooltipInstance.hide(delay);
        }
    }

    ngOnDestroy() {
        if (this.overlayRef) {
            this.overlayRef.dispose();
            this.tooltipInstance = null;
        }

        super.ngOnDestroy();
        this.manualListeners.forEach((listener, event) => {
            this.elementRef.nativeElement.removeEventListener(event, listener);
        });
        this.manualListeners.clear();
        this.focusMonitor.stopMonitoring(this.elementRef);
    }
}
