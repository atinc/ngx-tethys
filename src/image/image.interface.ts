export interface ThyImageMetaInfo {
    name?: string;
    size?: number;
}

export interface ThyImageInfo extends ThyImageMetaInfo {
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
    keyboard?: boolean = true;
    backdropClosable?: boolean = true;
    closeOnNavigation?: boolean = true;
    zoom?: number;
    rotate?: number;
}
