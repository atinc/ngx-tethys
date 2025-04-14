import { Subject } from 'rxjs';
import { XhrFactory } from '@angular/common';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ThyUploadModule, ThyUploadFile, ThyUploadResponse, ThyUploadService, ThyUploadStatus } from 'ngx-tethys/upload';
import { createFile } from './utils';
import { MockXhrFactory } from 'ngx-tethys/testing';

const UPLOAD_URL = `http://example.com/upload`;

describe('ThyUploadService', () => {
    let uploader: ThyUploadService;
    let mockXhrFactory: MockXhrFactory;

    beforeEach(() => {
        mockXhrFactory = new MockXhrFactory();
        TestBed.configureTestingModule({
            imports: [ThyUploadModule],
            providers: [
                {
                    provide: XhrFactory,
                    useValue: mockXhrFactory
                }
            ]
        });
        TestBed.compileComponents();
        uploader = TestBed.inject(ThyUploadService);
    });

    it('should create uploader service success', () => {
        expect(uploader).toBeTruthy();
    });

    it('should upload file success', fakeAsync(() => {
        const file = createFile();
        const startedSpy = jasmine.createSpy('started spy');
        const doneSpy = jasmine.createSpy('done spy');
        const pendingSpy = jasmine.createSpy('pending spy');
        const uploadingSpy = jasmine.createSpy('uploading spy');

        const uploadFile: ThyUploadFile = {
            url: UPLOAD_URL,
            method: 'post',
            nativeFile: file
        };
        expect(startedSpy).not.toHaveBeenCalled();

        uploader.upload(uploadFile).subscribe(response => {
            if (response.status === ThyUploadStatus.started) {
                startedSpy(response);
            } else if (response.status === ThyUploadStatus.done) {
                doneSpy(response);
            } else if (response.status === ThyUploadStatus.pending) {
                pendingSpy(response);
            } else {
                uploadingSpy(response);
            }
        });

        // start upload file
        expect(startedSpy).toHaveBeenCalled();
        expect(startedSpy).toHaveBeenCalledWith({
            status: ThyUploadStatus.started,
            uploadFile: uploadFile
        });
        expect(uploadFile.progress.percentage).toEqual(0);

        expect(uploadingSpy).not.toHaveBeenCalled();
        expect(doneSpy).not.toHaveBeenCalled();
        expect(pendingSpy).not.toHaveBeenCalled();

        // 为了让开始和进度更新之间有时间差
        tick(1000);

        // upload 300
        mockXhrFactory.mock.mockUploadProgressEvent(300, 1024 + 26);
        expect(uploadingSpy).toHaveBeenCalled();
        expect(uploadingSpy).toHaveBeenCalledWith({
            status: ThyUploadStatus.uploading,
            uploadFile: uploadFile
        });
        expect(uploadFile.progress.percentage).toEqual(Math.round((300 * 100) / (1024 + 26)));
        expect(uploadFile.progress.speed).toEqual(300);
        expect(uploadFile.progress.speedHuman).toEqual(`300 Bytes/s`);

        // upload 1024 + 26
        mockXhrFactory.mock.mockUploadProgressEvent(1024 + 26, 1024 + 26);
        expect(uploadingSpy).toHaveBeenCalled();
        expect(uploadingSpy).toHaveBeenCalledWith({
            status: ThyUploadStatus.uploading,
            uploadFile: uploadFile
        });
        expect(uploadFile.progress.percentage).toEqual(99);

        // upload success
        mockXhrFactory.mock.mockFlush(
            XMLHttpRequest.DONE,
            'SUCCESS',
            JSON.stringify({
                code: 200,
                data: { name: '' }
            })
        );
        mockXhrFactory.mock.mockOnReadyStateChange();
        expect(doneSpy).toHaveBeenCalled();
        expect(doneSpy).toHaveBeenCalledWith({
            status: ThyUploadStatus.done,
            uploadFile: uploadFile
        });
        expect(uploadFile.progress.percentage).toEqual(100);
        tick(100);
    }));

    it('should upload bulk files', () => {
        const file1 = createFile();
        const uploadFile1: ThyUploadFile = {
            url: UPLOAD_URL,
            method: 'post',
            nativeFile: file1
        };

        const file2 = createFile();
        const uploadFile2: ThyUploadFile = {
            url: UPLOAD_URL,
            method: 'post',
            nativeFile: file2
        };

        const uploadFile1$ = new Subject<ThyUploadResponse>();
        const uploadFile2$ = new Subject<ThyUploadResponse>();
        const mockUploads = new Map<ThyUploadFile, Subject<ThyUploadResponse>>();
        mockUploads.set(uploadFile1, uploadFile1$);
        mockUploads.set(uploadFile2, uploadFile2$);
        uploader.upload = (uploadFile: ThyUploadFile) => {
            return mockUploads.get(uploadFile).asObservable();
        };
        const uploadBulkSpy = jasmine.createSpy(`upload bulk spy`);
        const onStartedSpy = jasmine.createSpy(`upload started spy`);
        const onDoneSpy = jasmine.createSpy(`upload bulk spy`);

        uploader
            .uploadBulk([uploadFile1, uploadFile2], 5, {
                onStarted: onStartedSpy,
                onDone: onDoneSpy
            })
            .subscribe(uploadBulkSpy);

        expect(uploadBulkSpy).not.toHaveBeenCalled();
        expect(onStartedSpy).not.toHaveBeenCalled();
        expect(onDoneSpy).not.toHaveBeenCalled();

        // file1 upload started
        uploadFile1$.next({
            status: ThyUploadStatus.started,
            uploadFile: uploadFile1
        });
        expect(uploadBulkSpy).toHaveBeenCalled();
        expect(uploadBulkSpy).toHaveBeenCalledWith({
            status: ThyUploadStatus.started,
            uploadFile: uploadFile1
        });
        expect(onStartedSpy).toHaveBeenCalled();
        expect(onStartedSpy).toHaveBeenCalledWith(uploadFile1);

        // file1 upload done
        uploadFile1$.next({
            status: ThyUploadStatus.done,
            uploadFile: uploadFile1
        });
        expect(uploadBulkSpy).toHaveBeenCalled();
        expect(uploadBulkSpy).toHaveBeenCalledWith({
            status: ThyUploadStatus.done,
            uploadFile: uploadFile1
        });
        expect(onDoneSpy).toHaveBeenCalled();
        expect(onDoneSpy).toHaveBeenCalledWith(uploadFile1);
    });

    it('should throw error when upload file', () => {
        const file = createFile();
        const uploadSpy = jasmine.createSpy('upload spy');
        const uploadErrorSpy = jasmine.createSpy('upload error spy');

        const uploadFile: ThyUploadFile = {
            url: UPLOAD_URL,
            method: 'post',
            nativeFile: file
        };
        expect(uploadSpy).not.toHaveBeenCalled();

        uploader.upload(uploadFile).subscribe({
            next: uploadSpy,
            error: uploadErrorSpy
        });

        expect(uploadErrorSpy).not.toHaveBeenCalled();
        const mockError = new Error('HTTP Error');
        mockXhrFactory.mock.mockErrorEvent(mockError);
        expect(uploadErrorSpy).toHaveBeenCalled();
        expect(uploadErrorSpy).toHaveBeenCalledWith(mockError);
    });
});
