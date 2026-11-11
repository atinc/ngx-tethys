import { ThyNotifyService } from 'ngx-tethys/notify';
import { ThyFileSelect, ThyFileSizeExceedsContext } from 'ngx-tethys/upload';
import { Component, inject } from '@angular/core';
import { ThyButton } from 'ngx-tethys/button';

@Component({
    selector: 'app-upload-size-exceeds-handler-example',
    templateUrl: './size-exceeds-handler.component.html',
    imports: [ThyFileSelect, ThyButton]
})
export class ThyUploadSizeExceedsHandlerExampleComponent {
    private notifyService = inject(ThyNotifyService);

    sizeThreshold = 10;

    selectFiles(event: { files: File[] }) {}

    sizeExceedsHandler = (event: ThyFileSizeExceedsContext) => {
        if (event.exceedsFiles.length > 0) {
            this.notifyService.warning('提示', `不支持上传 ${event.sizeThreshold / 1024}M 以上附件。`);
        }
    };
}
