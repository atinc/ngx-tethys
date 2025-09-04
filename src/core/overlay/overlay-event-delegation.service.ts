import { Platform, normalizePassiveListenerOptions } from '@angular/cdk/platform';
import { Injectable, NgZone } from '@angular/core';

const passiveEventListenerOptions = normalizePassiveListenerOptions({ passive: true });

const LONG_PRESS_TIME = 500;

type OverlayTrigger = 'hover' | 'focus' | 'click';

interface DelegatedOverlayInstance {
    trigger: OverlayTrigger;
    getHostElement(): HTMLElement;
    onHostMouseEnter(): void;
    onHostMouseLeave(): void;
    onHostClick(): void;
    onHostFocusIn(): void;
    onHostFocusOut(): void;
    onHostTouch(): void;
}

@Injectable({ providedIn: 'root' })
export class OverlayEventDelegationService {
    private elementToInstance = new WeakMap<HTMLElement, DelegatedOverlayInstance>();
    private registeredInstances = new Set<DelegatedOverlayInstance>();

    // Touch state management
    private touchState = new Map<
        DelegatedOverlayInstance,
        {
            startTime: number;
            isMoving: boolean;
            timeoutId: number | null;
        }
    >();

    private initialized = false;

    constructor(
        private ngZone: NgZone,
        private platform: Platform
    ) {}

    register(instance: DelegatedOverlayInstance) {
        const element = instance.getHostElement();
        this.elementToInstance.set(element, instance);
        this.registeredInstances.add(instance);
        this.ensureListeners();
    }

    unregister(instance: DelegatedOverlayInstance) {
        const element = instance.getHostElement();
        this.elementToInstance.delete(element);
        this.registeredInstances.delete(instance);

        // Clean up touch state
        const touchData = this.touchState.get(instance);
        if (touchData?.timeoutId) {
            clearTimeout(touchData.timeoutId);
        }
        this.touchState.delete(instance);
    }

    private ensureListeners() {
        if (this.initialized) {
            return;
        }
        this.initialized = true;

        this.ngZone.runOutsideAngular(() => {
            const doc = document;

            // Use event delegation for all event types
            doc.addEventListener('mouseover', this.handleMouseOver, passiveEventListenerOptions);
            doc.addEventListener('mouseout', this.handleMouseOut, passiveEventListenerOptions);
            doc.addEventListener('click', this.handleClick, passiveEventListenerOptions);
            doc.addEventListener('focusin', this.handleFocusIn, true);
            doc.addEventListener('focusout', this.handleFocusOut, true);

            // Touch events for mobile devices
            if (this.platform.IOS || this.platform.ANDROID) {
                doc.addEventListener('touchstart', this.handleTouchStart, passiveEventListenerOptions);
                doc.addEventListener('touchmove', this.handleTouchMove, passiveEventListenerOptions);
                doc.addEventListener('touchend', this.handleTouchEnd, passiveEventListenerOptions);
                doc.addEventListener('touchcancel', this.handleTouchEnd, passiveEventListenerOptions);
            }
        });
    }

    private findInstanceFromTarget = (target: EventTarget | null): DelegatedOverlayInstance | null => {
        let node: any = target as HTMLElement | null;
        while (node && node !== document) {
            const instance = this.elementToInstance.get(node);
            if (instance) {
                return instance;
            }
            node = node.parentElement;
        }
        return null;
    };

    private isRelatedOutside = (related: EventTarget | null, host: HTMLElement): boolean => {
        if (!related || !(related instanceof Node)) {
            return true;
        }
        return !host.contains(related as Node);
    };

    // Optimized event handlers with better performance
    private handleMouseOver = (event: MouseEvent) => {
        const instance = this.findInstanceFromTarget(event.target);
        if (!instance || instance.trigger !== 'hover') {
            return;
        }

        const host = instance.getHostElement();
        if (this.isRelatedOutside(event.relatedTarget, host)) {
            this.ngZone.run(() => instance.onHostMouseEnter());
        }
    };

    private handleMouseOut = (event: MouseEvent) => {
        const instance = this.findInstanceFromTarget(event.target);
        if (!instance || instance.trigger !== 'hover') {
            return;
        }

        const host = instance.getHostElement();
        if (this.isRelatedOutside(event.relatedTarget, host)) {
            this.ngZone.run(() => instance.onHostMouseLeave());
        }
    };

    private handleClick = (event: MouseEvent) => {
        const instance = this.findInstanceFromTarget(event.target);
        if (!instance || instance.trigger !== 'click') {
            return;
        }

        this.ngZone.run(() => instance.onHostClick());
    };

    private handleFocusIn = (event: FocusEvent) => {
        const instance = this.findInstanceFromTarget(event.target);
        if (!instance || instance.trigger !== 'focus') {
            return;
        }

        this.ngZone.run(() => instance.onHostFocusIn());
    };

    private handleFocusOut = (event: FocusEvent) => {
        const instance = this.findInstanceFromTarget(event.target);
        if (!instance || instance.trigger !== 'focus') {
            return;
        }

        const host = instance.getHostElement();
        const related = event.relatedTarget as Node | null;
        if (related && host.contains(related)) {
            return;
        }

        this.ngZone.run(() => instance.onHostFocusOut());
    };

    private handleTouchStart = (event: TouchEvent) => {
        const instance = this.findInstanceFromTarget(event.target);
        if (!instance) {
            return;
        }

        const touchData = {
            startTime: Date.now(),
            isMoving: false,
            timeoutId: null as number | null
        };

        this.touchState.set(instance, touchData);

        touchData.timeoutId = setTimeout(() => {
            if (!touchData.isMoving) {
                this.ngZone.run(() => instance.onHostTouch());
            }
        }, LONG_PRESS_TIME) as unknown as number;
    };

    private handleTouchMove = (event: TouchEvent) => {
        // Find the instance for this touch event
        const instance = this.findInstanceFromTarget(event.target);
        if (!instance) {
            return;
        }

        const touchData = this.touchState.get(instance);
        if (touchData) {
            touchData.isMoving = true;
            if (touchData.timeoutId) {
                clearTimeout(touchData.timeoutId);
                touchData.timeoutId = null;
            }
        }
    };

    private handleTouchEnd = (event: TouchEvent) => {
        const instance = this.findInstanceFromTarget(event.target);
        if (!instance) {
            return;
        }

        const touchData = this.touchState.get(instance);
        if (!touchData) {
            return;
        }

        const duration = Date.now() - touchData.startTime;

        if (duration < LONG_PRESS_TIME && !touchData.isMoving) {
            this.ngZone.run(() => instance.onHostTouch());
        }

        if (touchData.timeoutId) {
            clearTimeout(touchData.timeoutId);
        }
        this.touchState.delete(instance);
    };

    // Cleanup method for service destruction
    destroy() {
        this.registeredInstances.forEach(instance => {
            this.unregister(instance);
        });
        this.registeredInstances.clear();
        this.elementToInstance = new WeakMap();
        this.touchState.clear();
        this.initialized = false;
    }
}
