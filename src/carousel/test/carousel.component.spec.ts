import { Component, DebugElement, OnInit, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { dispatchMouseEvent } from 'ngx-tethys/testing';
import { ThyCarouselModule } from '../module';
import { ThyCarousel, ThyCarouselPause } from 'ngx-tethys/carousel';
import { ThyCarouselItemDirective } from 'ngx-tethys/carousel';
import { ThyCarouselEffect, ThyCarouselTrigger } from '../typings';
import { mouseSwipe, touchSwipe, windowResize } from './carousel-events';
import { provideHttpClient } from '@angular/common/http';

@Component({
    selector: 'thy-carousel-basic-example',
    template: `
        <div>
            <thy-carousel
                [thyAutoPlay]="autoPlay"
                [thyAutoPlayInterval]="autoPlayInterval"
                [thyIndicators]="showIndicators"
                [thyControls]="showControls"
                [thyEffect]="effect"
                [thyTrigger]="trigger"
                [thyPause]="pause">
                @for (index of array; track index) {
                    <div thyCarouselItem class="custom-class">
                        <h3>{{ index }}</h3>
                    </div>
                }
            </thy-carousel>
        </div>
    `
})
class ThyTestCarouselBasicComponent implements OnInit {
    @ViewChild(ThyCarousel, { static: false }) thyCarouselComponent!: ThyCarousel;
    constructor() {}

    array: string[] = [];

    autoPlay = false;

    autoPlayInterval = 3000;

    showIndicators = true;

    showControls = true;

    effect: ThyCarouselEffect = 'slide';

    trigger: ThyCarouselTrigger = 'click';

    pause: ThyCarouselPause = 'false';

    ngOnInit(): void {
        for (let i = 0; i < 8; i++) {
            this.array.push(`Slide ${i}`);
        }
    }
}

@Component({
    selector: 'thy-carousel-touch-example',
    template: `
        <div>
            <thy-carousel [thyTouchable]="touchable">
                @for (index of array; track index) {
                    <div thyCarouselItem class="custom-class">
                        <h3>{{ index }}</h3>
                    </div>
                }
            </thy-carousel>
        </div>
    `
})
class ThyTestCarouselTouchableComponent implements OnInit {
    @ViewChild(ThyCarousel, { static: false }) thyCarouselComponent!: ThyCarousel;

    array: string[] = [];

    touchable = false;

    ngOnInit(): void {
        for (let i = 0; i < 8; i++) {
            this.array.push(`Slide ${i}`);
        }
    }
}

describe('carousel', () => {
    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [ThyCarouselModule],
            declarations: [ThyTestCarouselBasicComponent, ThyTestCarouselTouchableComponent],
            providers: [provideHttpClient()]
        });
        TestBed.compileComponents();
    }));

    describe('basic', () => {
        let fixture: ComponentFixture<ThyTestCarouselBasicComponent>;
        let basicTestComponent: ThyTestCarouselBasicComponent;
        let carouselWrapper: DebugElement;
        let carouselContents: DebugElement[];

        beforeEach(() => {
            fixture = TestBed.createComponent(ThyTestCarouselBasicComponent);
            fixture.detectChanges();
            basicTestComponent = fixture.debugElement.componentInstance;
            carouselWrapper = fixture.debugElement.query(By.directive(ThyCarousel));
            carouselContents = fixture.debugElement.queryAll(By.directive(ThyCarouselItemDirective));
        });

        it('should className and custom className correct', () => {
            fixture.detectChanges();
            expect(carouselWrapper.nativeElement.classList).toContain('thy-carousel');
            expect(carouselContents.every(content => content.nativeElement.classList.contains('thy-carousel-item'))).toBe(true);
            expect(carouselContents.every(content => content.nativeElement.classList.contains('custom-class'))).toBe(true);
            expect(carouselContents[0].nativeElement.classList).toContain('thy-carousel-item-active');
        });

        it('should autoplay work', fakeAsync(() => {
            basicTestComponent.autoPlay = true;
            fixture.detectChanges();
            expect(carouselContents[0].nativeElement.classList).toContain('thy-carousel-item-active');
            fixture.detectChanges();
            tick(4000);
            fixture.detectChanges();
            expect(carouselContents[1].nativeElement.classList).toContain('thy-carousel-item-active');
            fixture.detectChanges();
            basicTestComponent.autoPlayInterval = 0;
            fixture.detectChanges();
            tick(4000);
            expect(carouselContents[1].nativeElement.classList).toContain('thy-carousel-item-active');
            fixture.detectChanges();
            basicTestComponent.autoPlayInterval = 3000;
            basicTestComponent.autoPlay = false;
            fixture.detectChanges();
            tick(3000);
            expect(carouselContents[1].nativeElement.classList).toContain('thy-carousel-item-active');
        }));

        it('should indicators handle click', fakeAsync(() => {
            basicTestComponent.showIndicators = true;
            fixture.detectChanges();
            carouselWrapper.nativeElement.querySelector('.thy-carousel-indicators').lastElementChild.click();
            tick(1000);
            fixture.detectChanges();
            expect(carouselContents[7].nativeElement.classList).toContain('thy-carousel-item-active');
        }));

        it('should control handle click', fakeAsync(() => {
            fixture.detectChanges();
            carouselWrapper.nativeElement.querySelector('.thy-carousel-control-pre').click();
            fixture.detectChanges();
            tick(500);
            expect(carouselContents[7].nativeElement.classList).toContain('thy-carousel-item-active');
            tick(500);
            carouselWrapper.nativeElement.querySelector('.thy-carousel-control-next').click();
            fixture.detectChanges();
            tick(500);
            expect(carouselContents[0].nativeElement.classList).toContain('thy-carousel-item-active');
        }));

        it('should dynamic change content work', fakeAsync(() => {
            fixture.detectChanges();
            tick(3000);
            fixture.detectChanges();
            expect(carouselContents.length).toBe(8);
            basicTestComponent.array = [];
            fixture.detectChanges();
            tick(3000);
            carouselContents = fixture.debugElement.queryAll(By.directive(ThyCarouselItemDirective));
            expect(carouselContents.length).toBe(0);
        }));

        it('should change thyEffect', fakeAsync(() => {
            fixture.detectChanges();
            carouselWrapper.nativeElement.querySelector('.thy-carousel-indicators').lastElementChild.click();
            tick(1000);
            fixture.detectChanges();
            expect(carouselContents[7].nativeElement.classList).toContain('thy-carousel-item-active');
            basicTestComponent.effect = 'fade';
            tick(1000);
            fixture.detectChanges();
            expect(carouselContents[0].nativeElement.classList).toContain('thy-carousel-item-active');
            fixture.detectChanges();
            carouselWrapper.nativeElement.querySelector('.thy-carousel-indicators').lastElementChild.click();
            tick(1000);
            fixture.detectChanges();
            expect(carouselContents[7].nativeElement.classList).toContain('thy-carousel-item-active');
            basicTestComponent.effect = 'noop';
            tick(1000);
            fixture.detectChanges();
            expect(carouselContents[0].nativeElement.classList).toContain('thy-carousel-item-active');
        }));

        it('should touch event work', fakeAsync(() => {
            touchSwipe(basicTestComponent.thyCarouselComponent, carouselWrapper.nativeElement, 500);
            fixture.detectChanges();
            tick(1000);
            expect(carouselContents[1].nativeElement.classList).toContain('thy-carousel-item-active');
            fixture.detectChanges();
            tick(1000);
            touchSwipe(basicTestComponent.thyCarouselComponent, carouselWrapper.nativeElement, -500, 500, fixture);
            fixture.detectChanges();
            tick(1000);
            expect(carouselContents[0].nativeElement.classList).toContain('thy-carousel-item-active');
        }));

        it('should trigger slide when window is resized', fakeAsync(() => {
            mouseSwipe(basicTestComponent.thyCarouselComponent, 500);
            fixture.detectChanges();
            tick(1000);
            expect(carouselContents[1].nativeElement.classList).toContain('thy-carousel-item-active');
            fixture.detectChanges();
            const { width } = carouselWrapper.nativeElement.getBoundingClientRect();
            expect(carouselWrapper.nativeElement.querySelector('.thy-carousel-wrapper').style.transform).toBe(
                `translate3d(${-width}px, 0px, 0px)`
            );
            mouseSwipe(basicTestComponent.thyCarouselComponent, 500);
            fixture.detectChanges();
            tick(1000);
            expect(carouselContents[2].nativeElement.classList).toContain('thy-carousel-item-active');
            expect(carouselWrapper.nativeElement.querySelector('.thy-carousel-wrapper').style.transform).toBe(
                `translate3d(${-width * 2}px, 0px, 0px)`
            );
            windowResize();
            fixture.detectChanges();
            tick(1000);
            const newWidth = carouselWrapper.nativeElement.getBoundingClientRect().width;
            expect(carouselWrapper.nativeElement.querySelector('.thy-carousel-wrapper').style.transform).toBe(
                `translate3d(${-newWidth * 2}px, 0px, 0px)`
            );
        }));

        it(`should trigger work`, fakeAsync(() => {
            basicTestComponent.trigger = 'hover';
            fixture.detectChanges();
            dispatchMouseEvent(carouselWrapper.nativeElement.querySelector('.thy-carousel-indicators').lastElementChild, 'mouseenter');
            tick(1000);
            fixture.detectChanges();
            expect(carouselContents[7].nativeElement.classList).toContain('thy-carousel-item-active');
        }));

        it(`should pause when mouseenter`, fakeAsync(() => {
            basicTestComponent.autoPlay = true;
            basicTestComponent.pause = 'hover';
            fixture.detectChanges();
            tick(4000);
            fixture.detectChanges();
            expect(carouselContents[1].nativeElement.classList).toContain('thy-carousel-item-active');

            dispatchMouseEvent(carouselWrapper.nativeElement.querySelector('.thy-carousel-indicators').firstElementChild, 'mouseleave');
            fixture.detectChanges();
            tick(3500);
            expect(carouselContents[2].nativeElement.classList).toContain('thy-carousel-item-active');

            dispatchMouseEvent(carouselWrapper.nativeElement.querySelector('.thy-carousel-indicators').lastElementChild, 'mouseenter');
            fixture.detectChanges();
            tick(3500);
            expect(carouselContents[2].nativeElement.classList).toContain('thy-carousel-item-active');
        }));
    });

    describe('touchable', () => {
        let fixture: ComponentFixture<ThyTestCarouselTouchableComponent>;
        let touchableTestComponent: ThyTestCarouselTouchableComponent;
        let carouselContents: DebugElement[];

        beforeEach(() => {
            fixture = TestBed.createComponent(ThyTestCarouselTouchableComponent);
            fixture.detectChanges();
            touchableTestComponent = fixture.debugElement.componentInstance;
            carouselContents = fixture.debugElement.queryAll(By.directive(ThyCarouselItemDirective));
        });

        it('should touchable work', fakeAsync(() => {
            fixture.detectChanges();
            mouseSwipe(touchableTestComponent.thyCarouselComponent, 500);
            fixture.detectChanges();
            tick(1000);
            expect(carouselContents[0].nativeElement.classList).toContain('thy-carousel-item-active');

            touchableTestComponent.touchable = true;
            fixture.detectChanges();
            mouseSwipe(touchableTestComponent.thyCarouselComponent, 500);
            fixture.detectChanges();
            tick(1000);
            expect(carouselContents[1].nativeElement.classList).toContain('thy-carousel-item-active');
        }));
    });
});
