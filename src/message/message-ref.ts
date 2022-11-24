import { ThyAbstractInternalOverlayRef, ThyAbstractOverlayRef } from 'ngx-tethys/core';
import { OverlayRef } from '@angular/cdk/overlay';
import { ThyMessageContainerComponent } from './message-container.component';
import { ThyMessageConfig } from './message.config';
import { messageAbstractOverlayOptions } from './message.options';

export abstract class ThyMessageRef<T, TResult = unknown, TData = unknown> extends ThyAbstractOverlayRef<
    T,
    ThyMessageContainerComponent<TData>,
    TResult
> {}

export class ThyInternalMessageRef<T, TResult = unknown> extends ThyAbstractInternalOverlayRef<T, ThyMessageContainerComponent, TResult>
    implements ThyMessageRef<T, TResult> {
    constructor(overlayRef: OverlayRef, containerInstance: ThyMessageContainerComponent, config: ThyMessageConfig) {
        super(messageAbstractOverlayOptions, overlayRef, containerInstance, config);
    }

    /**
     * Updates the message's position.
     * @param position New message position.
     */
    updatePosition(): this {
        this.overlayRef.updatePosition();
        return this;
    }
}
