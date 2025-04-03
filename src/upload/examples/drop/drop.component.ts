import { ThyUploadFile, ThyUploadService, ThyUploadStatus } from 'ngx-tethys/upload';

import { Component, inject } from '@angular/core';
import { ThyNotifyService } from 'ngx-tethys/notify';

const UPLOAD_URL = `http://www.mocky.io/v2/5cf52b1f2f0000c02c4f072f?mocky-delay=2s`;
@Component({
    selector: 'app-upload-drop-example',
    templateUrl: './drop.component.html',
    styleUrls: ['./drop.scss']
})
export class ThyUploadDropExampleComponent {
    private thyUploadService = inject(ThyUploadService);
    private notify = inject(ThyNotifyService);

    queueFiles: ThyUploadFile[] = [];

    onDrop(event: { files: File[] }) {
        for (let i = 0; i < event.files.length; i++) {
            this.thyUploadService
                .upload({
                    nativeFile: event.files[i],
                    url: UPLOAD_URL,
                    method: 'POST',
                    fileName: event.files[i].name
                })
                .subscribe(result => {
                    if (result.status === ThyUploadStatus.started) {
                        this.queueFiles.push(result.uploadFile);
                    } else if (result.status === ThyUploadStatus.done) {
                        const index = this.queueFiles.indexOf(result.uploadFile);
                        this.queueFiles.splice(index);
                    }
                });
        }
    }

    public mdDrop(event: { files: File[] }) {}

    public filesRejected(files: File[]) {
        this.notify.warning('文件类型不符合', files.map(item => item.name).join(',') + '不符合类型');
    }
}
