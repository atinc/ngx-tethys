import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ThyDialogModule } from 'ngx-tethys/dialog';
import { ThyImageModule } from '../module';
import { ThyImageDirective } from './../image.directive';
import { ComponentFixture, fakeAsync, flush, inject, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

@Component({
    selector: 'thy-image-directive-test',
    template: ` <img thyImage [thySrc]="src" [thyImageMeta]="imageMeta" [thyDisablePreview]="disablePreview" /> `
})
class ImageDirectiveTestComponent {
    src = '';
    imageMeta = {};
    disablePreview = false;
}

describe('image-directive', () => {
    let fixture: ComponentFixture<ImageDirectiveTestComponent>;
    let basicTestComponent: ImageDirectiveTestComponent;
    let debugElement: DebugElement;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ThyImageModule, ThyDialogModule, NoopAnimationsModule],
            declarations: [ImageDirectiveTestComponent],
            providers: [provideHttpClient()]
        }).compileComponents();
        fixture = TestBed.createComponent(ImageDirectiveTestComponent);
        basicTestComponent = fixture.debugElement.componentInstance;
        debugElement = fixture.debugElement.query(By.directive(ThyImageDirective));
        fixture.detectChanges();
    });

    beforeEach(inject([OverlayContainer], (_overlayContainer: OverlayContainer) => {
        overlayContainer = _overlayContainer;
        overlayContainerElement = _overlayContainer.getContainerElement();
    }));

    afterEach(() => {
        overlayContainer.ngOnDestroy();
    });

    it('should create img with src', () => {
        basicTestComponent.src = 'assets/images/image/first.png';
        fixture.detectChanges();
        const imageSrc = (debugElement.nativeElement as HTMLElement).getAttribute('src');
        expect(imageSrc).toBe(basicTestComponent.src);
    });

    it('should not img open image preview when thyDisablePreview is true', () => {
        basicTestComponent.src = 'assets/images/image/first.png';
        basicTestComponent.disablePreview = true;
        fixture.detectChanges();
        expect(debugElement.nativeElement.getAttribute('class')).toContain('thy-image-disabled');
        debugElement.nativeElement.click();
        expect(overlayContainerElement.querySelector('.thy-image-preview-wrap') as HTMLElement).toBeFalsy();
    });

    xit('should open image preview when click image', () => {
        basicTestComponent.src = 'assets/images/image/first.png';
        fixture.detectChanges();
        debugElement.nativeElement.click();
        expect(overlayContainerElement).toBeTruthy();
        expect(overlayContainerElement.querySelector('.thy-image-preview-wrap') as HTMLElement).toBeTruthy();
        expect(overlayContainerElement.querySelector('.thy-image-preview-header')).toBeTruthy();
        expect((overlayContainerElement.querySelector('.thy-image-name') as HTMLElement).innerText).toBe('');
        expect((overlayContainerElement.querySelector('.thy-image-size') as HTMLElement).innerText).toBe('');
        expect(overlayContainerElement.querySelector('.thy-image-preview-close')).toBeTruthy();
        expect(overlayContainerElement.querySelector('img') as HTMLElement).toBeTruthy();
        expect((overlayContainerElement.querySelector('img') as HTMLElement).getAttribute('src')).toBe(basicTestComponent.src);
        expect(overlayContainerElement.querySelector('.thy-image-preview-switch-left')).toBeFalsy();
        expect(overlayContainerElement.querySelector('.thy-image-preview-switch-right')).toBeFalsy();
        expect(overlayContainerElement.querySelector('.thy-image-preview-operations')).toBeTruthy();
    });

    it('should open image preview with title and size when click image', () => {
        basicTestComponent.src = 'assets/images/image/first.png';
        basicTestComponent.imageMeta = {
            name: 'first.jpg',
            size: '66kb'
        };
        fixture.detectChanges();
        debugElement.nativeElement.click();

        expect(overlayContainerElement).toBeTruthy();
        expect(overlayContainerElement.querySelector('.thy-image-preview-wrap')).toBeTruthy();
        expect(overlayContainerElement.querySelector('.thy-image-preview-header')).toBeTruthy();
        expect((overlayContainerElement.querySelector('.thy-image-name') as HTMLElement).innerText).toBe('first.jpg');
        expect((overlayContainerElement.querySelector('.thy-image-size') as HTMLElement).innerText).toBe('66kb');
    });

    describe('preview close', () => {
        beforeEach(() => {
            basicTestComponent.src = 'assets/images/image/first.png';
            basicTestComponent.imageMeta = {
                name: 'first.jpg',
                size: '66kb'
            };
            fixture.detectChanges();
            debugElement.nativeElement.click();
        });
        it('should close image preview when click close icon', fakeAsync(() => {
            expect(overlayContainerElement).toBeTruthy();
            expect(overlayContainerElement.querySelector('.thy-image-preview-wrap')).toBeTruthy();
            const iconElement = (overlayContainerElement.querySelector('.thy-icon-close') as HTMLElement).parentNode as HTMLElement;
            iconElement.click();

            fixture.detectChanges();
            flush();
            expect(overlayContainerElement.innerHTML).toBe('');
        }));

        it('should close image preview when click backdrop', fakeAsync(() => {
            expect(overlayContainerElement).toBeTruthy();
            const previewElement = overlayContainerElement.querySelector('.thy-image-preview-wrap') as HTMLElement;
            expect(previewElement).toBeTruthy();
            previewElement.click();

            fixture.detectChanges();
            flush();
            expect(overlayContainerElement.innerHTML).toBe('');
        }));
    });
});
