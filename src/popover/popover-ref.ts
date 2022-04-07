import { ThyAbstractInternalOverlayRef, ThyAbstractOverlayRef } from 'ngx-tethys/core';

import { OverlayRef } from '@angular/cdk/overlay';
import { merge } from 'rxjs';

import { ThyPopoverContainerComponent } from './popover-container.component';
import { ThyPopoverConfig } from './popover.config';
import { popoverAbstractOverlayOptions } from './popover.options';

export abstract class ThyPopoverRef<T, TResult = unknown, TData = unknown> extends ThyAbstractOverlayRef<
    T,
    ThyPopoverContainerComponent<TData>,
    TResult
> {}

export class ThyInternalPopoverRef<T, TResult = unknown> extends ThyAbstractInternalOverlayRef<T, ThyPopoverContainerComponent, TResult>
    implements ThyPopoverRef<T, TResult> {
    constructor(overlayRef: OverlayRef, containerInstance: ThyPopoverContainerComponent, config: ThyPopoverConfig) {
        super(popoverAbstractOverlayOptions, overlayRef, containerInstance, config);
        // Note: doesn't need to unsubscribe, because `insideClicked` and `outsideClicked`
        // get completed by `ThyPopoverContainerComponent` when the view is destroyed.
        merge(containerInstance.insideClicked, containerInstance.outsideClicked).subscribe(() => this.close());
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
