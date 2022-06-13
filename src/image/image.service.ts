import { Inject, Injectable, Optional } from '@angular/core';
import { ThyImagePreviewConfig, THY_IMAGE_DEFAULT_PREVIEW_OPTIONS } from './image.config';
import { ThyImageInfo, ThyImagePreviewOptions } from './image.class';
import { ThyImagePreviewComponent } from './preview/image-preview.component';
import { ThyDialog, ThyDialogSizes } from 'ngx-tethys/dialog';
import { ThyImagePreviewRef } from './preview/image-preview-ref';

/**
 * 图片预览服务
 */
@Injectable()
export class ThyImageService {
    /**
     * 图片预览默认配置，外部可通过注入 THY_IMAGE_DEFAULT_PREVIEW_OPTIONS 进行配置
     */
    defaultConfig: ThyImagePreviewConfig;
    constructor(
        public thyDialog: ThyDialog,
        @Optional()
        @Inject(THY_IMAGE_DEFAULT_PREVIEW_OPTIONS)
        defaultConfig: ThyImagePreviewConfig
    ) {
        this.defaultConfig = defaultConfig;
    }

    /**
     * 图片预览方法
     */
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
