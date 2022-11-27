import { ThyAbstractInternalOverlayRef, ThyAbstractOverlayConfig, ThyAbstractOverlayRef } from 'ngx-tethys/core';
import { OverlayRef } from '@angular/cdk/overlay';
import { ThyNotifyContainerComponent } from './notify-container.component';
import { notifyAbstractOverlayOptions } from './notify.options';

export abstract class ThyNotifyRef<T, TResult = unknown> extends ThyAbstractOverlayRef<T, ThyNotifyContainerComponent, TResult> {}

export class ThyInternalNotifyRef<T, TResult = unknown> extends ThyAbstractInternalOverlayRef<T, ThyNotifyContainerComponent, TResult>
    implements ThyNotifyRef<T, TResult> {
    constructor(overlayRef: OverlayRef, containerInstance: ThyNotifyContainerComponent, config: ThyAbstractOverlayConfig) {
        super(notifyAbstractOverlayOptions, overlayRef, containerInstance, config);
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
