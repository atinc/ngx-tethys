import { Inject, ElementRef, Renderer2, NgZone } from '@angular/core';
import { THY_UPLOADER_DEFAULT_OPTIONS, ThyUploaderConfig } from './uploader.config';
import { ThySizeExceedsHandler } from './types';

export abstract class FileSelectBaseComponent {
    constructor(
        public elementRef: ElementRef,
        @Inject(THY_UPLOADER_DEFAULT_OPTIONS) public defaultConfig: ThyUploaderConfig,
        public renderer?: Renderer2,
        public ngZone?: NgZone
    ) {}

    handleSizeExceeds(data: { sizeThreshold: number; files: File[]; event: Event }, thySizeExceedsHandler?: ThySizeExceedsHandler) {
        let filterFile = Array.from(data.files).filter(item => item.size / 1024 <= data.sizeThreshold);
        if (filterFile.length < data.files.length) {
            const sizeExceedData = {
                files: Array.from(data.files),
                exceedsFiles: Array.from(data.files).filter(item => item.size / 1024 > data.sizeThreshold),
                nativeEvent: data.event,
                sizeThreshold: data.sizeThreshold
            };
            if (thySizeExceedsHandler) {
                thySizeExceedsHandler(sizeExceedData);
            } else {
                this.defaultConfig.sizeExceedsHandler(sizeExceedData);
            }
        }
        return filterFile;
    }
}
