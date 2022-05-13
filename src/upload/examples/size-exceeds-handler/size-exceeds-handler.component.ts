import { ThyNotifyService } from 'ngx-tethys/notify';
import { ThyFileSizeExceedsContext } from 'ngx-tethys/upload';

import { Component } from '@angular/core';

@Component({
    selector: 'app-upload-size-exceeds-handler-example',
    templateUrl: './size-exceeds-handler.component.html'
})
export class ThyUploadSizeExceedsHandlerExampleComponent {
    sizeThreshold = 10;

    constructor(private notifyService: ThyNotifyService) {}

    selectFiles(event: { files: File[] }) {}

    sizeExceedsHandler = (event: ThyFileSizeExceedsContext) => {
        if (event.exceedsFiles.length > 0) {
            this.notifyService.warning('提示', `不支持上传 ${event.sizeThreshold / 1024}M 以上附件。`);
        }
    };
}
