import { ThyAbstractInternalOverlayRef, ThyAbstractOverlayRef } from 'ngx-tethys/core';

import { OverlayRef } from '@angular/cdk/overlay';
import { merge } from 'rxjs';

import { ThyPopoverContainer } from './popover-container.component';
import { ThyPopoverConfig } from './popover.config';
import { popoverAbstractOverlayOptions } from './popover.options';

export abstract class ThyPopoverRef<T, TResult = unknown, TData = unknown> extends ThyAbstractOverlayRef<
    T,
    ThyPopoverContainer<TData>,
    TResult
> {}

export class ThyInternalPopoverRef<T, TResult = unknown>
    extends ThyAbstractInternalOverlayRef<T, ThyPopoverContainer, TResult>
    implements ThyPopoverRef<T, TResult>
{
    constructor(overlayRef: OverlayRef, containerInstance: ThyPopoverContainer, config: ThyPopoverConfig) {
        super(popoverAbstractOverlayOptions, overlayRef, containerInstance, config);
        // Note: doesn't need to unsubscribe, because `insideClicked` and `outsideClicked`
        // get completed by `ThyPopoverContainerComponent` when the view is destroyed.
        merge(containerInstance.insideClicked, containerInstance.outsideClicked).subscribe(() => this.close());
        containerInstance.updatePosition.subscribe(() => {
            this.updatePosition();
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
