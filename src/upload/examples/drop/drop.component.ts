import { ThyFileDropDirective, ThyUploadFile, ThyUploadService, ThyUploadStatus } from 'ngx-tethys/upload';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ThyNotifyService } from 'ngx-tethys/notify';
import { ThyProgress } from 'ngx-tethys/progress';

const UPLOAD_URL = `http://www.mocky.io/v2/5cf52b1f2f0000c02c4f072f?mocky-delay=2s`;
@Component({
    selector: 'app-upload-drop-example',
    templateUrl: './drop.component.html',
    styleUrls: ['./drop.scss'],
    imports: [ThyFileDropDirective, ThyProgress]
})
export class ThyUploadDropExampleComponent {
    private thyUploadService = inject(ThyUploadService);
    private notify = inject(ThyNotifyService);

    queueFiles: WritableSignal<ThyUploadFile[]> = signal([]);

    onDrop(event: { files: File[] }) {
        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for (let i = 0; i < event.files.length; i++) {
            this.thyUploadService
                .upload({
                    nativeFile: event.files[i],
                    url: UPLOAD_URL,
                    method: 'POST',
                    fileName: event.files[i].name
                })
                .subscribe(result => {
                    const uploadFile = result.uploadFile!;
                    if (result.status === ThyUploadStatus.started) {
                        this.queueFiles.update(files => [...files, uploadFile]);
                    } else if (result.status === ThyUploadStatus.uploading) {
                        this.queueFiles.update(files => files.map(item => (item === uploadFile ? uploadFile : item)));
                    } else if (result.status === ThyUploadStatus.done) {
                        this.queueFiles.update(files => files.filter(item => item !== uploadFile));
                    }
                });
        }
    }

    public mdDrop(event: { files: File[] }) {}

    public filesRejected(files: File[]) {
        this.notify.warning('文件类型不符合', `${files.map(item => item.name).join(',')}不符合类型`);
    }
}
