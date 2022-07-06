import { ThyAbstractInternalOverlayRef, ThyAbstractOverlayRef } from 'ngx-tethys/core';
import { OverlayRef } from '@angular/cdk/overlay';
import { ThyNotifyContainerComponent } from './notify-container.component';
import { ThyNotifyConfig } from './notify.config';
import { notifyAbstractOverlayOptions } from './notify.options';

export abstract class ThyNotifyContainerRef<T, TResult = unknown, TData = unknown> extends ThyAbstractOverlayRef<
    T,
    ThyNotifyContainerComponent<TData>,
    TResult
> {}

export class ThyInternalNotifyRef<T, TResult = unknown> extends ThyAbstractInternalOverlayRef<T, ThyNotifyContainerComponent, TResult>
    implements ThyNotifyContainerRef<T, TResult> {
    constructor(overlayRef: OverlayRef, containerInstance: ThyNotifyContainerComponent, config: ThyNotifyConfig) {
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
