import { InjectionToken } from '@angular/core';
import { ThyFileSizeExceedsContext } from './types';

export interface ThyUploaderConfig {
    sizeThreshold?: number;
    sizeExceedsHandler?: (event: ThyFileSizeExceedsContext) => {};
}

export const THY_UPLOADER_DEFAULT_OPTIONS = new InjectionToken<ThyUploaderConfig>('thy-uploader-default-options');

export const THY_UPLOADER_DEFAULT_OPTIONS_PROVIDER = {
    provide: THY_UPLOADER_DEFAULT_OPTIONS,
    useValue: {
        sizeThreshold: 0,
        sizeExceedsHandler: sizeExceedsHandler
    }
};

export function sizeExceedsHandler(event: ThyFileSizeExceedsContext) {
    const exceedsFilesMessage = event.exceedsFiles.map(item => {
        return `file: ${item}, size: ${item.size}`;
    });
    console.error(`some files(${exceedsFilesMessage}) size exceeds threshold ${event.sizeThreshold}`);
}
