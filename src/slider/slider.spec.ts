import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ThySliderModule } from './slider.module';
import { dispatchMouseEvent } from 'ngx-tethys/testing';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

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
                (thyAfterChange)="afterChange($event)"
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
    spy = jasmine.createSpy('after change');
    afterChange(result: { value: number }) {
        this.spy(result);
    }
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
            dispatchMouseEvent(pointerElement, 'mousedown');
            dispatchMouseEvent(pointerElement, 'mousemove', pointerElementRect.left + 10, pointerElementRect.height);
            fixture.detectChanges();
            expect(fixtureInstance.value).not.toEqual(fixtureInstance.min);

            dispatchMouseEvent(pointerElement, 'mousemove', pointerElementRect.left + 500, pointerElementRect.height);
            dispatchMouseEvent(pointerElement, 'mouseup');
            fixture.detectChanges();
            expect(fixtureInstance.value).toEqual(100);
        }));

        it('should not show when thyStep is out of range', fakeAsync(() => {
            fixture.detectChanges();
            expect(debugElement.query(By.css('.thy-slider')).nativeElement).not.toBeNull;

            expect(() => {
                fixtureInstance.min = 9999;
                fixture.detectChanges();
            }).toThrowError('min value must less than max value.');

            fixtureInstance.min = 0;
            fixture.detectChanges();
            expect(() => {
                fixtureInstance.step = -10;
                fixture.detectChanges();
            }).toThrowError('step value must be greater than 0.');
        }));

        it('should not show when thyStep can not divisible by max- min value', fakeAsync(() => {
            fixture.detectChanges();
            expect(debugElement.query(By.css('.thy-slider')).nativeElement).not.toBeNull;

            expect(() => {
                fixtureInstance.step = 9;
                fixtureInstance.min = 2;
                fixtureInstance.max = 17;
                fixture.detectChanges();
            }).toThrowError('(max - min) must be divisible by step.');
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
            expect(fixtureInstance.value).toEqual(value);

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

            const pointerElement = getSliderPointerElement();
            const pointerElementRect = pointerElement.getBoundingClientRect();
            fixture.detectChanges();
            dispatchMouseEvent(pointerElement, 'mousedown', pointerElementRect.left, pointerElementRect.height - 500);
            dispatchMouseEvent(pointerElement, 'mouseup');
            fixture.detectChanges();
            expect(fixtureInstance.value).toBe(fixtureInstance.max);
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

        it('should be notify when moving done', fakeAsync(() => {
            const pointerElement = getSliderPointerElement();
            const pointerElementRect = pointerElement.getBoundingClientRect();
            fixture.detectChanges();
            expect(fixtureInstance.spy).not.toHaveBeenCalled();

            dispatchMouseEvent(pointerElement, 'mousedown', pointerElementRect.left + 500, pointerElementRect.height);
            dispatchMouseEvent(pointerElement, 'mouseup');
            fixture.detectChanges();
            expect(fixtureInstance.spy).toHaveBeenCalled();

            expect(fixtureInstance.spy).toHaveBeenCalledWith({ value: fixtureInstance.max });
        }));
    });

    function getSliderPointerElement() {
        return debugElement.query(By.css('.thy-slider-pointer')).nativeElement;
    }
});
