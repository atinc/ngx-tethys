import { addDays, addWeeks, format, fromUnixTime, isSameDay, startOfDay, startOfWeek } from 'date-fns';
import { dispatchFakeEvent, dispatchKeyboardEvent, dispatchMouseEvent } from 'ngx-tethys/testing';

import { ESCAPE } from '@angular/cdk/keycodes';
import { OverlayContainer } from '@angular/cdk/overlay';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { Component, DebugElement, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, flush, inject, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { ThyDatePickerComponent } from './date-picker.component';
import { ThyDatePickerModule } from './date-picker.module';
import { ThyPickerComponent } from './picker.component';
import { DateEntry } from './standard-types';
import { THY_DATE_PICKER_CONFIG } from './date-picker.config';
import { DatePopupComponent } from './lib/popups/date-popup.component';

registerLocaleData(zh);

describe('ThyDatePickerComponent', () => {
    let fixture: ComponentFixture<ThyTestDatePickerComponent>;
    let fixtureInstance: ThyTestDatePickerComponent;
    let debugElement: DebugElement;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;

    const shortcutDatePresets = [
        {
            title: '今天',
            value: startOfDay(new Date()).getTime()
        },
        {
            title: '下周',
            value: startOfWeek(addWeeks(new Date(), 1), { weekStartsOn: 1 }).getTime()
        }
    ];

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ThyDatePickerModule],
            declarations: [ThyTestDatePickerComponent],
            providers: [
                {
                    provide: THY_DATE_PICKER_CONFIG,
                    useValue: {
                        showShortcut: true,
                        shortcutDatePresets: shortcutDatePresets
                    }
                }
            ]
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

    describe('date picker global config testing', () => {
        beforeEach(() => (fixtureInstance.useSuite = 1));

        it('show should global config shortcut', fakeAsync(() => {
            fixture.detectChanges();
            openPickerByClickTrigger();
            const shortcutItems = overlayContainerElement.querySelectorAll('.thy-calendar-picker-shortcut-item');
            shortcutItems.forEach((shortcut, index) => {
                expect(shortcut.innerHTML.trim()).toBe(shortcutDatePresets[index].title);
            });
        }));

        it('should disable shortcut item whose preset value is less than thyMinDate', fakeAsync(() => {
            fixtureInstance.thyMinDate = new Date(startOfDay(addDays(new Date(), 1)).getTime());
            fixture.detectChanges();
            openPickerByClickTrigger();

            const shortcutItems = overlayContainerElement.querySelectorAll('.thy-calendar-picker-shortcut-item');
            dispatchMouseEvent(shortcutItems[0], 'click');
            fixture.detectChanges();
            tick(500);

            const todayItem = shortcutItems[0];
            expect(todayItem.classList.contains('disabled')).toBe(true);

            const input = getPickerTrigger();
            expect(input.value.trim()).toBe('');
        }));

        it('show not disable shortcut item whose preset value is less than thyMaxDate', fakeAsync(() => {
            fixtureInstance.thyMaxDate = new Date(startOfWeek(addWeeks(new Date(), 2), { weekStartsOn: 1 }).getTime());
            fixture.detectChanges();
            openPickerByClickTrigger();

            const shortcutItems = overlayContainerElement.querySelectorAll('.thy-calendar-picker-shortcut-item');
            dispatchMouseEvent(shortcutItems[1], 'click');
            fixture.detectChanges();
            tick(500);

            const nextWeekItem = shortcutItems[1];
            expect(nextWeekItem.classList.contains('disabled')).toBe(false);

            const input = getPickerTrigger();
            expect(input.value).toBe(format(shortcutDatePresets[1].value, 'yyyy-MM-dd'));
        }));

        it('should return if value of shortcutPresets is null', fakeAsync(() => {
            fixtureInstance.thyMinDate = new Date(startOfDay(addDays(new Date(), -2)).getTime());
            fixture.detectChanges();
            openPickerByClickTrigger();

            const datePopupComponent = fixture.debugElement.query(By.directive(DatePopupComponent)).componentInstance;
            datePopupComponent.shortcutSetValue({ value: null });

            const input = getPickerTrigger();
            expect(input.value.trim()).toBe('');
        }));
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

        it('should call onFocus methods when focus', fakeAsync(() => {
            fixture.detectChanges();
            const focusSpy = spyOn<any>(fixture.componentInstance.datePicker, 'onFocus').and.callThrough();
            const dataPickerElement = fixture.debugElement.query(By.directive(ThyDatePickerComponent)).nativeElement;
            dispatchFakeEvent(dataPickerElement, 'focus');
            fixture.detectChanges();

            expect(focusSpy).toHaveBeenCalled();
        }));

        it('should call onBlur methods when blur', fakeAsync(() => {
            fixture.detectChanges();
            const blurSpy = spyOn<any>(fixture.componentInstance.datePicker, 'onBlur').and.callThrough();
            const datePickerElement = fixture.debugElement.query(By.directive(ThyDatePickerComponent)).nativeElement;
            dispatchFakeEvent(datePickerElement, 'blur');
            fixture.detectChanges();

            expect(blurSpy).toHaveBeenCalled();
        }));

        it('should call blur and not call onTouchFn when blur', fakeAsync(() => {
            fixture.detectChanges();

            const blurSpy = spyOn<any>(fixture.componentInstance.datePicker, 'onTouchedFn');
            const trigger = fixture.debugElement.query(By.css('input')).nativeElement;
            fixture.componentInstance.datePicker.onBlur({ relatedTarget: trigger } as FocusEvent);

            fixture.detectChanges();

            expect(blurSpy).not.toHaveBeenCalled();
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
            const clearBtnSelector = By.css('thy-picker .thy-calendar-picker-clear .thy-icon');
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
            expect(thyOnChange).toHaveBeenCalledWith(null);
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

        it('should support thySuffixIcon', () => {
            fixture.detectChanges();
            expect(getPickerTriggerWrapper().querySelector('.thy-icon-angry')).toBeNull();
            fixtureInstance.thySuffixIcon = 'angry';
            fixture.detectChanges();
            expect(getPickerTriggerWrapper().querySelector('.thy-icon-angry')).toBeTruthy();
        });

        it('should support thyReadonly', fakeAsync(() => {
            fixtureInstance.thyReadonly = true;
            fixture.detectChanges();
            expect(getPickerTrigger().readOnly).toBe(true);

            fixtureInstance.thyReadonly = false;
            fixture.detectChanges();
            expect(getPickerTrigger().readOnly).not.toBe(false);
        }));

        it('should support thyFormat', fakeAsync(() => {
            fixtureInstance.thyFormat = 'dd.MM.yyyy';
            fixtureInstance.thyValue = new Date('2020-03-04');
            fixture.detectChanges();
            openPickerByClickTrigger();
            const input = getPickerTrigger();
            expect(input.value).toBe('04.03.2020');
        }));

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
            openPickerByClickTrigger();
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(getSelectedDayCell().textContent.trim()).toBe('10');
            expect(queryFromOverlay('.thy-calendar-year-btn').textContent.includes('2021')).toBeTruthy();
            expect(queryFromOverlay('.thy-calendar-month-btn').textContent.includes('10')).toBeTruthy();
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
            const result = (thyOnChange.calls.allArgs()[0] as number[])[0];
            expect(fromUnixTime(result).getDate()).toBe(+cellText);
        }));

        it('should support clear', fakeAsync(() => {
            fixtureInstance.thyValue = new Date('2018-11-11');
            fixtureInstance.thyShowTime = true;
            const thyOnChange = spyOn(fixtureInstance, 'thyOnChange');
            fixture.detectChanges();
            dispatchMouseEvent(getPickerTriggerWrapper(), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            dispatchMouseEvent(getClearButton(), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(thyOnChange).toHaveBeenCalled();
            expect(getPickerTriggerWrapper().textContent.trim()).toBe('');
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
            expect(queryFromOverlay('.thy-calendar-year-btn').textContent.indexOf('2017') > -1).toBeTruthy();
            // Click next year button * 2
            dispatchMouseEvent(queryFromOverlay('.thy-calendar-next-year-btn'), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            dispatchMouseEvent(queryFromOverlay('.thy-calendar-next-year-btn'), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(queryFromOverlay('.thy-calendar-year-btn').textContent.indexOf('2019') > -1).toBeTruthy();
            // Click previous month button
            dispatchMouseEvent(queryFromOverlay('.thy-calendar-prev-month-btn'), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(queryFromOverlay('.thy-calendar-month-btn').textContent.indexOf('10') > -1).toBeTruthy();
            // Click next month button * 2
            dispatchMouseEvent(queryFromOverlay('.thy-calendar-next-month-btn'), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            dispatchMouseEvent(queryFromOverlay('.thy-calendar-next-month-btn'), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(queryFromOverlay('.thy-calendar-month-btn').textContent.indexOf('12') > -1).toBeTruthy();
        }));

        it('should set correct cell selected', fakeAsync(() => {
            fixtureInstance.thyValue = new Date('2018-11-11');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            openPickerByClickTrigger();
            expect(getSelectedDayCell().textContent.trim()).toBe('11');
            dispatchMouseEvent(queryFromOverlay('.thy-calendar-next-month-btn'), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(getSelectedDayCell()).toBeNull();
            dispatchMouseEvent(queryFromOverlay('.thy-calendar-prev-month-btn'), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(getSelectedDayCell().textContent.trim()).toBe('11');
        }));

        it('should support month panel changes', fakeAsync(() => {
            fixtureInstance.thyValue = new Date('2018-11-11');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            openPickerByClickTrigger();
            // Click month select to show month panel
            dispatchMouseEvent(queryFromOverlay('.thy-calendar-header .thy-calendar-month-btn'), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(queryFromOverlay('.thy-calendar .thy-calendar-month')).toBeDefined();
            expect(queryFromOverlay('.thy-calendar-my-select').textContent.indexOf('2018') > -1).toBeTruthy();
            // Goto previous year
            dispatchMouseEvent(queryFromOverlay('.thy-calendar-prev-year-btn'), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(queryFromOverlay('.thy-calendar-my-select').textContent.indexOf('2017') > -1).toBeTruthy();
            // Goto next year
            dispatchMouseEvent(queryFromOverlay('.thy-calendar-next-year-btn'), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(queryFromOverlay('.thy-calendar-my-select').textContent.indexOf('2018') > -1).toBeTruthy();
            // Click to choose a year to change panel
            dispatchMouseEvent(queryFromOverlay('.thy-calendar-month-panel-selected-cell'), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(queryFromOverlay('.thy-calendar .thy-calendar-month')).toBeFalsy();
        }));

        it('should support year panel changes', fakeAsync(() => {
            fixtureInstance.thyValue = new Date('2018-11-11');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            openPickerByClickTrigger();
            // Click year select to show year panel
            dispatchMouseEvent(queryFromOverlay('.thy-calendar .thy-calendar-year-btn'), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(queryFromOverlay('.thy-calendar .thy-calendar-year')).toBeDefined();
            expect(queryFromOverlay('.thy-calendar-year-btn').textContent.indexOf('2010') > -1).toBeTruthy();
            expect(queryFromOverlay('.thy-calendar-year-btn').textContent.indexOf('2019') > -1).toBeTruthy();

            // Goto previous decade
            dispatchMouseEvent(queryFromOverlay('.thy-calendar-prev-year-btn'), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(queryFromOverlay('.thy-calendar-year-btn').textContent.indexOf('2000') > -1).toBeTruthy();
            expect(queryFromOverlay('.thy-calendar-year-btn').textContent.indexOf('2009') > -1).toBeTruthy();
            // Goto next decade * 2
            dispatchMouseEvent(queryFromOverlay('.thy-calendar-next-year-btn'), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            dispatchMouseEvent(queryFromOverlay('.thy-calendar-next-year-btn'), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(queryFromOverlay('.thy-calendar-year-btn').textContent.indexOf('2020') > -1).toBeTruthy();
            expect(queryFromOverlay('.thy-calendar-year-btn').textContent.indexOf('2029') > -1).toBeTruthy();
            // Click to choose a year to change panel
            dispatchMouseEvent(queryFromOverlay('td.thy-calendar-year-panel-cell'), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(queryFromOverlay('.thy-calendar .thy-calendar-year')).toBeFalsy();
        }));
    });

    describe('specified date picker testing', () => {
        beforeEach(() => (fixtureInstance.useSuite = 1));

        it('should use format rule yyyy-MM-dd when with_time is 0', fakeAsync(() => {
            const initial = { date: 1587629556, with_time: 0 } as DateEntry;
            fixtureInstance.thyValue = initial;
            fixture.detectChanges();
            openPickerByClickTrigger();
            dispatchMouseEvent(getSelectedDayCell(), 'click');
            fixture.detectChanges();
            tick(500);
            expect(getPickerTrigger().value).toBe(format(new Date(1587629556000), 'yyyy-MM-dd'));
        }));

        it('should use format rule yyyy-MM-dd HH:mm when with_time is 1', fakeAsync(() => {
            const initial = { date: 1587629556, with_time: 1 } as DateEntry;
            fixtureInstance.thyValue = initial;
            fixtureInstance.thyShowTime = true;
            fixture.detectChanges();
            openPickerByClickTrigger();
            fixture.detectChanges();
            tick(500);
            expect(getPickerTrigger().value).toBe(format(new Date(1587629556000), 'yyyy-MM-dd HH:mm'));
        }));

        it('should use format rule yyyy年MM月dd日 HH:mm when initial value is empty', fakeAsync(() => {
            const formatValue = 'yyyy年MM月dd日 HH:mm';
            const changeValue = 1587629556;
            fixtureInstance.thyValue = null;
            fixtureInstance.thyFormat = formatValue;
            fixture.detectChanges();
            tick(500);
            fixtureInstance.thyValue = changeValue;
            fixture.detectChanges();
            openPickerByClickTrigger();
            fixtureInstance.thyValue = changeValue;
            fixture.detectChanges();
            tick(500);
            expect(getPickerTrigger().value).toBe(format(new Date(changeValue * 1000), formatValue));
        }));

        it('should emit value type is same with incoming value type', fakeAsync(() => {
            const initial = 1587629556;
            fixtureInstance.thyValue = initial;
            fixture.detectChanges();
            openPickerByClickTrigger();

            const thyOnChange = spyOn(fixtureInstance, 'thyOnChange');
            dispatchMouseEvent(getSelectedDayCell(), 'click');
            fixture.detectChanges();
            tick(500);
            expect(thyOnChange).toHaveBeenCalledWith(initial);
        }));

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
            fixture.detectChanges();
            tick(500);
            expect(queryFromOverlay('.time-picker-section')).toBeDefined();
            dispatchMouseEvent(getSetTimeButton(), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(getTimePickerWrap()).toBeDefined();
            expect((queryFromOverlay('.time-picker-wrap input.thy-time-picker-field') as HTMLInputElement).value).toBe('11');
        }));

        it('should support thyPlacement', fakeAsync(() => {
            let placement = 'top';
            fixtureInstance.thyPlacement = placement;
            fixture.detectChanges();
            openPickerByClickTrigger();
            const pickComponentInstance = fixture.debugElement.query(By.directive(ThyPickerComponent)).componentInstance;
            expect(pickComponentInstance.overlayPositions[0].originY).toEqual(placement);
        }));

        it('should support thyMode', fakeAsync(() => {
            fixtureInstance.thyValue = new Date('2020-12-01');
            fixture.detectChanges();
            flush();
            fixture.detectChanges();
            expect(getPickerTrigger().placeholder).toEqual('请选择日期');
            fixtureInstance.thyMode = 'month';
            fixture.detectChanges();
            flush();
            fixture.detectChanges();
            openPickerByClickTrigger();
            expect(overlayContainerElement.querySelector('.thy-calendar .thy-calendar-month')).toBeDefined();
        }));

        it('should support thyOnPanelChange', fakeAsync(() => {
            spyOn(fixtureInstance, 'thyOnPanelChange');
            fixture.detectChanges();
            openPickerByClickTrigger();

            // Click header to month panel
            dispatchMouseEvent(overlayContainerElement.querySelector('.thy-calendar-header .thy-calendar-month-btn'), 'click');
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
            dispatchMouseEvent(getSetTimeButton(), 'click');
            fixture.detectChanges();
            tick(500);

            dispatchMouseEvent(overlayContainerElement.querySelector('.time-picker-btn-wrap > .time-picker-ok-btn'), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(fixtureInstance.thyOnOk).toHaveBeenCalledWith(fixtureInstance.thyValue);
        }));
    });

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
            const result = fixtureInstance.modelValue as unknown as number;
            expect(fromUnixTime(result).getDate()).toBe(+cellText);
        }));

        it('modify the time and then the date to null, value should be the correct time', fakeAsync(() => {
            fixtureInstance.modelValue = null;
            fixtureInstance.thyShowTime = true;
            fixture.detectChanges();
            flush();
            fixture.detectChanges();
            openPickerByClickTrigger();
            dispatchMouseEvent(getSetTimeButton(), 'click');
            fixture.detectChanges();
            flush();
            // change time
            const addHourArrow = queryFromOverlay('calendar-footer .time-picker-wrap a.btn-link') as HTMLElement;
            dispatchMouseEvent(addHourArrow, 'click');

            fixture.detectChanges();
            const updateHours = (queryFromOverlay('calendar-footer .time-picker-wrap .thy-time-picker-field') as HTMLInputElement).value;

            dispatchMouseEvent(getFirstCell(), 'click');
            fixture.detectChanges();
            dispatchMouseEvent(queryFromOverlay('.time-picker-btn-wrap > .time-picker-ok-btn'), 'click');
            fixture.detectChanges();
            flush();
            fixture.detectChanges();

            const result = fixtureInstance.modelValue as unknown as number;
            expect(fromUnixTime(result).getHours()).toBe(+updateHours);

            const input = getPickerTrigger();
            expect(input.value).toBe(format(fromUnixTime(result), 'yyyy-MM-dd HH:mm'));
        }));

        it('modify the time and then the date, value should be the correct time', fakeAsync(() => {
            fixtureInstance.modelValue = new Date('2018-11-11 11:22:33');
            fixtureInstance.thyShowTime = true;
            fixture.detectChanges();
            flush();
            fixture.detectChanges();
            openPickerByClickTrigger();
            dispatchMouseEvent(getSetTimeButton(), 'click');
            fixture.detectChanges();
            flush();
            // change time
            const addHourArrow = queryFromOverlay('calendar-footer .time-picker-wrap a.btn-link') as HTMLElement;
            dispatchMouseEvent(addHourArrow, 'click');

            fixture.detectChanges();
            const updateHours = (queryFromOverlay('calendar-footer .time-picker-wrap .thy-time-picker-field') as HTMLInputElement).value;

            dispatchMouseEvent(getFirstCell(), 'click');
            fixture.detectChanges();
            dispatchMouseEvent(queryFromOverlay('.time-picker-btn-wrap > .time-picker-ok-btn'), 'click');
            fixture.detectChanges();
            flush();
            fixture.detectChanges();

            const result = fixtureInstance.modelValue as unknown as number;
            expect(fromUnixTime(result).getHours()).toBe(+updateHours);

            const input = getPickerTrigger();
            expect(input.value).toBe(format(fromUnixTime(result), 'yyyy-MM-dd HH:mm'));
        }));
    });

    describe('date picker offset testing', () => {
        beforeEach(() => (fixtureInstance.useSuite = 1));
        it('should open date picker offset', fakeAsync(() => {
            fixtureInstance.thyValue = new Date('2020-12-07');
            fixture.detectChanges();
            flush();
            fixture.detectChanges();
            openPickerByClickTrigger();
            fixture.detectChanges();
            const result = getCdkOverlayPane();
            fixture.detectChanges();
            expect(result.style.transform).toBe('translateY(4px)');
        }));
    });

    describe('disable ok button of time according to thyMinDate and thyMaxDate', () => {
        beforeEach(() => (fixtureInstance.useSuite = 1));

        it('should disable to click the ok button of time when the selected date value is less than thyMinDate', fakeAsync(() => {
            assertIsDisableTimeConfirm({
                selectedDate: new Date(startOfDay(new Date()).getTime()),
                minDate: new Date(startOfDay(addDays(new Date(), 1)).getTime()),
                maxDate: null,
                disabled: true,
                onOkCallTimes: 0
            });
        }));

        it('should disable to click the ok button of time when the selected date value is greater than thyMaxDate', fakeAsync(() => {
            assertIsDisableTimeConfirm({
                selectedDate: new Date(startOfDay(new Date()).getTime()),
                minDate: null,
                maxDate: new Date(startOfDay(addDays(new Date(), -1)).getTime()),
                disabled: true,
                onOkCallTimes: 0
            });
        }));

        it('should disable to click the ok button of time when the selected date value is null and thyMaxDate is less than today', fakeAsync(() => {
            assertIsDisableTimeConfirm({
                selectedDate: new Date(startOfDay(new Date()).getTime()),
                minDate: null,
                maxDate: new Date(startOfDay(addDays(new Date(), -1)).getTime()),
                disabled: true,
                onOkCallTimes: 0
            });
        }));

        it('should disable to click the ok button of time when the selected date value is null and thyMinDate is greater than today', fakeAsync(() => {
            assertIsDisableTimeConfirm({
                selectedDate: new Date(startOfDay(new Date()).getTime()),
                minDate: null,
                maxDate: new Date(startOfDay(addDays(new Date(), -1)).getTime()),
                disabled: true,
                onOkCallTimes: 0
            });
        }));

        it('should not disable to click the ok button of time when the selected date value is between thyMinDate and thyMaxDate', fakeAsync(() => {
            assertIsDisableTimeConfirm({
                selectedDate: new Date(startOfDay(new Date()).getTime()),
                minDate: new Date(startOfDay(addDays(new Date(), -1)).getTime()),
                maxDate: new Date(startOfDay(addDays(new Date(), 1)).getTime()),
                disabled: false,
                onOkCallTimes: 1
            });
        }));

        it('should not disable to click the ok button of time when the selected date value is null and today is between thyMinDate and thyMaxDate', fakeAsync(() => {
            assertIsDisableTimeConfirm({
                selectedDate: null,
                minDate: new Date(startOfDay(addDays(new Date(), -1)).getTime()),
                maxDate: new Date(startOfDay(addDays(new Date(), 1)).getTime()),
                disabled: false,
                onOkCallTimes: 1
            });
        }));

        function assertIsDisableTimeConfirm(options: {
            selectedDate: Date;
            minDate: Date;
            maxDate: Date;
            disabled: boolean;
            onOkCallTimes: number;
        }) {
            fixtureInstance.thyShowTime = true;
            fixtureInstance.thyValue = options.selectedDate;
            fixtureInstance.thyMinDate = options.minDate;
            fixtureInstance.thyMaxDate = options.maxDate;
            fixture.detectChanges();

            openPickerByClickTrigger();
            const setTimeButton = overlayContainerElement.querySelector('.time-picker-set-btn');
            dispatchMouseEvent(setTimeButton, 'click');
            fixture.detectChanges();
            const confirmButton = getConfirmButton();
            expect(confirmButton.hasAttribute('disabled')).toBe(options.disabled);

            const onOkSpy = spyOn(fixtureInstance, 'thyOnOk');
            dispatchMouseEvent(confirmButton, 'click');
            fixture.detectChanges();
            tick(500);
            expect(onOkSpy).toHaveBeenCalledTimes(options.onOkCallTimes);
        }
    });

    function getPickerTrigger(): HTMLInputElement {
        return debugElement.query(By.css('thy-picker input.thy-calendar-picker-input')).nativeElement as HTMLInputElement;
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

    function getTimePickerWrap(): HTMLElement {
        return queryFromOverlay('calendar-footer time-picker-wrap') as HTMLElement;
    }

    function getSetTimeButton(): HTMLElement {
        return queryFromOverlay('calendar-footer .time-picker-set-btn') as HTMLElement;
    }

    function getConfirmButton(): HTMLElement {
        return queryFromOverlay('calendar-footer .time-picker-ok-btn') as HTMLElement;
    }

    function getClearButton(): HTMLElement {
        return queryFromOverlay('calendar-footer .time-picker-clear-btn') as HTMLElement;
    }

    function getCdkOverlayPane(): HTMLElement {
        return queryFromOverlay('.cdk-overlay-pane') as HTMLElement;
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
                [thyFormat]="thyFormat"
                [thySuffixIcon]="thySuffixIcon"
                [thyReadonly]="thyReadonly"
                (thyOpenChange)="thyOpenChange($event)"
                [ngModel]="thyValue"
                (ngModelChange)="thyOnChange($event)"
                [thyDateRender]="thyDateRender"
                [thyMode]="thyMode"
                [thyPlacement]="thyPlacement"
                (thyOnPanelChange)="thyOnPanelChange($event)"
                (thyOnCalendarChange)="thyOnCalendarChange($event)"
                [thyShowTime]="thyShowTime"
                [thyMinDate]="thyMinDate"
                [thyMaxDate]="thyMaxDate"
                (thyOnOk)="thyOnOk($event)"></thy-date-picker>
            <ng-template #tplDateRender let-current>
                <div [class.test-first-day]="current.getDate() === 1">{{ current.getDate() }}</div>
            </ng-template>

            <!-- Suite 2 -->
            <!-- use another picker to avoid thyOpen's side-effects because thyOpen act as "true" if used -->
            <thy-date-picker *ngSwitchCase="2" [thyOpen]="thyOpen" (thyOpenChange)="thyOpenChange($event)"></thy-date-picker>

            <!-- Suite 3 -->
            <thy-date-picker *ngSwitchCase="3" thyOpen [thyShowTime]="thyShowTime" [(ngModel)]="modelValue"></thy-date-picker>
        </ng-container>
    `
})
class ThyTestDatePickerComponent {
    useSuite: 1 | 2 | 3;
    @ViewChild('tplDateRender', { static: true }) tplDateRender: TemplateRef<Date>;

    @ViewChild(ThyDatePickerComponent, { static: false }) datePicker: ThyDatePickerComponent;

    // --- Suite 1
    thyAllowClear: boolean;
    thyAutoFocus: boolean;
    thyDisabled: boolean;
    thyDisabledDate: (d: Date) => boolean;
    thyPlaceHolder: string;
    thyPanelClassName: string;
    thySize: string;
    thySuffixIcon: string;
    thyFormat: string;
    thyReadonly: boolean;
    thyValue: Date | null | DateEntry | number;
    thyDefaultPickerValue: Date | number;
    thyDateRender: any;
    thyShowTime: boolean | object = false;
    thyMode: string;
    thyPlacement: string = 'bottomLeft';
    thyMinDate: Date | number;
    thyMaxDate: Date | number;
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
