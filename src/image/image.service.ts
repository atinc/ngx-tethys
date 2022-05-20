import { Inject, Injectable, Optional } from '@angular/core';
import { ThyImagePreviewConfig, THY_IMAGE_DEFAULT_PREVIEW_OPTIONS } from './image.config';
import { ThyImageInfo, ThyImagePreviewOptions } from './image.class';
import { ThyImagePreviewComponent } from './preview/image-preview.component';
import { ThyDialog, ThyDialogRef, ThyDialogSizes } from 'ngx-tethys/dialog';
import { ThyImagePreviewRef } from './preview/image-preview-ref';

export interface ThyImageService {
    preview(images: ThyImageInfo[], option?: ThyImagePreviewOptions & { startIndex?: number }): ThyImagePreviewRef;
}
@Injectable()
export class ThyImageService {
    defaultConfig: ThyImagePreviewConfig;
    constructor(
        public thyDialog: ThyDialog,
        @Optional()
        @Inject(THY_IMAGE_DEFAULT_PREVIEW_OPTIONS)
        defaultConfig: ThyImagePreviewConfig
    ) {
        this.defaultConfig = defaultConfig;
    }

    preview(images: ThyImageInfo[], options?: ThyImagePreviewOptions & { startIndex?: number }): ThyImagePreviewRef {
        const dialogRef = this.thyDialog.open(ThyImagePreviewComponent, {
            initialState: {
                images,
                previewIndex: options?.startIndex >= 0 && options?.startIndex < images.length ? options.startIndex : 0,
                previewConfig: { ...this.defaultConfig, ...options }
            },
            backdropClass: 'thy-image-preview-backdrop',
            panelClass: 'thy-image-preview-container',
            size: ThyDialogSizes.full,
            ...options
        });
        const imagePreviewRef = new ThyImagePreviewRef(dialogRef.componentInstance, { ...this.defaultConfig, ...options }, dialogRef);
        return imagePreviewRef;
    }
}
