import { Component, DebugElement, OnInit, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ThyCarouselModule } from '../module';
import { ThyCarouselComponent } from '../carousel.component';
import { ThyCarouselItemDirective } from '../carousel-item.directive';
import { By } from '@angular/platform-browser';
import { thyEffectType } from 'ngx-tethys/carousel';
import { dispatchEvent, dispatchMouseEvent, dispatchTouchEvent } from 'ngx-tethys/testing/dispatcher-events';

@Component({
    selector: 'thy-carousel-basic-example',
    template: `
        <div>
            <thy-carousel
                [thyAutoPlay]="autoPlay"
                [thyAutoPlaySpeed]="autoPlaySpeed"
                [thyShowDot]="showDots"
                [thyShowArrow]="showArrow"
                [thyEffect]="effect"
            >
                <div thy-carousel-item class="custom-class" [thyClass]="'custom-carousel-item'" *ngFor="let index of array">
                    <h3>{{ index }}</h3>
                </div>
            </thy-carousel>
        </div>
    `
})
class ThyTestCarouselBasicComponent implements OnInit {
    @ViewChild(ThyCarouselComponent, { static: false }) thyCarouselComponent!: ThyCarouselComponent;
    constructor() {}

    array: string[] = [];

    autoPlay = false;

    autoPlaySpeed = 3000;

    showDots = true;

    showArrow = true;

    effect: thyEffectType = 'slide';

    ngOnInit(): void {
        for (let i = 0; i < 8; i++) {
            this.array.push(`Slide ${i}`);
        }
    }
}

@Component({
    selector: 'thy-carousel-basic-example',
    template: `
        <div>
            <thy-carousel>
                <div thy-carousel-item [class]="null">1</div>
                <div thy-carousel-item [class]="undefined">2</div>
            </thy-carousel>
        </div>
    `
})
class ThyTestCarouselNoClassComponent {}

describe('carousel', () => {
    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [ThyCarouselModule],
            declarations: [ThyTestCarouselBasicComponent]
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
            carouselWrapper = fixture.debugElement.query(By.directive(ThyCarouselComponent));
            carouselContents = fixture.debugElement.queryAll(By.directive(ThyCarouselItemDirective));
        });

        it('should className and custom className correct', () => {
            fixture.detectChanges();
            expect(carouselWrapper.nativeElement.classList).toContain('thy-carousel');
            expect(carouselContents.every(content => content.nativeElement.classList.contains('carousel-item'))).toBe(true);
            expect(carouselContents.every(content => content.nativeElement.classList.contains('custom-class'))).toBe(true);
            expect(carouselContents[0].nativeElement.classList).toContain('carousel-item-active');
        });

        it('should autoplay work', fakeAsync(() => {
            basicTestComponent.autoPlay = true;
            fixture.detectChanges();
            expect(carouselContents[0].nativeElement.classList).toContain('carousel-item-active');
            fixture.detectChanges();
            tick(4000);
            fixture.detectChanges();
            expect(carouselContents[1].nativeElement.classList).toContain('carousel-item-active');
            fixture.detectChanges();
            basicTestComponent.autoPlaySpeed = 0;
            fixture.detectChanges();
            tick(4000);
            expect(carouselContents[1].nativeElement.classList).toContain('carousel-item-active');
            fixture.detectChanges();
            basicTestComponent.autoPlaySpeed = 3000;
            basicTestComponent.autoPlay = false;
            fixture.detectChanges();
            tick(3000);
            expect(carouselContents[1].nativeElement.classList).toContain('carousel-item-active');
        }));

        it('should dots handle click', fakeAsync(() => {
            basicTestComponent.showDots = true;
            fixture.detectChanges();
            carouselWrapper.nativeElement.querySelector('.carousel-dots').lastElementChild.click();
            tick(1000);
            fixture.detectChanges();
            expect(carouselContents[7].nativeElement.classList).toContain('carousel-item-active');
        }));

        it('should arrow handle click', fakeAsync(() => {
            fixture.detectChanges();
            carouselWrapper.nativeElement.querySelector('.carousel-arrow-left').click();
            fixture.detectChanges();
            tick(500);
            expect(carouselContents[7].nativeElement.classList).toContain('carousel-item-active');
            tick(500);
            carouselWrapper.nativeElement.querySelector('.carousel-arrow-right').click();
            fixture.detectChanges();
            tick(500);
            expect(carouselContents[0].nativeElement.classList).toContain('carousel-item-active');
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
            carouselWrapper.nativeElement.querySelector('.carousel-dots').lastElementChild.click();
            tick(1000);
            fixture.detectChanges();
            expect(carouselContents[7].nativeElement.classList).toContain('carousel-item-active');
            basicTestComponent.effect = 'fade';
            tick(1000);
            fixture.detectChanges();
            expect(carouselContents[0].nativeElement.classList).toContain('carousel-item-active');
            fixture.detectChanges();
            carouselWrapper.nativeElement.querySelector('.carousel-dots').lastElementChild.click();
            tick(1000);
            fixture.detectChanges();
            expect(carouselContents[7].nativeElement.classList).toContain('carousel-item-active');
            basicTestComponent.effect = 'noop';
            tick(1000);
            fixture.detectChanges();
            expect(carouselContents[0].nativeElement.classList).toContain('carousel-item-active');
        }));

        it('should drag work', fakeAsync(() => {
            mouseSwipe(basicTestComponent.thyCarouselComponent, 500);
            fixture.detectChanges();
            tick(1000);
            expect(carouselContents[1].nativeElement.classList).toContain('carousel-item-active');
            mouseSwipe(basicTestComponent.thyCarouselComponent, 300, 1000);
            fixture.detectChanges();
            tick(2000);
            expect(carouselContents[1].nativeElement.classList).toContain('carousel-item-active');
            mouseSwipe(basicTestComponent.thyCarouselComponent, -500, 500);
            fixture.detectChanges();
            tick(1000);
            expect(carouselContents[0].nativeElement.classList).toContain('carousel-item-active');
        }));

        it('should window resize set init value', fakeAsync(() => {
            touchSwipe(basicTestComponent.thyCarouselComponent, carouselWrapper.nativeElement, 500, 0);
            fixture.detectChanges();
            tick(1000);
            expect(carouselContents[1].nativeElement.classList).toContain('carousel-item-active');
            fixture.detectChanges();
            tick(1000);
            touchSwipe(basicTestComponent.thyCarouselComponent, carouselWrapper.nativeElement, -500, 500);
            fixture.detectChanges();
            tick(1000);
            expect(carouselContents[0].nativeElement.classList).toContain('carousel-item-active');
        }));

        it('should trigger slide when window is resized', fakeAsync(() => {
            mouseSwipe(basicTestComponent.thyCarouselComponent, 500);
            fixture.detectChanges();
            tick(1000);
            expect(carouselContents[1].nativeElement.classList).toContain('carousel-item-active');
            fixture.detectChanges();
            const { width } = carouselWrapper.nativeElement.getBoundingClientRect();
            expect(carouselWrapper.nativeElement.querySelector('.carousel-wrapper').style.transform).toBe(
                `translate3d(${-width}px, 0px, 0px)`
            );
            mouseSwipe(basicTestComponent.thyCarouselComponent, 500);
            fixture.detectChanges();
            tick(1000);
            expect(carouselContents[2].nativeElement.classList).toContain('carousel-item-active');
            expect(carouselWrapper.nativeElement.querySelector('.carousel-wrapper').style.transform).toBe(
                `translate3d(${-width * 2}px, 0px, 0px)`
            );
            windowResize();
            fixture.detectChanges();
            tick(1000);
            const newWidth = carouselWrapper.nativeElement.getBoundingClientRect().width;
            expect(carouselWrapper.nativeElement.querySelector('.carousel-wrapper').style.transform).toBe(
                `translate3d(${-newWidth * 2}px, 0px, 0px)`
            );
        }));
    });
});

function mouseSwipe(carousel: ThyCarouselComponent, distance: number, delay = 0): void {
    carousel.onDrag(
        new MouseEvent('mousedown', {
            clientX: 500,
            clientY: 0
        })
    );

    dispatchMouseEvent(document, 'mousemove', 500 - distance, 0);
    setTimeout(() => {
        dispatchMouseEvent(document, 'mouseup');
    }, delay);
}

function touchSwipe(carousel: ThyCarouselComponent, target: HTMLElement, distance: number, delay = 0): void {
    const touchObj = new Touch({
        clientX: 500,
        clientY: 0,
        pageX: 500,
        identifier: Date.now(),
        target: target
    });

    carousel.onDrag(
        new TouchEvent('touchstart', {
            touches: [touchObj],
            changedTouches: [touchObj]
        })
    );

    dispatchTouchEvent(document, 'touchmove', 500 - distance, 0);
    setTimeout(() => {
        dispatchTouchEvent(document, 'touchend');
    }, delay);
}

function windowResize() {
    dispatchEvent(window, new Event('resize'));
}
