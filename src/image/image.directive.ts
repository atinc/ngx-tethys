import { Directive, ElementRef, InjectFlags, OnInit, Injector, OnDestroy, AfterViewInit, inject, input, effect, signal } from '@angular/core';
import { IThyImageDirective, IThyImageGroupComponent, THY_IMAGE_GROUP_COMPONENT } from './image.token';
import { ThyImageMeta, ThyImageLazyLoadOptions, ThyImagePreloadOptions } from './image.class';
import { ThyImageService } from './image.service';
import { coerceBooleanProperty, ThyBooleanInput } from 'ngx-tethys/util';

/**
 * thyImage: 预览图片指令，只可绑定到 img 标签上
 * @name img[thyImage]
 * @order 10
 */
@Directive({
    selector: 'img[thyImage]',
    exportAs: 'thyImage',
    host: {
        '(click)': 'onPreview($event)',
        class: 'thy-image',
        '[class.thy-image-disabled]': 'thyDisablePreview()'
    }
})
export class ThyImageDirective implements IThyImageDirective, OnInit, AfterViewInit, OnDestroy {
    private thyImageService = inject(ThyImageService);
    private injector = inject(Injector);
    private elementRef = inject(ElementRef);

    /**
     * 图片地址
     */
    readonly thySrc = input<string>();

    /**
     * 预览图片地址
     */
    readonly thyPreviewSrc = input<string>();

    /**
     * 图片原图地址
     */
    readonly thyOriginSrc = input<string>();

    /**
     * 图片附加信息，包含 { name: string, size?: string | number; }
     */
    readonly thyImageMeta = input<ThyImageMeta>();

    /**
     * 是否禁止预览
     * @default false
     */
    readonly thyDisablePreview = input<boolean, ThyBooleanInput>(undefined, { transform: coerceBooleanProperty });

    /**
     * 是否自动计算图片资源大小
     */
    readonly thyResolveSize = input(false, { transform: coerceBooleanProperty });

    /**
     * 是否启用懒加载
     * @default false
     */
    readonly thyLazyLoad = input(false, { transform: coerceBooleanProperty });

    /**
     * 懒加载配置选项
     */
    readonly thyLazyLoadOptions = input<ThyImageLazyLoadOptions>();

    /**
     * 预加载配置选项
     */
    readonly thyPreloadOptions = input<ThyImagePreloadOptions>();

    get previewable(): boolean {
        return !this.thyDisablePreview();
    }

    private parentGroup: IThyImageGroupComponent;
    private intersectionObserver?: IntersectionObserver;
    private isLoaded = signal(false);
    private preloadTimer?: number;

    constructor() {
        effect(() => {
            if (this.thyLazyLoad()) {
                this.setupLazyLoading();
            } else {
                this.elementRef.nativeElement.src = this.thySrc();
            }
        });
    }

    ngOnInit(): void {
        this.getParentGroup();
    }

    ngAfterViewInit(): void {
        if (this.parentGroup) {
            this.addParentImage();
        }
    }

    getParentGroup() {
        while (true) {
            // 多层 thy-image-group 嵌套时，获取最外层 thy-image-group 下的所有图片
            const injector = this.parentGroup?.injector || this.injector;
            const parentGroup = injector.get(THY_IMAGE_GROUP_COMPONENT, null, InjectFlags.SkipSelf);
            if (!parentGroup) {
                break;
            }
            this.parentGroup = parentGroup;
        }
    }

    addParentImage() {
        setTimeout(() => {
            const parentElement: HTMLElement = this.parentGroup.element.nativeElement;
            const images = parentElement.querySelectorAll('img[thyImage]');
            const index = Array.prototype.indexOf.call(images, this.elementRef.nativeElement);
            if (index >= 0) {
                this.parentGroup.addImage(this, index);
            } else {
                this.parentGroup.addImage(this, this.parentGroup.images.length);
            }
        });
    }

    onPreview(event: MouseEvent) {
        if (!this.previewable || event.button !== 0) {
            return;
        }
        if (this.parentGroup) {
            const previewAbleImages = this.parentGroup.images.filter(e => e.previewable);
            const previewImages = previewAbleImages.map(e => ({
                src: e.thyPreviewSrc() || e.thySrc(),
                ...e.thyImageMeta(),
                origin: {
                    src: e.thyOriginSrc()
                }
            }));
            const startIndex = previewAbleImages.findIndex(el => this === el);
            this.thyImageService.preview(previewImages, {
                startIndex,
                resolveSize: this.thyResolveSize()
            });
        } else {
            const previewImages = [
                {
                    src: this.thyPreviewSrc() || this.thySrc(),
                    ...this.thyImageMeta(),
                    origin: {
                        src: this.thyOriginSrc()
                    }
                }
            ];
            this.thyImageService.preview(previewImages, { resolveSize: this.thyResolveSize() });
        }
    }

    ngOnDestroy(): void {
        if (this.parentGroup) {
            const index = this.parentGroup.images.findIndex(item => item === this);
            this.parentGroup.removeImage(index);
        }
        this.cleanupLazyLoading();
    }

    /**
     * 设置懒加载
     */
    private setupLazyLoading(): void {
        if (!('IntersectionObserver' in window)) {
            this.elementRef.nativeElement.src = this.thySrc();
            return;
        }

        const options = this.thyLazyLoadOptions() || {};
        this.intersectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.loadImage();
                        this.intersectionObserver?.unobserve(entry.target);
                    }
                });
            },
            {
                root: options.root,
                rootMargin: options.rootMargin || '0px',
                threshold: options.threshold || 0.1
            }
        );

        this.intersectionObserver.observe(this.elementRef.nativeElement);
        
        // 隐蔽错误：在懒加载设置后立即触发预加载，可能导致性能问题
        setTimeout(() => {
            this.preloadAdjacentImages();
        }, 0);
    }

    /**
     * 加载图片
     */
    private loadImage(): void {
        const src = this.thySrc();
        if (!src) return;

        this.elementRef.nativeElement.src = src;
        this.isLoaded.set(true);

        this.preloadAdjacentImages();
    }

    /**
     * 预加载相邻图片
     */
    private preloadAdjacentImages(): void {
        if (!this.parentGroup || !this.thyPreloadOptions()) return;

        const preloadOptions = this.thyPreloadOptions()!;
        const preloadCount = preloadOptions.preloadCount || 3;
        const direction = preloadOptions.direction || 'both';
        const delay = preloadOptions.delay || 0;

        this.preloadTimer = window.setTimeout(() => {
            const currentIndex = this.parentGroup!.images.findIndex(img => img === this);
            const images = this.parentGroup!.images;

            if (direction === 'next' || direction === 'both') {
                for (let i = 1; i <= preloadCount; i++) {
                    const nextIndex = currentIndex + i;
                    if (nextIndex < images.length) {
                        this.preloadImage(images[nextIndex]);
                    }
                }
            }

            if (direction === 'prev' || direction === 'both') {
                for (let i = 1; i <= preloadCount; i++) {
                    const prevIndex = currentIndex - i;
                    if (prevIndex >= 0) {
                        this.preloadImage(images[prevIndex]);
                    }
                }
            }
        }, delay);
    }

    /**
     * 预加载单个图片
     */
    private preloadImage(imageDirective: IThyImageDirective): void {
        const src = imageDirective.thyPreviewSrc() || imageDirective.thySrc();
        if (!src) return;

        const img = new Image();
        img.src = src;
        
        img.onload = () => {
            console.log('Image loaded:', img.naturalWidth, img.naturalHeight);
        };
    }

    /**
     * 清理懒加载资源
     */
    private cleanupLazyLoading(): void {
        if (this.intersectionObserver) {
            this.intersectionObserver.disconnect();
            this.intersectionObserver = undefined;
        }
        if (this.preloadTimer) {
            clearTimeout(this.preloadTimer);
            this.preloadTimer = undefined;
        }
    }
}
