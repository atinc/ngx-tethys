import { ESCAPE } from '@angular/cdk/keycodes';
import { OverlayContainer } from '@angular/cdk/overlay';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { Component, DebugElement, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, inject, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { ThyDatePickerModule } from './date-picker.module';
import { dispatchMouseEvent, dispatchKeyboardEvent } from '../core/testing';
import { isSameDay } from 'date-fns';
import { DateEntry } from './standard-types';
import { convertDate } from './picker.util';

registerLocaleData(zh);

describe('ThyDatePickerComponent', () => {
    let fixture: ComponentFixture<ThyTestDatePickerComponent>;
    let fixtureInstance: ThyTestDatePickerComponent;
    let debugElement: DebugElement;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ThyDatePickerModule],
            declarations: [ThyTestDatePickerComponent]
        });

        TestBed.compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyTestDatePickerComponent);
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

    describe('general api testing', () => {
        beforeEach(() => (fixtureInstance.useSuite = 1));

        it('should open by click and close by click at outside', fakeAsync(() => {
            fixture.detectChanges();
            dispatchMouseEvent(getPickerTriggerWrapper(), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(getPickerContainer()).not.toBeNull();

            dispatchMouseEvent(queryFromOverlay('.cdk-overlay-backdrop'), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(getPickerContainer()).toBeNull();
        }));

        it('should focus on the trigger after a click outside', fakeAsync(() => {
            fixture.detectChanges();
            openPickerByClickTrigger();

            dispatchMouseEvent(queryFromOverlay('.cdk-overlay-backdrop'), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(document.activeElement).toEqual(getPickerTrigger());
        }));

        it('should be openable after closed by "Escape" key', fakeAsync(() => {
            fixture.detectChanges();
            dispatchMouseEvent(getPickerTriggerWrapper(), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(getPickerContainer()).not.toBeNull();

            dispatchKeyboardEvent(document.body, 'keydown', ESCAPE);
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(getPickerContainer()).toBeNull();

            dispatchMouseEvent(getPickerTriggerWrapper(), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(getPickerContainer()).not.toBeNull();
        }));

        it('should support thyAllowClear and work properly', fakeAsync(() => {
            const clearBtnSelector = By.css('thy-picker thy-icon.thy-calendar-picker-clear');
            const initial = (fixtureInstance.thyValue = new Date());
            fixtureInstance.thyAllowClear = false;
            fixture.detectChanges();
            expect(debugElement.query(clearBtnSelector)).toBeFalsy();

            fixtureInstance.thyAllowClear = true;
            tick(500);
            fixture.detectChanges();
            expect(fixtureInstance.thyValue).toBe(initial);
            expect(debugElement.query(clearBtnSelector)).toBeDefined();

            const thyOnChange = spyOn(fixtureInstance, 'thyOnChange');
            debugElement.query(clearBtnSelector).nativeElement.click();
            fixture.detectChanges();
            expect(fixtureInstance.thyValue).toBe(initial);
            expect(thyOnChange).toHaveBeenCalledWith({ date: null, with_time: 0 });
            expect(debugElement.query(clearBtnSelector)).toBeFalsy();
        }));

        it('should support thyAutoFocus', () => {
            fixtureInstance.thyAutoFocus = true;
            fixture.detectChanges();
            expect(getPickerTrigger() === document.activeElement).toBeTruthy();
        });

        it('should support thyDisabled', fakeAsync(() => {
            fixtureInstance.thyAllowClear = true;
            fixtureInstance.thyValue = new Date();

            fixtureInstance.thyDisabled = true;
            fixture.detectChanges();
            flush();
            fixture.detectChanges();
            expect(debugElement.query(By.css('thy-picker .thy-input-disabled'))).toBeDefined();
            expect(debugElement.query(By.css('thy-picker thy-icon.thy-calendar-picker-clear'))).toBeNull();

            fixtureInstance.thyDisabled = false;
            tick(500);
            fixture.detectChanges();
            expect(debugElement.query(By.css('thy-picker .thy-input-disabled'))).toBeNull();
            expect(debugElement.query(By.css('thy-picker thy-icon.thy-calendar-picker-clear'))).toBeDefined();
        }));

        it('should support thyDisabledDate', fakeAsync(() => {
            fixture.detectChanges();
            const compareDate = new Date('2018-11-15 00:00:00');
            fixtureInstance.thyValue = new Date('2018-11-11 12:12:12');
            fixtureInstance.thyDisabledDate = (current: Date) => isSameDay(current, compareDate);
            fixture.detectChanges();
            dispatchMouseEvent(getPickerTriggerWrapper(), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            const disabledCell = queryFromOverlay('tbody.thy-calendar-tbody td.thy-calendar-disabled-cell');
            expect(disabledCell.textContent.trim()).toBe('15');
        }));

        it('should support thyPlaceHolder', () => {
            const featureKey = (fixtureInstance.thyPlaceHolder = 'TEST_PLACEHOLDER');
            fixture.detectChanges();
            expect(getPickerTrigger().getAttribute('placeholder')).toBe(featureKey);
        });

        it('should support thySize', () => {
            fixture.detectChanges();
            expect(getPickerTrigger().classList.contains('form-control-lg')).not.toBeTruthy();
            fixtureInstance.thySize = 'lg';
            fixture.detectChanges();
            expect(getPickerTrigger().classList.contains('form-control-lg')).toBeTruthy();
        });

        it('should support thyOpenChange', () => {
            const thyOpenChange = spyOn(fixtureInstance, 'thyOpenChange');
            fixture.detectChanges();
            dispatchMouseEvent(getPickerTriggerWrapper(), 'click');
            fixture.detectChanges();
            expect(thyOpenChange).toHaveBeenCalledWith(true);

            dispatchMouseEvent(queryFromOverlay('.cdk-overlay-backdrop'), 'click');
            fixture.detectChanges();
            expect(thyOpenChange).toHaveBeenCalledWith(false);
            expect(thyOpenChange).toHaveBeenCalledTimes(2);
        });

        it('should not emit thyOpenChange when thyOpen is false and input is clicked', () => {
            const thyOpenChange = spyOn(fixtureInstance, 'thyOpenChange');
            fixtureInstance.useSuite = 2;
            fixtureInstance.thyOpen = false;

            fixture.detectChanges();
            dispatchMouseEvent(getPickerTriggerWrapper(), 'click');
            fixture.detectChanges();

            expect(thyOpenChange).not.toHaveBeenCalledWith(true);
        });

        it('should support thyValue', fakeAsync(() => {
            fixtureInstance.thyValue = new Date('2018-11-11');
            fixture.detectChanges();
            dispatchMouseEvent(getPickerTriggerWrapper(), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(getSelectedDayCell().textContent.trim()).toBe('11');
        }));

        it('should support thyDefaultPickerValue', fakeAsync(() => {
            fixtureInstance.thyDefaultPickerValue = new Date('2021-10-10');
            fixture.detectChanges();
            dispatchMouseEvent(getPickerTriggerWrapper(), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(getSelectedDayCell().textContent.trim()).toBe('10');
            expect(queryFromOverlay('.thy-calendar-year-select').textContent.includes('2021')).toBeTruthy();
            expect(queryFromOverlay('.thy-calendar-month-select').textContent.includes('10')).toBeTruthy();
        }));

        it('should support thyOnChange', fakeAsync(() => {
            fixtureInstance.thyValue = new Date('2018-11-11');
            const thyOnChange = spyOn(fixtureInstance, 'thyOnChange');
            const thyOnCalendarChange = spyOn(fixtureInstance, 'thyOnCalendarChange');
            fixture.detectChanges();
            dispatchMouseEvent(getPickerTriggerWrapper(), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();

            const cell = getFirstCell(); // Use the first cell
            const cellText = cell.textContent.trim();
            dispatchMouseEvent(cell, 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(thyOnChange).toHaveBeenCalled();
            expect(thyOnCalendarChange).not.toHaveBeenCalled();
            const result = (thyOnChange.calls.allArgs()[0] as DateEntry[])[0];
            const date = convertDate(result.date);
            expect(date.getDate()).toBe(+cellText);
        }));
    });

    describe('panel switch and move forward/afterward', () => {
        beforeEach(() => (fixtureInstance.useSuite = 1));

        it('should support date panel changes', fakeAsync(() => {
            fixtureInstance.thyValue = new Date('2018-11-11');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            openPickerByClickTrigger();
            // Click previous year button
            dispatchMouseEvent(queryFromOverlay('.thy-calendar-prev-year-btn'), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(queryFromOverlay('.thy-calendar-year-select').textContent.indexOf('2017') > -1).toBeTruthy();
            // Click next year button * 2
            dispatchMouseEvent(queryFromOverlay('.thy-calendar-next-year-btn'), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            dispatchMouseEvent(queryFromOverlay('.thy-calendar-next-year-btn'), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(queryFromOverlay('.thy-calendar-year-select').textContent.indexOf('2019') > -1).toBeTruthy();
            // Click previous month button
            dispatchMouseEvent(queryFromOverlay('.thy-calendar-prev-month-btn'), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(queryFromOverlay('.thy-calendar-month-select').textContent.indexOf('10') > -1).toBeTruthy();
            // Click next month button * 2
            dispatchMouseEvent(queryFromOverlay('.thy-calendar-next-month-btn'), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            dispatchMouseEvent(queryFromOverlay('.thy-calendar-next-month-btn'), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(queryFromOverlay('.thy-calendar-month-select').textContent.indexOf('12') > -1).toBeTruthy();
        }));

        it('should support month panel changes', fakeAsync(() => {
            fixtureInstance.thyValue = new Date('2018-11-11');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            openPickerByClickTrigger();
            // Click month select to show month panel
            dispatchMouseEvent(queryFromOverlay('.thy-calendar-header .thy-calendar-month-select'), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(queryFromOverlay('.thy-calendar-header .thy-calendar-month-panel')).toBeDefined();
            expect(
                queryFromOverlay('.thy-calendar-month-panel-year-select-content').textContent.indexOf('2018') > -1
            ).toBeTruthy();
            // Goto previous year
            dispatchMouseEvent(queryFromOverlay('.thy-calendar-month-panel-prev-year-btn'), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(
                queryFromOverlay('.thy-calendar-month-panel-year-select-content').textContent.indexOf('2017') > -1
            ).toBeTruthy();
            // Goto next year * 2
            dispatchMouseEvent(queryFromOverlay('.thy-calendar-month-panel-next-year-btn'), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            dispatchMouseEvent(queryFromOverlay('.thy-calendar-month-panel-next-year-btn'), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(
                queryFromOverlay('.thy-calendar-month-panel-year-select-content').textContent.indexOf('2019') > -1
            ).toBeTruthy();
            // Click to choose a year to change panel
            dispatchMouseEvent(queryFromOverlay('td.thy-calendar-month-panel-selected-cell'), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(queryFromOverlay('.thy-calendar-header .thy-calendar-month-panel')).toBeFalsy();
        }));

        // it('should support year panel changes', fakeAsync(() => {
        //     fixtureInstance.thyValue = new Date('2018-11-11');
        //     fixture.detectChanges();
        //     tick(500);
        //     fixture.detectChanges();
        //     openPickerByClickTrigger();
        //     // Click year select to show year panel
        //     dispatchMouseEvent(queryFromOverlay('.thy-calendar-header .thy-calendar-year-select'), 'click');
        //     fixture.detectChanges();
        //     tick(500);
        //     fixture.detectChanges();
        //     expect(queryFromOverlay('.thy-calendar-header .thy-calendar-year-panel')).toBeDefined();
        //     expect(
        //         queryFromOverlay('.thy-calendar-year-panel-decade-select-content').textContent.indexOf('2010') > -1
        //     ).toBeTruthy();
        //     expect(
        //         queryFromOverlay('.thy-calendar-year-panel-decade-select-content').textContent.indexOf('2019') > -1
        //     ).toBeTruthy();
        //     // Coverage for last/next cell
        //     dispatchMouseEvent(queryFromOverlay('.thy-calendar-year-panel-last-decade-cell'), 'click');
        //     fixture.detectChanges();
        //     tick(500);
        //     fixture.detectChanges();
        //     dispatchMouseEvent(queryFromOverlay('.thy-calendar-year-panel-next-decade-cell'), 'click');
        //     fixture.detectChanges();
        //     tick(500);
        //     fixture.detectChanges();
        //     // Goto previous decade
        //     dispatchMouseEvent(queryFromOverlay('.thy-calendar-year-panel-prev-decade-btn'), 'click');
        //     fixture.detectChanges();
        //     tick(500);
        //     fixture.detectChanges();
        //     expect(
        //         queryFromOverlay('.thy-calendar-year-panel-decade-select-content').textContent.indexOf('2000') > -1
        //     ).toBeTruthy();
        //     expect(
        //         queryFromOverlay('.thy-calendar-year-panel-decade-select-content').textContent.indexOf('2009') > -1
        //     ).toBeTruthy();
        //     // Goto next decade * 2
        //     dispatchMouseEvent(queryFromOverlay('.thy-calendar-year-panel-next-decade-btn'), 'click');
        //     fixture.detectChanges();
        //     tick(500);
        //     fixture.detectChanges();
        //     dispatchMouseEvent(queryFromOverlay('.thy-calendar-year-panel-next-decade-btn'), 'click');
        //     fixture.detectChanges();
        //     tick(500);
        //     fixture.detectChanges();
        //     expect(
        //         queryFromOverlay('.thy-calendar-year-panel-decade-select-content').textContent.indexOf('2020') > -1
        //     ).toBeTruthy();
        //     expect(
        //         queryFromOverlay('.thy-calendar-year-panel-decade-select-content').textContent.indexOf('2029') > -1
        //     ).toBeTruthy();
        //     // Click to choose a year to change panel
        //     dispatchMouseEvent(queryFromOverlay('td.thy-calendar-year-panel-selected-cell'), 'click');
        //     fixture.detectChanges();
        //     tick(500);
        //     fixture.detectChanges();
        //     expect(queryFromOverlay('.thy-calendar-header .thy-calendar-year-panel')).toBeFalsy();
        // }));
    }); // /panel switch and move forward/afterward

    describe('specified date picker testing', () => {
        beforeEach(() => (fixtureInstance.useSuite = 1));

        it('should support thyDateRender', fakeAsync(() => {
            fixtureInstance.thyDateRender = fixtureInstance.tplDateRender;
            fixture.detectChanges();
            dispatchMouseEvent(getPickerTriggerWrapper(), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(queryFromOverlay('.test-first-day').textContent.trim()).toBe('1');
        }));

        it('should support thyDateRender with typeof function', fakeAsync(() => {
            const featureKey = 'TEST_FIRST_DAY';
            fixtureInstance.thyDateRender = (d: Date) => (d.getDate() === 1 ? featureKey : d.getDate());
            fixture.detectChanges();
            dispatchMouseEvent(getPickerTriggerWrapper(), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(overlayContainerElement.textContent.indexOf(featureKey) > -1).toBeTruthy();
        }));

        it('should support thyShowTime', fakeAsync(() => {
            fixtureInstance.thyValue = new Date('2018-11-11 11:22:33');
            fixtureInstance.thyShowTime = true;
            fixture.detectChanges();
            openPickerByClickTrigger();
            // TODO:
            // expect((queryFromOverlay('input.thy-calendar-input') as HTMLInputElement).value).toBe(
            //     '2018-11-11 00:22:33'
            // );
        }));

        it('should not reset time', fakeAsync(() => {
            fixtureInstance.thyValue = new Date('2019-08-02 13:03:33');
            fixtureInstance.thyShowTime = true;
            fixture.detectChanges();
            openPickerByClickTrigger();

            dispatchMouseEvent(getFirstCell(), 'click');

            fixture.detectChanges();
            flush();
            fixture.detectChanges();
            // TODO:
            // expect((queryFromOverlay('input.thy-calendar-input') as HTMLInputElement).value).toBe(
            //     '2019-07-29 13:03:33'
            // );
        }));

        it('should support thyMode', fakeAsync(() => {
            fixtureInstance.thyMode = 'month';
            fixture.detectChanges();
            openPickerByClickTrigger();
            expect(
                overlayContainerElement.querySelector('.thy-calendar-header .thy-calendar-month-panel')
            ).toBeDefined();
        }));

        it('should support thyOnPanelChange', fakeAsync(() => {
            spyOn(fixtureInstance, 'thyOnPanelChange');
            fixture.detectChanges();
            openPickerByClickTrigger();

            // Click header to month panel
            dispatchMouseEvent(
                overlayContainerElement.querySelector('.thy-calendar-header .thy-calendar-month-select'),
                'click'
            );
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(fixtureInstance.thyOnPanelChange).toHaveBeenCalledWith('month');
        }));

        it('should support thyOnOk', fakeAsync(() => {
            spyOn(fixtureInstance, 'thyOnOk');
            fixtureInstance.thyValue = new Date('2018-11-11 11:22:33');
            fixtureInstance.thyShowTime = true;
            fixture.detectChanges();
            flush();
            fixture.detectChanges();
            openPickerByClickTrigger();

            // Click ok button
            // TODO: ok button click logic
        }));
    }); // specified date picker testing

    describe('ngModel value accesors', () => {
        beforeEach(() => (fixtureInstance.useSuite = 3));

        it('should specified date provide by "modelValue" be choose', fakeAsync(() => {
            fixtureInstance.modelValue = new Date('2018-11-11');
            fixture.detectChanges();
            flush(); // Wait writeValue() tobe done
            fixture.detectChanges();
            expect(getSelectedDayCell().textContent.trim()).toBe('11');

            // Click the first cell to change ngModel
            const cell = getFirstCell();
            const cellText = cell.textContent.trim();
            dispatchMouseEvent(cell, 'click');
            fixture.detectChanges();
            const result = (fixtureInstance.modelValue as unknown) as DateEntry;
            const date = convertDate(result.date);
            expect(date.getDate()).toBe(+cellText);
        }));
    });

    ////////////

    function getPickerTrigger(): HTMLInputElement {
        return debugElement.query(By.css('thy-picker input.thy-calendar-picker-input'))
            .nativeElement as HTMLInputElement;
    }

    function getPickerTriggerWrapper(): HTMLInputElement {
        return debugElement.query(By.css('thy-picker .thy-calendar-picker')).nativeElement as HTMLInputElement;
    }

    function getPickerContainer(): HTMLElement {
        return queryFromOverlay('.thy-calendar-picker-container') as HTMLElement;
    }

    function getSelectedDayCell(): HTMLElement {
        return queryFromOverlay('tbody.thy-calendar-tbody td.thy-calendar-selected-day') as HTMLElement;
    }

    function getFirstCell(): HTMLElement {
        return queryFromOverlay('tbody.thy-calendar-tbody td.thy-calendar-cell') as HTMLElement;
    }

    function queryFromOverlay(selector: string): HTMLElement {
        return overlayContainerElement.querySelector(selector) as HTMLElement;
    }

    function openPickerByClickTrigger(): void {
        dispatchMouseEvent(getPickerTriggerWrapper(), 'click');
        fixture.detectChanges();
        tick(500);
        fixture.detectChanges();
    }
});

@Component({
    template: `
        <ng-container [ngSwitch]="useSuite">
            <!-- Suite 1 -->
            <thy-date-picker
                *ngSwitchCase="1"
                [thyAllowClear]="thyAllowClear"
                [thyAutoFocus]="thyAutoFocus"
                [thyDisabled]="thyDisabled"
                [thyDisabledDate]="thyDisabledDate"
                [thyPlaceHolder]="thyPlaceHolder"
                [thyPanelClassName]="thyPanelClassName"
                [thyDefaultPickerValue]="thyDefaultPickerValue"
                [thySize]="thySize"
                (thyOpenChange)="thyOpenChange($event)"
                [ngModel]="thyValue"
                (ngModelChange)="thyOnChange($event)"
                [thyDateRender]="thyDateRender"
                [thyMode]="thyMode"
                (thyOnPanelChange)="thyOnPanelChange($event)"
                (thyOnCalendarChange)="thyOnCalendarChange($event)"
                [thyShowTime]="thyShowTime"
                (thyOnOk)="thyOnOk($event)"
            ></thy-date-picker>
            <ng-template #tplDateRender let-current>
                <div [class.test-first-day]="current.getDate() === 1">{{ current.getDate() }}</div>
            </ng-template>

            <!-- Suite 2 -->
            <!-- use another picker to avoid thyOpen's side-effects because thyOpen act as "true" if used -->
            <thy-date-picker
                *ngSwitchCase="2"
                [thyOpen]="thyOpen"
                (thyOpenChange)="thyOpenChange($event)"
            ></thy-date-picker>

            <!-- Suite 3 -->
            <thy-date-picker *ngSwitchCase="3" thyOpen [(ngModel)]="modelValue"></thy-date-picker>
        </ng-container>
    `
})
class ThyTestDatePickerComponent {
    useSuite: 1 | 2 | 3;
    @ViewChild('tplDateRender') tplDateRender: TemplateRef<Date>;
    // --- Suite 1
    thyAllowClear: boolean;
    thyAutoFocus: boolean;
    thyDisabled: boolean;
    thyDisabledDate: (d: Date) => boolean;
    thyPlaceHolder: string;
    thyPanelClassName: string;
    thySize: string;
    thyValue: Date | null;
    thyDefaultPickerValue: Date | number;
    thyDateRender: any;
    thyShowTime: boolean | object = false;
    thyMode: string;
    thyOnChange(): void {}
    thyOnCalendarChange(): void {}
    thyOpenChange(): void {}

    thyOnPanelChange(): void {}

    thyOnOk(): void {}

    // --- Suite 2
    thyOpen: boolean;

    // --- Suite 3
    modelValue: Date;
}
