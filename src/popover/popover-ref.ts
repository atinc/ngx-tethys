import { ThyAbstractInternalOverlayRef, ThyAbstractOverlayRef } from 'ngx-tethys/core';

import { OverlayRef } from '@angular/cdk/overlay';

import { ThyPopoverContainerComponent } from './popover-container.component';
import { ThyPopoverConfig } from './popover.config';
import { popoverAbstractOverlayOptions } from './popover.options';

export abstract class ThyPopoverRef<T, TResult = any> extends ThyAbstractOverlayRef<T, ThyPopoverContainerComponent, TResult> {}

export class ThyInternalPopoverRef<T, TResult = any> extends ThyAbstractInternalOverlayRef<T, ThyPopoverContainerComponent, TResult>
    implements ThyPopoverRef<T, TResult> {
    constructor(overlayRef: OverlayRef, containerInstance: ThyPopoverContainerComponent, config: ThyPopoverConfig) {
        super(popoverAbstractOverlayOptions, overlayRef, containerInstance, config);
        containerInstance.insideClicked.subscribe(() => {
            this.close();
        });
        containerInstance.outsideClicked.subscribe(() => {
            this.close();
        });
    }

    /**
     * Updates the popover's position.
     * @param position New popover position.
     */
    updatePosition(): this {
        this.overlayRef.updatePosition();
        return this;
    }
}
