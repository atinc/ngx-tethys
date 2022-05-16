import { OverlayRef } from '@angular/cdk/overlay';
import { ThyAbstractInternalOverlayRef, ThyAbstractOverlayPosition, ThyAbstractOverlayRef } from 'ngx-tethys/core';
import { imageAbstractOverlayOptions, ThyImagePreviewConfig } from '../image-config';
import { ThyImagePreviewContainerComponent } from './image-preview-container.component';

export abstract class ThyImagePreviewRef<T, TResult = unknown> extends ThyAbstractOverlayRef<
    T,
    ThyImagePreviewContainerComponent,
    TResult
> {}

export class ThyInternalImageRef<T, TResult = unknown> extends ThyAbstractInternalOverlayRef<
    T,
    ThyImagePreviewContainerComponent,
    TResult
> {
    constructor(overlayRef: OverlayRef, previewInstance: ThyImagePreviewContainerComponent, config: ThyImagePreviewConfig) {
        super(imageAbstractOverlayOptions, overlayRef, previewInstance, config);
    }

    /**
     * Updates the imagePreview's position.
     * @param position New image preview position.
     */
    updatePosition(position?: ThyAbstractOverlayPosition): this {
        this.updateGlobalPosition(position);
        return this;
    }
}
