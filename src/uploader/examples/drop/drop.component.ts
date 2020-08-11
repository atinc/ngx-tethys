import { Component } from '@angular/core';
import { ThyUploaderService, ThyUploadStatus, ThyUploadFile } from 'ngx-tethys';

const UPLOAD_URL = `http://www.mocky.io/v2/5cf52b1f2f0000c02c4f072f?mocky-delay=2s`;
@Component({
    selector: 'app-uploader-drop-example',
    templateUrl: './drop.component.html',
    styleUrls: ['./drop.scss']
})
export class ThyUploaderDropExampleComponent {
    queueFiles: ThyUploadFile[] = [];
    constructor(private thyUploaderService: ThyUploaderService) {}

    onDrop(event: { files: File[] }) {
        for (let i = 0; i < event.files.length; i++) {
            this.thyUploaderService
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
}
