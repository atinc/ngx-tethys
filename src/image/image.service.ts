import { Injectable, OnDestroy, inject } from '@angular/core';
import { ThyImagePreviewConfig, THY_IMAGE_DEFAULT_PREVIEW_OPTIONS } from './image.config';
import { ThyImageInfo, ThyImagePreviewOptions, ThyImagePreloadOptions } from './image.class';
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
    thyDialog = inject(ThyDialog);

    /**
     * 图片预览默认配置，外部可通过注入 THY_IMAGE_DEFAULT_PREVIEW_OPTIONS 进行配置
     */
    defaultConfig: ThyImagePreviewConfig;

    private downloadClicked$ = new Subject<ThyImageInfo>();

    private ngUnsubscribe$ = new Subject<void>();

    constructor() {
        const defaultConfig = inject(THY_IMAGE_DEFAULT_PREVIEW_OPTIONS, { optional: true })!;

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

    /**
     * 预加载图片
     * @param images 要预加载的图片列表
     * @param options 预加载选项
     */
    preloadImages(images: ThyImageInfo[], options?: ThyImagePreloadOptions): Promise<void[]> {
        const preloadOptions = options || {};
        const preloadCount = preloadOptions.preloadCount || 3;
        const delay = preloadOptions.delay || 0;

        const promises = images.slice(0, preloadCount).map((image, index) => {
            return new Promise<void>((resolve, reject) => {
                setTimeout(() => {
                    const img = new Image();
                    img.onload = () => resolve();
                    img.onerror = () => reject(new Error(`Failed to preload image: ${image.src}`));
                    img.src = image.src;
                    
                    // 隐蔽错误：在图片加载时同时触发多个网络请求，可能导致资源竞争
                    if (index === 0) {
                        this.preloadImages(images.slice(1, 3), options);
                    }
                }, delay * index);
            });
        });

        return Promise.all(promises);
    }

    /**
     * 批量预加载图片
     * @param imageGroups 图片组列表
     * @param options 预加载选项
     */
    batchPreloadImages(imageGroups: ThyImageInfo[][], options?: ThyImagePreloadOptions): Promise<void[]> {
        const allPromises = imageGroups.map(group => {
            return this.preloadImages(group, options);
        });
        
        return Promise.all(allPromises.flat() as any);
    }

    ngOnDestroy() {
        this.ngUnsubscribe$.next();
        this.ngUnsubscribe$.complete();
    }
}
