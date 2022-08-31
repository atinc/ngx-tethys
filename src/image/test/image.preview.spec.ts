import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, DebugElement, OnInit } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ThyDialogModule } from 'ngx-tethys/dialog';
import { ThyImageModule } from '../module';
import { ComponentFixture, inject, TestBed, waitForAsync, fakeAsync, flush } from '@angular/core/testing';
import { ThyImageService } from '../image.service';
import { InternalImageInfo, ThyImagePreviewOptions } from '../image.class';
import { ThyImagePreviewRef } from '../preview/image-preview-ref';
import { DomSanitizer } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { dispatchKeyboardEvent, dispatchMouseEvent } from 'ngx-tethys/testing';
import { humanizeBytes, keycodes } from 'ngx-tethys/util';
import { fromEvent, timer } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
    selector: 'thy-image-preview-test',
    template: `
        <button thyButton="primary" (click)="onClick()">Preview</button>
    `
})
class ImagePreviewTestComponent implements OnInit {
    constructor(private thyImageService: ThyImageService, private sanitizer: DomSanitizer) {}
    images: InternalImageInfo[] = [
        {
            src: 'https://angular.cn/generated/images/marketing/home/responsive-framework.svg',
            alt: 'first',
            name: 'first.jpg',
            size: '66kb',
            origin: {
                src: 'https://angular.cn/generated/images/marketing/home/responsive-framework.svg'
            }
        },
        {
            src: 'https://angular.cn/assets/images/logos/angular/shield-large.svg',
            alt: 'last',
            name: 'last.jpg',
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
    let _document: Document;
    let formElement: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ThyImageModule, ThyDialogModule, NoopAnimationsModule],
            declarations: [ImagePreviewTestComponent]
        }).compileComponents();
        fixture = TestBed.createComponent(ImagePreviewTestComponent);
        basicTestComponent = fixture.debugElement.componentInstance;
        debugElement = fixture.debugElement;
        formElement = debugElement.nativeElement;
        document.documentElement.requestFullscreen = jasmine.createSpy('requestFullscreen');
        fixture.detectChanges();
        _document = TestBed.inject(DOCUMENT);
    });

    beforeEach(inject([OverlayContainer], (_overlayContainer: OverlayContainer) => {
        overlayContainer = _overlayContainer;
        overlayContainerElement = _overlayContainer.getContainerElement();
    }));

    afterEach(() => {
        overlayContainer.ngOnDestroy();
    });

    xit('should create image preview when click button', () => {
        const button = (debugElement.nativeElement as HTMLElement).querySelector('button');
        button.click();
        fixture.detectChanges();
        expect(overlayContainerElement).toBeTruthy();
        expect(overlayContainerElement.querySelector('.thy-image-preview-wrap')).toBeTruthy();
        expect(overlayContainerElement.querySelector('img') as HTMLElement).toBeTruthy();
        expect((overlayContainerElement.querySelector('img') as HTMLElement).getAttribute('src')).toBe(basicTestComponent.images[0].src);
        expect(overlayContainerElement.querySelector('.thy-image-preview-operations')).toBeTruthy();
        expect(overlayContainerElement.querySelectorAll('li.thy-image-preview-operation').length).toBe(8);
    });

    it('should show custom operations', () => {
        basicTestComponent.previewConfig = {
            zoom: 1,
            operations: ['zoom-out', 'zoom-in', 'rotate-right', 'download']
        };
        fixture.detectChanges();
        const button = (debugElement.nativeElement as HTMLElement).querySelector('button');
        button.click();
        fixture.detectChanges();
        expect(overlayContainerElement).toBeTruthy();
        expect(overlayContainerElement.querySelector('.thy-image-preview-wrap')).toBeTruthy();
        expect(overlayContainerElement.querySelector('.thy-image-preview-operations')).toBeTruthy();
        expect(overlayContainerElement.querySelectorAll('.thy-actions .thy-action').length).toBe(4);
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

    it('should download image when click download icon', () => {
        fixture.detectChanges();
        const button = (debugElement.nativeElement as HTMLElement).querySelector('button');
        button.click();
        // const spyObj: jasmine.SpyObj<HTMLAnchorElement> = jasmine.createSpyObj('a', ['click', 'setAttribute', 'href']);
        // const createElementSpy = spyOn(_document, 'createElement').and.returnValue(spyObj);

        fixture.detectChanges();
        const operations = overlayContainerElement.querySelectorAll('.thy-actions .thy-action');
        const download = operations[5] as HTMLElement;
        expect(download.getAttribute('ng-reflect-content')).toBe('下载');
        download.click();

        // const img = new Image();
        // img.onerror = () => {

        //     // expect(createElementSpy).toHaveBeenCalled();
        //     // console.log(createElementSpy)
        //     console.log(createElementSpy);
        //     done();
        // };
        // img.src = 'error';

        // test download success
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
        const download = operations[7] as HTMLElement;
        expect(download.getAttribute('ng-reflect-thy-copy-tips')).toBe('复制链接');
        // test copy
        // download.click()
    });

    it('should preview image can be switched correctly', done => {
        fixture.detectChanges();
        const button = (debugElement.nativeElement as HTMLElement).querySelector('button');
        button.click();
        const img = new Image();

        expect(overlayContainerElement).toBeTruthy();
        expect(overlayContainerElement.querySelector('.thy-image-preview-wrap') as HTMLElement).toBeTruthy();
        validImageSrc(overlayContainerElement, img, basicTestComponent.images[0], done);

        const leftSwitch = overlayContainerElement.querySelector('.thy-image-preview-switch-left') as HTMLElement;
        const rightSwitch = overlayContainerElement.querySelector('.thy-image-preview-switch-right') as HTMLElement;
        expect(leftSwitch).toBeTruthy();
        expect(rightSwitch).toBeTruthy();

        rightSwitch.click();
        fixture.detectChanges();
        validImageSrc(overlayContainerElement, img, basicTestComponent.images[1], done);

        dispatchKeyboardEvent(formElement, 'keydown', keycodes.RIGHT_ARROW);
        fixture.detectChanges();
        validImageSrc(overlayContainerElement, img, basicTestComponent.images[1], done);

        leftSwitch.click();
        fixture.detectChanges();
        validImageSrc(overlayContainerElement, img, basicTestComponent.images[0], done);

        dispatchKeyboardEvent(formElement, 'keydown', keycodes.LEFT_ARROW);
        fixture.detectChanges();
        validImageSrc(overlayContainerElement, img, basicTestComponent.images[0], done);
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
                src: 'https://angular.cn/generated/images/marketing/home/responsive-framework.svg',
                alt: 'first',
                name: 'first.jpg',
                origin: {
                    src: 'https://angular.cn/generated/images/marketing/home/responsive-framework.svg'
                }
            }
        ];
        basicTestComponent.previewConfig.resolveSize = true;
        fixture.detectChanges();
        const button = (debugElement.nativeElement as HTMLElement).querySelector('button');
        button.click();

        fixture.detectChanges();
        const xhr = new XMLHttpRequest();
        xhr.open('GET', basicTestComponent.images[0].src);
        xhr.responseType = 'blob';
        xhr.onload = data => {
            expect(basicTestComponent.imageRef.previewInstance.previewImage.size).toEqual(humanizeBytes(xhr.response.size));
            done();
        };

        xhr.send();
    });

    xit(
        'should resolve image objectURL and size',
        waitForAsync(() => {
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
        })
    );

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

const validImageSrc = (overlayContainerElement: HTMLElement, img: HTMLImageElement, image: InternalImageInfo, done: DoneFn) => {
    img.onload = () => {
        expect((overlayContainerElement.querySelector('img') as HTMLElement).getAttribute('src')).toBe(
            (image.objectURL as any).changingThisBreaksApplicationSecurity
        );
        done();
    };
    img.src = image.src;
};
