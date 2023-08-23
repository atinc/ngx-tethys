import { FocusMonitor } from '@angular/cdk/a11y';
import { OverlayRef } from '@angular/cdk/overlay';
import { Platform, normalizePassiveListenerOptions } from '@angular/cdk/platform';
import { ChangeDetectorRef, ElementRef, NgZone } from '@angular/core';
import { SafeAny } from 'ngx-tethys/types';
import { Subject, fromEvent } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

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

        if (this.longPressTimeoutId) {
            clearTimeout(this.longPressTimeoutId);
        }
    }

    private touchStartTime: number;

    private longPressTimeoutId: number | null | SafeAny;

    private isTouchMoving: boolean = false;

    constructor(
        elementRef: ElementRef,
        platform: Platform,
        focusMonitor: FocusMonitor,
        ngZone: NgZone,
        overlayPin?: boolean,
        changeDetectorRef?: ChangeDetectorRef
    ) {
        this.elementRef = elementRef;
        this.platform = platform;
        this.focusMonitor = focusMonitor;
        this.ngZone = ngZone;
        this.overlayPin = overlayPin;
        this.changeDetectorRef = changeDetectorRef;
    }

    initialize() {
        this.initialized = true;
        const element: HTMLElement = this.elementRef.nativeElement;
        if (!this.platform.IOS && !this.platform.ANDROID) {
            if (this.trigger === 'hover') {
                this.manualListeners
                    .set('mouseenter', () => {
                        this.show();
                    })
                    .set('mouseleave', (event: MouseEvent) => {
                        // Delay 100ms to avoid the overlay being closed immediately when the cursor is moved to the overlay container
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
                        } else {
                            this.ngZone.run(() => this.show());
                        }
                    });
                // this.manualListeners.set('focus', () => this.show());
                // this.manualListeners.set('blur', () => this.hide());
            } else if (this.trigger === 'click') {
                this.manualListeners.set('click', () => {
                    this.show();
                });
            } else if (typeof ngDevMode === 'undefined' || ngDevMode) {
                throw new Error(`${this.trigger} is not supporteed, possible values are: hover | focus | click.`);
            }
        } else {
            const touchendListener = () => {
                const touchEndTime = Date.now();
                const touchDuration = touchEndTime - this.touchStartTime;

                if (touchDuration < longPressTime && !this.isTouchMoving) {
                    // tap
                    this.handleTouch();
                }

                clearTimeout(this.longPressTimeoutId);
                this.isTouchMoving = false;
            };
            // Reserve extensions for mobile in the future
            this.manualListeners
                .set('touchend', touchendListener)
                .set('touchcancel', touchendListener)
                .set('touchmove', () => {
                    this.isTouchMoving = true;
                    clearTimeout(this.longPressTimeoutId);
                })
                .set('touchstart', () => {
                    this.touchStartTime = Date.now();
                    this.isTouchMoving = false;

                    // 设置一个定时器，如果在一定时间内没有触发 touchend 事件，则判断为长按
                    this.longPressTimeoutId = setTimeout(() => {
                        // long press
                        if (!this.isTouchMoving) {
                            this.handleTouch();
                        }
                    }, longPressTime);
                });
        }

        this.manualListeners.forEach((listener, event) =>
            // Note: since Chrome 56 defaults document level `touchstart` listener to passive.
            // Element touch listeners are not passive by default.
            // We never call `preventDefault()` on events, so we're safe making them passive.
            element.addEventListener(event, listener, passiveEventListenerOptions)
        );
    }

    private handleTouch() {
        this.show();

        if (this.isAutoCloseOnMobileTouch) {
            setTimeout(() => {
                this.hide(0);
            }, this.touchendHideDelay + this.showDelay);
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
    }
}
