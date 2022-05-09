import { InjectionToken } from '@angular/core';
import { ThyFileSizeExceedsContext, ThySizeExceedsHandler } from './types';

export interface ThyUploaderConfig {
    sizeThreshold?: number;
    sizeExceedsHandler?: ThySizeExceedsHandler;
}

export const THY_UPLOADER_DEFAULT_OPTIONS = new InjectionToken<ThyUploaderConfig>('thy-uploader-default-options');

export const THY_UPLOADER_DEFAULT_OPTIONS_PROVIDER = {
    provide: THY_UPLOADER_DEFAULT_OPTIONS,
    useValue: {
        sizeThreshold: 0,
        sizeExceedsHandler: sizeExceedsHandler
    }
};

export function sizeExceedsHandler(event: ThyFileSizeExceedsContext): void {
    if (typeof ngDevMode === 'undefined' || ngDevMode) {
        const exceedsFilesMessage = event.exceedsFiles
            .map(item => {
                return `file: ${item.name}, size: ${item.size}`;
            })
            .join(',');
        console.error(`some files(${exceedsFilesMessage}) size exceeds threshold ${event.sizeThreshold}`);
    }
}
