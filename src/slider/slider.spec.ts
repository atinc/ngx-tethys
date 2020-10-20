import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ThySliderModule } from './slider.module';
import { dispatchMouseEvent } from '../core/testing';
import { By } from '@angular/platform-browser';

@Component({
    template: `
        <div class="test-slider-container">
            <thy-slider
                [thyMax]="max"
                [thyMin]="min"
                [thyStep]="step"
                [thyDisabled]="disabled"
                [thyVertical]="vertical"
                [(ngModel)]="value"
                [thyType]="type"
                [thyColor]="color"
            ></thy-slider>
        </div>
    `,
    styles: [
        `
            .test-slider-container {
                width: 500px;
                height: 200px;
            }
        `
    ]
})
class ThyTestSliderComponent {
    value: number;
    max = 100;
    min = 0;
    step = 1;
    disabled = false;
    vertical = false;
    type = '';
    color = '';
}

describe('ThyTestSliderComponent', () => {
    let fixture: ComponentFixture<ThyTestSliderComponent>;
    let fixtureInstance: ThyTestSliderComponent;
    let debugElement: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ThySliderModule],
            providers: [],
            declarations: [ThyTestSliderComponent]
        });

        TestBed.compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyTestSliderComponent);
        fixtureInstance = fixture.componentInstance;
        debugElement = fixture.debugElement;
    });

    describe('general api test', () => {
        it('drag functional should be ok', fakeAsync(() => {
            const pointerElement = getSliderPointerElement();
            const pointerElementRect = pointerElement.getBoundingClientRect();

            fixture.detectChanges();
            dispatchMouseEvent(pointerElement, 'mousedown', pointerElementRect.left + 500, pointerElementRect.height);

            dispatchMouseEvent(pointerElement, 'mouseup');
            fixture.detectChanges();

            expect(fixtureInstance.value).toEqual(100);
        }));

        it('min/max value will be right', fakeAsync(() => {
            const minValue = 50;
            const maxValue = 200;
            fixtureInstance.max = maxValue;
            fixtureInstance.min = minValue;
            fixture.detectChanges();
            const pointerElement = getSliderPointerElement();
            const pointerElementRect = pointerElement.getBoundingClientRect();

            fixture.detectChanges();
            dispatchMouseEvent(pointerElement, 'mousedown', pointerElementRect.left + 500, pointerElementRect.height);
            dispatchMouseEvent(pointerElement, 'mouseup');
            fixture.detectChanges();

            expect(fixtureInstance.value).toEqual(maxValue);

            dispatchMouseEvent(pointerElement, 'mousedown', pointerElement.left, pointerElement.height);
            dispatchMouseEvent(pointerElement, 'mouseup');
            fixture.detectChanges();
            expect(fixtureInstance.value).toEqual(minValue);
        }));

        it('slider pointer will not move when thyDisabled is true', fakeAsync(() => {
            fixtureInstance.disabled = true;
            const value = 50;
            fixtureInstance.value = value;
            fixture.detectChanges();
            const containerClassList = debugElement.query(By.css('.thy-slider')).nativeElement.classList;

            expect(containerClassList).toContain('slider-disabled');
            const pointerElement = getSliderPointerElement();
            const pointerElementRect = pointerElement.getBoundingClientRect();

            fixture.detectChanges();
            dispatchMouseEvent(pointerElement, 'mousedown', pointerElementRect.left + 500, pointerElementRect.height);

            dispatchMouseEvent(pointerElement, 'mouseup');
            fixture.detectChanges();
            expect(fixtureInstance.value).toEqual(value);
        }));

        it('slider should be vertical when thyVertical is true', () => {
            fixtureInstance.vertical = true;
            fixture.detectChanges();
            const classList = debugElement.query(By.css('.thy-slider')).nativeElement.classList;

            expect(classList).toContain('slider-vertical');
        });

        it('slider should be warning color when thyType is warning', () => {
            const type = 'warning';
            fixtureInstance.type = type;
            fixture.detectChanges();
            const classList = debugElement.query(By.css('.thy-slider')).nativeElement.classList;

            expect(classList).toContain(`thy-slider-${type}`);
        });

        it('slider track should show custom color when thyColor is custom color', () => {
            const customColor = 'red';
            fixtureInstance.color = customColor;
            fixture.detectChanges();
            const color = debugElement.query(By.css('.thy-slider-track')).nativeElement.style.backgroundColor;

            expect(color).toEqual(customColor);
        });
    });

    function getSliderPointerElement() {
        return debugElement.query(By.css('.thy-slider-pointer')).nativeElement;
    }
});
