import { Component, ViewChild, ElementRef } from '@angular/core';
import { ThyUploaderService, ThyUploadStatus, ThyUploadFile, ThyNotifyService, ThyFileSizeExceedsContext } from 'ngx-tethys';

const UPLOAD_URL = `http://www.mocky.io/v2/5cf52b1f2f0000c02c4f072f?mocky-delay=2s`;
// const UPLOAD_URL = `https://run.mocky.io/v3/33ec533f-3558-4689-bdbe-cc30364aa137`;
@Component({
    selector: 'app-uploader-basic-example',
    templateUrl: './basic.component.html'
})
export class ThyUploaderBasicExampleComponent {
    sizeThreshold = 0;
    multiple = false;
    queueFiles: ThyUploadFile[] = [];

    constructor(private thyUploaderService: ThyUploaderService, private notifyService: ThyNotifyService) {}

    selectFiles(event: { files: File[] }) {
        const uploadFiles = event.files.map(file => {
            return {
                nativeFile: file,
                url: UPLOAD_URL,
                method: 'POST',
                fileName: file.name,
                withCredentials: true
            };
        });
        this.thyUploaderService.uploadBulk(uploadFiles).subscribe(
            result => {
                if (result.status === ThyUploadStatus.started) {
                    console.log(`started: ${result.uploadFile.fileName}`);
                    this.queueFiles.push(result.uploadFile);
                } else if (result.status === ThyUploadStatus.done) {
                    console.log(`done: ${result.uploadFile.fileName}`);
                    const index = this.queueFiles.indexOf(result.uploadFile);
                    if (index > -1) {
                        this.queueFiles.splice(index, 1);
                    }
                }
            },
            error => {
                console.log(error);
            }
        );
    }

    sizeExceedsHandler = (event: ThyFileSizeExceedsContext) => {
        if (event.exceedsFiles.length > 0) {
            this.notifyService.warning('提示', `不支持上传${event.sizeThreshold / 1024}M以上附件。`);
        }
    };
}
