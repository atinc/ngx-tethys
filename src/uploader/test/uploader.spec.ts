import { fakeAsync, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { ThyUploaderModule } from '../module';
import { NgModule, Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ThyFileSelectComponent } from '../file-select.component';
import { ThyUploadFile, ThyUploaderService, ThyUploadStatus, ThyUploadResponse } from '../uploader.service';
import { Observable } from 'rxjs';
const UPLOAD_URL = `http://www.mocky.io/v2/5cf52b1f2f0000c02c4f072f?mocky-delay=2s`;

@Component({
    selector: 'thy-uploader-demo',
    template: `
        <thy-file-select
            class="mt-2 d-inline-block"
            [thyMultiple]="multiple"
            [thyAcceptType]="acceptType"
            [thySizeThreshold]="sizeThreshold"
            [thySizeExceedsHandler]="sizeExceedsHandler"
            (thyOnFileSelect)="selectFiles($event)"
        >
        </thy-file-select>
    `
})
class ThyUploaderDemoComponent {
    queueFiles: ThyUploadFile[] = [];
    multiple: boolean;
    acceptType = ['.txt'];
    sizeThreshold: number = 1;
    uploaderFileResult: Observable<ThyUploadResponse>;
    exceedsFiles: File[];
    constructor(private thyUploaderService: ThyUploaderService) {}
    selectFiles(event: { files: File[] }) {
        const uploadFiles: ThyUploadFile[] = Array.from(event.files).map((file, index) => {
            return {
                nativeFile: file,
                url: UPLOAD_URL,
                method: 'POST',
                fileName: file.name || '复制粘贴.png',
                withCredentials: true
            };
        });
        uploadFiles.forEach(uploadFile => {
            this.queueFiles.push(uploadFile);
        });
        if (this.multiple) {
            this.uploaderFileResult = this.thyUploaderService.uploadBulk(uploadFiles, 2);
        } else {
            this.uploaderFileResult = this.thyUploaderService.upload(uploadFiles[0]);
        }
        this.uploaderFileResult.subscribe(result => {
            if (result.status === ThyUploadStatus.done) {
                const index = this.queueFiles.indexOf(result.uploadFile);
                if (index > -1) {
                    this.queueFiles.splice(index, 1);
                }
            }
        });
    }

    sizeExceedsHandler = (event: { files: File[]; exceedsFiles: File[]; nativeEvent: Event; sizeThreshold: number }) => {
        if (event.exceedsFiles.length > 0) {
            this.exceedsFiles = event.exceedsFiles;
        }
    };
}

@NgModule({
    imports: [ThyUploaderModule],
    declarations: [ThyUploaderDemoComponent],
    exports: [ThyUploaderDemoComponent]
})
export class FileUploaderTestModule {}

describe('ThyFileSelect', () => {
    let fixture: ComponentFixture<ThyUploaderDemoComponent>;
    let testComponent: ThyUploaderDemoComponent;
    let thyFileSelectComponent: DebugElement;
    let fileSelectContentElement: HTMLInputElement;
    let inputEl: HTMLInputElement;
    let dT: any;
    const fileContent =
        'Were converting our compatibility data into a machine-readable JSON format. This compatibility table still uses the old format, because we have not yet converted the data it contains. Find out how you can help!';
    const file = new File([fileContent], 'testFile');

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [ThyUploaderModule, FileUploaderTestModule],
            providers: []
        });
        TestBed.compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyUploaderDemoComponent);
        testComponent = fixture.debugElement.componentInstance;
        thyFileSelectComponent = fixture.debugElement.query(By.directive(ThyFileSelectComponent));
        fileSelectContentElement = thyFileSelectComponent.nativeElement;
        inputEl = fileSelectContentElement.querySelector('input') as HTMLInputElement;
        // creat FileList
        dT = new ClipboardEvent('').clipboardData || new DataTransfer(); // specs compliant (as of March 2018 only Chrome)
        dT.items.add(file);
    });

    it('should create', () => {
        expect(thyFileSelectComponent).toBeTruthy();
    });

    it('should upload file', () => {
        inputEl.files = dT.files;
        inputEl.dispatchEvent(new Event('change'));
        expect(testComponent.queueFiles[0].nativeFile.name).toEqual('testFile');
        testComponent.uploaderFileResult.subscribe(result => {
            if (result.status === ThyUploadStatus.done) {
                const index = testComponent.queueFiles.indexOf(result.uploadFile);
                if (index > -1) {
                    testComponent.queueFiles.splice(index, 1);
                    expect(testComponent.queueFiles.length).toEqual(0);
                }
            }
        });
    });

    it('should upload multiple files', () => {
        testComponent.multiple = true;
        dT.items.add(new File([fileContent], 'multipleFile'));
        inputEl.files = dT.files;
        inputEl.dispatchEvent(new Event('change'));
        expect(testComponent.queueFiles[0].nativeFile.name).toEqual('testFile');
        expect(testComponent.queueFiles[1].nativeFile.name).toEqual('multipleFile');
        testComponent.uploaderFileResult.subscribe(result => {
            if (result.status === ThyUploadStatus.done) {
                const index = testComponent.queueFiles.indexOf(result.uploadFile);
                if (index > -1) {
                    testComponent.queueFiles.splice(index, 1);
                    expect(testComponent.queueFiles.length).toEqual(0);
                }
            }
        });
    });

    it('should not upload file beyond the limit', () => {
        testComponent.sizeThreshold = 0.001;
        fixture.detectChanges();
        inputEl.files = dT.files;
        inputEl.dispatchEvent(new Event('change'));
        expect(testComponent.exceedsFiles[0].name).toBe('testFile');
    });
});
