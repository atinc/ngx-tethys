import { createDragEvent } from 'ngx-tethys/testing';

import { Component, DebugElement, NgModule } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ThyFileDropDirective } from '../file-drop.directive';
import { ThyUploadModule } from '../module';
import { ThySizeExceedsHandler } from '../types';
import { createFile } from './utils';

@Component({
    selector: 'test-file-drop-demo',
    template: `
        <div
            class="mt-2 d-inline-block"
            [thyAcceptType]="acceptType"
            [thySizeThreshold]="sizeThreshold"
            [thySizeExceedsHandler]="sizeExceedsHandler"
            [thyFileDropClassName]="customDragOverClass"
            thyFileDrop
            (thyOnDrop)="selectFiles($event)"></div>
    `
})
class FileDropBasicComponent {
    customDragOverClass: string;
    multiple: boolean;
    acceptType: string = '';
    sizeThreshold = 1;
    exceedsFiles: File[];
    constructor() {}

    selectFiles(event: { files: File[] }) {
        //  console.log(`select files, ${event.files.length}`);
    }

    sizeExceedsHandler: ThySizeExceedsHandler = event => {
        if (event.exceedsFiles.length > 0) {
            this.exceedsFiles = event.exceedsFiles;
        }
    };
}

@NgModule({
    imports: [ThyUploadModule],
    declarations: [FileDropBasicComponent],
    exports: [FileDropBasicComponent]
})
export class FileUploaderTestModule {}

describe('thyFileDrop', () => {
    let fixture: ComponentFixture<FileDropBasicComponent>;
    let testComponent: FileDropBasicComponent;
    let fileDropDebugElement: DebugElement;
    let dataTransfer: DataTransfer;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [ThyUploadModule, FileUploaderTestModule],
            providers: []
        });
        TestBed.compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FileDropBasicComponent);
        testComponent = fixture.debugElement.componentInstance;
        fileDropDebugElement = fixture.debugElement.query(By.directive(ThyFileDropDirective));
        fixture.detectChanges();

        const file = createFile();
        dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
    });

    it('should create file drop component success', () => {
        expect(testComponent).toBeTruthy();
        expect(fileDropDebugElement).toBeTruthy();
    });

    it('should get correct drag over class for all events', () => {
        const fileDropElement: HTMLElement = fileDropDebugElement.nativeElement;
        expect(fileDropElement.classList.contains('thy-drop-over')).toBeFalsy();

        const dragenterEvent = createDragEvent('dragenter', dataTransfer, true, true);
        fileDropElement.dispatchEvent(dragenterEvent);
        fixture.detectChanges();
        expect(fileDropElement.classList.contains('thy-drop-over')).toBeTruthy();

        const dragoverEvent = createDragEvent('dragover', dataTransfer, true, true);
        fileDropElement.dispatchEvent(dragoverEvent);
        fixture.detectChanges();
        expect(fileDropElement.classList.contains('thy-drop-over')).toBeTruthy();

        const dragleaveEvent = createDragEvent('dragleave', dataTransfer, true, true);
        fileDropElement.dispatchEvent(dragleaveEvent);
        fixture.detectChanges();
        expect(fileDropElement.classList.contains('thy-drop-over')).toBeFalsy();

        fileDropElement.dispatchEvent(dragenterEvent);
        fixture.detectChanges();
        expect(fileDropElement.classList.contains('thy-drop-over')).toBeTruthy();

        const dropEvent = createDragEvent('drop', null, true, true);
        fileDropElement.dispatchEvent(dropEvent);
        fixture.detectChanges();
        expect(fileDropElement.classList.contains('thy-drop-over')).toBeFalsy();
    });

    it('should set custom drag over class success', () => {
        const customDragOverClass = 'my-custom-drag-over-class';
        testComponent.customDragOverClass = customDragOverClass;
        fixture.detectChanges();
        const fileDropElement: HTMLElement = fileDropDebugElement.nativeElement;
        expect(fileDropElement.classList.contains(customDragOverClass)).toBeFalsy();

        const dragenterEvent = createDragEvent('dragenter', dataTransfer, true, true);
        fileDropElement.dispatchEvent(dragenterEvent);
        fixture.detectChanges();
        expect(fileDropElement.classList.contains(customDragOverClass)).toBeTruthy();

        const dragleaveEvent = createDragEvent('dragleave', dataTransfer, true, true);
        fileDropElement.dispatchEvent(dragleaveEvent);
        fixture.detectChanges();
        expect(fileDropElement.classList.contains(customDragOverClass)).toBeFalsy();
    });

    it('should invoke thyOnDrop success', () => {
        const selectFilesSpy = spyOn(testComponent, 'selectFiles');

        const fileDropElement: HTMLElement = fileDropDebugElement.nativeElement;
        const dragenterEvent = createDragEvent('dragenter', dataTransfer, true, true);
        fileDropElement.dispatchEvent(dragenterEvent);
        fixture.detectChanges();

        expect(selectFilesSpy).not.toHaveBeenCalled();
        const dropEvent = createDragEvent('drop', dataTransfer, true, true);
        fileDropElement.dispatchEvent(dropEvent);
        fixture.detectChanges();
        expect(selectFilesSpy).toHaveBeenCalled();
        expect(selectFilesSpy).toHaveBeenCalledWith({ files: [dataTransfer.files[0]], nativeEvent: dropEvent });
    });

    it('should filter accept type files', () => {
        const selectFilesSpy = spyOn(testComponent, 'selectFiles');
        testComponent.acceptType = '.doc';
        fixture.detectChanges();

        const fileDropElement: HTMLElement = fileDropDebugElement.nativeElement;
        const dragenterEvent = createDragEvent('dragenter', dataTransfer, true, true);
        fileDropElement.dispatchEvent(dragenterEvent);
        fixture.detectChanges();

        expect(selectFilesSpy).not.toHaveBeenCalled();
        const dropEvent = createDragEvent('drop', dataTransfer, true, true);
        fileDropElement.dispatchEvent(dropEvent);
        fixture.detectChanges();
        expect(selectFilesSpy).not.toHaveBeenCalled();
    });
});
