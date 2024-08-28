import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, DebugElement } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ThyDialogModule } from 'ngx-tethys/dialog';
import { ThyImageModule } from '../module';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';

@Component({
    selector: 'thy-image-group-test',
    template: `
        <thy-image-group>
            @for (image of images; track image) {
                <img thyImage [thySrc]="image.src" [thyImageMeta]="image.imageMeta" />
            }
        </thy-image-group>
    `
})
class ImageGroupTestComponent {
    images = [
        {
            src: 'assets/images/image/first.png',
            imageMeta: {
                name: 'first.jpg',
                size: '66kb'
            }
        },
        {
            src: 'assets/images/image/second.png',
            imageMeta: {
                name: 'last.jpg',
                size: '44kb'
            }
        }
    ];
}

describe('image-group', () => {
    let fixture: ComponentFixture<ImageGroupTestComponent>;
    let basicTestComponent: ImageGroupTestComponent;
    let debugElement: DebugElement;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ThyImageModule, ThyDialogModule, NoopAnimationsModule],
            declarations: [ImageGroupTestComponent]
        }).compileComponents();
        fixture = TestBed.createComponent(ImageGroupTestComponent);
        basicTestComponent = fixture.debugElement.componentInstance;
        debugElement = fixture.debugElement;
        fixture.detectChanges();
    });

    beforeEach(inject([OverlayContainer], (_overlayContainer: OverlayContainer) => {
        overlayContainer = _overlayContainer;
        overlayContainerElement = _overlayContainer.getContainerElement();
    }));

    afterEach(() => {
        overlayContainer.ngOnDestroy();
    });

    it('should create img group ', () => {
        fixture.detectChanges();
        expect(debugElement.nativeElement).toBeTruthy();
        const imageGroupElement = (debugElement.nativeElement as HTMLElement).querySelector('thy-image-group');
        expect(imageGroupElement).toBeTruthy();
        expect(imageGroupElement.querySelectorAll('img').length).toBe(2);
    });

    xit('should open the preview of the clicked image', () => {
        fixture.detectChanges();
        const imageGroupElement = (debugElement.nativeElement as HTMLElement).querySelector('thy-image-group');
        const images = imageGroupElement.querySelectorAll('img');
        images[1].click();
        fixture.detectChanges();
        expect(overlayContainerElement).toBeTruthy();
        expect(overlayContainerElement.querySelector('.thy-image-preview-wrap') as HTMLElement).toBeTruthy();
        expect(overlayContainerElement.querySelector('img') as HTMLElement).toBeTruthy();
        expect((overlayContainerElement.querySelector('img') as HTMLElement).getAttribute('src')).toBe(basicTestComponent.images[1].src);
    });
});
