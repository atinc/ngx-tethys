import {
    ThyAbstractInternalOverlayRef,
    ThyAbstractOverlayOptions,
    ThyAbstractOverlayPosition,
    ThyAbstractOverlayRef
} from 'ngx-tethys/core';
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
    extends ThyAbstractInternalOverlayRef<T, ThySlideContainer, TResult, ThySlideConfig>
    implements ThySlideRef<T>
{
    constructor() {
        super();
    }

    protected get options(): ThyAbstractOverlayOptions {
        return slideAbstractOverlayOptions;
    }

    updatePosition(position?: ThyAbstractOverlayPosition): this {
        return this.updateGlobalPosition(position);
    }
}
