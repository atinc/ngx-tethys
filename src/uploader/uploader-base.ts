import { ERROR_TYPES, ErrorData } from './constant';
import { Inject, ElementRef, Renderer2, NgZone } from '@angular/core';
import { THY_UPLOADER_DEFAULT_OPTIONS, ThyUploaderConfig } from './uploader.config';

export abstract class UploaderBase {
    constructor(
        public elementRef: ElementRef,
        @Inject(THY_UPLOADER_DEFAULT_OPTIONS) public defaultConfig: ThyUploaderConfig,
        public renderer?: Renderer2,
        public ngZone?: NgZone
    ) {}

    handleSizeExceeds(
        data: { sizeThreshold: number; files: File[]; event: Event },
        thySizeExceedsHandler?: (sizeExceedData: ErrorData) => {}
    ) {
        let filterFile = Array.from(data.files).filter(item => item.size / 1024 <= data.sizeThreshold);
        if (filterFile.length < data.files.length) {
            const sizeExceedData = {
                type: ERROR_TYPES.size_limit_exceeds,
                data: {
                    exceedsFiles: Array.from(data.files).filter(item => item.size / 1024 > data.sizeThreshold),
                    nativeEvent: data.event,
                    sizeThreshold: data.sizeThreshold
                }
            };
            if (thySizeExceedsHandler) {
                thySizeExceedsHandler(sizeExceedData);
            } else {
                this.defaultConfig.thySizeExceedsHandler(sizeExceedData);
            }
        }
        return filterFile;
    }
}
