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

export interface ThyImagePreviewOptions {
    closeOnNavigation?: boolean;
    disableClose?: boolean;
    disableKeyboardSelectable?: boolean;
    zoom?: number;
    rotate?: number;
    operations?: ThyImagePreviewOperationType[];
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
