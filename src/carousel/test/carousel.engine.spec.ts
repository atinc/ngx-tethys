import { Component, DebugElement, OnInit, ViewChild } from '@angular/core';
import { ThyCarousel, ThyCarouselEffect, ThyCarouselItemDirective, ThyCarouselModule } from 'ngx-tethys/carousel';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { mouseSwipe, windowResize } from './carousel-events';
import { provideHttpClient } from '@angular/common/http';

@Component({
    selector: 'thy-carousel-engine',
    template: `
        <div>
            <thy-carousel [thyEffect]="effect">
                @for (index of array; track index) {
                    <div thyCarouselItem class="custom-class">
                        <h3>{{ index }}</h3>
                    </div>
                }
            </thy-carousel>
        </div>
    `
})
class ThyTestCarouselEngineComponent implements OnInit {
    @ViewChild(ThyCarousel, { static: false }) thyCarouselComponent!: ThyCarousel;
    constructor() {}

    array: string[] = [];

    effect: ThyCarouselEffect = 'slide';

    ngOnInit(): void {
        for (let i = 0; i < 8; i++) {
            this.array.push(`Slide ${i}`);
        }
    }
}

describe(`carousel`, () => {
    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [ThyCarouselModule],
            declarations: [ThyTestCarouselEngineComponent],
            providers: [provideHttpClient()]
        });
        TestBed.compileComponents();
    }));
    describe(`engine`, () => {
        let fixture: ComponentFixture<ThyTestCarouselEngineComponent>;
        let basicTestComponent: ThyTestCarouselEngineComponent;
        let carouselWrapper: DebugElement;
        let carouselContents: DebugElement[];
        const drag = () => {
            fixture.detectChanges();
            mouseSwipe(basicTestComponent.thyCarouselComponent, 500);
            fixture.detectChanges();
            tick(1000);
            expect(carouselContents[1].nativeElement.classList).toContain('thy-carousel-item-active');
            mouseSwipe(basicTestComponent.thyCarouselComponent, 100, 1000, fixture);
            fixture.detectChanges();
            tick(2000);
            expect(carouselContents[1].nativeElement.classList).toContain('thy-carousel-item-active');
        };
        const horizontalStructure = () => {
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
        };
        const centralizedStructure = () => {
            mouseSwipe(basicTestComponent.thyCarouselComponent, 500);
            fixture.detectChanges();
            tick(1000);
            expect(carouselContents[1].nativeElement.classList).toContain('thy-carousel-item-active');
            expect(carouselWrapper.nativeElement.querySelector('.thy-carousel-wrapper').style.transform).toBe(`translate3d(0px, 0px, 0px)`);
            windowResize();
            fixture.detectChanges();
            tick(1000);
            expect(carouselWrapper.nativeElement.querySelector('.thy-carousel-wrapper').style.transform).toBe(`translate3d(0px, 0px, 0px)`);
        };
        beforeEach(() => {
            fixture = TestBed.createComponent(ThyTestCarouselEngineComponent);
            fixture.detectChanges();
            basicTestComponent = fixture.debugElement.componentInstance;
            carouselWrapper = fixture.debugElement.query(By.directive(ThyCarousel));
            carouselContents = fixture.debugElement.queryAll(By.directive(ThyCarouselItemDirective));
        });

        describe(`slide`, () => {
            it(`should drag work`, fakeAsync(() => {
                drag();
            }));

            it('should trigger slide when window is resized', fakeAsync(() => {
                horizontalStructure();
            }));
        });
        describe(`noop`, () => {
            beforeEach(() => {
                basicTestComponent.effect = 'noop';
                fixture.detectChanges();
            });

            it(`should drag work`, fakeAsync(() => {
                drag();
            }));

            it('should trigger slide when window is resized', fakeAsync(() => {
                horizontalStructure();
            }));
        });
        describe(`fade`, () => {
            beforeEach(() => {
                basicTestComponent.effect = 'fade';
                fixture.detectChanges();
            });

            it(`should drag work`, fakeAsync(() => {
                drag();
            }));

            it(`should trigger slide when window is resized`, fakeAsync(() => {
                centralizedStructure();
            }));
        });
    });
});
