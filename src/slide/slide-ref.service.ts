import { ThyAbstractInternalOverlayRef, ThyAbstractOverlayPosition, ThyAbstractOverlayRef } from 'ngx-tethys/core';

import { OverlayRef } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';

import { ThySlideContainer } from './slide-container.component';
import { slideAbstractOverlayOptions, ThySlideConfig } from './slide.config';

/**
 * @public
 * @order 30
 */
export abstract class ThySlideRef<T, TResult = unknown> extends ThyAbstractOverlayRef<T, ThySlideContainer, TResult> {}

/**
 * @internal
 */
@Injectable()
export class ThyInternalSlideRef<T = unknown, TResult = unknown>
    extends ThyAbstractInternalOverlayRef<T, ThySlideContainer, TResult>
    implements ThySlideRef<T>
{
    constructor(overlayRef: OverlayRef, containerInstance: ThySlideContainer, config: ThySlideConfig) {
        super(slideAbstractOverlayOptions, overlayRef, containerInstance, config);
    }

    updatePosition(position?: ThyAbstractOverlayPosition): this {
        return this.updateGlobalPosition(position);
    }
}
