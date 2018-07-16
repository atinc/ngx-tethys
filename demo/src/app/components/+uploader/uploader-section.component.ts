import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ThyUploaderService, ThyUploadStatus, ThyUploadFile } from '../../../../../src';

@Component({
    selector: 'demo-uploader-section',
    templateUrl: './uploader-section.component.html'
})
export class DemoUploaderSectionComponent {

    public apiParameters = [
        {
            property: 'thyOnFileSelect',
            description: '文件选择事件',
            type: 'EventEmitter',
            default: '$event: { files: File[], nativeEvent: Event}'
        },
        {
            property: 'thyMultiple',
            description: '文件是否多选',
            type: 'Boolean',
            default: 'false'
        }
    ];

    queueFiles: ThyUploadFile[] = [];

    constructor(private thyUploaderService: ThyUploaderService) {
    }

    selectFiles(event: { files: File[] }) {
        for (let i = 0; i < event.files.length; i++) {
            this.thyUploaderService.upload({
                nativeFile: event.files[i],
                url: 'http://ngx-uploader.com/upload',
                method: 'POST',
                fileName: '复制粘贴.png'
            }).subscribe((result) => {
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
