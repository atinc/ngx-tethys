import { isNumber } from 'ngx-tethys/util';
import { Directive, ElementRef, numberAttribute, input, OutputEmitterRef, inject } from '@angular/core';
import { ThyFileSelectEvent, ThySizeExceedsHandler } from './types';
import { THY_UPLOAD_DEFAULT_OPTIONS, ThyUploadConfig } from './upload.config';
import { mimeTypeConvert } from './util';

/**
 * @private
 */
@Directive()
export class FileSelectBaseDirective {
    public elementRef: ElementRef = inject(ElementRef);

    public defaultConfig: ThyUploadConfig = inject(THY_UPLOAD_DEFAULT_OPTIONS);

    readonly thySizeThreshold = input(this.defaultConfig.sizeThreshold, {
        transform: (inputValue: string | number) => {
            const sizeThreshold = numberAttribute(inputValue);
            if (isNumber(sizeThreshold)) {
                return sizeThreshold;
            }
            return this.defaultConfig.sizeThreshold;
        }
    });

    readonly thySizeExceedsHandler = input(this.defaultConfig.sizeExceedsHandler, {
        transform: (inputValue: ThySizeExceedsHandler) => {
            if (inputValue) {
                return inputValue;
            }
            return this.defaultConfig.sizeExceedsHandler;
        }
    });

    /**
     * 指定文件后缀类型（MIME_Map），例如".xls,xlsx"，"[".doc",".docx"]"
     */
    thyAcceptType = input(mimeTypeConvert(this.defaultConfig.acceptType!), {
        transform: (inputValue: string[] | string) => {
            return mimeTypeConvert(inputValue);
        }
    });

    constructor() {}

    handleSizeExceeds(event: Event, files: File[]) {
        const sizeExceedsFiles = files.filter(item => item.size / 1024 > this.thySizeThreshold()!);
        if (sizeExceedsFiles.length > 0) {
            const sizeExceedContext = {
                files: files,
                exceedsFiles: sizeExceedsFiles,
                nativeEvent: event,
                sizeThreshold: this.thySizeThreshold()
            };
            return this.thySizeExceedsHandler()!(sizeExceedContext);
        }
        return files;
    }

    selectFiles(event: Event, files: File[], eventEmitter: OutputEmitterRef<ThyFileSelectEvent>) {
        let successFiles: File[] | void = files;
        if (this.thySizeThreshold() && this.thySizeThreshold()! > 0) {
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
