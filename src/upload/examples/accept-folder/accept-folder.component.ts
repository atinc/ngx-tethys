import { ThyFileSelect, ThyUploadFile, ThyUploadService, ThyUploadStatus } from 'ngx-tethys/upload';

import { Component, ElementRef, ViewChild, inject, signal } from '@angular/core';
import { ThyButton } from 'ngx-tethys/button';
import { ThyProgress } from 'ngx-tethys/progress';

const UPLOAD_URL = `http://www.mocky.io/v2/5cf52b1f2f0000c02c4f072f?mocky-delay=2s`;
@Component({
    selector: 'app-upload-accept-folder-example',
    templateUrl: './accept-folder.component.html',
    imports: [ThyFileSelect, ThyButton, ThyProgress]
})
export class ThyUploadAcceptFolderExampleComponent {
    private thyUploadService = inject(ThyUploadService);

    @ViewChild('file1', { static: true }) file1: ElementRef<HTMLInputElement>;
    queueFiles = signal<ThyUploadFile[]>([]);
    acceptFolder = true;

    selectFiles(event: { files: File[] }) {
        this.thyUploadService
            .upload({
                nativeFile: event.files[0],
                url: UPLOAD_URL,
                method: 'POST',
                fileName: '复制粘贴.png',
                withCredentials: true
            })
            .subscribe(
                result => {
                    const uploadFile = result.uploadFile!;
                    if (result.status === ThyUploadStatus.started) {
                        console.log(`started: ${uploadFile.fileName}`);
                        this.queueFiles.update(files => [...files, uploadFile]);
                    } else if (result.status === ThyUploadStatus.uploading) {
                        this.queueFiles.update(files => files.map(item => (item === uploadFile ? uploadFile : item)));
                    } else if (result.status === ThyUploadStatus.done) {
                        console.log(`done: ${uploadFile.fileName}`);
                        this.queueFiles.update(files => files.filter(item => item !== uploadFile));
                    }
                },
                error => {
                    console.log(error);
                }
            );
    }
}
