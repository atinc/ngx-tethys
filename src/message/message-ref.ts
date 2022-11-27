import { ThyAbstractInternalOverlayRef, ThyAbstractOverlayConfig, ThyAbstractOverlayRef } from 'ngx-tethys/core';
import { OverlayRef } from '@angular/cdk/overlay';
import { ThyMessageContainerComponent } from './message-container.component';
import { messageAbstractOverlayOptions } from './message.options';

export abstract class ThyMessageRef<T, TResult = unknown> extends ThyAbstractOverlayRef<T, ThyMessageContainerComponent, TResult> {}

export class ThyInternalMessageRef<T, TResult = unknown> extends ThyAbstractInternalOverlayRef<T, ThyMessageContainerComponent, TResult>
    implements ThyMessageRef<T, TResult> {
    constructor(overlayRef: OverlayRef, containerInstance: ThyMessageContainerComponent, config: ThyAbstractOverlayConfig) {
        super(messageAbstractOverlayOptions, overlayRef, containerInstance, config);
    }

    /**
     * Updates the notify's position.
     * @param position New notify position.
     */
    updatePosition(): this {
        this.overlayRef.updatePosition();
        return this;
    }
}
