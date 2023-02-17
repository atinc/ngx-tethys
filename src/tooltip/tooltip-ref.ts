import { FlexibleConnectedPositionStrategy, Overlay, OverlayRef, ScrollDispatcher, ScrollStrategy } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ElementRef, NgZone, TemplateRef } from '@angular/core';
import { isUndefinedOrNull } from '@tethys/cdk/is';
import { getFlexiblePositions } from 'ngx-tethys/core';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { ThyTooltipContent } from './interface';
import { ThyTooltipComponent } from './tooltip.component';
import { ThyTooltipConfig } from './tooltip.config';

export class ThyTooltipRef {
    private overlayRef: OverlayRef;

    private tooltipInstance: ThyTooltipComponent;

    private scrollStrategy: ScrollStrategy;

    private portal: ComponentPortal<ThyTooltipComponent>;

    private dispose$ = new Subject<void>();

    constructor(
        private host: ElementRef<HTMLElement> | HTMLElement,
        private config: ThyTooltipConfig,
        private overlay: Overlay,
        private scrollDispatcher: ScrollDispatcher,
        private ngZone: NgZone
    ) {
        this.scrollStrategy = overlay.scrollStrategies.reposition({
            scrollThrottle: this.config.scrollThrottleSeconds
        });
    }

    /** Create the overlay config and position strategy */
    private createOverlay(): OverlayRef {
        if (this.overlayRef) {
            return this.overlayRef;
        }
        const scrollableAncestors = this.scrollDispatcher.getAncestorScrollContainers(this.host);
        // Create connected position strategy that listens for scroll events to reposition.
        const strategy = this.overlay
            .position()
            .flexibleConnectedTo(this.host)
            .withTransformOriginOn('.thy-tooltip-content')
            .withFlexibleDimensions(false)
            .withViewportMargin(8);

        strategy.withScrollableContainers(scrollableAncestors);
        strategy.positionChanges.pipe(takeUntil(this.dispose$)).subscribe(change => {
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
            panelClass: this.config.panelClass,
            scrollStrategy: this.scrollStrategy,
            hasBackdrop: this.config.hasBackdrop,
            backdropClass: 'thy-tooltip-backdrop'
        });

        this.updatePosition();

        this.overlayRef
            .detachments()
            .pipe(takeUntil(this.dispose$))
            .subscribe(() => this.detach());

        this.overlayRef
            .backdropClick()
            .pipe(takeUntil(this.dispose$))
            .subscribe(() => {
                this.overlayRef.detachBackdrop();
                this.hide(0);
            });

        return this.overlayRef;
    }

    /** Updates the position of the current tooltip. */
    private updatePosition() {
        const position = this.overlayRef.getConfig().positionStrategy as FlexibleConnectedPositionStrategy;
        const connectionPositions = getFlexiblePositions(this.config.placement, this.config.offset, 'thy-tooltip');
        position.withPositions(connectionPositions);
    }

    private detach() {
        if (this.overlayRef && this.overlayRef.hasAttached()) {
            this.overlayRef.detach();
        }
        this.tooltipInstance = null;
    }

    show(content: ThyTooltipContent, delay?: number): void {
        if (!content || (this.isTooltipVisible() && !this.tooltipInstance.showTimeoutId && !this.tooltipInstance.hideTimeoutId)) {
            return;
        }
        const overlayRef = this.createOverlay();
        this.detach();
        this.portal = this.portal || new ComponentPortal(ThyTooltipComponent, this.config.viewContainerRef);
        this.tooltipInstance = overlayRef.attach(this.portal).instance;
        this.tooltipInstance
            .afterHidden()
            .pipe(takeUntil(this.dispose$))
            .subscribe(() => this.detach());
        this.updateTooltipContent(content, this.config.initialState);
        this.setTooltipClass(this.config.contentClass);
        this.tooltipInstance.show(!isUndefinedOrNull(delay) ? delay : this.config.showDelay);
    }

    hide(delay: number = 0): void {
        if (this.tooltipInstance) {
            this.tooltipInstance.hide(!isUndefinedOrNull(delay) ? delay : this.config.hideDelay);
        }
    }

    getOverlayRef() {
        return this.overlayRef;
    }

    setTooltipClass(tooltipClass: string | string[]) {
        if (this.tooltipInstance) {
            this.tooltipInstance.setTooltipClass(tooltipClass);
        }
    }

    updateTooltipContent(content: string | TemplateRef<any>, data?: any) {
        // Must wait for the message to be painted to the tooltip so that the overlay can properly
        // calculate the correct positioning based on the size of the text.
        if (this.tooltipInstance) {
            this.tooltipInstance.content = content;
            this.tooltipInstance.data = data;
            this.tooltipInstance.markForCheck();

            this.ngZone.onMicrotaskEmpty
                .asObservable()
                .pipe(take(1), takeUntil(this.dispose$))
                .subscribe(() => {
                    if (this.tooltipInstance) {
                        this.overlayRef.updatePosition();
                    }
                });
        }
    }

    isTooltipVisible(): boolean {
        return !!this.tooltipInstance && this.tooltipInstance.isVisible();
    }

    dispose(): void {
        this.dispose$.next();
        this.dispose$.complete();
        this.hide(0);
        if (this.overlayRef) {
            this.overlayRef.dispose();
            this.tooltipInstance = null;
        }
    }
}
