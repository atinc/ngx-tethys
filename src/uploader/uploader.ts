import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export enum ThyUploadStatus {
    started = 'started',
    uploading = 'uploading',
    done = 'done'
}

export interface ThyUploadResponse {
    status: ThyUploadStatus;
    uploadFile?: ThyUploadFile;
    result?: {
        response?: any;
        responseStatus?: number;
    };
}

export interface ThyUploadFile {
    identifier?: string;
    method: string;
    url: string;
    withCredentials?: Boolean;
    nativeFile: File;
    fileField?: string;
    fileName: string;
    headers?: {
        [key: string]: string
    };
    data?: {
        [key: string]: string
    };

    responseStatus?: any;
    response?: any;
    responseHeaders?: any;

    progress?: {
        status: ThyUploadStatus,
        percentage: number,
        speed?: number;
        speedHuman?: string;
        startTime: number | null;
        endTime?: number | null;
        eta?: number | null;
        etaHuman?: string | null;
    };
}

@Injectable()
export class ThyUploaderService {

    constructor() {
    }

    _secondsToHuman(sec: number): string {
        return new Date(sec * 1000).toISOString().substr(11, 8);
    }

    _humanizeBytes(bytes: number): string {
        if (bytes === 0) {
            return '0 Byte';
        }

        const k = 1024;
        const sizes: string[] = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
        const i: number = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    uploadFile(uploadFile: ThyUploadFile): Observable<ThyUploadResponse> {
        return new Observable(observer => {
            const xhr = new XMLHttpRequest();
            const time: number = new Date().getTime();
            // let progressStartTime: number = (file.progress.data && file.progress.data.startTime) || time;
            let speed = 0;
            let eta: number | null = null;

            if (!uploadFile.progress) {
                uploadFile.progress = {
                    status: ThyUploadStatus.started,
                    percentage: 0,
                    startTime: time
                };
            }

            xhr.upload.addEventListener('progress', (e: ProgressEvent) => {
                if (e.lengthComputable) {
                    let percentage = Math.round((e.loaded * 100) / e.total);
                    if (percentage === 100) {
                        percentage = 99;
                    }
                    const diff = new Date().getTime() - time;
                    speed = Math.round(e.loaded / diff * 1000);
                    const progressStartTime = (uploadFile.progress && uploadFile.progress.startTime) || new Date().getTime();
                    eta = Math.ceil((e.total - e.loaded) / speed);

                    uploadFile.progress.status = ThyUploadStatus.uploading;
                    uploadFile.progress.percentage = percentage;
                    uploadFile.progress.speed = speed;
                    uploadFile.progress.speedHuman = `${this._humanizeBytes(speed)}/s`;
                    uploadFile.progress.startTime = progressStartTime;
                    uploadFile.progress.eta = eta;
                    uploadFile.progress.etaHuman = this._secondsToHuman(eta);

                    observer.next({ status: ThyUploadStatus.uploading, uploadFile: uploadFile });
                }
            }, false);

            xhr.upload.addEventListener('error', (e: Event) => {
                observer.error(e);
                observer.complete();
            });

            xhr.onreadystatechange = () => {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    const speedTime = (new Date().getTime() - uploadFile.progress.startTime) * 1000;
                    const speedAverage = Math.round(uploadFile.nativeFile.size / speedTime);

                    uploadFile.progress.status = ThyUploadStatus.done;
                    uploadFile.progress.percentage = 100;
                    uploadFile.progress.speed = speedAverage;
                    uploadFile.progress.speedHuman = `${this._humanizeBytes(speed)}/s`;
                    uploadFile.progress.eta = eta;
                    uploadFile.progress.etaHuman = this._secondsToHuman(eta || 0);

                    uploadFile.responseStatus = xhr.status;

                    try {
                        uploadFile.response = JSON.parse(xhr.response);
                    } catch (e) {
                        uploadFile.response = xhr.response;
                    }

                    // file.responseHeaders = this.parseResponseHeaders(xhr.getAllResponseHeaders());

                    observer.next({ status: ThyUploadStatus.done, uploadFile: uploadFile });

                    observer.complete();
                }
            };

            xhr.open(uploadFile.method, uploadFile.url, true);
            xhr.withCredentials = uploadFile.withCredentials ? true : false;

            try {
                // const uploadFile = <BlobFile>inputFile.nativeFile;
                // const uploadIndex = this.queue.findIndex(outFile => outFile.nativeFile === uploadFile);

                // if (this.queue[uploadIndex].progress.status === UploadStatus.Cancelled) {
                //     observer.complete();
                // }

                const formData = new FormData();

                Object.keys(uploadFile.data || {}).forEach(key => formData.append(key, uploadFile.data[key]));
                Object.keys(uploadFile.headers || {}).forEach(key => xhr.setRequestHeader(key, uploadFile.headers[key]));

                formData.append(uploadFile.fileField || 'file', uploadFile.nativeFile, uploadFile.fileName);

                observer.next({ status: ThyUploadStatus.started, uploadFile: uploadFile });
                xhr.send(formData);
            } catch (error) {
                observer.error(error);
                observer.complete();
            }

            return () => {
                xhr.abort();
            };
        });

    }
}
