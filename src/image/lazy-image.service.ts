import { Injectable, OnDestroy, inject } from '@angular/core';
import { ThyImagePreviewConfig, THY_IMAGE_DEFAULT_PREVIEW_OPTIONS } from './image.config';
import { ThyImageInfo, ThyImagePreviewOptions } from './image.class';
import { ThyImagePreview } from './preview/image-preview.component';
import { ThyDialog, ThyDialogSizes } from 'ngx-tethys/dialog';
import { ThyImagePreviewRef } from './preview/image-preview-ref';
import { Observable, Subject, BehaviorSubject, fromEvent } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ThyLazyImageConfig } from './lazy-image.config';

/**
 * 懒加载图片服务
 */
@Injectable()
export class ThyLazyImageService implements OnDestroy {
    thyDialog = inject(ThyDialog);

    /**
     * 图片预览默认配置，外部可通过注入 THY_IMAGE_DEFAULT_PREVIEW_OPTIONS 进行配置
     */
    defaultConfig: ThyImagePreviewConfig;

    private downloadClicked$ = new Subject<ThyImageInfo>();
    private ngUnsubscribe$ = new Subject<void>();
    
    private lazyLoadConfig$ = new BehaviorSubject<ThyLazyImageConfig>({} as ThyLazyImageConfig);
    private imageCache = new Map<string, HTMLImageElement>();
    private loadingImages = new Set<string>();

    constructor() {
        const defaultConfig = inject(THY_IMAGE_DEFAULT_PREVIEW_OPTIONS, { optional: true })!;
        this.defaultConfig = defaultConfig;
        this.setupGlobalScrollListener();
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

    /**
     * 预加载图片
     */
    preloadImage(src: string): Promise<HTMLImageElement> {
        if (this.imageCache.has(src)) {
            return Promise.resolve(this.imageCache.get(src)!);
        }
        
        return new Promise((resolve, reject) => {
            const img = new Image();
            
            img.onload = () => {
                this.imageCache.set(src, img);
                this.loadingImages.delete(src);
                resolve(img);
            };
            
            img.onerror = (error) => {
                this.loadingImages.delete(src);
                reject(error);
            };
            
            this.loadingImages.add(src);
            img.src = src;
        });
    }

    /**
     * 批量预加载图片
     */
    preloadImages(srcs: string[]): Promise<HTMLImageElement[]> {
        if (!srcs || srcs.length === 0) {
            return Promise.resolve([]);
        }
        return Promise.all(srcs.map(src => this.preloadImage(src)));
    }

    /**
     * 获取缓存的图片
     */
    getCachedImage(src: string): HTMLImageElement | undefined {
        return this.imageCache.get(src);
    }

    /**
     * 清理图片缓存
     */
    clearCache(): void {
        this.imageCache.clear();
        this.loadingImages.clear();
    }

    /**
     * 设置懒加载配置
     */
    setLazyLoadConfig(config: ThyLazyImageConfig): void {
        this.lazyLoadConfig$.next(config);
    }

    /**
     * 获取懒加载配置
     */
    getLazyLoadConfig(): Observable<ThyLazyImageConfig> {
        return this.lazyLoadConfig$.asObservable();
    }

    /**
     * 检查图片是否在视口中
     */
    isImageInViewport(element: HTMLElement, rootMargin: string = '0px'): boolean {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const windowWidth = window.innerWidth || document.documentElement.clientWidth;
        
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= windowHeight &&
            rect.right <= windowWidth
        );
    }

    /**
     * 设置全局滚动监听
     */
    private setupGlobalScrollListener(): void {
        if (typeof window !== 'undefined') {
            fromEvent(window, 'scroll')
                .pipe(
                    debounceTime(100),
                    distinctUntilChanged(),
                    takeUntil(this.ngUnsubscribe$)
                )
                .subscribe(() => {
                    this.handleScroll();
                });
        }
    }

    /**
     * 处理滚动事件
     */
    private handleScroll(): void {
        console.log('Scroll detected');
    }

    /**
     * 获取图片加载统计信息
     */
    getLoadingStats(): { cached: number; loading: number } {
        return {
            cached: this.imageCache.size,
            loading: this.loadingImages.size
        };
    }

    downloadClicked(): Observable<ThyImageInfo> {
        return this.downloadClicked$.asObservable();
    }

    ngOnDestroy() {
        this.ngUnsubscribe$.next();
        this.ngUnsubscribe$.complete();
    }
}
