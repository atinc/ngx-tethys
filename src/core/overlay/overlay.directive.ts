import { FocusMonitor } from '@angular/cdk/a11y';
import { OverlayRef } from '@angular/cdk/overlay';
import { Platform, normalizePassiveListenerOptions } from '@angular/cdk/platform';
import { ChangeDetectorRef, ElementRef, NgZone } from '@angular/core';
import { SafeAny } from 'ngx-tethys/types';
import { isNumber } from 'ngx-tethys/util';
import { Subject, fromEvent } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { OverlayEventDelegationService } from './overlay-event-delegation.service';

export type ThyOverlayTrigger = 'hover' | 'focus' | 'click';

const passiveEventListenerOptions = normalizePassiveListenerOptions({ passive: true });

const longPressTime = 500;

export abstract class ThyOverlayDirectiveBase {
    protected elementRef: ElementRef;
    private initialized = false;
    /** Trigger Overlay */
    protected _trigger: ThyOverlayTrigger = 'click';
    public get trigger() {
        return this._trigger;
    }
    public set trigger(value: ThyOverlayTrigger) {
        this._trigger = value;
        // Trigger reinitialize when trigger changed which can't contain first
        if (this.initialized) {
            this.clearEventListeners();
            this.initialize();
        }
    }

    protected overlayRef: OverlayRef;
    protected manualListeners = new Map<string, EventListenerOrEventListenerObject>();
    protected ngUnsubscribe$ = new Subject<void>();
    protected focusMonitor: FocusMonitor;
    protected platform: Platform;
    protected ngZone: NgZone;
    protected showDelay? = 100;
    protected hideDelay? = 100;
    protected touchendHideDelay? = 0;
    protected disabled = false;
    protected showTimeoutId: number | null | SafeAny;
    protected hideTimeoutId: number | null | SafeAny;
    protected changeDetectorRef: ChangeDetectorRef;
    protected isAutoCloseOnMobileTouch: boolean = false;

    /**
     * The overlay keep opened when the mouse moves to the overlay container
     */
    protected overlayPin: boolean;

    /** create overlay, you can use popover service or overlay*/
    // abstract createOverlay(): OverlayRef;

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

    private eventDelegationService?: OverlayEventDelegationService;

    constructor(
        elementRef: ElementRef,
        platform: Platform,
        focusMonitor: FocusMonitor,
        ngZone: NgZone,
        overlayPin?: boolean,
        changeDetectorRef?: ChangeDetectorRef,
        eventDelegationService?: OverlayEventDelegationService
    ) {
        this.elementRef = elementRef;
        this.platform = platform;
        this.focusMonitor = focusMonitor;
        this.ngZone = ngZone;
        this.overlayPin = overlayPin;
        this.changeDetectorRef = changeDetectorRef;
        this.eventDelegationService = eventDelegationService;
    }

    initialize() {
        this.initialized = true;

        // Use global event delegation if available; otherwise, fallback to per-instance listeners
        if (this.eventDelegationService) {
            this.eventDelegationService.register(this);
            return;
        }

        // Fallback to legacy event handling for backward compatibility
        this.initializeLegacyEventHandling();
    }

    private initializeLegacyEventHandling() {
        const element: HTMLElement = this.elementRef.nativeElement;

        if (!this.platform.IOS && !this.platform.ANDROID) {
            if (this.trigger === 'hover') {
                this.manualListeners
                    .set('mouseenter', () => {
                        this.show();
                    })
                    .set('mouseleave', (event: MouseEvent) => {
                        this.hide();
                        const overlayElement: HTMLElement = this.overlayRef && this.overlayRef.overlayElement;
                        if (overlayElement && this.overlayPin) {
                            fromEvent(overlayElement, 'mouseenter')
                                .pipe(take(1))
                                .subscribe(() => {
                                    this.clearTimer();
                                    fromEvent(overlayElement, 'mouseleave')
                                        .pipe(take(1))
                                        .subscribe(() => {
                                            this.hide();
                                        });
                                });
                        }
                        if (!this.overlayRef) {
                            this.clearTimer();
                        }
                    });
            } else if (this.trigger === 'focus') {
                this.focusMonitor
                    .monitor(this.elementRef)
                    .pipe(takeUntil(this.ngUnsubscribe$))
                    .subscribe(origin => {
                        if (!origin) {
                            this.ngZone.run(() => this.hide(0));
                        } else {
                            this.ngZone.run(() => this.show());
                        }
                    });
            } else if (this.trigger === 'click') {
                this.manualListeners.set('click', () => {
                    this.show();
                });
            } else if (typeof ngDevMode === 'undefined' || ngDevMode) {
                throw new Error(`${this.trigger} is not supported, possible values are: hover | focus | click.`);
            }
        } else {
            // Mobile touch handling for legacy mode
            this.initializeMobileTouchHandling();
        }

        this.manualListeners.forEach((listener, event) =>
            // Note: since Chrome 56 defaults document level `touchstart` listener to passive.
            // Element touch listeners are not passive by default.
            // We never call `preventDefault()` on events, so we're safe making them passive.
            element.addEventListener(event, listener, passiveEventListenerOptions)
        );
    }

    private initializeMobileTouchHandling() {
        let touchStartTime: number;
        let longPressTimeoutId: number | null | SafeAny;
        let isTouchMoving: boolean = false;

        const touchendListener = () => {
            const touchEndTime = Date.now();
            const touchDuration = touchEndTime - touchStartTime;

            if (touchDuration < longPressTime && !isTouchMoving) {
                this.handleTouch();
            }

            clearTimeout(longPressTimeoutId);
            isTouchMoving = false;
        };

        this.manualListeners
            .set('touchend', touchendListener)
            .set('touchcancel', touchendListener)
            .set('touchmove', () => {
                isTouchMoving = true;
                clearTimeout(longPressTimeoutId);
            })
            .set('touchstart', () => {
                touchStartTime = Date.now();
                isTouchMoving = false;

                longPressTimeoutId = setTimeout(() => {
                    if (!isTouchMoving) {
                        this.handleTouch();
                    }
                }, longPressTime);
            });
    }

    private handleTouch() {
        this.show();

        if (this.isAutoCloseOnMobileTouch) {
            setTimeout(
                () => {
                    this.hide(0);
                },
                this.touchendHideDelay + (isNumber(this.showDelay) ? this.showDelay : 0)
            );
        }
    }

    /**
     * Marks that the overlay needs to be checked in the next change detection run.
     * Mainly used for rendering before positioning a overlay, which
     * can be problematic in components with OnPush change detection.
     */
    markForCheck() {
        this.changeDetectorRef?.markForCheck();
    }

    dispose(): void {
        this.ngUnsubscribe$.next();
        this.ngUnsubscribe$.complete();
        if (this.overlayRef) {
            this.overlayRef.dispose();
        }
        this.clearEventListeners();
        this.clearTimer();

        if (this.eventDelegationService) {
            this.eventDelegationService.unregister(this);
        }
    }

    // Methods for global event delegation
    public getHostElement(): HTMLElement {
        return this.elementRef.nativeElement as HTMLElement;
    }

    onHostMouseEnter() {
        if (this.trigger !== 'hover') return;
        this.show();
    }

    onHostMouseLeave() {
        if (this.trigger !== 'hover') return;
        // Delay hide to allow moving to overlay when pinned
        this.hide();
        const overlayElement: HTMLElement = this.overlayRef && (this.overlayRef.overlayElement as HTMLElement);
        if (overlayElement && this.overlayPin) {
            fromEvent(overlayElement, 'mouseenter')
                .pipe(take(1))
                .subscribe(() => {
                    this.clearTimer();
                    fromEvent(overlayElement, 'mouseleave')
                        .pipe(take(1))
                        .subscribe(() => {
                            this.hide();
                        });
                });
        }
        if (!this.overlayRef) {
            this.clearTimer();
        }
    }

    onHostClick() {
        if (this.trigger !== 'click') return;
        this.show();
    }

    onHostFocusIn() {
        if (this.trigger !== 'focus') return;
        this.show();
    }

    onHostFocusOut() {
        if (this.trigger !== 'focus') return;
        this.hide(0);
    }

    onHostTouch() {
        this.handleTouch();
    }
}
