import { CdkPortalOutlet, TemplatePortal, ComponentPortal } from '@angular/cdk/portal';
import { EmbeddedViewRef, ComponentRef, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ThyUpperOverlayOptions, ThyUpperOverlayConfig } from './upper-overlay.config';
import { AnimationEvent } from '@angular/animations';

export function throwPopoverContentAlreadyAttachedError(name: string) {
    throw Error(`Attempting to attach ${name} content after content is already attached`);
}

export abstract class ThyUpperOverlayContainer {
    id?: string;

    animationState: string;

    animationStateChanged = new EventEmitter<AnimationEvent>();

    containerDestroy = new Subject<void>();

    abstract config: ThyUpperOverlayConfig;

    /**portal outlet */
    abstract portalOutlet: CdkPortalOutlet;

    /**
     * Opening overlay animation done
     */
    abstract animationOpeningDone: Observable<AnimationEvent>;

    /**
     * Closing overlay animation done
     */
    abstract animationClosingDone: Observable<AnimationEvent>;

    /** Before attach content(TemplatePortal or ComponentPortal) portal to portalOutlet*/
    abstract beforeAttachPortal(): void;

    /** Before detach content*/
    beforeDetachPortal() {}

    constructor(private options: ThyUpperOverlayOptions, protected changeDetectorRef: ChangeDetectorRef) {}

    /**
     * Attach a TemplatePortal as content to this overlay container.
     * @param portal Portal to be attached as the overlay content.
     */
    attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C> {
        if (this.portalOutlet.hasAttached()) {
            throwPopoverContentAlreadyAttachedError(this.options.name);
        }

        this.beforeAttachPortal();
        return this.portalOutlet.attachTemplatePortal(portal);
    }

    /**
     * Attach a ComponentPortal as content to this overlay container.
     * @param portal Portal to be attached as the overlay content.
     */
    attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
        if (this.portalOutlet.hasAttached()) {
            throwPopoverContentAlreadyAttachedError(this.options.name);
        }
        this.beforeAttachPortal();
        return this.portalOutlet.attachComponentPortal(portal);
    }

    startExitAnimation() {
        if (this.options.animationEnabled) {
            this.animationState = 'exit';
        } else {
            // this.animationClosingDone.
        }
        this.beforeDetachPortal();

        // Mark the container for check so it can react if the
        // view container is using OnPush change detection.
        this.changeDetectorRef.markForCheck();
    }

    destroy() {
        this.containerDestroy.next();
    }
}
