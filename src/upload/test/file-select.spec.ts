import { createFakeEvent } from 'ngx-tethys/testing';
import { Observable } from 'rxjs';
import { ApplicationRef, Component, DebugElement, NgModule } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ThyFileSelect, ThyUploadModule, ThyUploadResponse } from 'ngx-tethys/upload';
import { createFile } from './utils';

@Component({
    selector: 'thy-file-select-basic',
    template: `
        <thy-file-select
            class="mt-2 d-inline-block"
            [thyMultiple]="multiple"
            [thyAcceptFolder]="acceptFolder"
            [thyAcceptType]="acceptType"
            [thySizeThreshold]="sizeThreshold"
            [thySizeExceedsHandler]="sizeExceedsHandler"
            (thyOnFileSelect)="selectFiles($event)">
        </thy-file-select>
    `,
    imports: [ThyFileSelect]
})
class FileSelectBasicComponent {
    multiple!: boolean;
    acceptType = '';
    sizeThreshold = 1;
    acceptFolder = false;
    uploaderFileResult!: Observable<ThyUploadResponse>;
    exceedsFiles!: File[];

    selectFiles(event: { files: File[] }) {}

    sizeExceedsHandler = (event: { files: File[]; exceedsFiles: File[]; nativeEvent: Event; sizeThreshold: number }) => {
        if (event.exceedsFiles.length > 0) {
            this.exceedsFiles = event.exceedsFiles;
        }
    };
}

describe('ThyFileSelect', () => {
    let fixture!: ComponentFixture<FileSelectBasicComponent>;
    let testComponent!: FileSelectBasicComponent;
    let fileSelectDebugElement!: DebugElement;
    let fileSelectComponent!: ThyFileSelect;
    let inputElement!: HTMLInputElement;
    let dataTransfer!: DataTransfer;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ThyUploadModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FileSelectBasicComponent);
        testComponent = fixture.debugElement.componentInstance;
        fileSelectDebugElement = fixture.debugElement.query(By.directive(ThyFileSelect));
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

    xit('should upload file success', () => {
        const selectFilesSpy = spyOn(testComponent, 'selectFiles');
        expect(selectFilesSpy).not.toHaveBeenCalled();

        const fileChangeEvent = new Event('change');
        inputElement.files = dataTransfer.files;
        inputElement.dispatchEvent(fileChangeEvent);

        expect(selectFilesSpy).toHaveBeenCalled();
        // expect(selectFilesSpy).toHaveBeenCalledWith({
        //     files: [dataTransfer.files[0]],
        //     nativeEvent: fileChangeEvent
        // });
    });

    xit('should upload multiple files success', () => {
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
        // expect(selectFilesSpy).toHaveBeenCalledWith({
        //     files: [dataTransfer.files[0], dataTransfer.files[1]],
        //     nativeEvent: fileChangeEvent
        // });
    });

    it('should set accept type success', () => {
        testComponent.acceptType = '.doc';
        fixture.detectChanges();
        expect(inputElement.getAttribute('accept')).toEqual(
            'application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        );
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

@Component({
    selector: 'thy-file-select-static-input',
    template: ` <thy-file-select thyMultiple="true" thyAcceptFolder="false" (thyOnFileSelect)="selectFiles($event)"> </thy-file-select> `,
    imports: [ThyFileSelect]
})
class FileSelectStaticInputComponent {
    selectFiles(event: { files: File[] }) {}
}

describe('ThyFileSelectStaticInput', () => {
    let fixture!: ComponentFixture<FileSelectStaticInputComponent>;
    let testComponent!: FileSelectStaticInputComponent;
    let fileSelectDebugElement!: DebugElement;
    let inputElement!: HTMLInputElement;
    let dataTransfer!: DataTransfer;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ThyUploadModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FileSelectStaticInputComponent);
        testComponent = fixture.debugElement.componentInstance;
        fileSelectDebugElement = fixture.debugElement.query(By.directive(ThyFileSelect));
        inputElement = fileSelectDebugElement.nativeElement.querySelector('input');
        fixture.detectChanges();

        const file = createFile();
        dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
    });

    xit('should work when use static input of thyMultiple', () => {
        const selectFilesSpy = spyOn(testComponent, 'selectFiles');
        expect(selectFilesSpy).not.toHaveBeenCalled();

        expect(inputElement.getAttribute('multiple')).toEqual('');

        const fileChangeEvent = new Event('change');
        dataTransfer.items.add(createFile());
        inputElement.files = dataTransfer.files;
        inputElement.dispatchEvent(fileChangeEvent);

        expect(selectFilesSpy).toHaveBeenCalled();
        // expect(selectFilesSpy).toHaveBeenCalledWith({
        //     files: [dataTransfer.files[0], dataTransfer.files[1]],
        //     nativeEvent: fileChangeEvent
        // });
    });

    it('should work when use static input of thyAcceptFolder', () => {
        expect(inputElement.getAttribute('webkitdirectory')).toEqual(null);
    });
});
