import { OverlayRef } from '@angular/cdk/overlay';
import { ThyPopoverContainerComponent } from './popover-container.component';
import { ThyAbstractOverlayRef, ThyInternalUpperOverlayRef } from 'ngx-tethys/core';
import { popoverUpperOverlayOptions } from './popover.options';
import { ThyPopoverConfig } from './popover.config';

export abstract class ThyPopoverRef<T, TResult = any> extends ThyAbstractOverlayRef<T, ThyPopoverContainerComponent, TResult> {}

export class ThyInternalPopoverRef<T, TResult = any> extends ThyInternalUpperOverlayRef<T, ThyPopoverContainerComponent, TResult>
    implements ThyPopoverRef<T, TResult> {
    constructor(overlayRef: OverlayRef, containerInstance: ThyPopoverContainerComponent, config: ThyPopoverConfig) {
        super(popoverUpperOverlayOptions, overlayRef, containerInstance, config);
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
