import { SafeUrl } from '@angular/platform-browser';

export interface ThyImageMeta {
    name?: string;
    size?: string | number;
}

export interface ThyImageLazyLoadOptions {
    /** 懒加载根元素，默认为视口 */
    root?: Element | null;
    /** 懒加载根边距，用于提前触发加载 */
    rootMargin?: string;
    /** 懒加载阈值，0-1之间 */
    threshold?: number | number[];
}

export interface ThyImagePreloadOptions {
    /** 预加载图片数量，默认为3 */
    preloadCount?: number;
    /** 预加载方向，'next' | 'prev' | 'both' */
    direction?: 'next' | 'prev' | 'both';
    /** 预加载延迟时间（毫秒） */
    delay?: number;
}

export interface ThyImageInfo extends ThyImageMeta {
    src: string;
    width?: string | number;
    height?: string | number;
    alt?: string;
    origin?: {
        src: string;
        width?: string | number;
        height?: string | number;
        alt?: string;
    };
}

export interface InternalImageInfo extends ThyImageInfo {
    objectURL?: SafeUrl;
    blob?: Blob;
}

export interface ThyImagePreviewOptions {
    closeOnNavigation?: boolean;
    disableClose?: boolean;
    disableKeyboardSelectable?: boolean;
    zoom?: number;
    rotate?: number;
    operations?: (ThyImagePreviewOperationType | ThyImagePreviewOperation)[];
    resolveSize?: boolean;
    /** 懒加载配置 */
    lazyLoad?: ThyImageLazyLoadOptions;
    /** 预加载配置 */
    preload?: ThyImagePreloadOptions;
}

export interface ThyImagePreviewOperation {
    icon: string;
    name: string;
    action?: (image?: ThyImageInfo) => void;
    type?: ThyImagePreviewOperationType;
}

export type ThyImagePreviewMode = 'original-scale' | 'fit-screen';

export type ThyImagePreviewOperationType =
    | 'zoom-out'
    | 'zoom-in'
    | 'rotate-right'
    | 'download'
    | ThyImagePreviewMode
    | 'copyLink'
    | 'view-original'
    | 'full-screen';
