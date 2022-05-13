export interface ThyImageMeta {
    name?: string;
    size?: number;
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

export class ThyImagePreviewOptions {
    closeOnNavigation?: boolean = true;
    disableClose?: boolean;
    disableKeyboardSelectable?: boolean;
    zoom?: number;
    rotate?: number;
}
