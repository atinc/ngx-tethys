import { Injectable } from '@angular/core';
import { ThyAbstractInternalOverlayRef, ThyUpperOverlayPosition, ThyAbstractOverlayRef } from 'ngx-tethys/core';
import { ThySlideContainerComponent } from './slide-container.component';
import { OverlayRef } from '@angular/cdk/overlay';
import { slideUpperOverlayOptions, ThySlideConfig } from './slide.config';

export abstract class ThySlideRef<T, TResult = any> extends ThyAbstractOverlayRef<T, ThySlideContainerComponent, TResult> {}

@Injectable()
export class ThyInternalSlideRef<T = any, TResult = any> extends ThyAbstractInternalOverlayRef<T, ThySlideContainerComponent, TResult>
    implements ThySlideRef<T> {
    constructor(overlayRef: OverlayRef, containerInstance: ThySlideContainerComponent, config: ThySlideConfig) {
        super(slideUpperOverlayOptions, overlayRef, containerInstance, config);
    }

    updatePosition(position?: ThyUpperOverlayPosition): this {
        return this.updateGlobalPosition(position);
    }
}
