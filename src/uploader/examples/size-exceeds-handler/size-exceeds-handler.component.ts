import { Component, ViewChild, ElementRef } from '@angular/core';
import { ThyUploaderService, ThyUploadStatus, ThyUploadFile, ThyNotifyService, ThyFileSizeExceedsContext } from 'ngx-tethys';

@Component({
    selector: 'app-uploader-size-exceeds-handler-example',
    templateUrl: './size-exceeds-handler.component.html'
})
export class ThyUploaderSizeExceedsHandlerExampleComponent {
    sizeThreshold = 10;

    constructor(private notifyService: ThyNotifyService) {}

    selectFiles(event: { files: File[] }) {}

    sizeExceedsHandler = (event: ThyFileSizeExceedsContext) => {
        if (event.exceedsFiles.length > 0) {
            this.notifyService.warning('提示', `不支持上传 ${event.sizeThreshold / 1024}M 以上附件。`);
        }
    };
}
