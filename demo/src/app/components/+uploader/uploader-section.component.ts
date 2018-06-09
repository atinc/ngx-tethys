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
            property: 'thyNodes',
            description: 'Tree展现所需的数据',
            type: 'Object[]',
            default: ''
        }
    ];

    queueFiles: ThyUploadFile[] = [];

    constructor(private thyUploaderService: ThyUploaderService) {
    }

    selectFiles(event: { files: File[] }) {
        const files = event.files;
        this.thyUploaderService.uploadFile({
            nativeFile: files[0],
            url: 'http://ngx-uploader.com/upload',
            method: 'POST',
            fileName: '复制粘贴.png'
        }).subscribe((result) => {
            if (result.status === ThyUploadStatus.started) {
                this.queueFiles.push(result.uploadFile);
            } else if (result.status === ThyUploadStatus.done) {
                this.queueFiles.slice(this.queueFiles.indexOf(result.uploadFile));
            }
        });
    }
}
