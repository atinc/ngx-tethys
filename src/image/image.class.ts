import { SafeUrl } from '@angular/platform-browser';

export interface ThyImageMeta {
    name?: string;
    size?: string | number;
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
}

export interface ThyImagePreviewOperation {
    icon: string;
    name: string;
    action?: (image: ThyImageInfo) => void;
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
