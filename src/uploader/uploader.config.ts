import { InjectionToken } from '@angular/core';
import { ThyFileSizeExceedsContext } from './types';

export interface ThyUploaderConfig {
    thySizeThreshold?: number;
    thySizeExceedsHandler?: (event: ThyFileSizeExceedsContext) => {};
}

export const THY_UPLOADER_DEFAULT_OPTIONS = new InjectionToken<ThyUploaderConfig>('thy-uploader-default-options');

export const THY_UPLOADER_DEFAULT_OPTIONS_PROVIDER = {
    provide: THY_UPLOADER_DEFAULT_OPTIONS,
    useValue: {
        thySizeThreshold: 0,
        thySizeExceedsHandler: (event: ThyFileSizeExceedsContext) => {
            event.exceedsFiles.forEach((item: File) => {
                console.error('file size exceeds', item, item.size);
            });
        }
    }
};
