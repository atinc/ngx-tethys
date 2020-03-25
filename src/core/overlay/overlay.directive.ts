import { OnDestroy, ElementRef, NgZone } from '@angular/core';
import { OverlayRef } from '@angular/cdk/overlay';
import { Subject, fromEvent } from 'rxjs';
import { Platform } from '@angular/cdk/platform';
import { FocusMonitor } from '@angular/cdk/a11y';
import { takeUntil } from 'rxjs/operators';

export type ThyOverlayTrigger = 'hover' | 'focus' | 'click';

export abstract class ThyOverlayDirectiveBase {
    protected elementRef: ElementRef;
    private initialized = false;
    /** Trigger Overlay */
    private _trigger: ThyOverlayTrigger = 'click';
    protected get trigger() {
        return this._trigger;
    }
    protected set trigger(value: ThyOverlayTrigger) {
        this._trigger = value;
        // Trigger reinitialize when trigger changed which can't contain first
        if (this.initialized) {
            this.clearEventListeners();
            this.initialize();
        }
    }

    protected overlayRef: OverlayRef;
    protected manualListeners = new Map<string, EventListenerOrEventListenerObject>();
    protected ngUnsubscribe$ = new Subject();
    protected focusMonitor: FocusMonitor;
    protected platform: Platform;
    protected ngZone: NgZone;
    protected showDelay? = 0;
    protected hideDelay? = 0;
    protected touchendHideDelay? = 0;
    protected disabled = false;
    protected showTimeoutId: number | null | any;
    protected hideTimeoutId: number | null | any;

    abstract tooltipPin: boolean;
    /** create overlay, you can use popover service or overlay*/
    abstract createOverlay(): OverlayRef;
    abstract show(delay?: number): void;
    abstract hide(delay?: number): void;

    private clearEventListeners() {
        this.manualListeners.forEach((listener, event) => {
            this.elementRef.nativeElement.removeEventListener(event, listener);
        });
        this.manualListeners.clear();
        this.focusMonitor.stopMonitoring(this.elementRef);
    }

    private clearTimer() {
        if (this.showTimeoutId) {
            clearTimeout(this.showTimeoutId);
        }
        if (this.hideTimeoutId) {
            clearTimeout(this.hideTimeoutId);
        }
    }

    constructor(elementRef: ElementRef, platform: Platform, focusMonitor: FocusMonitor, ngZone: NgZone) {
        this.elementRef = elementRef;
        this.platform = platform;
        this.focusMonitor = focusMonitor;
        this.ngZone = ngZone;
    }

    initialize() {
        this.initialized = true;
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
                        const toElement = event['toElement'] || event.relatedTarget;
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
                            if (!toElementIsTooltip || !this.tooltipPin) {
                                this.hide();
                            }
                        }

                        // if showDelay is too long and mouseleave immediately, overlayRef is not exist, we should clearTimeout
                        if (!this.overlayRef) {
                            this.clearTimer();
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
            const touchendListener = () => {
                // this.hide(this.touchendHideDelay);
                setTimeout(() => {
                    this.hide();
                }, this.touchendHideDelay);
            };
            // Reserve extensions for mobile in the future
            this.manualListeners
                .set('touchend', touchendListener)
                .set('touchcancel', touchendListener)
                .set('touchstart', () => {
                    this.show();
                });
        }

        this.manualListeners.forEach((listener, event) => element.addEventListener(event, listener));
    }

    dispose(): void {
        this.ngUnsubscribe$.next();
        this.ngUnsubscribe$.complete();
        if (this.overlayRef) {
            this.overlayRef.dispose();
        }
        this.clearEventListeners();
        this.clearTimer();
    }
}
