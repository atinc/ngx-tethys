import { coerceArray, humanizeBytes, TinyDate } from 'ngx-tethys/util';
import { from, Observable, Subscriber } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';

import { XhrFactory } from '@angular/common';
import { inject, Injectable } from '@angular/core';

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

/**
 * 文件上传进度
 * @public
 * @order 40
 */
export interface ThyUploadFileProgress {
    /**
     * 上传状态
     * @default pending
     */
    status: ThyUploadStatus;

    /**
     * 进度百分比
     */
    percentage: number;

    /**
     * 上传速度
     */
    speed?: number;

    /**
     * 人类可读的上传速度，比如: 120 kb/s
     */
    speedHuman?: string;

    /**
     * 开始上传时间
     */
    startTime: number | null;

    /**
     * 结束上传时间
     */
    endTime?: number | null;

    /**
     * 上传时间
     */
    estimatedTime?: number | null;

    /**
     * 人类可读的上传时间，比如: 00:12:23
     */
    estimatedTimeHuman?: string | null;
}

/**
 * 文件上传对象
 * @public
 * @order 30
 */
export interface ThyUploadFile {
    /**
     * 文件唯一标识
     */
    identifier?: string;

    /**
     * 上传方法
     */
    method: string;

    /**
     * 远程上传地址
     */
    url: string;

    /**
     * 是否携带认证信息
     */
    withCredentials?: boolean;

    /**
     * 原始文件
     */
    nativeFile: File;

    /**
     * 文件字段
     */
    fileField?: string;

    /**
     * 文件名
     */
    fileName?: string;

    /**
     * 请求头
     */
    headers?: Record<string, string>;

    /**
     * 请求数据
     */
    data?: Record<string, string>;

    /**
     * 响应状态
     */
    responseStatus?: any;

    /**
     * 上传响应结果
     */
    response?: any;

    /**
     * 响应头
     */
    responseHeaders?: any;

    /**
     * 上传进度
     */
    progress?: ThyUploadFileProgress;
}

export interface ThyUploadFilesOptions {
    onStarted?: (item: ThyUploadFile) => void;
    onDone?: (item: ThyUploadFile) => void;
}

/**
 * 文件远程上传服务
 * @order 20
 */
@Injectable()
export class ThyUploadService {
    private xhrFactory = inject(XhrFactory);

    private secondsToHuman(sec: number): string {
        return new TinyDate(new Date(sec * 1000)).nativeDate.toISOString().slice(11, 19);
    }

    private normalizeUploadFiles(uploadFiles: ThyUploadFile | ThyUploadFile[]) {
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

    private uploadByXhr(observer: Subscriber<ThyUploadResponse>, uploadFile: ThyUploadFile) {
        const xhr = this.xhrFactory.build();
        const time: number = new TinyDate().getTime();
        let speed = 0;
        let estimatedTime: number | null = null;

        uploadFile.progress = {
            status: ThyUploadStatus.started,
            percentage: 0,
            startTime: time
        };

        const onProgress = (event: ProgressEvent): void => {
            if (event.lengthComputable) {
                let percentage = Math.round((event.loaded * 100) / event.total);
                if (percentage === 100) {
                    percentage = 99;
                }
                const diff = new TinyDate().getTime() - time;
                speed = Math.round((event.loaded / diff) * 1000);
                const progressStartTime = (uploadFile.progress && uploadFile.progress.startTime) || new TinyDate().getTime();
                estimatedTime = Math.ceil((event.total - event.loaded) / speed);

                uploadFile.progress.status = ThyUploadStatus.uploading;
                uploadFile.progress.percentage = percentage;
                uploadFile.progress.speed = speed;
                uploadFile.progress.speedHuman = `${humanizeBytes(speed, false, 2)}/s`;
                uploadFile.progress.startTime = progressStartTime;
                uploadFile.progress.estimatedTime = estimatedTime;
                uploadFile.progress.estimatedTimeHuman = this.secondsToHuman(estimatedTime);

                observer.next({ status: ThyUploadStatus.uploading, uploadFile: uploadFile });
            }
        };

        const onError = (error: ErrorEvent) => observer.error(error);

        const onReadyStateChange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                const speedTime = (new TinyDate().getTime() - uploadFile.progress.startTime) * 1000;
                const speedAverage = Math.round(uploadFile.nativeFile.size / speedTime);

                uploadFile.progress.status = ThyUploadStatus.done;
                uploadFile.progress.percentage = 100;
                uploadFile.progress.speed = speedAverage;
                uploadFile.progress.speedHuman = `${humanizeBytes(speed, false, 2)}/s`;
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

        xhr.upload.addEventListener('progress', onProgress, false);
        xhr.upload.addEventListener('error', onError);
        // When using the [timeout attribute](https://xhr.spec.whatwg.org/#the-timeout-attribute) and an XHR
        // request times out, browsers trigger the `timeout` event (and executes the XHR's `ontimeout`
        // callback). Additionally, Safari 9 handles timed-out requests in the same way, even if no `timeout`
        // has been explicitly set on the XHR.
        xhr.upload.addEventListener('timeout', onError);
        xhr.addEventListener('timeout', onError);
        xhr.addEventListener('readystatechange', onReadyStateChange);

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
        }

        return {
            xhr,
            cleanup: () => {
                xhr.upload.removeEventListener('progress', onProgress);
                xhr.upload.removeEventListener('error', onError);
                xhr.upload.removeEventListener('timeout', onError);
                xhr.removeEventListener('timeout', onError);
                xhr.removeEventListener('readystatechange', onReadyStateChange);
            }
        };
    }

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
            const { xhr, cleanup } = this.uploadByXhr(observer, uploadFile);
            return () => {
                cleanup();

                if (xhr.readyState !== xhr.DONE) {
                    xhr.abort();
                }
            };
        });
    }

    /**
     * 并发上传多个文件
     * @param uploadFiles 上传文件列表
     * @param concurrent 并发上传数, 默认 5
     * @param options onStared, onDone 回调
     */
    uploadBulk(uploadFiles: ThyUploadFile[], concurrent = 5, options?: ThyUploadFilesOptions): Observable<ThyUploadResponse> {
        this.normalizeUploadFiles(uploadFiles);
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
