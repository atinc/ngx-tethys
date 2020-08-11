import { Component, ViewChild, ElementRef } from '@angular/core';
import { ThyUploaderService, ThyUploadStatus, ThyUploadFile } from 'ngx-tethys';

const UPLOAD_URL = `http://www.mocky.io/v2/5cf52b1f2f0000c02c4f072f?mocky-delay=2s`;
@Component({
    selector: 'app-uploader-multiple-example',
    templateUrl: './multiple.component.html'
})
export class ThyUploaderMultipleExampleComponent {
    @ViewChild('file1', { static: true }) file1: ElementRef<HTMLInputElement>;
    queueFiles: ThyUploadFile[] = [];
    multiple = true;
    constructor(private thyUploaderService: ThyUploaderService) {}

    selectFiles(event: { files: File[] }) {
        if (this.multiple) {
            const uploadFiles: ThyUploadFile[] = Array.from(event.files).map((file, index) => {
                return {
                    nativeFile: file,
                    url: UPLOAD_URL,
                    method: 'POST',
                    fileName: file.name || '复制粘贴.png',
                    withCredentials: true
                };
            });
            this.thyUploaderService.uploadBulk(uploadFiles, 2).subscribe(
                result => {
                    if (result.status === ThyUploadStatus.started) {
                        console.log(`started: ${result.uploadFile.fileName}`);
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
                },
                () => {
                    console.log(`all completed`);
                }
            );
            uploadFiles.forEach(uploadFile => {
                this.queueFiles.push(uploadFile);
            });
        } else {
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
}
