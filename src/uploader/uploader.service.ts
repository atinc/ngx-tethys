import { Injectable } from '@angular/core';
import { Observable, Subject, Subscriber, from } from 'rxjs';
import { coerceArray } from 'ngx-tethys/util/helpers';
import { map, tap, mergeMap } from 'rxjs/operators';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';

export enum ThyUploadStatus {
    pending = 'pending',
    started = 'started',
    uploading = 'uploading',
    done = 'done'
}

export interface ThyUploadResponse {
    status: ThyUploadStatus;
    uploadFile?: ThyUploadFile;
}

export interface ThyUploadFile {
    identifier?: string;
    method: string;
    url: string;
    withCredentials?: boolean;
    nativeFile: File;
    fileField?: string;
    fileName?: string;
    headers?: {
        [key: string]: string;
    };
    data?: {
        [key: string]: string;
    };

    responseStatus?: any;
    response?: any;
    responseHeaders?: any;

    progress?: {
        status: ThyUploadStatus;
        percentage: number;
        speed?: number;
        speedHuman?: string;
        startTime: number | null;
        endTime?: number | null;
        estimatedTime?: number | null;
        estimatedTimeHuman?: string | null;
    };
}

export interface ThyUploadFilesOptions {
    onStarted?: (item: ThyUploadFile) => void;
    onDone?: (item: ThyUploadFile) => void;
}

@Injectable()
export class ThyUploaderService {
    constructor(private http: HttpClient) {}

    private secondsToHuman(sec: number): string {
        return new Date(sec * 1000).toISOString().substr(11, 8);
    }

    private humanizeBytes(bytes: number): string {
        if (bytes === 0) {
            return '0 Byte';
        }

        const k = 1024;
        const sizes: string[] = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
        const i: number = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    private initializeUploadFiles(uploadFiles: ThyUploadFile | ThyUploadFile[]) {
        coerceArray(uploadFiles).forEach(uploadFile => {
            if (!uploadFile.progress) {
                uploadFile.progress = {
                    status: ThyUploadStatus.pending,
                    percentage: 0,
                    startTime: 0
                };
            }
        });
    }

    // private startUpload(observer: Subscriber<ThyUploadResponse>, uploadFile: ThyUploadFile) {
    //     const time: number = new Date().getTime();
    //     let speed = 0;
    //     let estimatedTime: number | null = null;

    //     uploadFile.progress = {
    //         status: ThyUploadStatus.started,
    //         percentage: 0,
    //         startTime: time
    //     };

    //     const formData = new FormData();
    //     Object.keys(uploadFile.data || {}).forEach(key => formData.append(key, uploadFile.data[key]));
    //     formData.append(uploadFile.fileField || 'file', uploadFile.nativeFile, uploadFile.fileName);
    //     const headers = {
    //         'Content-Type': 'multipart/form-data'
    //     };
    //     Object.keys(uploadFile.headers || {}).forEach(key => (headers[key] = uploadFile.headers[key]));

    //     observer.next({ status: ThyUploadStatus.started, uploadFile: uploadFile });

    //     this.http
    //         .post(uploadFile.url, formData, {
    //             headers: headers,
    //             reportProgress: true,
    //             observe: 'events',
    //             withCredentials: uploadFile.withCredentials ? true : false
    //         })
    //         .pipe(
    //             map(event => {
    //                 console.log('Subscribe data', event);
    //                 switch (event.type) {
    //                     case HttpEventType.UploadProgress:
    //                         let percentage = Math.round((event.loaded * 100) / event.total);
    //                         if (percentage === 100) {
    //                             percentage = 99;
    //                         }
    //                         const diff = new Date().getTime() - time;
    //                         speed = Math.round((event.loaded / diff) * 1000);
    //                         const progressStartTime =
    //                             (uploadFile.progress && uploadFile.progress.startTime) || new Date().getTime();
    //                         estimatedTime = Math.ceil((event.total - event.loaded) / speed);

    //                         uploadFile.progress.status = ThyUploadStatus.uploading;
    //                         uploadFile.progress.percentage = percentage;
    //                         uploadFile.progress.speed = speed;
    //                         uploadFile.progress.speedHuman = `${this.humanizeBytes(speed)}/s`;
    //                         uploadFile.progress.startTime = progressStartTime;
    //                         uploadFile.progress.estimatedTime = estimatedTime;
    //                         uploadFile.progress.estimatedTimeHuman = this.secondsToHuman(estimatedTime);

    //                         observer.next({ status: ThyUploadStatus.uploading, uploadFile: uploadFile });
    //                         break;
    //                     case HttpEventType.Response:
    //                         uploadFile.response = event.body;
    //                         observer.next({ status: ThyUploadStatus.started, uploadFile: uploadFile });
    //                         break;
    //                     default:
    //                     // throw new Error(`Unhandled event: ${event.type}`);
    //                 }
    //             })
    //         )
    //         .subscribe();
    // }

    private ensureFileName(uploadFile: ThyUploadFile) {
        uploadFile.fileName = uploadFile.fileName || uploadFile.nativeFile.name;
    }

    /**
     * 上传单个文件
     * @param uploadFile 上传文件对象
     */
    upload(uploadFile: ThyUploadFile): Observable<ThyUploadResponse> {
        this.ensureFileName(uploadFile);

        return new Observable(observer => {
            const xhr = new XMLHttpRequest();
            const time: number = new Date().getTime();
            let speed = 0;
            let estimatedTime: number | null = null;

            uploadFile.progress = {
                status: ThyUploadStatus.started,
                percentage: 0,
                startTime: time
            };

            xhr.upload.addEventListener(
                'progress',
                (event: ProgressEvent) => {
                    if (event.lengthComputable) {
                        let percentage = Math.round((event.loaded * 100) / event.total);
                        if (percentage === 100) {
                            percentage = 99;
                        }
                        const diff = new Date().getTime() - time;
                        speed = Math.round((event.loaded / diff) * 1000);
                        const progressStartTime = (uploadFile.progress && uploadFile.progress.startTime) || new Date().getTime();
                        estimatedTime = Math.ceil((event.total - event.loaded) / speed);

                        uploadFile.progress.status = ThyUploadStatus.uploading;
                        uploadFile.progress.percentage = percentage;
                        uploadFile.progress.speed = speed;
                        uploadFile.progress.speedHuman = `${this.humanizeBytes(speed)}/s`;
                        uploadFile.progress.startTime = progressStartTime;
                        uploadFile.progress.estimatedTime = estimatedTime;
                        uploadFile.progress.estimatedTimeHuman = this.secondsToHuman(estimatedTime);

                        observer.next({ status: ThyUploadStatus.uploading, uploadFile: uploadFile });
                    }
                },
                false
            );

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
                    uploadFile.progress.speedHuman = `${this.humanizeBytes(speed)}/s`;
                    uploadFile.progress.estimatedTime = estimatedTime;
                    uploadFile.progress.estimatedTimeHuman = this.secondsToHuman(estimatedTime || 0);

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

    /**
     * 并发上传多个文件
     * @param uploadFiles 上传文件列表
     * @param concurrent 并发上传数, 默认 5
     * @param options onStared, onDone 回调
     */
    uploadBulk(uploadFiles: ThyUploadFile[], concurrent = 5, options?: ThyUploadFilesOptions) {
        this.initializeUploadFiles(uploadFiles);
        const result = from(uploadFiles).pipe(
            mergeMap(uploadFile => {
                return this.upload(uploadFile).pipe(
                    tap(uploadResponse => {
                        if (options && options.onStarted && uploadResponse.status === ThyUploadStatus.started) {
                            options.onStarted(uploadResponse.uploadFile);
                        }
                        if (options && options.onDone && uploadResponse.status === ThyUploadStatus.done) {
                            options.onDone(uploadResponse.uploadFile);
                        }
                    })
                );
            }, concurrent),
            map(response => {
                return response;
            })
        );

        return result;
    }
}
