import { Inject, Injectable, Optional } from '@angular/core';
import { ThyImagePreviewConfig, THY_IMAGE_DEFAULT_PREVIEW_OPTIONS } from './image-config';
import { ThyImageInfo, ThyImagePreviewOptions } from './image.interface';
import { ThyImagePreviewComponent } from './preview/image-preview.component';
import { ThyDialog, ThyDialogRef, ThyDialogSizes } from 'ngx-tethys/dialog';

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

    preview(images: ThyImageInfo[], previewIndex?: number, options?: ThyImagePreviewOptions): ThyDialogRef<unknown, unknown> {
        const imagePreviewRef = this.thyDialog.open(ThyImagePreviewComponent, {
            initialState: {
                images,
                previewIndex: previewIndex >= 0 && previewIndex < images.length ? previewIndex : 0,
                previewConfig: { ...this.defaultConfig, ...options }
            },
            panelClass: 'thy-image-preview-container',
            size: ThyDialogSizes.full,
            ...options
        });
        return imagePreviewRef;
    }
}
