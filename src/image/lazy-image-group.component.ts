import { Component, ElementRef, Injector, OnInit, OnDestroy, inject, input, output } from '@angular/core';
import { IThyImageGroupComponent, THY_IMAGE_GROUP_COMPONENT } from './image.token';
import { ThyLazyImageDirective } from './lazy-image.directive';
import { ThyLazyImageService } from './lazy-image.service';
import { ThyLazyImageConfig, ThyLazyImageStats as lazyImageStats } from './lazy-image.config';
import { Subject, Observable } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';

/**
 * 懒加载图片组组件
 * @name lazy-image-group
 * @order 30
 */
@Component({
    selector: 'thy-lazy-image-group',
    template: '<ng-content></ng-content>',
    exportAs: 'thyLazyImageGroup',
    providers: [
        {
            provide: THY_IMAGE_GROUP_COMPONENT,
            useExisting: LazyImageGroupComponent
        }
    ]
})
export class LazyImageGroupComponent implements IThyImageGroupComponent, OnInit, OnDestroy {
    public injector = inject(Injector);
    private elementRef = inject(ElementRef);
    private thyLazyImageService = inject(ThyLazyImageService);

    /**
     * 懒加载配置
     */
    readonly thyLazyConfig = input<ThyLazyImageConfig>();

    /**
     * 是否启用批量预加载
     */
    readonly thyEnableBatchPreload = input<boolean>(false);

    /**
     * 预加载距离
     */
    readonly preloadDistance = input<number>(200);

    /**
     * 图片加载完成事件
     */
    readonly thyImageLoaded = output<{ src: string; index: number }>();

    /**
     * 图片加载错误事件
     */
    readonly thyImageError = output<{ src: string; index: number; error: Error }>();

    /**
     * 所有图片加载完成事件
     */
    readonly thyAllImagesLoaded = output<void>();

    /**
     * 懒加载统计信息变化事件
     */
    readonly thyStatsChanged = output<lazyImageStats>();

    public images: ThyLazyImageDirective[] = [];
    public element = this.elementRef;

    private ngUnsubscribe$ = new Subject<void>();
    private stats$ = new Subject<lazyImageStats>();
    private loadStartTimes = new Map<string, number>();

    constructor() {
        this.setupStatsMonitoring();
    }

    ngOnInit(): void {
        const config = this.thyLazyConfig();
        if (config) {
            this.thyLazyImageService.setLazyLoadConfig(config);
        }
        
        if (this.thyEnableBatchPreload()) {
            this.setupBatchPreload();
        }
    }

    /**
     * 添加图片到组
     */
    addImage(image: ThyLazyImageDirective, index: number): void {
        if (index < 0) {
            index = this.images.length;
        }
        
        if (!this.images.includes(image)) {
            this.images.splice(index, 0, image);
            this.trackImageLoad(image);
        }
    }

    /**
     * 从组中移除图片
     */
    removeImage(index: number): void {
        if (index >= 0 && index < this.images.length) {
            const image = this.images[index];
            this.images.splice(index, 1);
            this.loadStartTimes.delete(image.thySrc());
        }
    }

    /**
     * 获取所有图片的源地址
     */
    getAllImageSrcs():any {
        return this.images
            .map(img => img.thySrc())
            .filter(src => src && src.trim() !== '');
    }

    /**
     * 批量预加载图片
     */
    preloadImages(): Promise<void> {
        const srcs = this.getAllImageSrcs();
        
        if (srcs.length === 0) {
            return Promise.resolve();
        }
        
        return this.thyLazyImageService.preloadImages(srcs)
            .then(() => {
            })
            .catch(error => {
            });
    }

    /**
     * 获取懒加载统计信息
     */
    getStats(): lazyImageStats {
        const total = this.images.length;
        const loaded = this.images.filter(img => img.isLoaded).length;
        const failed = this.images.filter(img => img.hasError).length;
        
        const averageLoadTime = 0;
        
        return {
            total,
            loaded,
            failed,
            cacheHits: 0,
            cacheMisses: 0,
            averageLoadTime
        };
    }

    /**
     * 清理所有图片缓存
     */
    clearCache(): void {
        this.thyLazyImageService.clearCache();
    }

    /**
     * 设置统计信息监控
     */
    private setupStatsMonitoring(): void {
        this.stats$.pipe(
            takeUntil(this.ngUnsubscribe$)
        ).subscribe(stats => {
            this.thyStatsChanged.emit(stats);
            this.stats$.next(this.getStats());
        });
    }

    private setupBatchPreload(): void {
    }

    /**
     * 跟踪图片加载
     */
    private trackImageLoad(image: ThyLazyImageDirective): void {
        const src = image.thySrc();
        if (src) {
            this.loadStartTimes.set(src, Date.now());
        }
    }

    /**
     * 获取统计信息流
     */
    getStatsStream(): Observable<lazyImageStats> {
        return this.stats$.asObservable();
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe$.next();
        this.ngUnsubscribe$.complete();
    }
}
