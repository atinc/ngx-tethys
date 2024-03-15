import { Inject, Injectable, OnDestroy, Optional } from '@angular/core';
import { ThyImagePreviewConfig, THY_IMAGE_DEFAULT_PREVIEW_OPTIONS } from './image.config';
import { ThyImageInfo, ThyImagePreviewOptions } from './image.class';
import { ThyImagePreview } from './preview/image-preview.component';
import { ThyDialog, ThyDialogSizes } from 'ngx-tethys/dialog';
import { ThyImagePreviewRef } from './preview/image-preview-ref';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/**
 * 图片预览服务
 */
@Injectable()
export class ThyImageService implements OnDestroy {
    /**
     * 图片预览默认配置，外部可通过注入 THY_IMAGE_DEFAULT_PREVIEW_OPTIONS 进行配置
     */
    defaultConfig: ThyImagePreviewConfig;

    private downloadClicked$ = new Subject<ThyImageInfo>();

    private ngUnsubscribe$ = new Subject<void>();

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
        const config = { ...this.defaultConfig, ...options };
        const dialogRef = this.thyDialog.open(ThyImagePreview, {
            initialState: {
                images,
                previewIndex: options?.startIndex >= 0 && options?.startIndex < images.length ? options.startIndex : 0,
                previewConfig: config
            },
            backdropClass: 'thy-image-preview-backdrop',
            panelClass: 'thy-image-preview-container',
            size: ThyDialogSizes.full,
            ...config
        });
        const imagePreviewRef = new ThyImagePreviewRef(dialogRef.componentInstance, { ...this.defaultConfig, ...options }, dialogRef);
        imagePreviewRef
            .downloadClicked()
            .pipe(takeUntil(this.ngUnsubscribe$))
            .subscribe(image => {
                this.downloadClicked$.next(image);
            });
        return imagePreviewRef;
    }

    downloadClicked(): Observable<ThyImageInfo> {
        return this.downloadClicked$.asObservable();
    }

    ngOnDestroy() {
        this.ngUnsubscribe$.next();
        this.ngUnsubscribe$.complete();
    }
}
