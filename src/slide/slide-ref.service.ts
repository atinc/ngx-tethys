import { ThyAbstractInternalOverlayRef, ThyAbstractOverlayPosition, ThyAbstractOverlayRef } from 'ngx-tethys/core';

import { OverlayRef } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';

import { ThySlideContainerComponent } from './slide-container.component';
import { slideAbstractOverlayOptions, ThySlideConfig } from './slide.config';

export abstract class ThySlideRef<T, TResult = unknown> extends ThyAbstractOverlayRef<T, ThySlideContainerComponent, TResult> {}

@Injectable()
export class ThyInternalSlideRef<T = unknown, TResult = unknown>
    extends ThyAbstractInternalOverlayRef<T, ThySlideContainerComponent, TResult>
    implements ThySlideRef<T> {
    constructor(overlayRef: OverlayRef, containerInstance: ThySlideContainerComponent, config: ThySlideConfig) {
        super(slideAbstractOverlayOptions, overlayRef, containerInstance, config);
    }

    updatePosition(position?: ThyAbstractOverlayPosition): this {
        return this.updateGlobalPosition(position);
    }
}
