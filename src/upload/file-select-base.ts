import { isNumber, coerceNumberValue, isUndefinedOrNull } from 'ngx-tethys/util';
import { Inject, ElementRef, Renderer2, NgZone, Input, EventEmitter, Component, Injectable } from '@angular/core';
import { THY_UPLOADER_DEFAULT_OPTIONS, ThyUploaderConfig } from './uploader.config';
import { ThyFileSelectEvent, ThySizeExceedsHandler } from './types';

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
        @Inject(THY_UPLOADER_DEFAULT_OPTIONS) public defaultConfig: ThyUploaderConfig,
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
