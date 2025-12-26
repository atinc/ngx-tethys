import { addHours, format } from 'date-fns';
import { dispatchFakeEvent, dispatchMouseEvent } from 'ngx-tethys/testing';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { Component, DebugElement, viewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ThyInnerTimePicker, ThyTimePickerModule } from 'ngx-tethys/time-picker';
import { provideHttpClient } from '@angular/common/http';

registerLocaleData(zh);

const CONTAINER_CLASS = 'time-picker-container';

describe('ThyInnerTimePickerComponent', () => {
    let fixture!: ComponentFixture<ThyTestInnerTimePickerBaseComponent>;
    let fixtureInstance!: ThyTestInnerTimePickerBaseComponent;
    let debugElement!: DebugElement;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            providers: [provideHttpClient()]
        });

        TestBed.compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyTestInnerTimePickerBaseComponent);
        fixtureInstance = fixture.componentInstance;
        debugElement = fixture.debugElement;
    });

    describe('general properties testing', () => {
        it('should show basic time picker component', fakeAsync(() => {
            fixture.detectChanges();
            const container = getPickerContainer();
            expect(container).not.toBeNull();
        }));

        it('should show right time when value is string or Date or null', fakeAsync(() => {
            fixture.detectChanges();
            const hoursContainer = getHoursContainer();
            const minutesContainer = getMinutesContainer();
            expect(hoursContainer.value).toBeFalsy();
            expect(minutesContainer.value).toBeFalsy();

            fixture.detectChanges();
            const dateStr = '2013-11-05 11:05';
            fixtureInstance.startDate = dateStr;
            fixture.detectChanges();
            flush();
            fixture.detectChanges();
            const hoursContainerOne = getHoursContainer();
            const minutesContainerOne = getMinutesContainer();
            expect(hoursContainerOne.value).toEqual(dateStr.slice(11, 13));
            expect(minutesContainerOne.value).toEqual(dateStr.slice(-2));

            fixture.detectChanges();
            const date = new Date();
            fixtureInstance.startDate = date;
            const hoursFormat = fixtureInstance.showMeridian ? 'hh:mm' : 'HH:mm';
            const hours = format(date, hoursFormat).slice(0, 2);
            const minutes = format(date, hoursFormat).slice(-2);
            fixture.detectChanges();
            flush();
            fixture.detectChanges();
            const hoursContainerTwo = getHoursContainer();
            const minutesContainerTwo = getMinutesContainer();
            expect(hoursContainerTwo.value).toEqual(hours);
            expect(minutesContainerTwo.value).toEqual(minutes);
        }));

        it('should has readonly attr when [readonlyInput] is true', fakeAsync(() => {
            fixture.detectChanges();
            fixtureInstance.readonly = true;
            fixture.detectChanges();
            flush();
            fixture.detectChanges();
            const hoursContainer = getHoursContainer();
            const minutesContainer = getMinutesContainer();
            expect(hoursContainer.readOnly).toEqual(true);
            expect(minutesContainer.readOnly).toEqual(true);
        }));

        it('should has disabled class and input disabled state when disabled is true', fakeAsync(() => {
            fixture.detectChanges();
            fixtureInstance.disabled = true;
            fixture.detectChanges();
            flush();
            fixture.detectChanges();
            const hoursContainer = getHoursContainer();
            const minutesContainer = getMinutesContainer();
            expect(hoursContainer.disabled).toEqual(true);
            expect(minutesContainer.disabled).toEqual(true);

            const container = getPickerContainer();
            const elementsOfDisabledClass = container.querySelectorAll('.disabled');
            expect(elementsOfDisabledClass.length).toBeGreaterThan(0);
        }));

        it('should show/hidden spinner arrows when toggle showSpinners', fakeAsync(() => {
            fixture.detectChanges();
            const upArrowsTr: HTMLElement = debugElement.query(By.css(`.${CONTAINER_CLASS} tr:first-child`)).nativeElement;
            const downArrowsTr: HTMLElement = debugElement.query(By.css(`.${CONTAINER_CLASS} tr:nth-child(3)`)).nativeElement;
            expect(upArrowsTr.hidden).toEqual(false);
            expect(downArrowsTr.hidden).toEqual(false);

            fixture.detectChanges();
            fixtureInstance.showSpinners = false;
            fixture.detectChanges();
            flush();
            fixture.detectChanges();
            expect(upArrowsTr.hidden).toEqual(true);
            expect(downArrowsTr.hidden).toEqual(true);
        }));

        it('should show/hidden meridian element when toggle showMeridian', fakeAsync(() => {
            fixture.detectChanges();
            const noMeridianBtn = getMeridianBtn();
            expect(noMeridianBtn).not.toBeNull();

            fixture.detectChanges();
            fixtureInstance.showMeridian = false;
            fixture.detectChanges();
            flush();
            fixture.detectChanges();
            const meridianBtn = getMeridianBtn();
            expect(meridianBtn).toBeNull();
        }));

        it('should show/hidden minutes input when toggle showMinutes', fakeAsync(() => {
            fixture.detectChanges();
            fixtureInstance.showMinutes = false;
            fixture.detectChanges();
            flush();
            fixture.detectChanges();
            const showContainer = getMinutesContainer();
            expect(showContainer).toBeNull();
        }));

        it('should show/hidden seconds input when toggle showSeconds', fakeAsync(() => {
            fixture.detectChanges();
            const container = getSecondsContainer();
            expect(container).toBeNull();
            fixture.detectChanges();
            fixtureInstance.showSeconds = true;
            fixture.detectChanges();
            flush();
            fixture.detectChanges();
            const showContainer = getSecondsContainer();
            expect(showContainer).not.toBeNull();
        }));

        it('should show custom meridian when set meridians', fakeAsync(() => {
            fixture.detectChanges();
            const dateStr = '2013-11-05 11:05';
            fixtureInstance.startDate = dateStr;
            fixture.detectChanges();
            flush();
            fixture.detectChanges();
            const container = getMeridianBtn();
            const originMeridian = fixtureInstance.timePicker().meridians();
            expect(container.innerText).toEqual(originMeridian[0]);

            fixture.detectChanges();
            const customMeridians = ['上午', '下午'];
            fixtureInstance.meridians = customMeridians;
            fixtureInstance.startDate = '2013-11-05 11:06';
            fixture.detectChanges();
            flush();
            fixture.detectChanges();
            const customMeridiansContainer = getMeridianBtn();
            expect(customMeridiansContainer.innerText).toEqual(customMeridians[0]);
        }));

        it('should show custom placeholder when set placeholder', fakeAsync(() => {
            fixture.detectChanges();
            fixtureInstance.showSeconds = true;
            fixture.detectChanges();
            flush();
            fixture.detectChanges();
            const hoursContainer = getHoursContainer();
            const minutesContainer = getMinutesContainer();
            const secondsContainer = getSecondsContainer();
            const defaultPlaceholder = `${hoursContainer.placeholder}:${minutesContainer.placeholder}:${secondsContainer.placeholder}`;
            expect(defaultPlaceholder).toEqual('HH:MM:SS');

            const placeholder = '小时:分钟:秒';
            fixtureInstance.hoursPlaceholder = placeholder.slice(0, 2);
            fixtureInstance.minutesPlaceholder = placeholder.slice(3, 5);
            fixtureInstance.secondsPlaceholder = placeholder.slice(-1);
            fixture.detectChanges();
            flush();
            fixture.detectChanges();
            const customPlaceholder = `${hoursContainer.placeholder}:${minutesContainer.placeholder}:${secondsContainer.placeholder}`;
            expect(customPlaceholder).toEqual(placeholder);
        }));
    });

    describe('general methods testing', () => {
        it('should show right time when trigger change[Hours/Minutes/Seconds] method', fakeAsync(() => {
            const hour = 11;
            const minute = 5;
            const second = 2;
            fixture.detectChanges();
            const dateStr = `2013-11-05 ${hour}:0${minute}:0${second}`;
            fixtureInstance.startDate = dateStr;
            fixtureInstance.showSeconds = true;
            fixture.detectChanges();
            flush();
            fixture.detectChanges();
            const hoursArrowContainer = getHoursSpinnerArrows();
            const minutesArrowContainer = getMinutesSpinnerArrows();
            const secondsArrowContainer = getSecondsSpinnerArrows();
            dispatchMouseEvent(hoursArrowContainer[0], 'click');
            dispatchMouseEvent(minutesArrowContainer[0], 'click');
            dispatchMouseEvent(secondsArrowContainer[0], 'click');
            fixture.detectChanges();
            flush();
            fixture.detectChanges();
            const { hourStep, minuteStep, secondsStep } = fixtureInstance;
            expect(getHoursContainer().value).toEqual((hour + hourStep).toString());
            expect(getMinutesContainer().value).toEqual(formatTimeForLess10(minute + minuteStep));
            expect(getSecondsContainer().value).toEqual(formatTimeForLess10(second + secondsStep));

            dispatchMouseEvent(hoursArrowContainer[1], 'click');
            dispatchMouseEvent(minutesArrowContainer[1], 'click');
            dispatchMouseEvent(secondsArrowContainer[1], 'click');
            fixture.detectChanges();
            flush();
            fixture.detectChanges();
            expect(getHoursContainer().value).toEqual(hour.toString());
            expect(getMinutesContainer().value).toEqual(formatTimeForLess10(minute));
            expect(getSecondsContainer().value).toEqual(formatTimeForLess10(second));
        }));

        it('should change value by step when set custom step', fakeAsync(() => {
            const hour = 11;
            const minute = 5;
            const second = 2;
            const step = 2;
            fixture.detectChanges();
            const dateStr = `2013-11-05 ${hour}:0${minute}:0${second}`;
            const date = new Date(dateStr);

            fixtureInstance.startDate = dateStr;
            fixtureInstance.showSeconds = true;
            fixtureInstance.hourStep = step;
            fixtureInstance.minuteStep = step;
            fixtureInstance.secondsStep = step;
            fixture.detectChanges();
            flush();
            fixture.detectChanges();
            const hoursArrowContainer = getHoursSpinnerArrows();
            const minutesArrowContainer = getMinutesSpinnerArrows();
            const secondsArrowContainer = getSecondsSpinnerArrows();
            dispatchMouseEvent(hoursArrowContainer[0], 'click');
            dispatchMouseEvent(minutesArrowContainer[0], 'click');
            dispatchMouseEvent(secondsArrowContainer[0], 'click');
            fixture.detectChanges();
            flush();
            fixture.detectChanges();
            const hourValue = addHours(date, step);

            expect(getHoursContainer().value).toEqual(format(hourValue, fixtureInstance.showMeridian ? 'hh' : 'HH'));
            expect(getMinutesContainer().value).toEqual(formatTimeForLess10(minute + step));
            expect(getSecondsContainer().value).toEqual(formatTimeForLess10(second + step));

            dispatchMouseEvent(hoursArrowContainer[1], 'click');
            dispatchMouseEvent(minutesArrowContainer[1], 'click');
            dispatchMouseEvent(secondsArrowContainer[1], 'click');
            fixture.detectChanges();
            flush();
            fixture.detectChanges();
            expect(getHoursContainer().value).toEqual(hour.toString());
            expect(getMinutesContainer().value).toEqual(formatTimeForLess10(minute));
            expect(getSecondsContainer().value).toEqual(formatTimeForLess10(second));
        }));

        it('should show right time when change input value', fakeAsync(() => {
            fixture.detectChanges();
            const dateStr = `2013-11-05 11:05:02`;
            fixtureInstance.startDate = dateStr;
            fixtureInstance.showSeconds = true;
            fixture.detectChanges();
            flush();
            fixture.detectChanges();
            const hoursContainer = getHoursContainer();
            const minutesContainer = getMinutesContainer();
            const secondsContainer = getSecondsContainer();
            const inputValue = '12';
            hoursContainer.value = inputValue;
            minutesContainer.value = inputValue;
            secondsContainer.value = inputValue;
            dispatchFakeEvent(hoursContainer, 'change');
            dispatchFakeEvent(minutesContainer, 'change');
            dispatchFakeEvent(secondsContainer, 'change');
            fixture.detectChanges();
            flush();
            fixture.detectChanges();
            expect(getHoursContainer().value).toEqual(inputValue);
            expect(getMinutesContainer().value).toEqual(inputValue);
            expect(getSecondsContainer().value).toEqual(inputValue);
        }));

        it('should show invalid behavior when change time is invalid value', fakeAsync(() => {
            fixture.detectChanges();
            const dateStr = `2013-11-05 11:05:02`;
            fixtureInstance.startDate = dateStr;
            fixtureInstance.showSeconds = true;
            fixture.detectChanges();
            flush();
            fixture.detectChanges();
            const dateChangeSpy = spyOn(fixtureInstance, 'onDateChange');
            const hoursContainer = getHoursContainer();
            const minutesContainer = getMinutesContainer();
            const secondsContainer = getSecondsContainer();
            hoursContainer.value = '25';
            dispatchFakeEvent(hoursContainer, 'change');
            fixture.detectChanges();
            flush();
            fixture.detectChanges();
            expect(dateChangeSpy).toHaveBeenCalledTimes(1);
            expect(dateChangeSpy).toHaveBeenCalledWith(null);

            minutesContainer.value = '115';
            dispatchFakeEvent(minutesContainer, 'change');
            fixture.detectChanges();
            flush();
            fixture.detectChanges();
            expect(dateChangeSpy).toHaveBeenCalledTimes(2);
            expect(dateChangeSpy).toHaveBeenCalledWith(null);

            secondsContainer.value = '115';
            dispatchFakeEvent(secondsContainer, 'change');
            fixture.detectChanges();
            flush();
            fixture.detectChanges();
            expect(dateChangeSpy).toHaveBeenCalledTimes(3);
            expect(dateChangeSpy).toHaveBeenCalledWith(null);
        }));

        it('should change half day when click meridian btn', fakeAsync(() => {
            fixture.detectChanges();
            const dateStr = `2013-11-05 11:05`;
            fixtureInstance.startDate = dateStr;
            fixture.detectChanges();
            flush();
            fixture.detectChanges();
            const dateChangeSpy = spyOn(fixtureInstance, 'onDateChange');
            const meridianBtn = getMeridianBtn();
            dispatchMouseEvent(meridianBtn, 'click');
            fixture.detectChanges();
            flush();
            fixture.detectChanges();
            expect(dateChangeSpy).toHaveBeenCalledTimes(1);
            expect(dateChangeSpy).toHaveBeenCalledWith(addHours(new Date(dateStr), 12));
        }));

        it('should show invalid behavior when change time out of max or min', fakeAsync(() => {
            fixture.detectChanges();
            const date = new Date();
            fixtureInstance.startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 11, 5, 2);
            fixtureInstance.showSeconds = true;
            fixtureInstance.min = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 11, 4);
            fixtureInstance.max = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 11, 6);
            fixture.detectChanges();
            flush();
            fixture.detectChanges();
            const dateChangeSpy = spyOn(fixtureInstance, 'onDateChange');
            const hoursContainer = getHoursContainer();
            hoursContainer.value = '10';
            dispatchFakeEvent(hoursContainer, 'change');
            fixture.detectChanges();
            flush();
            fixture.detectChanges();
            expect(dateChangeSpy).toHaveBeenCalledTimes(1);
            expect(dateChangeSpy).toHaveBeenCalledWith(null);
        }));

        it('should show invalid behavior when change minutes out of 60', fakeAsync(() => {
            fixture.detectChanges();
            const date = new Date();
            fixtureInstance.startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 11, 5, 2);
            fixtureInstance.showSeconds = true;
            fixture.detectChanges();
            flush();
            fixture.detectChanges();
            const dateChangeSpy = spyOn(fixtureInstance, 'onDateChange');
            const hoursContainer = getHoursContainer();
            const minutesContainer = getMinutesContainer();
            hoursContainer.value = '10';
            fixtureInstance.timePicker().minutes = '66';
            dispatchFakeEvent(hoursContainer, 'change');
            fixture.detectChanges();
            flush();
            fixture.detectChanges();
            expect(dateChangeSpy).toHaveBeenCalledTimes(1);
            expect(dateChangeSpy).toHaveBeenCalledWith(null);
        }));
    });

    function getPickerContainer(): HTMLElement {
        return debugElement.query(By.css(`.${CONTAINER_CLASS}`)).nativeElement as HTMLElement;
    }

    function getHoursContainer(): HTMLInputElement {
        const container = debugElement.query(By.css(`.${CONTAINER_CLASS} tr:nth-child(2) td:first-child input`));
        return container.nativeElement as HTMLInputElement;
    }

    function getMinutesContainer(): HTMLInputElement {
        const container = debugElement.query(By.css(`.${CONTAINER_CLASS} tr:nth-child(2) td:nth-child(3) input`));
        return container && (container.nativeElement as HTMLInputElement);
    }

    function getSecondsContainer(): HTMLInputElement {
        const container = debugElement.query(By.css(`.${CONTAINER_CLASS} tr:nth-child(2) td:nth-child(5) input`));
        return container && (container.nativeElement as HTMLInputElement);
    }

    function getHoursSpinnerArrows(): HTMLElement[] {
        return getSpinnerArrows(1);
    }

    function getMinutesSpinnerArrows(): HTMLElement[] {
        return getSpinnerArrows(3);
    }

    function getSecondsSpinnerArrows(): HTMLElement[] {
        return getSpinnerArrows(5);
    }

    function getSpinnerArrows(position: number = 1) {
        const arrowSelector = `td:nth-child(${position}) a`;
        const spinnerArrowUp: HTMLElement = debugElement.query(By.css(`.${CONTAINER_CLASS} tr:first-child ${arrowSelector}`)).nativeElement;
        const spinnerArrowDown: HTMLElement = debugElement.query(
            By.css(`.${CONTAINER_CLASS} tr:nth-child(3) ${arrowSelector}`)
        ).nativeElement;
        return [spinnerArrowUp, spinnerArrowDown];
    }

    function getMeridianBtn(): HTMLElement {
        const btn = debugElement.query(By.css(`.${CONTAINER_CLASS} tr:nth-child(2) td:last-child button`));
        return btn && (btn.nativeElement as HTMLElement);
    }

    function formatTimeForLess10(minOrSec: number): string {
        return minOrSec < 10 ? `0${minOrSec}` : minOrSec.toString();
    }
});

@Component({
    template: `
        <thy-inner-time-picker
            #timePicker
            [class]="containerClass"
            [readonlyInput]="readonly"
            [disabled]="disabled"
            [showSpinners]="showSpinners"
            [showMeridian]="showMeridian"
            [showMinutes]="showMinutes"
            [showSeconds]="showSeconds"
            [meridians]="meridians"
            [hoursPlaceholder]="hoursPlaceholder"
            [minutesPlaceholder]="minutesPlaceholder"
            [secondsPlaceholder]="secondsPlaceholder"
            [hourStep]="hourStep"
            [minuteStep]="minuteStep"
            [secondsStep]="secondsStep"
            [min]="min"
            [max]="max"
            [ngModel]="startDate"
            (ngModelChange)="onDateChange($event)"></thy-inner-time-picker>
    `,
    imports: [FormsModule, ThyTimePickerModule]
})
class ThyTestInnerTimePickerBaseComponent {
    public containerClass = CONTAINER_CLASS;

    readonly timePicker = viewChild.required<ThyInnerTimePicker>('timePicker');
    // 默认值与 timePicker 的默认值一致，见 ../time-picker.config.ts
    readonly = false;

    disabled = false;

    showSpinners = true;

    showMeridian = true;

    showMinutes = true;

    showSeconds = false;

    meridians: string[] = ['AM', 'PM'];

    hoursPlaceholder = 'HH';

    minutesPlaceholder = 'MM';

    secondsPlaceholder = 'SS';

    hourStep = 1;

    minuteStep = 5;

    secondsStep = 10;

    min!: Date;

    max!: Date;

    startDate!: string | Date;

    onDateChange(event: Event) {}
}
