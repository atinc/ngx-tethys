import { ThyFileSelect, ThyUploadFile, ThyUploadService, ThyUploadStatus } from 'ngx-tethys/upload';
import { Component, inject, signal } from '@angular/core';
import { ThyProgress } from 'ngx-tethys/progress';
import { ThyButton } from 'ngx-tethys/button';

const UPLOAD_URL = `https://www.mocky.io/v2/5cf52b1f2f0000c02c4f072f?mocky-delay=2s`;
// const UPLOAD_URL = `https://run.mocky.io/v3/33ec533f-3558-4689-bdbe-cc30364aa137`;
@Component({
    selector: 'app-upload-basic-example',
    templateUrl: './basic.component.html',
    imports: [ThyFileSelect, ThyButton, ThyProgress]
})
export class ThyUploadBasicExampleComponent {
    private thyUploadService = inject(ThyUploadService);

    queueFiles = signal<ThyUploadFile[]>([]);

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
        this.thyUploadService.uploadBulk(uploadFiles).subscribe(
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
