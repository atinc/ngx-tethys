import { Directive, ElementRef, InjectFlags, OnInit, Injector, OnDestroy, AfterViewInit, inject, input, effect, Output, EventEmitter } from '@angular/core';
import { IThyImageDirective, IThyImageGroupComponent, THY_IMAGE_GROUP_COMPONENT } from './image.token';
import { ThyImageMeta } from './image.class';
import { ThyImageService } from './image.service';
import { coerceBooleanProperty, ThyBooleanInput } from 'ngx-tethys/util';

/**
 * thyLazyImage: 懒加载图片指令，只可绑定到 img 标签上
 * @name img[thyLazyImage]
 * @order 20
 */
@Directive({
    selector: 'img[thyLazyImage]',
    exportAs: 'thyLazyImage',
    host: {
        '(click)': 'onPreview($event)',
        class: 'thy-lazy-image',
        '[class.thy-lazy-image-loaded]': 'isLoaded',
        '[class.thy-lazy-image-error]': 'hasError'
    }
})
export class ThyLazyImageDirective implements IThyImageDirective, OnInit, AfterViewInit, OnDestroy {
    private thyImageService = inject(ThyImageService);
    private injector = inject(Injector);
    private elementRef = inject(ElementRef);

    /**
     * 图片地址
     */
    readonly thySrc = input<string>();

    /**
     * 懒加载占位图片地址
     */
    readonly thyPlaceholder = input<string>('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y1ZjVmNSIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+5Yqg6L295Lit</text></svg>');

    /**
     * 错误占位图片地址
     */
    readonly thyErrorPlaceholder = input<string>('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2ZmZjVmNSIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjZmY2NjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+5Yqg6L295Lit</text></svg>');

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
     * 懒加载根元素，默认为 window
     */
    readonly thyRoot = input<Element | null>(null);

    /**
     * 懒加载根边距，默认为 '0px'
     */
    readonly thyRootMargin = input<string>('0px');

    /**
     * 懒加载阈值，默认为 0.1
     */
    readonly thyThreshold = input<number>(0.1);

    /**
     * 是否启用懒加载
     * @default true
     */
    readonly thyLazyEnabled = input<boolean, ThyBooleanInput>(true, { transform: coerceBooleanProperty });

    /**
     * 图片加载完成事件
     */
    @Output() thyImageLoaded = new EventEmitter<string>();

    /**
     * 图片加载错误事件
     */
    @Output() thyImageError = new EventEmitter<Error>();

    get previewable(): boolean {
        return !this.thyDisablePreview();
    }

    get isLoaded(): boolean {
        return this._isLoaded;
    }

    get hasError(): boolean {
        return this._hasError;
    }

    private parentGroup: IThyImageGroupComponent;
    private _isLoaded = false;
    private _hasError = false;
    private intersectionObserver?: IntersectionObserver;
    private imageElement: HTMLImageElement;

    constructor() {
        this.imageElement = this.elementRef.nativeElement;
        
        effect(() => {
            if (this.thyLazyEnabled()) {
                this.imageElement.src = this.thySrc() || this.thyPlaceholder();
            }
        });
    }

    ngOnInit(): void {
        this.getParentGroup();
        this.setupIntersectionObserver();
    }

    ngAfterViewInit(): void {
        if (this.parentGroup) {
            this.addParentImage();
        }
        this.startObserving();
    }

    private setupIntersectionObserver(): void {
        if (typeof IntersectionObserver === 'undefined') {
            console.warn('IntersectionObserver is not supported');
            return;
        }

        const options: IntersectionObserverInit = {
            root: this.thyRoot(),
            rootMargin: this.thyRootMargin(),
            threshold: this.thyThreshold()
        };

        this.intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadImage();
                    this.stopObserving();
                }
            });
        }, options);
    }

    private startObserving(): void {
        if (this.intersectionObserver) {
            this.intersectionObserver.observe(this.imageElement);
        }
    }

    private stopObserving(): void {
        if (this.intersectionObserver) {
            this.intersectionObserver.unobserve(this.imageElement);
        }
    }

    private loadImage(): void {
        const src = this.thySrc();
        if (!src) {
            return;
        }

        const img = new Image();
        
        img.onload = () => {
            this._isLoaded = true;
            this._hasError = false;
            this.imageElement.src = src;
            this.thyImageLoaded.emit(src);
        };

        img.onerror = (error) => {
            this._hasError = true;
            this._isLoaded = false;
            this.imageElement.src = this.thyErrorPlaceholder();
            this.thyImageError.emit(new Error(`Failed to load image: ${src}`));
        };

        img.src = src;
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
            const images = parentElement.querySelectorAll('img[thyLazyImage]');
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
        this.stopObserving();
        if (this.intersectionObserver) {
            this.intersectionObserver.disconnect();
        }
        if (this.parentGroup) {
            const index = this.parentGroup.images.findIndex(item => item === this);
            this.parentGroup.removeImage(index);
        }
    }
}
