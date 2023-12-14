import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, inject, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { dispatchMouseEvent, dispatchFakeEvent } from 'ngx-tethys/testing';
import { ThyTimePickerComponent, TimePickerSize } from '../time-picker.component';
import { ThyTimePickerModule } from '../time-picker.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ThyTimePickerComponent', () => {
    let fixture: ComponentFixture<ThyTestTimePickerBaseComponent>;
    let fixtureInstance: ThyTestTimePickerBaseComponent;
    let debugElement: DebugElement;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ThyTimePickerModule, NoopAnimationsModule],
            declarations: [ThyTestTimePickerBaseComponent]
        });

        TestBed.compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyTestTimePickerBaseComponent);
        fixtureInstance = fixture.componentInstance;
        debugElement = fixture.debugElement;
    });

    beforeEach(inject([OverlayContainer], (oc: OverlayContainer) => {
        overlayContainer = oc;
        overlayContainerElement = oc.getContainerElement();
    }));

    afterEach(() => {
        overlayContainer.ngOnDestroy();
    });

    describe('general property testing', () => {
        it('should open by click overlay origin', fakeAsync(() => {
            openOverlay();
            expect(getTimePickerPanel()).not.toBeNull();
        }));

        it('should close by click overlay outside when ThyBackdrop is false', fakeAsync(() => {
            openOverlay();

            dispatchMouseEvent(document.body, 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(getTimePickerPanel()).toBeNull();
        }));

        it('should close by click overlay backdrop when ThyBackdrop is true', fakeAsync(() => {
            fixtureInstance.backdrop = true;
            fixture.detectChanges();

            openOverlay();

            overlayQuery('.cdk-overlay-backdrop').click();
            tick(300);
            expect(getTimePickerPanel()).toBeNull();

            flush();
        }));

        it('should close by "Escape" key', fakeAsync(() => {
            openOverlay();
            expect(getTimePickerPanel()).not.toBeNull();

            getTimePickerInput().dispatchEvent(new KeyboardEvent('keyup', { key: 'escape' }));
            fixture.detectChanges();
            tick(300);
            expect(getTimePickerPanel()).toBeNull();
        }));

        it('should support thyPlaceholder', () => {
            const placeholder = 'customize placeholder';
            fixtureInstance.placeholder = placeholder;
            fixture.detectChanges();
            expect(getTimePickerInput().getAttribute('placeholder')).toBe(placeholder);
        });

        it('should support thyAllowClear and emit change', fakeAsync(() => {
            const clearBtnSelector = '.thy-time-picker-clear';
            const value = new Date();
            fixtureInstance.value = value;
            fixture.detectChanges();

            fixtureInstance.allowClear = false;
            fixture.detectChanges();
            expect(debugElementQuery(clearBtnSelector)).toBeNull();

            fixtureInstance.allowClear = true;
            tick(500);
            fixture.detectChanges();
            expect(debugElementQuery(clearBtnSelector)).not.toBeNull();

            const valueChange = spyOn(fixtureInstance, 'onValueChange');
            debugElementQuery(`${clearBtnSelector} thy-icon`).nativeElement.click();
            fixture.detectChanges();
            expect(fixtureInstance.value).toBe(null);
            expect(valueChange).toHaveBeenCalledWith(null);
            expect(debugElementQuery(clearBtnSelector)).toBeNull();
        }));

        it('should use origin value when thyAllowClear is false and input not valid value', fakeAsync(() => {
            const value = new Date();
            value.setHours(10, 20, 30);
            fixtureInstance.value = value;
            fixture.detectChanges();

            fixtureInstance.allowClear = false;
            fixture.detectChanges();

            openOverlay();
            getTimePickerInput().value = '12aw42312';
            dispatchFakeEvent(getTimePickerInput(), 'input');
            fixture.detectChanges();
            tick(200);
            dispatchMouseEvent(document.body, 'click');
            fixture.detectChanges();
            tick(200);
            expect(getTimePickerInput().value === `10:20:30`).toBeTruthy();
            expect(fixtureInstance.timePickerRef.showText === '10:20:30').toBeTruthy();

            openOverlay();
            getTimePickerInput().value = '';
            dispatchFakeEvent(getTimePickerInput(), 'input');
            fixture.detectChanges();
            tick(200);
            dispatchMouseEvent(document.body, 'click');
            fixture.detectChanges();
            tick(200);
            expect(getTimePickerInput().value === `10:20:30`).toBeTruthy();
            expect(fixtureInstance.timePickerRef.showText === '10:20:30').toBeTruthy();
        }));

        it('should support thyFormat', fakeAsync(() => {
            let date = new Date();
            date.setHours(8, 20, 6);
            fixtureInstance.value = date;
            fixture.detectChanges();
            tick(500);

            fixtureInstance.format = 'HH:mm:ss';
            fixture.detectChanges();
            expect(fixtureInstance.timePickerRef.showText === '08:20:06').toBeTruthy();
            tick(200);
            expect(getTimePickerInput().value === '08:20:06').toBeTruthy();

            fixtureInstance.format = 'H:mm:ss';
            fixture.detectChanges();
            expect(fixtureInstance.timePickerRef.showText === '8:20:06').toBeTruthy();
            tick(200);
            expect(getTimePickerInput().value === '8:20:06').toBeTruthy();

            fixtureInstance.format = 'HH:mm';
            fixture.detectChanges();
            expect(fixtureInstance.timePickerRef.showText === '08:20').toBeTruthy();
            tick(200);
            expect(getTimePickerInput().value === '08:20').toBeTruthy();

            fixtureInstance.format = 'H:mm';
            fixture.detectChanges();
            expect(fixtureInstance.timePickerRef.showText === '8:20').toBeTruthy();
            tick(200);
            expect(getTimePickerInput().value === '8:20').toBeTruthy();

            fixtureInstance.format = null;
            fixture.detectChanges();
            expect(fixtureInstance.timePickerRef.showText === '08:20:06').toBeTruthy();
            tick(200);
            expect(getTimePickerInput().value === '08:20:06').toBeTruthy();
        }));

        it('should support thyDisabled', fakeAsync(() => {
            fixtureInstance.value = new Date();
            fixtureInstance.disabled = true;
            fixture.detectChanges();
            tick(100);
            fixture.detectChanges();
            expect(debugElementQuery('thy-time-picker.thy-time-picker-disabled')).not.toBeNull();
            expect(debugElementQuery('.thy-time-picker-input.thy-input-disabled')).not.toBeNull();
            expect(debugElementQuery('.thy-time-picker-clear')).toBeNull();

            openOverlay();
            expect(getTimePickerPanel()).toBeNull();

            fixtureInstance.disabled = false;
            tick(500);
            fixture.detectChanges();
            expect(debugElementQuery('thy-time-picker.thy-time-picker-disabled')).toBeNull();
            expect(debugElementQuery('.thy-time-picker-input.thy-input-disabled')).toBeNull();
            expect(debugElementQuery('.thy-time-picker-clear')).not.toBeNull();

            openOverlay();
            expect(getTimePickerPanel()).not.toBeNull();
        }));

        it('should support thyReadonly', fakeAsync(() => {
            fixtureInstance.value = new Date();
            fixtureInstance.readonly = true;
            fixture.detectChanges();
            expect(debugElementQuery('thy-time-picker.thy-time-picker-readonly')).not.toBeNull();
            expect(debugElementQuery('.thy-time-picker-input.thy-input-readonly')).not.toBeNull();
            expect(debugElementQuery('.thy-time-picker-clear')).toBeNull();

            openOverlay();
            expect(getTimePickerPanel()).toBeNull();

            fixtureInstance.readonly = false;
            tick(500);
            fixture.detectChanges();
            expect(debugElementQuery('thy-time-picker.thy-time-picker-readonly')).toBeNull();
            expect(debugElementQuery('.thy-time-picker-input.thy-input-readonly')).toBeNull();
            expect(debugElementQuery('.thy-time-picker-clear')).not.toBeNull();

            openOverlay();
            expect(getTimePickerPanel()).not.toBeNull();
        }));

        it('should support thyPopupClass', fakeAsync(() => {
            const customClass = 'open-overlay-custom-class';
            fixtureInstance.popupClass = customClass;
            fixture.detectChanges();

            openOverlay();
            expect(overlayQuery(`.${customClass}`)).not.toBeNull();
        }));

        it('should support thyHourStep,thyMinuteStep,thySecondStep', fakeAsync(() => {
            fixtureInstance.hourStep = 5;
            fixtureInstance.minuteStep = 10;
            fixtureInstance.secondStep = 20;
            fixture.detectChanges();

            openOverlay();

            expect(getHourColumnElement().children.length === Math.ceil(24 / 5)).toBeTruthy();
            expect(getMinuteColumnElement().children.length === Math.ceil(60 / 10)).toBeTruthy();
            expect(getSecondColumnElement().children.length === Math.ceil(60 / 20)).toBeTruthy();
        }));

        it('should keep input focus when overlay opened', fakeAsync(() => {
            openOverlay();
            dispatchFakeEvent(getTimePickerInput(), 'blur');
            tick(300);
            expect(document.activeElement.classList.contains('thy-time-picker-input')).toBeTruthy();

            dispatchMouseEvent(document.body, 'click');
            dispatchFakeEvent(getTimePickerInput(), 'blur');
            tick(300);
            expect(document.activeElement.classList.contains('thy-time-picker-input')).toBeFalsy();
        }));

        it('should emit openChange on open/close overlay', fakeAsync(() => {
            const openChange = spyOn(fixtureInstance, 'onOpenChange');

            openOverlay();
            expect(openChange).toHaveBeenCalledWith(true);

            dispatchMouseEvent(document.body, 'click');
            tick(300);
            expect(openChange).toHaveBeenCalledWith(false);
        }));

        it('should change value when custom input', fakeAsync(() => {
            const fakeInputValue = '10:20:03';
            const valueChange = spyOn(fixtureInstance, 'onValueChange');
            fixture.detectChanges();
            getTimePickerInput().value = fakeInputValue;
            dispatchFakeEvent(getTimePickerInput(), 'input');
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            expect(valueChange).toHaveBeenCalled();
            tick();
            expect(valueChange.calls.mostRecent().args[0].getTime() === new Date().setHours(10, 20, 3)).toBeTruthy();

            fixture.detectChanges();
            getTimePickerInput().value = '';
            dispatchFakeEvent(getTimePickerInput(), 'input');
            fixture.detectChanges();
            tick();
            expect(valueChange).toHaveBeenCalled();
            tick();
            expect(valueChange.calls.mostRecent().args[0]).toBeNull();
        }));
    });

    describe('ngModel testing', () => {
        it('should support default value', fakeAsync(() => {
            const date = new Date();
            date.setHours(10, 20, 3);
            fixtureInstance.value = date;
            fixture.detectChanges();
            tick(200);

            expect(fixtureInstance.timePickerRef.value.getTime() === date.getTime()).toBeTruthy();
            expect(fixtureInstance.timePickerRef.showText === '10:20:03').toBeTruthy();

            const value = new Date().setHours(10, 20, 30);
            fixtureInstance.value = value;
            fixture.detectChanges();
            tick(200);

            expect(fixtureInstance.timePickerRef.value.getTime() === value).toBeTruthy();
            expect(fixtureInstance.timePickerRef.showText === '10:20:30').toBeTruthy();
        }));

        it('should emit change when pick hour,minute,second and click confirm button', fakeAsync(() => {
            const date = new Date();
            date.setHours(10, 20, 3);
            let newDate = new Date(date);
            fixtureInstance.value = date;
            fixture.detectChanges();
            tick(500);
            expect(fixtureInstance.timePickerRef.value.getTime() === new Date(date).getTime()).toBeTruthy();

            openOverlay();

            const valueChange = spyOn(fixtureInstance, 'onValueChange');

            getHourColumnChildren(5).click();
            newDate.setHours(5);
            expect(valueChange).toHaveBeenCalled();
            expect(valueChange.calls.mostRecent().args[0].getTime() === newDate.getTime()).toBeTruthy();

            tick(200);

            getMinuteColumnChildren(10).click();
            newDate.setMinutes(10);
            expect(valueChange).toHaveBeenCalled();
            expect(valueChange.calls.mostRecent().args[0].getTime() === newDate.getTime()).toBeTruthy();

            tick(200);

            getSecondColumnChildren(30).click();
            newDate.setSeconds(30);
            expect(valueChange).toHaveBeenCalled();
            expect(valueChange.calls.mostRecent().args[0].getTime() === newDate.getTime()).toBeTruthy();

            expect(getTimePickerPanel()).not.toBeNull();
        }));

        it('should emit change when click confirm button and press enter key', fakeAsync(() => {
            const date = new Date();
            date.setHours(10, 20, 3);
            fixtureInstance.value = date;
            fixture.detectChanges();

            openOverlay();

            const valueChange = spyOn(fixtureInstance, 'onValueChange');

            overlayQuery('.thy-time-picker-panel-time-confirm').click();
            expect(valueChange).toHaveBeenCalled();
            expect(valueChange.calls.mostRecent().args[0].getTime() === date.getTime()).toBeTruthy();

            tick(200);

            getTimePickerInput().dispatchEvent(new KeyboardEvent('keyup', { key: 'enter' }));
            expect(valueChange).toHaveBeenCalled();
            expect(valueChange.calls.mostRecent().args[0].getTime() === date.getTime()).toBeTruthy();
        }));
    });

    function openOverlay() {
        fixture.detectChanges();
        dispatchMouseEvent(getTimePickerInput(), 'click');
        fixture.detectChanges();
        tick(500);
        fixture.detectChanges();
    }

    function getTimePickerInput() {
        return debugElementQuery('thy-time-picker.thy-time-picker input').nativeElement as HTMLInputElement;
    }

    function getTimePickerPanel() {
        return overlayQuery('.thy-time-picker-panel');
    }

    function getHourColumnElement() {
        return overlayQuery(`.thy-time-picker-panel-hour-column`);
    }

    function getHourColumnChildren(index: number) {
        return getHourColumnElement().children[index] as HTMLElement;
    }

    function getMinuteColumnElement() {
        return overlayQuery('.thy-time-picker-panel-minute-column');
    }

    function getMinuteColumnChildren(index: number) {
        return getMinuteColumnElement().children[index] as HTMLElement;
    }

    function getSecondColumnElement() {
        return overlayQuery('.thy-time-picker-panel-second-column');
    }

    function getSecondColumnChildren(index: number) {
        return getSecondColumnElement().children[index] as HTMLElement;
    }

    function overlayQuery(selector: string) {
        return overlayContainerElement.querySelector(selector) as HTMLElement;
    }

    function debugElementQuery(selector: string) {
        return debugElement.query(By.css(selector));
    }
});

@Component({
    template: `
        <thy-time-picker
            #timePicker
            [(ngModel)]="value"
            [thySize]="size"
            [thyFormat]="format"
            [thyBackdrop]="backdrop"
            [thyDisabled]="disabled"
            [thyReadonly]="readonly"
            [thyHourStep]="hourStep"
            [thyMinuteStep]="minuteStep"
            [thySecondStep]="secondStep"
            [thyAllowClear]="allowClear"
            [thyPopupClass]="popupClass"
            [thyPlaceholder]="placeholder"
            [thyShowSelectNow]="showSelectNow"
            (ngModelChange)="onValueChange($event)"
            (thyOpenChange)="onOpenChange($event)"></thy-time-picker>
    `
})
class ThyTestTimePickerBaseComponent {
    @ViewChild('timePicker', { static: false }) timePickerRef: ThyTimePickerComponent;

    value: Date | number;

    format: string = 'HH:mm:ss';

    readonly = false;

    disabled = false;

    allowClear: boolean = true;

    size: TimePickerSize;

    placeholder: string;

    hourStep: number;

    minuteStep: number;

    secondStep: number;

    popupClass: string;

    showSelectNow: boolean;

    backdrop: boolean;

    onValueChange(value: Date) {}

    onOpenChange(state: boolean) {}
}
