import { Component, ViewChild, ElementRef } from '@angular/core';
import { ThyUploaderService, ThyUploadStatus, ThyUploadFile } from 'ngx-tethys';

const UPLOAD_URL = `http://www.mocky.io/v2/5cf52b1f2f0000c02c4f072f?mocky-delay=2s`;
@Component({
    selector: 'app-uploader-accept-folder-example',
    templateUrl: './accept-folder.component.html'
})
export class ThyUploaderAcceptFolderExampleComponent {
    @ViewChild('file1', { static: true }) file1: ElementRef<HTMLInputElement>;
    queueFiles: ThyUploadFile[] = [];
    acceptFolder = true;
    constructor(private thyUploaderService: ThyUploaderService) {}

    selectFiles(event: { files: File[] }) {
        this.thyUploaderService
            .upload({
                nativeFile: event.files[0],
                url: UPLOAD_URL,
                method: 'POST',
                fileName: '复制粘贴.png',
                withCredentials: true
            })
            .subscribe(
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
}
