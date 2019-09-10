import { Injectable } from '@angular/core';
import { ThyInternalUpperOverlayRef, ThyUpperOverlayPosition } from '../core/overlay';
import { ThySlideContainerComponent } from './slide-container.component';
import { OverlayRef } from '@angular/cdk/overlay';
import { slideUpperOverlayOptions, ThySlideConfig } from './slide.config';

@Injectable()
export class ThySlideRef<T = any, TResult = any> extends ThyInternalUpperOverlayRef<
    T,
    ThySlideContainerComponent,
    TResult
> {
    constructor(overlayRef: OverlayRef, containerInstance: ThySlideContainerComponent, config: ThySlideConfig) {
        super(slideUpperOverlayOptions, overlayRef, containerInstance, config);
    }

    updatePosition(position?: ThyUpperOverlayPosition): this {
        return this.updateGlobalPosition(position);
    }
}
