import { coerceNumberValue, isNumber } from 'ngx-tethys/util';

import { Component, ElementRef, EventEmitter, Inject, Input, NgZone, Renderer2 } from '@angular/core';

import { ThyFileSelectEvent, ThySizeExceedsHandler } from './types';
import { THY_UPLOAD_DEFAULT_OPTIONS, ThyUploadConfig } from './upload.config';

@Component({
    template: ``
})
export class FileSelectBaseComponent {
    acceptType: string;
    sizeThreshold: number;
    sizeExceedsHandler: ThySizeExceedsHandler;

    @Input() set thySizeThreshold(value: number) {
        const sizeThreshold = coerceNumberValue(value);
        if (isNumber(sizeThreshold)) {
            this.sizeThreshold = sizeThreshold;
        }
    }

    @Input() set thySizeExceedsHandler(value: ThySizeExceedsHandler) {
        if (value) {
            this.sizeExceedsHandler = value;
        }
    }

    constructor(
        public elementRef: ElementRef,
        @Inject(THY_UPLOAD_DEFAULT_OPTIONS) public defaultConfig: ThyUploadConfig,
        public renderer?: Renderer2,
        public ngZone?: NgZone
    ) {
        this.sizeThreshold = defaultConfig.sizeThreshold;
        this.sizeExceedsHandler = defaultConfig.sizeExceedsHandler;
    }

    handleSizeExceeds(event: Event, files: File[]) {
        let sizeExceedsFiles = files.filter(item => item.size / 1024 > this.sizeThreshold);
        if (sizeExceedsFiles.length > 0) {
            const sizeExceedContext = {
                files: files,
                exceedsFiles: sizeExceedsFiles,
                nativeEvent: event,
                sizeThreshold: this.sizeThreshold
            };
            return this.sizeExceedsHandler(sizeExceedContext);
        }
        return files;
    }

    selectFiles(event: Event, files: File[], eventEmitter: EventEmitter<ThyFileSelectEvent>) {
        let successFiles: File[] | void = files;
        if (this.sizeThreshold && this.sizeThreshold > 0) {
            successFiles = this.handleSizeExceeds(event, files);
        }
        if (successFiles) {
            eventEmitter.emit({
                files: successFiles,
                nativeEvent: event
            });
        }
    }
}
