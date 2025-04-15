import { OverlayContainer } from '@angular/cdk/overlay';
import { XhrFactory } from '@angular/common';
import { Component, DebugElement, OnInit, ɵglobal, inject as coreInject } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, flush, inject, waitForAsync } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ThyDialogModule } from 'ngx-tethys/dialog';
import { MockXhrFactory, dispatchKeyboardEvent, dispatchMouseEvent } from 'ngx-tethys/testing';
import { keycodes } from 'ngx-tethys/util';
import { timer } from 'rxjs';
import { InternalImageInfo, ThyImagePreviewOptions, ThyImageService, ThyImageModule, ThyImagePreviewRef } from 'ngx-tethys/image';
import { fetchImageBlob } from '../utils';
import { provideHttpClient } from '@angular/common/http';

let imageOnload: () => void = null;

@Component({
    selector: 'thy-image-preview-test',
    template: ` <button thyButton="primary" (click)="onClick()">Preview</button> `,
    imports: [ThyImageModule, ThyDialogModule]
})
class ImagePreviewTestComponent implements OnInit {
    private thyImageService = coreInject(ThyImageService);
    private sanitizer = coreInject(DomSanitizer);

    images: InternalImageInfo[] = [
        {
            src: 'first.png',
            alt: 'first',
            name: 'first.jpg',
            size: '66kb',
            origin: {
                src: 'first.png'
            }
        },
        {
            src: 'second.png',
            alt: 'last',
            name: 'second.jpg',
            size: '44kb'
        }
    ];
    previewConfig: ThyImagePreviewOptions = {};
    imageRef: ThyImagePreviewRef;

    ngOnInit(): void {
        var urlCreator = window.URL || window.webkitURL;
        this.images.forEach(img => {
            img.blob = new File([''], img.name, { type: 'image/jpeg' });
            var objectURL = urlCreator.createObjectURL(img.blob);
            img.objectURL = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        });
    }

    onClick() {
        this.imageRef = this.thyImageService.preview(this.images, this.previewConfig);
    }
}

describe('image-preview', () => {
    let fixture: ComponentFixture<ImagePreviewTestComponent>;
    let basicTestComponent: ImagePreviewTestComponent;
    let debugElement: DebugElement;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;
    let formElement: HTMLElement;
    let mockXhrFactory: MockXhrFactory;

    beforeEach(() => {
        mockXhrFactory = new MockXhrFactory();
        TestBed.configureTestingModule({
            imports: [ThyImageModule],
            providers: [
                provideHttpClient(),
                provideNoopAnimations(),
                {
                    provide: XhrFactory,
                    useValue: mockXhrFactory
                }
            ]
        });
        TestBed.compileComponents();
        fixture = TestBed.createComponent(ImagePreviewTestComponent);
        basicTestComponent = fixture.debugElement.componentInstance;
        debugElement = fixture.debugElement;
        formElement = debugElement.nativeElement;
        document.documentElement.requestFullscreen = jasmine.createSpy('requestFullscreen');
        fixture.detectChanges();
    });

    beforeEach(inject([OverlayContainer], (_overlayContainer: OverlayContainer) => {
        overlayContainer = _overlayContainer;
        overlayContainerElement = _overlayContainer.getContainerElement();
    }));

    beforeEach(() => {
        Object.defineProperty(ɵglobal.Image.prototype, 'onload', {
            configurable: true,
            get: function () {
                return this._onload;
            },
            set: function (fn) {
                imageOnload = fn;
                this._onload = fn;
            }
        });
    });

    afterEach(() => {
        overlayContainer.ngOnDestroy();
    });

    it('should create image preview when click button', () => {
        const button = (debugElement.nativeElement as HTMLElement).querySelector('button');
        button.click();
        fixture.detectChanges();
        expect(overlayContainerElement).toBeTruthy();
        expect(overlayContainerElement.querySelector('.thy-image-preview-wrap')).toBeTruthy();
        validImageSrc(overlayContainerElement, basicTestComponent.images[0]);
        expect(overlayContainerElement.querySelector('.thy-image-preview-operations')).toBeTruthy();
        expect(overlayContainerElement.querySelectorAll('.thy-action').length).toBe(9);
    });

    it('should show custom operations', () => {
        const previewSpy = jasmine.createSpy('view original');

        basicTestComponent.previewConfig = {
            zoom: 1,
            operations: [
                'zoom-out',
                'zoom-in',
                'rotate-right',
                'download',
                {
                    icon: 'preview',
                    name: '查看原图',
                    action: previewSpy,
                    type: 'view-original'
                }
            ]
        };
        fixture.detectChanges();
        const button = (debugElement.nativeElement as HTMLElement).querySelector('button');
        button.click();
        fixture.detectChanges();
        expect(overlayContainerElement).toBeTruthy();
        expect(overlayContainerElement.querySelector('.thy-image-preview-wrap')).toBeTruthy();
        expect(overlayContainerElement.querySelector('.thy-image-preview-operations')).toBeTruthy();
        expect(overlayContainerElement.querySelectorAll('.thy-actions .thy-action').length).toBe(5);
        const operations = overlayContainerElement.querySelectorAll('.thy-actions .thy-action');
        const preview = operations[4] as HTMLElement;

        expect(preview.getAttribute('ng-reflect-content')).toBe('查看原图');
        preview.click();

        expect(previewSpy).toHaveBeenCalledWith(basicTestComponent.images[0]);
    });

    it('should zoom out image when click zoom-out icon', () => {
        basicTestComponent.previewConfig.zoom = 0.2;
        const button = (debugElement.nativeElement as HTMLElement).querySelector('button');
        button.click();
        fixture.detectChanges();

        let previousZoom = basicTestComponent.imageRef.previewInstance.zoom;
        expect(previousZoom).toBe(basicTestComponent.previewConfig.zoom);
        const operations = overlayContainerElement.querySelectorAll('.thy-actions .thy-action');
        const zoomOut = operations[0] as HTMLElement;
        expect(zoomOut.getAttribute('ng-reflect-content')).toBe('缩小');
        zoomOut.click();

        let currentZoom = basicTestComponent.imageRef.previewInstance.zoom;
        let currentImageTransform = basicTestComponent.imageRef.previewInstance.previewImageTransform;
        expect(currentZoom).toBe(previousZoom - 0.1);
        expect(currentImageTransform).toContain(`scale3d(${previousZoom - 0.1}, ${previousZoom - 0.1}, 1)`);

        zoomOut.click();
        currentZoom = basicTestComponent.imageRef.previewInstance.zoom;
        currentImageTransform = basicTestComponent.imageRef.previewInstance.previewImageTransform;
        expect(currentZoom).toBe(0.1);
        expect(currentImageTransform).toContain(`scale3d(0.1, 0.1, 1)`);
    });

    it('should zoom in image when click zoom-in icon', () => {
        basicTestComponent.previewConfig.zoom = 2.9;
        fixture.detectChanges();
        const button = (debugElement.nativeElement as HTMLElement).querySelector('button');
        button.click();

        let previousZoom = basicTestComponent.imageRef.previewInstance.zoom;
        expect(previousZoom).toBe(basicTestComponent.previewConfig.zoom);
        const operations = overlayContainerElement.querySelectorAll('.thy-actions .thy-action');
        const zoomIn = operations[1] as HTMLElement;
        expect(zoomIn.getAttribute('ng-reflect-content')).toBe('放大');
        zoomIn.click();

        let currentZoom = basicTestComponent.imageRef.previewInstance.zoom;
        let currentImageTransform = basicTestComponent.imageRef.previewInstance.previewImageTransform;
        expect(currentZoom).toBe(previousZoom + 0.1);
        expect(currentImageTransform).toContain(`scale3d(${previousZoom + 0.1}, ${previousZoom + 0.1}, 1)`);

        zoomIn.click();
        currentZoom = basicTestComponent.imageRef.previewInstance.zoom;
        currentImageTransform = basicTestComponent.imageRef.previewInstance.previewImageTransform;
        expect(currentZoom).toBe(3);
        expect(currentImageTransform).toContain(`scale3d(3, 3, 1)`);
    });

    it('should set correctly zoom when click change view icon', () => {
        basicTestComponent.previewConfig.zoom = 2;
        fixture.detectChanges();
        const button = (debugElement.nativeElement as HTMLElement).querySelector('button');
        button.click();

        let operations = overlayContainerElement.querySelectorAll('.thy-actions .thy-action');
        const originalSize = operations[2] as HTMLElement;
        expect(originalSize.getAttribute('ng-reflect-content')).toBe('原始比例');
        const spy = spyOn(basicTestComponent.imageRef.previewInstance, 'calculateInsideScreen').and.callThrough();
        originalSize.click();

        fixture.detectChanges();
        let currentZoom = basicTestComponent.imageRef.previewInstance.zoom;
        let currentImageTransform = basicTestComponent.imageRef.previewInstance.previewImageTransform;
        const fitScreen = overlayContainerElement.querySelectorAll('.thy-actions .thy-action')[2] as HTMLElement;
        expect(spy).toHaveBeenCalled();
        expect(fitScreen.getAttribute('ng-reflect-content')).toBe('适应屏幕');
        expect(currentZoom).toBe(1);
        expect(basicTestComponent.imageRef.componentInstance.isInsideScreen).toBe(true);
        expect(currentImageTransform).toContain(`scale3d(1, 1, 1)`);

        fitScreen.click();
        currentZoom = basicTestComponent.imageRef.previewInstance.zoom;
        currentImageTransform = basicTestComponent.imageRef.previewInstance.previewImageTransform;
        expect(originalSize.getAttribute('ng-reflect-content')).toBe('原始比例');
        const defaultZoom = basicTestComponent.previewConfig.zoom;
        expect(currentZoom).toBe(defaultZoom);
        expect(currentImageTransform).toContain(`scale3d(${defaultZoom}, ${defaultZoom}, 1)`);
    });

    it('should fullscreen when click full-screen icon', () => {
        fixture.detectChanges();
        const button = (debugElement.nativeElement as HTMLElement).querySelector('button');
        button.click();
        expect(overlayContainerElement.querySelector('.thy-image-preview-wrap')).toBeTruthy();
        expect(overlayContainerElement.querySelector('.thy-fullscreen-active')).toBeFalsy();
        const operations = overlayContainerElement.querySelectorAll('.thy-actions .thy-action');
        const fullScreen = operations[3] as HTMLElement;
        expect(fullScreen.getAttribute('ng-reflect-content')).toBe('全屏显示');
        fullScreen.click();

        expect(document.documentElement.requestFullscreen).toHaveBeenCalled();
    });

    it('should rotate image when click rotate icon', () => {
        basicTestComponent.previewConfig.rotate = 90;
        fixture.detectChanges();
        const button = (debugElement.nativeElement as HTMLElement).querySelector('button');
        button.click();

        fixture.detectChanges();
        const previousRotate = basicTestComponent.imageRef.previewInstance['rotate'];
        const operations = overlayContainerElement.querySelectorAll('.thy-actions .thy-action');
        const rotate = operations[4] as HTMLElement;
        expect(rotate.getAttribute('ng-reflect-content')).toBe('旋转');
        expect(previousRotate).toBe(basicTestComponent.previewConfig.rotate);
        rotate.click();

        const currentRotate = basicTestComponent.imageRef.previewInstance['rotate'];
        const currentImageTransform = basicTestComponent.imageRef.previewInstance.previewImageTransform;
        expect(currentRotate).toBe(previousRotate + 90);
        expect(currentImageTransform).toContain(`rotate(${previousRotate + 90}deg)`);
    });

    it('should download image when click download icon', done => {
        fixture.detectChanges();
        const button = (debugElement.nativeElement as HTMLElement).querySelector('button');
        button.click();
        fixture.detectChanges();

        const anchorElement = document.createElement('a');
        spyOn(document, 'createElement').and.returnValue(anchorElement);
        const clickSpy = spyOn(anchorElement, 'click');

        spyOn(XMLHttpRequest.prototype, 'open').and.callThrough();
        spyOn(XMLHttpRequest.prototype, 'send').and.callThrough();

        const operations = overlayContainerElement.querySelectorAll('.thy-actions .thy-action');
        const download = operations[5] as HTMLElement;
        expect(download.getAttribute('ng-reflect-content')).toBe('下载');
        download.click();

        fetchImageBlob(basicTestComponent.images[0].origin.src).subscribe(() => {
            expect(document.createElement).toHaveBeenCalledWith('a');
            expect(anchorElement.download).toBe('first.jpg');
            expect(anchorElement.href).toContain('blob:');
            expect(clickSpy).toHaveBeenCalledTimes(1);
            done();
        });

        expect(XMLHttpRequest.prototype.open).toHaveBeenCalled();
        expect(XMLHttpRequest.prototype.send).toHaveBeenCalled();
    });

    it('should downloadClicked() was subscribed when click download icon', () => {
        fixture.detectChanges();
        const button = (debugElement.nativeElement as HTMLElement).querySelector('button');
        button.click();
        fixture.detectChanges();

        const downloadSpy = jasmine.createSpy('download clicked');
        basicTestComponent['thyImageService'].downloadClicked().subscribe(downloadSpy);

        const operations = overlayContainerElement.querySelectorAll('.thy-actions .thy-action');
        const download = operations[5] as HTMLElement;
        expect(download.getAttribute('ng-reflect-content')).toBe('下载');
        download.click();

        expect(downloadSpy).toHaveBeenCalledWith(basicTestComponent.images[0]);
    });

    it('should open new tab with origin src when click origin icon', () => {
        fixture.detectChanges();
        const button = (debugElement.nativeElement as HTMLElement).querySelector('button');
        button.click();

        fixture.detectChanges();
        const operations = overlayContainerElement.querySelectorAll('.thy-actions .thy-action');
        const download = operations[6] as HTMLElement;
        const openSpy = spyOn(window, 'open').and.callFake(() => {
            return true;
        });
        expect(download.getAttribute('ng-reflect-content')).toBe('查看原图');
        download.click();

        expect(openSpy).toHaveBeenCalled();
        expect(openSpy).toHaveBeenCalledWith(basicTestComponent.images[0].origin.src, '_blank');
    });

    it('should copy image link when click copy icon', () => {
        fixture.detectChanges();
        const button = (debugElement.nativeElement as HTMLElement).querySelector('button');
        button.click();

        fixture.detectChanges();
        const operations = overlayContainerElement.querySelectorAll('.thy-actions .thy-action');
        const copy = operations[7] as HTMLElement;
        expect(copy.getAttribute('ng-reflect-thy-copy-tips')).toBe('复制链接');
        // test copy
        // copy.click()
    });

    it('should preview image can be switched correctly', () => {
        fixture.detectChanges();
        const button = (debugElement.nativeElement as HTMLElement).querySelector('button');
        button.click();

        fixture.detectChanges();
        expect(overlayContainerElement).toBeTruthy();
        expect(overlayContainerElement.querySelector('.thy-image-preview-wrap') as HTMLElement).toBeTruthy();
        validImageSrc(overlayContainerElement, basicTestComponent.images[0]);

        const leftSwitch = overlayContainerElement.querySelector('.thy-image-preview-switch-left') as HTMLElement;
        const rightSwitch = overlayContainerElement.querySelector('.thy-image-preview-switch-right') as HTMLElement;
        expect(leftSwitch).toBeTruthy();
        expect(rightSwitch).toBeTruthy();

        rightSwitch.click();
        fixture.detectChanges();
        validImageSrc(overlayContainerElement, basicTestComponent.images[1]);

        dispatchKeyboardEvent(formElement, 'keydown', keycodes.RIGHT_ARROW);
        fixture.detectChanges();
        validImageSrc(overlayContainerElement, basicTestComponent.images[1]);

        leftSwitch.click();
        fixture.detectChanges();
        validImageSrc(overlayContainerElement, basicTestComponent.images[0]);

        dispatchKeyboardEvent(formElement, 'keydown', keycodes.LEFT_ARROW);
        fixture.detectChanges();
        validImageSrc(overlayContainerElement, basicTestComponent.images[0]);
    });

    it('should close the preview when click backdrop', fakeAsync(() => {
        fixture.detectChanges();
        const button = (debugElement.nativeElement as HTMLElement).querySelector('button');
        button.click();

        expect(overlayContainerElement).toBeTruthy();
        let wrapper = overlayContainerElement.querySelector('.thy-image-preview-wrap');
        dispatchMouseEvent(wrapper, 'click', 100, 100);
        timer(300);
        fixture.detectChanges();
        flush();
        expect(overlayContainerElement.querySelector('.thy-image-preview-wrap') as HTMLElement).toBeFalsy();
    }));

    it('should fetch imageBlob when resolveSize is true', done => {
        basicTestComponent.images = [
            {
                src: 'first.png',
                alt: 'first',
                name: 'first.jpg',
                size: '77kb',
                origin: {
                    src: 'first.png'
                }
            }
        ];
        basicTestComponent.previewConfig.resolveSize = true;
        fixture.detectChanges();
        const button = (debugElement.nativeElement as HTMLElement).querySelector('button');
        button.click();

        fixture.detectChanges();
        mockXhrFactory.build();
        mockXhrFactory.mock.open('GET', basicTestComponent.images[0].src);
        mockXhrFactory.mock.responseType = 'blob';
        mockXhrFactory.mock.listeners.load = () => {
            expect(basicTestComponent.imageRef.previewInstance.previewImage.size).toEqual(mockXhrFactory.mock.response.data.size);
            done();
        };
        mockXhrFactory.mock.mockFlush(XMLHttpRequest.DONE, 'SUCCESS', {
            code: 200,
            data: { size: '77kb' }
        });
        mockXhrFactory.mock.send({
            code: 200,
            data: { size: '77kb' }
        });
    });

    xit('should resolve image objectURL and size', waitForAsync(() => {
        basicTestComponent.images = [
            {
                src: 'assets/images/image/first.png',
                alt: 'first',
                name: 'first.jpg',
                origin: {
                    src: 'assets/images/image/second.png'
                }
            }
        ];
        basicTestComponent.previewConfig.resolveSize = true;
        const button = (debugElement.nativeElement as HTMLElement).querySelector('button');
        button.click();
        fixture.detectChanges();

        basicTestComponent.imageRef.previewInstance.resolvePreviewImage().subscribe(() => {
            expect(basicTestComponent.images[0].size).toBeTruthy();
            expect(basicTestComponent.images[0].objectURL).toBeTruthy();
            expect(basicTestComponent.images[0].blob).toBeTruthy();
        });
    }));

    it('should set correctly objectURL when src is blob image', () => {
        basicTestComponent.images = [
            {
                src: 'blob:http://at.pingcode.local:15000/51e61005-175f-46de-a79e-9cdc79f57801'
            }
        ];
        fixture.detectChanges();
        const button = (debugElement.nativeElement as HTMLElement).querySelector('button');
        button.click();
        fixture.detectChanges();

        expect(basicTestComponent.images[0].objectURL).toBeTruthy();
    });
});

const validImageSrc = (overlayContainerElement: HTMLElement, image: InternalImageInfo) => {
    imageOnload();
    expect(overlayContainerElement.querySelector('img')).toBeTruthy();
    expect((overlayContainerElement.querySelector('img') as HTMLElement).getAttribute('src')).toBe(
        (image.objectURL as any).changingThisBreaksApplicationSecurity
    );
};
