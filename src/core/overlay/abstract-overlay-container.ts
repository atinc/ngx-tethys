import { Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { ChangeDetectorRef, ComponentRef, EmbeddedViewRef, EventEmitter } from '@angular/core';
import { reqAnimFrame } from '../request-animation';

import { ThyAbstractOverlayConfig, ThyAbstractOverlayOptions } from './abstract-overlay.config';
import {
    prefersReducedMotion,
    prepareOverlayEnter,
    ThyOverlayMotionPhase,
    ThyOverlayMotionSession
} from './overlay-motion';
import { ThyPortalOutlet } from './portal-directives';

export function throwPopoverContentAlreadyAttachedError(name: string) {
    throw Error(`Attempting to attach ${name} content after content is already attached`);
}

/**
 * Overlay container attach/close pipeline:
 * prepareHost → beforeAttachPortal → attach portal → afterAttachPortal (enter)
 * close → beforeDetachPortal → leave animation → motionPhaseChange `leave-active`
 */
export abstract class ThyAbstractOverlayContainer<TData = unknown> {
    id?: string;

    motionPhaseChange = new EventEmitter<ThyOverlayMotionPhase>();

    /** @deprecated Use {@link motionPhaseChange} instead. */
    get animationStateChanged(): EventEmitter<ThyOverlayMotionPhase> {
        return this.motionPhaseChange;
    }

    readonly animationOpeningDone: Observable<void>;

    readonly animationClosingDone: Observable<void>;

    containerDestroy = new Subject<void>();

    abstract config: ThyAbstractOverlayConfig<TData>;

    /**portal outlet */
    abstract portalOutlet: ThyPortalOutlet;

    /** Before attach content(TemplatePortal or ComponentPortal) portal to portalOutlet*/
    abstract beforeAttachPortal(): void;

    /** Before detach content*/
    beforeDetachPortal() {}

    /** After portal content is attached; default starts enter animation on next frame. */
    protected afterAttachPortal(): void {
        this.scheduleEnterAnimation(() => this.beginEnterAnimation());
    }

    protected animationHost?: HTMLElement;

    private readonly motionSession = new ThyOverlayMotionSession();

    constructor(
        private options: ThyAbstractOverlayOptions,
        protected changeDetectorRef: ChangeDetectorRef
    ) {
        this.animationOpeningDone = this.motionPhaseChange.pipe(
            filter(phase => phase === 'enter-active'),
            map(() => undefined)
        );
        this.animationClosingDone = this.motionPhaseChange.pipe(
            filter(phase => phase === 'leave-active'),
            map(() => undefined)
        );
    }

    protected isOverlayAnimationEnabled(): boolean {
        return this.options.animationEnabled && !prefersReducedMotion();
    }

    protected scheduleEnterAnimation(run: () => void): void {
        if (!this.isOverlayAnimationEnabled()) {
            run();
            return;
        }
        reqAnimFrame(run);
    }

    protected beginEnterAnimation(): void {
        const enabled = this.isOverlayAnimationEnabled();
        if (!this.animationHost) {
            if (enabled) {
                Promise.resolve().then(() => this.motionPhaseChange.emit('enter-active'));
            } else {
                this.motionPhaseChange.emit('enter-active');
            }
            return;
        }
        this.motionSession.enter(this.animationHost, enabled, phase => this.motionPhaseChange.emit(phase));
    }

    protected beginLeaveAnimation(): void {
        const enabled = this.isOverlayAnimationEnabled();
        if (!this.animationHost) {
            this.motionPhaseChange.emit('leave-start');
            if (enabled) {
                Promise.resolve().then(() => this.motionPhaseChange.emit('leave-active'));
            } else {
                this.motionPhaseChange.emit('leave-active');
            }
            return;
        }
        this.motionSession.leave(this.animationHost, enabled, phase => this.motionPhaseChange.emit(phase));
    }

    attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C> {
        return this.attachPortalContent(() => this.portalOutlet.attachTemplatePortal(portal));
    }

    attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
        return this.attachPortalContent(() => this.portalOutlet.attachComponentPortal(portal));
    }

    startExitAnimation() {
        this.beforeDetachPortal();
        this.beginLeaveAnimation();

        // Mark the container for check so it can react if the
        // view container is using OnPush change detection.
        this.changeDetectorRef.markForCheck();
    }

    destroy() {
        this.motionSession.cancel();
        this.containerDestroy.next();
    }

    private attachPortalContent<T>(attach: () => T): T {
        if (this.portalOutlet.hasAttached()) {
            throwPopoverContentAlreadyAttachedError(this.options.name);
        }
        if (this.animationHost && this.isOverlayAnimationEnabled()) {
            prepareOverlayEnter(this.animationHost);
        }
        this.beforeAttachPortal();
        const ref = attach();
        this.afterAttachPortal();
        return ref;
    }
}
