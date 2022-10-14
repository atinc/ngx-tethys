import { Component, DebugElement, OnInit, ViewChild } from '@angular/core';
import { ThyCarouselComponent, ThyCarouselEffect, ThyCarouselItemDirective, ThyCarouselModule } from 'ngx-tethys/carousel';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { mouseSwipe, windowResize } from './carousel-events';
import { dispatchMouseEvent } from 'ngx-tethys/testing';

@Component({
    selector: 'thy-carousel-engine',
    template: `
        <div>
            <thy-carousel [thyEffect]="effect">
                <div thyCarouselItem class="custom-class" *ngFor="let index of array">
                    <h3>{{ index }}</h3>
                </div>
            </thy-carousel>
        </div>
    `
})
class ThyTestCarouselEngineComponent implements OnInit {
    @ViewChild(ThyCarouselComponent, { static: false }) thyCarouselComponent!: ThyCarouselComponent;
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
            declarations: [ThyTestCarouselEngineComponent]
        });
        TestBed.compileComponents();
    }));
    describe(`engine`, () => {
        let fixture: ComponentFixture<ThyTestCarouselEngineComponent>;
        let basicTestComponent: ThyTestCarouselEngineComponent;
        let carouselWrapper: DebugElement;
        let carouselContents: DebugElement[];
        const drag = () => {
            console.log(`start`);
            fixture.detectChanges();
            mouseSwipe(basicTestComponent.thyCarouselComponent, 500);
            fixture.detectChanges();
            tick(1000);
            carouselContents.forEach(item => {
                console.log(item.nativeElement.classList);
            });
            console.log(`-----`);
            expect(carouselContents[1].nativeElement.classList).toContain('thy-carousel-item-active');
            mouseSwipe(basicTestComponent.thyCarouselComponent, 100, 1000, fixture);

            console.log(6);
            fixture.detectChanges();
            console.log(7);
            tick(2000);
            carouselContents.forEach(item => {
                console.log(item.nativeElement.classList);
            });
            expect(carouselContents[1].nativeElement.classList).toContain('thy-carousel-item-active');
            console.log(`end`);
            // mouseSwipe(basicTestComponent.thyCarouselComponent, -500);
            // fixture.detectChanges();
            // tick(1000);
            // expect(carouselContents[0].nativeElement.classList).toContain('thy-carousel-item-active');
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
            carouselWrapper = fixture.debugElement.query(By.directive(ThyCarouselComponent));
            carouselContents = fixture.debugElement.queryAll(By.directive(ThyCarouselItemDirective));
        });

        describe(`slide`, () => {
            it(`should drag work`, fakeAsync(() => {
                drag();
            }));
            // drag();

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
