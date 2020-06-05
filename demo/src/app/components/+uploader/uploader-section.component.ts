import { Component, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ThyUploaderService, ThyUploadStatus, ThyUploadFile } from '../../../../../src/public-api';

const UPLOAD_URL = `http://www.mocky.io/v2/5cf52b1f2f0000c02c4f072f?mocky-delay=2s`;
@Component({
    selector: 'demo-uploader-section',
    templateUrl: './uploader-section.component.html'
})
export class DemoUploaderSectionComponent {
    @ViewChild('file1', { static: true }) file1: ElementRef<HTMLInputElement>;

    demoType = '1';

    multiple = false;

    acceptFolder = false;

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
                        this.queueFiles2.push(result.uploadFile);
                    } else if (result.status === ThyUploadStatus.done) {
                        const index = this.queueFiles2.indexOf(result.uploadFile);
                        this.queueFiles2.splice(index);
                    }
                });
        }
    }
}
