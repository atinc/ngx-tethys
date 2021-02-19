import { fakeAsync, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { ThyUploaderModule } from '../module';
import { NgModule, Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ThyFileSelectComponent } from '../file-select.component';
import { ThyUploadResponse } from '../uploader.service';
import { Observable } from 'rxjs';
import { createFile } from './utils';
import { createFakeEvent, dispatchEvent } from 'ngx-tethys/testing';

@Component({
    selector: 'app-file-select-basic',
    template: `
        <thy-file-select
            class="mt-2 d-inline-block"
            [thyMultiple]="multiple"
            [thyAcceptFolder]="acceptFolder"
            [thyAcceptType]="acceptType"
            [thySizeThreshold]="sizeThreshold"
            [thySizeExceedsHandler]="sizeExceedsHandler"
            (thyOnFileSelect)="selectFiles($event)"
        >
        </thy-file-select>
    `
})
class FileSelectBasicComponent {
    multiple: boolean;
    acceptType = '';
    sizeThreshold = 1;
    acceptFolder = false;
    uploaderFileResult: Observable<ThyUploadResponse>;
    exceedsFiles: File[];

    constructor() {}

    selectFiles(event: { files: File[] }) {}

    sizeExceedsHandler = (event: { files: File[]; exceedsFiles: File[]; nativeEvent: Event; sizeThreshold: number }) => {
        if (event.exceedsFiles.length > 0) {
            this.exceedsFiles = event.exceedsFiles;
        }
    };
}

@NgModule({
    imports: [ThyUploaderModule],
    declarations: [FileSelectBasicComponent],
    exports: [FileSelectBasicComponent]
})
export class FileUploaderTestModule {}

describe('ThyFileSelect', () => {
    let fixture: ComponentFixture<FileSelectBasicComponent>;
    let testComponent: FileSelectBasicComponent;
    let fileSelectDebugElement: DebugElement;
    let fileSelectComponent: ThyFileSelectComponent;
    let inputElement: HTMLInputElement;
    let dataTransfer: DataTransfer;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [ThyUploaderModule, FileUploaderTestModule],
            providers: []
        });
        TestBed.compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FileSelectBasicComponent);
        testComponent = fixture.debugElement.componentInstance;
        fileSelectDebugElement = fixture.debugElement.query(By.directive(ThyFileSelectComponent));
        fileSelectComponent = fileSelectDebugElement.componentInstance;
        fileSelectDebugElement.componentInstance;
        inputElement = fileSelectDebugElement.nativeElement.querySelector('input');
        fixture.detectChanges();

        const file = createFile();
        dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
    });

    it('should create file select success', () => {
        expect(fileSelectDebugElement).toBeTruthy();
        expect(fileSelectComponent).toBeTruthy();
        expect(inputElement).toBeTruthy();
        expect(inputElement.getAttribute('hidden')).toEqual('');
        expect(inputElement.getAttribute('multiple')).toEqual(null);
    });

    it('should upload file success', () => {
        const selectFilesSpy = spyOn(testComponent, 'selectFiles');
        expect(selectFilesSpy).not.toHaveBeenCalled();

        const fileChangeEvent = new Event('change');
        inputElement.files = dataTransfer.files;
        inputElement.dispatchEvent(fileChangeEvent);

        expect(selectFilesSpy).toHaveBeenCalled();
        expect(selectFilesSpy).toHaveBeenCalledWith({
            files: [dataTransfer.files[0]],
            nativeEvent: fileChangeEvent
        });
    });

    it('should upload multiple files success', () => {
        const selectFilesSpy = spyOn(testComponent, 'selectFiles');
        expect(selectFilesSpy).not.toHaveBeenCalled();

        testComponent.multiple = true;
        fixture.detectChanges();
        expect(inputElement.getAttribute('multiple')).toEqual('');

        const fileChangeEvent = new Event('change');
        dataTransfer.items.add(createFile());
        inputElement.files = dataTransfer.files;
        inputElement.dispatchEvent(fileChangeEvent);

        expect(selectFilesSpy).toHaveBeenCalled();
        expect(selectFilesSpy).toHaveBeenCalledWith({
            files: [dataTransfer.files[0], dataTransfer.files[1]],
            nativeEvent: fileChangeEvent
        });
    });

    it('should set accept type success', () => {
        testComponent.acceptType = '.doc';
        fixture.detectChanges();
        expect(inputElement.getAttribute('accept')).toEqual('application/msword');
    });

    it('should not invoke thyOnFileSelect when size threshold is 0.001', () => {
        const selectFilesSpy = spyOn(testComponent, 'selectFiles');
        expect(selectFilesSpy).not.toHaveBeenCalled();

        testComponent.sizeThreshold = 0.001;
        fixture.detectChanges();

        const fileChangeEvent = new Event('change');
        dataTransfer.items.add(createFile());
        inputElement.files = dataTransfer.files;
        inputElement.dispatchEvent(fileChangeEvent);

        expect(selectFilesSpy).not.toHaveBeenCalled();
    });

    it('should accept folder', () => {
        expect(inputElement.getAttribute('webkitdirectory')).toEqual(null);
        testComponent.acceptFolder = true;
        fixture.detectChanges();
        expect(inputElement.getAttribute('webkitdirectory')).toEqual('');
    });

    it('should trigger input click when click element', () => {
        const event = createFakeEvent('click');
        const inputClickSpy = jasmine.createSpy('input on click spy');
        inputElement.onclick = inputClickSpy;
        expect(inputClickSpy).not.toHaveBeenCalled();
        fileSelectDebugElement.nativeElement.dispatchEvent(event);
        expect(inputClickSpy).toHaveBeenCalled();
    });
});
