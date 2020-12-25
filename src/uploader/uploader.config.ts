import { InjectionToken } from '@angular/core';
import { ErrorData } from './constant';

export interface ThyUploaderConfig {
    thySizeThreshold?: number;
    thySizeExceedsHandler?: (event: ErrorData) => {};
}

export const THY_UPLOADER_DEFAULT_OPTIONS = new InjectionToken<ThyUploaderConfig>('thy-uploader-default-options');

export const THY_UPLOADER_DEFAULT_OPTIONS_PROVIDER = {
    provide: THY_UPLOADER_DEFAULT_OPTIONS,
    useFactory: () => {
        return {
            thySizeThreshold: 0,
            thySizeExceedsHandler: (event: ErrorData) => {
                console.error('size exceeds', event);
            }
        };
    }
};
