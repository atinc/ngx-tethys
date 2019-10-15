import {
    Directive,
    ElementRef,
    ViewContainerRef,
    NgZone,
    Input,
    OnInit,
    OnDestroy,
    TemplateRef,
    Inject
} from '@angular/core';
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
import { ThyTooltipOptions, DEFAULT_TOOLTIP_OPTIONS } from './interface';
import { inputValueToBoolean, isString } from '../util/helpers';
import { ComponentPortal } from '@angular/cdk/portal';
import { ThyTooltipComponent } from './tooltip.component';
import { getFlexiblePositions, ThyPlacement, ThyOverlayDirectiveBase } from '../core/overlay';
import { fromEvent } from 'rxjs';
import { FocusMonitor } from '@angular/cdk/a11y';
import { THY_TOOLTIP_DEFAULT_CONFIG_TOKEN, ThyTooltipConfig } from './tooltip.config';

@Directive({
    selector: '[thyTooltip],[thy-tooltip]',
    exportAs: 'thyTooltip'
})
export class ThyTooltipDirective extends ThyOverlayDirectiveBase implements OnInit, OnDestroy {
    private options: ThyTooltipOptions = DEFAULT_TOOLTIP_OPTIONS;
    private tooltipInstance: ThyTooltipComponent;
    private portal: ComponentPortal<ThyTooltipComponent>;
    private scrollStrategy: ScrollStrategy;
    private tooltipClass: string | string[];

    content: string | TemplateRef<HTMLElement>;

    panelClassPrefix = 'thy-tooltip';

    @Input('thyTooltip') set thyContent(value: string | TemplateRef<HTMLElement>) {
        this.content = value && isString(value) ? `${value}`.trim() : value;
    }

    // tslint:disable-next-line:no-input-rename
    @Input('thyTooltipPlacement') placement: ThyPlacement = 'top';

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

    @Input('thyTooltipOffset') tooltipOffset: number;

    @Input('thyTooltipPin') tooltipPin: boolean;

    private detach() {
        if (this.overlayRef && this.overlayRef.hasAttached()) {
            this.overlayRef.detach();
        }

        this.tooltipInstance = null;
    }

    /** Create the overlay config and position strategy */
    createOverlay(): OverlayRef {
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
            panelClass: this.thyTooltipConfig.tooltipPanelClass,
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
        const connectionPositions = getFlexiblePositions(
            this.placement,
            this.tooltipOffset || this.thyTooltipConfig.offset,
            this.panelClassPrefix
        );
        position.withPositions(connectionPositions);
    }

    private setTooltipClass(tooltipClass: string | string[]) {
        if (this.tooltipInstance) {
            this.tooltipInstance.setTooltipClass(tooltipClass);
        }
    }

    constructor(
        private overlay: Overlay,
        elementRef: ElementRef<HTMLElement>,
        private scrollDispatcher: ScrollDispatcher,
        private viewContainerRef: ViewContainerRef,
        ngZone: NgZone,
        platform: Platform,
        focusMonitor: FocusMonitor,
        @Inject(THY_TOOLTIP_DEFAULT_CONFIG_TOKEN)
        private thyTooltipConfig: ThyTooltipConfig
    ) {
        super(elementRef, platform, focusMonitor, ngZone);

        this.tooltipPin = this.thyTooltipConfig.tooltipPin;
        this.options = DEFAULT_TOOLTIP_OPTIONS;
        this.scrollStrategy = overlay.scrollStrategies.reposition({
            scrollThrottle: this.thyTooltipConfig.scrollThrottleSeconds
        });
    }

    ngOnInit() {
        this.initialize();
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
        this.dispose();
        if (this.overlayRef) {
            this.tooltipInstance = null;
        }
    }
}
