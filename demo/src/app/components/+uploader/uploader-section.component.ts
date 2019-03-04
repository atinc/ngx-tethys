import { Component, ViewChild, ElementRef } from '@angular/core';
import { OnInit } from '@angular/core';
import {
    ThyUploaderService,
    ThyUploadStatus,
    ThyUploadFile
} from '../../../../../src/public-api';

@Component({
    selector: 'demo-uploader-section',
    templateUrl: './uploader-section.component.html'
})
export class DemoUploaderSectionComponent {
    @ViewChild('file1') file1: ElementRef<HTMLInputElement>;

    demoType = '1';

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
        },
        {
            property: 'thyAcceptType',
            description: `指定文件后缀类型（MIME_Map），例如".xls,xlsx"，"['.doc','.docx']"`,
            type: 'string | string[]',
            default: ''
        }
    ];

    queueFiles: ThyUploadFile[] = [];

    queueFiles2: ThyUploadFile[] = [];

    constructor(private thyUploaderService: ThyUploaderService) {}

    selectFiles(event: { files: File[] }) {
        for (let i = 0; i < event.files.length; i++) {
            this.thyUploaderService
                .upload({
                    nativeFile: event.files[i],
                    url: 'http://ngx-uploader.com/upload',
                    method: 'POST',
                    fileName: '复制粘贴.png'
                })
                .subscribe(
                    result => {
                        if (result.status === ThyUploadStatus.started) {
                            this.queueFiles.push(result.uploadFile);
                        } else if (result.status === ThyUploadStatus.done) {
                            const index = this.queueFiles.indexOf(
                                result.uploadFile
                            );
                            this.queueFiles.splice(index);
                        }
                    },
                    error => {
                        console.log(error);
                    }
                );
        }
    }

    onDrop(event: { files: File[] }) {
        for (let i = 0; i < event.files.length; i++) {
            this.thyUploaderService
                .upload({
                    nativeFile: event.files[i],
                    url: 'http://ngx-uploader.com/upload',
                    method: 'POST',
                    fileName: event.files[i].name
                })
                .subscribe(result => {
                    if (result.status === ThyUploadStatus.started) {
                        this.queueFiles2.push(result.uploadFile);
                    } else if (result.status === ThyUploadStatus.done) {
                        const index = this.queueFiles2.indexOf(
                            result.uploadFile
                        );
                        this.queueFiles2.splice(index);
                    }
                });
        }
    }
}
