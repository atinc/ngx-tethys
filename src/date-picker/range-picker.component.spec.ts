import { addDays, endOfDay, format, fromUnixTime, isSameDay, startOfDay, subDays } from 'date-fns';
import { dispatchMouseEvent } from 'ngx-tethys/testing';

import { OverlayContainer } from '@angular/cdk/overlay';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { Component, DebugElement, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TinyDate } from 'ngx-tethys/util';
import {
    THY_DATE_PICKER_CONFIG,
    ThyDatePickerModule,
    DatePopup,
    CompatiblePresets,
    ThyDateRangeEntry,
    ThyPanelMode,
    ThyShortcutPosition
} from 'ngx-tethys/date-picker';

registerLocaleData(zh);

describe('ThyRangePickerComponent', () => {
    let fixture: ComponentFixture<ThyTestRangePickerComponent>;
    let fixtureInstance: ThyTestRangePickerComponent;
    let debugElement: DebugElement;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;

    const leftYearBtn = '.thy-calendar-range-left .thy-calendar-year-btn';
    const leftMonthBtn = '.thy-calendar-range-left .thy-calendar-month-btn';

    const leftYearPrevBtn = '.thy-calendar-range-left .thy-calendar-prev-year-btn';
    const leftYearNextBtn = '.thy-calendar-range-left .thy-calendar-next-year-btn';
    const rightYearPrevBtn = '.thy-calendar-range-right .thy-calendar-prev-year-btn';

    const leftMonthPrevBtn = '.thy-calendar-range-left .thy-calendar-prev-month-btn';
    const leftMonthNextBtn = '.thy-calendar-range-left .thy-calendar-next-month-btn';
    const rightMonthPrevBtn = '.thy-calendar-range-right .thy-calendar-prev-month-btn';

    const shortcutRangesPresets = () => {
        return [
            {
                title: '最近 7 天',
                value: [new TinyDate(subDays(new Date(), 6)).getTime(), new TinyDate().endOfDay().getTime()]
            },
            {
                title: '最近 30 天',
                value: [new TinyDate(subDays(new Date(), 29)).getTime(), new TinyDate().endOfDay().getTime()]
            },
            {
                title: '本周',
                value: [new TinyDate().startOfWeek({ weekStartsOn: 1 }).getTime(), new TinyDate().endOfWeek({ weekStartsOn: 1 }).getTime()]
            },
            {
                title: '本月',
                value: [new TinyDate().startOfMonth().getTime(), new TinyDate().endOfMonth().getTime()]
            }
        ];
    };

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            providers: [
                provideHttpClient(),
                provideAnimations(),
                {
                    provide: THY_DATE_PICKER_CONFIG,
                    useValue: {
                        showShortcut: true,
                        separator: '~',
                        shortcutRangesPresets: shortcutRangesPresets,
                        timestampPrecision: 'seconds'
                    }
                }
            ]
        });

        TestBed.compileComponents();
    }));

    beforeEach(() => {
        TinyDate.setDefaultLocale('en-us');
        fixture = TestBed.createComponent(ThyTestRangePickerComponent);
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

    describe('get correct shortcut value', () => {
        beforeEach(() => {
            fixtureInstance.useSuite = 1;
            fixtureInstance.thyShowShortcut = true;
            fixture.detectChanges();
        });

        let rangePresets = shortcutRangesPresets();
        const shortcutIndex = 0;
        const startDate: number = rangePresets[shortcutIndex].value[0];
        const endDate: number = rangePresets[shortcutIndex].value[1];

        it('show should support shortcut preset', fakeAsync(() => {
            fixture.detectChanges();
            openPickerByClickTrigger();
            const shortcutItems = overlayContainerElement.querySelectorAll('.thy-calendar-picker-shortcut-item');
            shortcutItems.forEach((shortcut, index) => {
                expect(shortcut.innerHTML.trim()).toBe(rangePresets[index].title);
            });
        }));

        it('should be [] when startDate > thyMaxDate || endDate < thyMinDate', fakeAsync(() => {
            const minDate: Date = startOfDay(addDays(new Date(), 10));
            const maxDate: Date = endOfDay(addDays(new Date(), 30));
            const expectValue = '';

            assertAccordingToMinAndMaxDate(minDate, maxDate, expectValue);
        }));

        it('should be [thyMinDate, thyMaxDate] when startDate < thyMinDate && endDate > thyMaxDate', fakeAsync(() => {
            const minDate: Date = startOfDay(addDays(new Date(), -3));
            const maxDate: Date = endOfDay(addDays(new Date(), -1));
            const expectValue = `${format(minDate.getTime(), 'yyyy-MM-dd')}${fixture.componentInstance.thySeparator}${format(maxDate.getTime(), 'yyyy-MM-dd')}`;

            assertAccordingToMinAndMaxDate(minDate, maxDate, expectValue);
        }));

        it('should be [thyMinDate, endDate] when startDate < thyMinDate', fakeAsync(() => {
            const minDate: Date = startOfDay(addDays(new Date(), -3));
            const maxDate: Date = endOfDay(addDays(new Date(), 30));
            fixtureInstance.thyShortcutPresets;
            const expectValue = `${format(minDate.getTime(), 'yyyy-MM-dd')}${fixture.componentInstance.thySeparator}${format(endDate, 'yyyy-MM-dd')}`;

            assertAccordingToMinAndMaxDate(minDate, maxDate, expectValue);
        }));

        it('should be [startDate, thyMaxDate] when endDate > thyMaxDate', fakeAsync(() => {
            const minDate: Date = startOfDay(addDays(new Date(), -10));
            const maxDate: Date = endOfDay(addDays(new Date(), -1));
            const expectValue = `${format(startDate, 'yyyy-MM-dd')}${fixture.componentInstance.thySeparator}${format(maxDate.getTime(), 'yyyy-MM-dd')}`;

            assertAccordingToMinAndMaxDate(minDate, maxDate, expectValue);
        }));

        it('should be [startDate, endDate] when startDate >= thyMinDate && endDate <= thyMaxDate', fakeAsync(() => {
            const minDate: Date = startOfDay(addDays(new Date(), -30));
            const maxDate: Date = endOfDay(addDays(new Date(), 30));
            const expectValue = `${format(startDate, 'yyyy-MM-dd')}${fixture.componentInstance.thySeparator}${format(endDate, 'yyyy-MM-dd')}`;

            assertAccordingToMinAndMaxDate(minDate, maxDate, expectValue);
        }));

        function assertAccordingToMinAndMaxDate(minDate: Date, maxDate: Date, expectValue: string) {
            // thyMinDate/thyMaxDate supports not only Date but also number
            fixtureInstance.thyMinDate = minDate as Date;
            fixtureInstance.thyMaxDate = maxDate.getTime() as number;
            fixture.detectChanges();

            openPickerByClickTrigger();
            const shortcutItems = overlayContainerElement.querySelectorAll('.thy-calendar-picker-shortcut-item');
            dispatchMouseEvent(shortcutItems[shortcutIndex], 'click');
            fixture.detectChanges();
            tick(500);

            const input = getPickerTrigger();
            expect(input.value.trim()).toBe(expectValue);
        }
    });

    describe('disable shortcut preset', () => {
        beforeEach(() => {
            fixtureInstance.useSuite = 1;
            fixtureInstance.thyShowShortcut = true;
            fixture.detectChanges();
        });

        it('should disable shortcut item whose min preset is greater than thyMaxDate', fakeAsync(() => {
            fixtureInstance.thyMaxDate = endOfDay(addDays(new Date(), -7));
            fixture.detectChanges();

            openPickerByClickTrigger();
            const shortcutItems = overlayContainerElement.querySelectorAll('.thy-calendar-picker-shortcut-item');

            const last7DaysItem = shortcutItems[0];
            const last30DaysItem = shortcutItems[1];
            expect(last7DaysItem.classList.contains('disabled')).toBe(true);
            expect(last30DaysItem.classList.contains('disabled')).toBe(false);
        }));

        it('should disable shortcut item whose max preset is less than thyMinDate', fakeAsync(() => {
            assertThisWeekShortcut({ offsetDays: 3, disabled: true });
        }));

        it('should not disable shortcut item whose max preset is not less than thyMinDate', fakeAsync(() => {
            assertThisWeekShortcut({ offsetDays: -3, disabled: false });
        }));

        function assertThisWeekShortcut(options: { offsetDays: number; disabled: boolean }) {
            fixtureInstance.thyMinDate = startOfDay(addDays(new TinyDate().endOfWeek({ weekStartsOn: 1 }).getTime(), options.offsetDays));
            fixture.detectChanges();

            openPickerByClickTrigger();
            const shortcutItems = overlayContainerElement.querySelectorAll('.thy-calendar-picker-shortcut-item');

            const thisWeekItem = shortcutItems[2];
            expect(thisWeekItem.classList.contains('disabled')).toBe(options.disabled);
        }
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
            expect(getPickerTrigger().matches(':focus-within')).toBeTruthy();
        }));

        it('should support thyAllowClear and work properly', fakeAsync(() => {
            const clearBtnSelector = By.css('thy-picker .thy-calendar-picker-clear .thy-icon');
            const initial = (fixtureInstance.modelValue = { begin: new Date(), end: new Date() });
            fixtureInstance.thyAllowClear = false;
            fixture.detectChanges();
            expect(debugElement.query(clearBtnSelector)).toBeNull();

            fixtureInstance.thyAllowClear = true;
            tick();
            fixture.detectChanges();
            expect(fixtureInstance.modelValue).toBe(initial);
            expect(debugElement.query(clearBtnSelector)).toBeDefined();

            const thyOnChange = spyOn(fixtureInstance, 'modelValueChange');
            debugElement.query(clearBtnSelector).nativeElement.click();
            fixture.detectChanges();
            expect(fixtureInstance.modelValue.begin).toBe(null);
            expect(fixtureInstance.modelValue.end).toBe(null);
            expect(thyOnChange).toHaveBeenCalledWith({ begin: null, end: null });
            expect(debugElement.query(clearBtnSelector)).toBeFalsy();
        }));

        it('should support thyDisabled', fakeAsync(() => {
            // Make sure picker clear button shown up
            fixtureInstance.thyAllowClear = true;
            fixtureInstance.modelValue = { begin: new Date(), end: new Date() };

            fixtureInstance.thyDisabled = true;
            fixture.detectChanges();
            expect(debugElement.query(By.css('thy-picker .thy-input-disabled'))).toBeDefined();
            expect(debugElement.query(By.css('thy-picker i.thy-calendar-picker-clear'))).toBeNull();

            fixtureInstance.thyDisabled = false;
            tick();
            fixture.detectChanges();
            expect(debugElement.query(By.css('thy-picker .thy-input-disabled'))).toBeNull();
            expect(debugElement.query(By.css('thy-picker i.thy-calendar-picker-clear'))).toBeDefined();
        }));

        it('should support thyOpen if assigned', fakeAsync(() => {
            fixtureInstance.useSuite = 2;

            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(getPickerContainer()).toBeNull();

            fixtureInstance.thyOpen = true;
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(getPickerContainer()).not.toBeNull();

            fixtureInstance.thyOpen = false;
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(getPickerContainer()).toBeNull();
        }));

        it('should support thyDisabledDate', fakeAsync(() => {
            fixture.detectChanges();
            const compareDate = new Date('2018-11-15 00:00:00');
            fixtureInstance.modelValue = {
                begin: new Date('2018-11-11 12:12:12'),
                end: new Date('2018-12-12 12:12:12')
            };
            fixtureInstance.thyDisabledDate = (current: Date) => isSameDay(current, compareDate);
            fixture.detectChanges();

            dispatchMouseEvent(getPickerTriggerWrapper(), 'click');
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            const disabledCell = queryFromOverlay('.thy-calendar-range-left tbody.thy-calendar-tbody td.thy-calendar-disabled-cell');
            expect(disabledCell.textContent.trim()).toBe('15');
        }));

        it('should support thyPlaceHolder as string array', () => {
            const featureKey = 'RIGHT_PLACEHOLDER';
            fixtureInstance.thyPlaceHolder = ['Start', featureKey];
            fixture.detectChanges();
            expect(getPickerTrigger().getAttribute('placeholder')).toBe(`Start${fixture.componentInstance.thySeparator}RIGHT_PLACEHOLDER`);
        });

        it('should support thyPlaceHolder as string', () => {
            fixtureInstance.thyPlaceHolder = 'Range Date Picker PlaceHolder';
            fixture.detectChanges();
            expect(getPickerTrigger().getAttribute('placeholder')).toBe('Range Date Picker PlaceHolder');
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

        it('should support thyOpenChange', fakeAsync(() => {
            const thyOpenChange = spyOn(fixtureInstance, 'thyOpenChange');
            fixture.detectChanges();
            dispatchMouseEvent(getPickerTriggerWrapper(), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(thyOpenChange).toHaveBeenCalledWith(true);

            dispatchMouseEvent(queryFromOverlay('.cdk-overlay-backdrop'), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(thyOpenChange).toHaveBeenCalledWith(false);
            expect(thyOpenChange).toHaveBeenCalledTimes(2);
        }));

        it('should support thyValue', fakeAsync(() => {
            fixtureInstance.modelValue = { begin: new Date('2018-11-11'), end: new Date('2018-12-11') };
            fixture.detectChanges();
            openPickerByClickTrigger();
            expect(getFirstSelectedDayCell().textContent.trim()).toBe('11');
        }));

        it('should support thyShowShortcut', fakeAsync(() => {
            fixtureInstance.thyShowShortcut = true;
            fixture.detectChanges();
            openPickerByClickTrigger();
            expect(queryFromOverlay('.thy-calendar-picker-shortcut')).toBeTruthy();
        }));

        it('should support thyShortcutPosition', fakeAsync(() => {
            fixtureInstance.thyShowShortcut = true;
            fixtureInstance.thyShortcutPosition = 'bottom';
            fixture.detectChanges();
            openPickerByClickTrigger();
            expect(queryFromOverlay('.thy-calendar-picker-shortcut-bottom')).toBeTruthy();
        }));

        it('should support more thyShortcutPresets', fakeAsync(() => {
            fixtureInstance.thyShowShortcut = true;
            fixtureInstance.thyShortcutPresets = [
                {
                    title: '回家那几天',
                    value: [new Date('2022-01-29').getTime(), new Date('2022-02-8').getTime()]
                }
            ];
            const thyOnChange = spyOn(fixtureInstance, 'modelValueChange');
            fixture.detectChanges();
            openPickerByClickTrigger();
            const shortcutItems = overlayContainerElement.querySelectorAll('.thy-calendar-picker-shortcut-item');
            expect((shortcutItems[shortcutItems.length - 1] as HTMLElement).innerText).toBe('回家那几天');
            dispatchMouseEvent(shortcutItems[shortcutItems.length - 1], 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(thyOnChange).toHaveBeenCalledWith({
                begin: new TinyDate('2022-01-29').startOfDay().getUnixTime(),
                end: new TinyDate('2022-02-8').endOfDay().getUnixTime()
            });
            expect(fromUnixTime(fixtureInstance.modelValue.begin as number).getDate()).toBe(new TinyDate('2022-01-29').getDate());
            expect(fromUnixTime(fixtureInstance.modelValue.end as number).getDate()).toBe(new TinyDate('2022-02-8').getDate());
        }));

        it('should support thyDateChange', fakeAsync(() => {
            fixtureInstance.thyShowShortcut = true;
            fixtureInstance.thyTimestampPrecision = 'milliseconds';
            let rangePresets = shortcutRangesPresets();
            const triggerPreset = Object.assign(rangePresets[0], { disabled: false });
            const thyDateChange = spyOn(fixtureInstance, 'thyDateChange');
            fixture.detectChanges();
            openPickerByClickTrigger();
            const shortcutItems = overlayContainerElement.querySelectorAll('.thy-calendar-picker-shortcut-item');
            dispatchMouseEvent(shortcutItems[0], 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(thyDateChange).toHaveBeenCalledTimes(1);
            expect(thyDateChange).toHaveBeenCalledWith({
                value: [new TinyDate(new TinyDate().startOfDay().getTime() - 3600 * 1000 * 24 * 6), new TinyDate().endOfDay()],
                triggerPreset: triggerPreset
            });
        }));

        it('should default shortcut the last 30 days worked', fakeAsync(() => {
            fixtureInstance.thyShowShortcut = true;
            fixture.detectChanges();
            openPickerByClickTrigger();
            const shortcutItems = overlayContainerElement.querySelectorAll('.thy-calendar-picker-shortcut-item');
            dispatchMouseEvent(shortcutItems[1], 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(fromUnixTime(fixtureInstance.modelValue.begin as number).getDate()).toBe(
                new TinyDate(new TinyDate().startOfDay().getTime() - 3600 * 1000 * 24 * 29).getDate()
            );
            expect(fromUnixTime(fixtureInstance.modelValue.end as number).getDate()).toBe(new TinyDate().endOfDay().getDate());
        }));

        it('should default shortcut this week worked', fakeAsync(() => {
            fixtureInstance.thyShowShortcut = true;
            fixture.detectChanges();
            openPickerByClickTrigger();
            const shortcutItems = overlayContainerElement.querySelectorAll('.thy-calendar-picker-shortcut-item');
            dispatchMouseEvent(shortcutItems[2], 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(fromUnixTime(fixtureInstance.modelValue.begin as number).getDate()).toBe(
                new TinyDate(new TinyDate().startOfWeek({ weekStartsOn: 1 }).getTime()).getDate()
            );
            expect(fromUnixTime(fixtureInstance.modelValue.end as number).getDate()).toBe(
                new TinyDate(new TinyDate().endOfWeek({ weekStartsOn: 1 }).getTime()).getDate()
            );
        }));

        it('should default shortcut this month worked', fakeAsync(() => {
            fixtureInstance.thyShowShortcut = true;
            fixture.detectChanges();
            openPickerByClickTrigger();
            const shortcutItems = overlayContainerElement.querySelectorAll('.thy-calendar-picker-shortcut-item');
            dispatchMouseEvent(shortcutItems[3], 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(fromUnixTime(fixtureInstance.modelValue.begin as number).getDate()).toBe(
                new TinyDate(new TinyDate().startOfMonth().getTime()).getDate()
            );
            expect(fromUnixTime(fixtureInstance.modelValue.end as number).getDate()).toBe(new TinyDate().endOfMonth().getDate());
        }));

        it('should support thyOnCalendarChange', fakeAsync(() => {
            const thyOnCalendarChange = spyOn(fixtureInstance, 'thyOnCalendarChange');
            fixture.detectChanges();
            openPickerByClickTrigger();
            const left = getFirstCell('left');
            const leftText = left.textContent.trim();
            dispatchMouseEvent(left, 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(thyOnCalendarChange).toHaveBeenCalled();
            let result = (thyOnCalendarChange.calls.allArgs()[0] as Date[][])[0];
            expect((result[0] as Date).getDate()).toBe(+leftText);
            const right = getFirstCell('right');
            const rightText = right.textContent.trim();
            dispatchMouseEvent(right, 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(thyOnCalendarChange).toHaveBeenCalled();
            result = (thyOnCalendarChange.calls.allArgs()[1] as Date[][])[0];
            expect((result[0] as Date).getDate()).toBe(+leftText);
            expect((result[1] as Date).getDate()).toBe(+rightText);
        }));

        it('should first date is startOfDay,last date is endOfDay', fakeAsync(() => {
            const thyOnCalendarChange = spyOn(fixtureInstance, 'thyOnCalendarChange');
            fixture.detectChanges();
            openPickerByClickTrigger();
            const left = getFirstCell('left');
            dispatchMouseEvent(left, 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(thyOnCalendarChange).toHaveBeenCalled();
            let result = (thyOnCalendarChange.calls.allArgs()[0] as Date[][])[0];
            expect(result[0]).toEqual(startOfDay(result[0]));

            const right = getFirstCell('right');
            dispatchMouseEvent(right, 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(thyOnCalendarChange).toHaveBeenCalled();
            result = (thyOnCalendarChange.calls.allArgs()[1] as Date[][])[0];
            expect(result[1]).toEqual(endOfDay(result[1]));
        }));

        it('should support thyOnChange', fakeAsync(() => {
            fixtureInstance.modelValue = { begin: new Date('2018-11-11'), end: new Date('2018-11-11') };
            const thyOnChange = spyOn(fixtureInstance, 'modelValueChange');
            fixture.detectChanges();
            openPickerByClickTrigger();

            const left = getFirstCell('left'); // Use the first cell
            const leftText = left.textContent.trim();
            dispatchMouseEvent(left, 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            const right = getFirstCell('right'); // NOTE: At the time "left" clicked, the date panel will be re-rendered
            const rightText = right.textContent.trim();
            dispatchMouseEvent(right, 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(thyOnChange).toHaveBeenCalled();
            const result = (thyOnChange.calls.allArgs()[0] as ThyDateRangeEntry[])[0];
            expect(fromUnixTime(result.begin as number).getDate()).toBe(+leftText);
            expect(fromUnixTime(result.end as number).getDate()).toBe(+rightText);
        }));
    }); // /general api testing

    describe('panel switch and move forward/afterward', () => {
        beforeEach(() => (fixtureInstance.useSuite = 1));

        it('should support date panel changes', fakeAsync(() => {
            fixtureInstance.modelValue = { begin: new Date('2018-6-11'), end: new Date('2020-12-12') };
            fixture.detectChanges();
            openPickerByClickTrigger();
            // Click previous year button
            dispatchMouseEvent(queryFromOverlay(leftYearPrevBtn), 'click');
            fixture.detectChanges();
            expect(queryFromOverlay(leftYearBtn).textContent.indexOf('2017') > -1).toBeTruthy();
            // Click next year button * 2
            dispatchMouseEvent(queryFromOverlay(leftYearNextBtn), 'click');
            fixture.detectChanges();
            dispatchMouseEvent(queryFromOverlay(leftYearNextBtn), 'click');
            fixture.detectChanges();
            expect(queryFromOverlay(leftYearBtn).textContent.indexOf('2019') > -1).toBeTruthy();
            // Click previous month button
            dispatchMouseEvent(queryFromOverlay(leftMonthPrevBtn), 'click');
            fixture.detectChanges();
            expect(queryFromOverlay(leftMonthBtn).textContent.indexOf('5') > -1).toBeTruthy();
            // Click next month button * 2
            dispatchMouseEvent(queryFromOverlay(leftMonthNextBtn), 'click');
            fixture.detectChanges();
            dispatchMouseEvent(queryFromOverlay(leftMonthNextBtn), 'click');
            fixture.detectChanges();
            expect(queryFromOverlay(leftMonthBtn).textContent.indexOf('7') > -1).toBeTruthy();
        }));

        it('should show current thy-calendar-next-month-btn and thy-calendar-next-year-btn', fakeAsync(() => {
            fixtureInstance.modelValue = { begin: new Date('2018-10-11'), end: new Date('2018-12-12') };
            fixture.detectChanges();
            openPickerByClickTrigger();

            assertPreOrNextBtn(leftYearNextBtn, 'd-none');
            assertPreOrNextBtn(rightYearPrevBtn, 'd-none');
            fixture.detectChanges();
            dispatchMouseEvent(queryFromOverlay(leftMonthNextBtn), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            fixture.detectChanges();
            assertPreOrNextBtn(leftYearNextBtn, 'd-none');
            assertPreOrNextBtn(rightYearPrevBtn, 'd-none');
            fixture.detectChanges();
            dispatchMouseEvent(queryFromOverlay(leftYearPrevBtn), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            assertPreOrNextBtn(leftMonthNextBtn, 'd-block');
            assertPreOrNextBtn(rightMonthPrevBtn, 'd-block');
            assertPreOrNextBtn(leftYearNextBtn, 'd-block');
            assertPreOrNextBtn(rightYearPrevBtn, 'd-block');
        }));
    }); // /panel switch and move forward/afterward

    describe('specified date picker testing', () => {
        beforeEach(() => (fixtureInstance.useSuite = 1));

        it('should not change value when click ESC', fakeAsync(() => {
            fixtureInstance.modelValue = { begin: new Date('2018-09-11'), end: new Date('2020-09-12') };
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            openPickerByClickTrigger();

            dispatchMouseEvent(queryFromOverlay('.cdk-overlay-backdrop'), 'click');
            fixture.detectChanges();
            tick(500);
            expect(getRangePickerInput().value).toBe(`2018-09-11${fixture.componentInstance.thySeparator}2020-09-12`);
        }));
    }); // /specified date picker testing

    describe('ngModel value accesors', () => {
        beforeEach(() => (fixtureInstance.useSuite = 3));

        it('should specified date provide by "modelValue" be choose', fakeAsync(() => {
            fixtureInstance.modelValue = { begin: new Date('2018-11-11'), end: new Date('2018-12-12') };
            fixture.detectChanges();
            tick(500); // Wait writeValue() tobe done
            fixture.detectChanges();
            expect(getFirstSelectedDayCell().textContent.trim()).toBe('11');

            // Click the first cell to change ngModel
            const left = getFirstCell('left');
            const leftText = left.textContent.trim();
            dispatchMouseEvent(left, 'click');
            fixture.detectChanges();
            const right = getFirstCell('right');
            const rightText = right.textContent.trim();
            dispatchMouseEvent(right, 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(fromUnixTime(fixtureInstance.modelValue.begin as number).getDate()).toBe(+leftText);
            expect(fromUnixTime(fixtureInstance.modelValue.end as number).getDate()).toBe(+rightText);
        }));
    });

    describe('quarter mode', () => {
        beforeEach(() => {
            fixtureInstance.useSuite = 1;
            fixtureInstance.thyMode = 'quarter';
        });

        it('should range date provide by "modelValue" be choose', fakeAsync(() => {
            fixtureInstance.modelValue = { begin: new Date('2022-08'), end: new Date('2023-12') };
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            openPickerByClickTrigger();
            expect(getFirstSelectedQuarterCell().textContent.trim()).toBe('Q3');
        }));
    });

    describe('month mode', () => {
        beforeEach(() => {
            fixtureInstance.useSuite = 1;
            fixtureInstance.thyMode = 'month';
        });

        it('should show month panel', fakeAsync(() => {
            fixtureInstance.modelValue = { begin: new Date('2018-09-11'), end: new Date('2020-10-12') };
            fixture.detectChanges();
            openPickerByClickTrigger();
            expect(queryFromOverlay('.thy-calendar-range-left .thy-calendar-month')).toBeTruthy();
            expect(queryFromOverlay(leftMonthBtn).textContent.trim()).toEqual('2018年');
            expect(queryFromOverlay('.thy-calendar-range-right .thy-calendar-month')).toBeTruthy();
            expect(queryFromOverlay('.thy-calendar-range-right .thy-calendar-month-btn').textContent.trim()).toEqual('2020年');
        }));

        it('should support previous and next year', fakeAsync(() => {
            fixtureInstance.modelValue = { begin: new Date('2018-09-11'), end: new Date('2018-10-12') };
            fixture.detectChanges();
            openPickerByClickTrigger();
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(queryFromOverlay(leftMonthBtn).textContent.indexOf('2018') > -1).toBeTruthy();
            expect(queryFromOverlay('.thy-calendar-range-right .thy-calendar-month-btn').textContent.indexOf('2019') > -1).toBeTruthy();
            assertPreOrNextBtn(leftYearNextBtn, 'd-none');
            assertPreOrNextBtn(rightYearPrevBtn, 'd-none');
            dispatchMouseEvent(queryFromOverlay(leftYearPrevBtn), 'click');
            fixture.detectChanges();
            expect(queryFromOverlay(leftMonthBtn).textContent.indexOf('2017') > -1).toBeTruthy();
            fixture.detectChanges();
            assertPreOrNextBtn(leftYearNextBtn, 'd-block');
            assertPreOrNextBtn(rightYearPrevBtn, 'd-block');
            fixture.detectChanges();
            tick(500);
            dispatchMouseEvent(queryFromOverlay(leftYearNextBtn), 'click');
            fixture.detectChanges();
            expect(queryFromOverlay(leftMonthBtn).textContent.indexOf('2018') > -1).toBeTruthy();
        }));

        it('should support panel changes', fakeAsync(() => {
            fixtureInstance.modelValue = { begin: new Date('2018-09-11'), end: new Date('2018-10-12') };
            fixture.detectChanges();
            openPickerByClickTrigger();
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            dispatchMouseEvent(queryFromOverlay(leftMonthBtn), 'click');
            fixture.detectChanges();
            expect(queryFromOverlay('.thy-calendar-range-left .thy-calendar-year')).toBeTruthy();
        }));
    });

    describe('flexible range picker', () => {
        beforeEach(() => {
            fixtureInstance.useSuite = 4;
            fixtureInstance.thyMode = 'flexible';
        });

        it('should show flexible panel', fakeAsync(() => {
            fixture.detectChanges();
            openPickerByClickTrigger();
            expect(getPickerContainer()).toBeTruthy();
            expect(queryFromOverlay('.thy-calendar-date-panel .thy-calendar-date-panel-flexible')).toBeTruthy();
            const navItem = overlayContainerElement.querySelectorAll('thy-nav .thy-nav-item');
            expect(navItem.length).toBe(2);
            expect((navItem[0] as HTMLElement).innerText).toBe('高级选项');
            expect((navItem[1] as HTMLElement).innerText).toBe('自定义');
            fixture.detectChanges();
            dispatchMouseEvent(navItem[1], 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(queryFromOverlay('.thy-calendar-date-panel .thy-calendar-date-panel-advanced').hasAttribute('hidden'));
        }));

        it('should show flexible custom panel', fakeAsync(() => {
            fixtureInstance.flexibleDateRange = { begin: new Date('2018-09-11'), end: new Date('2018-10-12') };
            fixture.detectChanges();
            openPickerByClickTrigger();
            fixture.detectChanges();
            expect(queryFromOverlay('.thy-calendar-date-panel .thy-calendar-date-panel-advanced').hasAttribute('hidden'));

            const datePopup = fixture.debugElement.query(By.directive(DatePopup));
            expect(datePopup.componentInstance.advancedSelectedValue.begin).toBeUndefined();
        }));

        it('should select advanced year', fakeAsync(() => {
            const thyOnChange = spyOn(fixtureInstance, 'modelValueChange');
            fixture.detectChanges();
            openPickerByClickTrigger();
            expect(getPickerContainer()).toBeTruthy();
            const selectableButtons = overlayContainerElement.querySelectorAll('.selectable-button');
            const yearBtns = Array.from(selectableButtons).slice(0, 3);
            dispatchMouseEvent(yearBtns[0], 'click');
            fixture.detectChanges();
            expect(fromUnixTime(fixtureInstance.flexibleDateRange.begin as number).getFullYear()).toBe(new Date().getFullYear());
            expect(fixtureInstance.flexibleDateRange.granularity).toBe('year');
            expect(thyOnChange).toHaveBeenCalledWith({
                begin: new TinyDate().startOfYear().getUnixTime(),
                end: new TinyDate().endOfYear().getUnixTime(),
                granularity: 'year'
            });
            expect(getRangePickerInput().value).toBe(new TinyDate().format('yyyy年'));
        }));

        it('should select advanced quarter', fakeAsync(() => {
            const thyOnChange = spyOn(fixtureInstance, 'modelValueChange');
            fixture.detectChanges();
            openPickerByClickTrigger();
            expect(getPickerContainer()).toBeTruthy();
            const selectableButtons = overlayContainerElement.querySelectorAll('.selectable-button');
            const quarterBtns = Array.from(selectableButtons).slice(3, 7);
            dispatchMouseEvent(quarterBtns[0], 'click');
            fixture.detectChanges();
            expect(new TinyDate(fromUnixTime(fixtureInstance.flexibleDateRange.begin as number)).getQuarter()).toBe(
                new TinyDate().getQuarter()
            );
            expect(fixtureInstance.flexibleDateRange.granularity).toBe('quarter');
            expect(thyOnChange).toHaveBeenCalledWith({
                begin: new TinyDate().startOfQuarter().getUnixTime(),
                end: new TinyDate().endOfQuarter().getUnixTime(),
                granularity: 'quarter'
            });
            expect(getRangePickerInput().value).toBe(`${new TinyDate().format('yyyy年 qqq')}`);
        }));

        it('should select advanced month', fakeAsync(() => {
            const thyOnChange = spyOn(fixtureInstance, 'modelValueChange');
            fixture.detectChanges();
            openPickerByClickTrigger();
            expect(getPickerContainer()).toBeTruthy();
            const selectableButtons = overlayContainerElement.querySelectorAll('.selectable-button');
            const monthBtns = Array.from(selectableButtons).slice(7);
            dispatchMouseEvent(monthBtns[0], 'click');
            fixture.detectChanges();
            expect(fromUnixTime(fixtureInstance.flexibleDateRange.begin as number).getMonth()).toBe(new Date().getMonth());
            expect(fixtureInstance.flexibleDateRange.granularity).toBe('month');
            expect(thyOnChange).toHaveBeenCalledWith({
                begin: new TinyDate().startOfMonth().getUnixTime(),
                end: new TinyDate().endOfMonth().getUnixTime(),
                granularity: 'month'
            });
            expect(getRangePickerInput().value).toBe(`${new TinyDate().format('yyyy年 MM月')}`);
        }));

        it('should select custom date', fakeAsync(() => {
            fixture.detectChanges();
            openPickerByClickTrigger();
            const navItem = overlayContainerElement.querySelectorAll('thy-nav .thy-nav-item');
            fixture.detectChanges();
            dispatchMouseEvent(navItem[1], 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            const cells = overlayContainerElement.querySelectorAll(
                `.thy-calendar-date-panel-flexible tbody.thy-calendar-tbody td.thy-calendar-cell`
            );
            const left = cells[10];
            const right = cells[11];
            const leftText = left.textContent.trim();
            const rightText = right.textContent.trim();
            dispatchMouseEvent(left, 'click');
            fixture.detectChanges();
            dispatchMouseEvent(right, 'click');
            fixture.detectChanges();
            expect(fromUnixTime(fixtureInstance.flexibleDateRange.begin as number).getDate()).toBe(+leftText);
            expect(fromUnixTime(fixtureInstance.flexibleDateRange.end as number).getDate()).toBe(+rightText);
        }));

        it('should clear worked', fakeAsync(() => {
            fixtureInstance.flexibleDateRange = { begin: new Date('2018-09-11'), end: new Date('2018-10-12'), granularity: 'month' };
            fixture.detectChanges();
            openPickerByClickTrigger();
            const clearBtn = overlayContainerElement.querySelector('.thy-calendar-date-panel-flexible-tab button');
            fixture.detectChanges();
            dispatchMouseEvent(clearBtn, 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(fixtureInstance.flexibleDateRange.begin).toBeFalsy();
            expect(fixtureInstance.flexibleDateRange.end).toBeFalsy();
            expect(fixtureInstance.flexibleDateRange.granularity).toBeFalsy();
            tick(500);
            fixture.detectChanges();

            fixtureInstance.flexibleDateRange = { begin: new Date('2018-09-11'), end: new Date('2018-10-12') };
            fixture.detectChanges();
            openPickerByClickTrigger();
            fixture.detectChanges();
            dispatchMouseEvent(clearBtn, 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(fixtureInstance.flexibleDateRange.begin).toBeFalsy();
            expect(fixtureInstance.flexibleDateRange.end).toBeFalsy();
        }));

        it('should thyDateChange trigger twice', fakeAsync(() => {
            const thyDateChange = spyOn(fixtureInstance, 'thyDateChange');
            fixture.detectChanges();
            openPickerByClickTrigger();
            expect(getPickerContainer()).toBeTruthy();
            const selectableButtons = overlayContainerElement.querySelectorAll('.selectable-button');
            const monthBtns = Array.from(selectableButtons).slice(7);
            dispatchMouseEvent(monthBtns[0], 'click');
            fixture.detectChanges();
            dispatchMouseEvent(monthBtns[1], 'click');
            fixture.detectChanges();
            expect(thyDateChange).toHaveBeenCalledTimes(2);
            expect(thyDateChange).toHaveBeenCalledWith({
                value: [new TinyDate().startOfMonth(), new TinyDate().endOfMonth()]
            });
        }));
    });

    describe('switch thyMode', () => {
        beforeEach(() => {
            fixtureInstance.useSuite = 1;
        });

        it('should get correct default thyMode', fakeAsync(() => {
            fixture.detectChanges();
            openPickerByClickTrigger();
            expect(queryFromOverlay('.thy-calendar-picker-inner-popup').firstElementChild.className).not.toContain('thy-calendar-');
        }));

        it(`should set thyMode to week`, fakeAsync(() => {
            fixture.detectChanges();
            fixtureInstance.thyMode = 'week';
            fixture.detectChanges();
            openPickerByClickTrigger();
            expect(queryFromOverlay('.thy-calendar-picker-inner-popup').firstElementChild.className).not.toContain('thy-calendar-');
            expect(queryFromOverlay('.thy-calendar-week-number-header')).toBeTruthy();
        }));

        it(`should set thyMode to month`, fakeAsync(() => {
            fixture.detectChanges();
            fixtureInstance.thyMode = 'month';
            fixture.detectChanges();
            openPickerByClickTrigger();
            expect(queryFromOverlay('.thy-calendar-picker-inner-popup').firstElementChild.className).toContain('thy-calendar-month');
        }));

        it(`should set thyMode to year`, fakeAsync(() => {
            fixture.detectChanges();
            fixtureInstance.thyMode = 'year';
            fixture.detectChanges();
            openPickerByClickTrigger();
            expect(queryFromOverlay('.thy-calendar-picker-inner-popup').firstElementChild.className).toContain('thy-calendar-year');
        }));

        it('should set thyMode to quarter', fakeAsync(() => {
            fixture.detectChanges();
            fixtureInstance.thyMode = 'quarter';
            fixture.detectChanges();
            openPickerByClickTrigger();
            expect(queryFromOverlay('.thy-calendar-picker-inner-popup').firstElementChild.className).toContain('thy-calendar-quarter');
        }));

        it(`should set thyMode to decade`, fakeAsync(() => {
            fixture.detectChanges();
            fixtureInstance.thyMode = 'decade';
            fixture.detectChanges();
            openPickerByClickTrigger();
            expect(queryFromOverlay('.thy-calendar-picker-inner-popup').firstElementChild.className).toContain('thy-calendar-decade');
        }));

        it('should thyDateChange trigger twice by year mode', fakeAsync(() => {
            const thyDateChange = spyOn(fixtureInstance, 'thyDateChange');
            fixture.detectChanges();
            fixtureInstance.thyMode = 'year';
            fixture.detectChanges();
            openPickerByClickTrigger();
            fixture.detectChanges();
            const left = getFirstSelectedCellByMode('left', 'year');
            dispatchMouseEvent(left, 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            const right = getFirstSelectedCellByMode('right', 'year');
            dispatchMouseEvent(right, 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(thyDateChange).toHaveBeenCalled();
            const result = (thyDateChange.calls.allArgs()[0] as any[])[0];
            expect(thyDateChange).toHaveBeenCalledWith({
                value: [result.value[0].startOfYear(), result.value[1].endOfYear()]
            });
        }));

        it('should thyDateChange trigger twice by quarter mode', fakeAsync(() => {
            const thyDateChange = spyOn(fixtureInstance, 'thyDateChange');
            fixture.detectChanges();
            fixtureInstance.thyMode = 'quarter';
            fixture.detectChanges();
            openPickerByClickTrigger();
            fixture.detectChanges();
            const left = getFirstSelectedCellByMode('left', 'quarter');
            dispatchMouseEvent(left, 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            const right = getFirstSelectedCellByMode('right', 'quarter');
            dispatchMouseEvent(right, 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(thyDateChange).toHaveBeenCalled();
            const result = (thyDateChange.calls.allArgs()[0] as any[])[0];

            expect(thyDateChange).toHaveBeenCalledWith({
                value: [result.value[0].startOfQuarter(), result.value[1].endOfQuarter()]
            });
        }));
    });

    function getPickerTrigger(): HTMLInputElement {
        return debugElement.query(By.css('thy-picker .thy-calendar-picker-input')).nativeElement as HTMLInputElement;
    }

    function getRangePickerInput(): HTMLInputElement {
        return debugElement.query(By.css('thy-picker .thy-calendar-picker-input')).nativeElement as HTMLInputElement;
    }

    function getPickerTriggerWrapper(): HTMLInputElement {
        return debugElement.query(By.css('thy-picker .thy-calendar-picker')).nativeElement as HTMLInputElement;
    }

    function getPickerContainer(): HTMLElement {
        return queryFromOverlay('.thy-calendar-picker-container') as HTMLElement;
    }

    function getFirstSelectedDayCell(): HTMLElement {
        return queryFromOverlay('.thy-calendar-range-left tbody.thy-calendar-tbody td.thy-calendar-selected-day') as HTMLElement;
    }

    function getFirstCell(partial: 'left' | 'right'): HTMLElement {
        return queryFromOverlay(`.thy-calendar-range-${partial} tbody.thy-calendar-tbody td.thy-calendar-cell`) as HTMLElement;
    }

    function getFirstSelectedCellByMode(partial: 'left' | 'right', mode: ThyPanelMode): HTMLElement {
        return queryFromOverlay(
            `.thy-calendar-range-${partial} tbody.thy-calendar-${mode}-panel-tbody td.thy-calendar-${mode}-panel-cell`
        ) as HTMLElement;
    }

    function getFirstSelectedQuarterCell(): HTMLElement {
        return queryFromOverlay(
            '.thy-calendar-range-left tbody.thy-calendar-quarter-panel-tbody td.thy-calendar-quarter-panel-selected-cell'
        ) as HTMLElement;
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

    function assertPreOrNextBtn(selector: string, targetClassName: string) {
        const btnElement = queryFromOverlay(selector);
        expect(btnElement).toBeTruthy();
        expect(btnElement.classList.contains(targetClassName)).toBeTruthy();
    }
});

@Component({
    template: `
        @switch (useSuite) {
            <!-- Suite 1 -->
            @case (1) {
                <thy-range-picker
                    [thyAllowClear]="thyAllowClear"
                    [thyDisabled]="thyDisabled"
                    [thyDisabledDate]="thyDisabledDate"
                    [thyPlaceHolder]="thyPlaceHolder"
                    [thyPanelClassName]="thyPanelClassName"
                    [thySize]="thySize"
                    [thySuffixIcon]="thySuffixIcon"
                    [thyShowShortcut]="thyShowShortcut"
                    [thySeparator]="thySeparator"
                    [thyShortcutPresets]="thyShortcutPresets"
                    [thyShortcutPosition]="thyShortcutPosition"
                    (thyOpenChange)="thyOpenChange($event)"
                    [(ngModel)]="modelValue"
                    [thyMode]="thyMode"
                    [thyTimestampPrecision]="thyTimestampPrecision"
                    [thyMinDate]="thyMinDate"
                    [thyMaxDate]="thyMaxDate"
                    (ngModelChange)="modelValueChange($event)"
                    (thyOnPanelChange)="thyOnPanelChange($event)"
                    (thyOnCalendarChange)="thyOnCalendarChange($event)"
                    (thyDateChange)="thyDateChange($event)"></thy-range-picker>
            }
            <!-- Suite 2 -->
            <!-- use another picker to avoid thyOpen's side-effects because thyOpen act as "true" if used -->
            @case (2) {
                <thy-range-picker [thyOpen]="thyOpen" [thySeparator]="thySeparator"></thy-range-picker>
            }
            <!-- Suite 3 -->
            @case (3) {
                <thy-range-picker thyOpen [(ngModel)]="modelValue" [thySeparator]="thySeparator"></thy-range-picker>
            }
            <!-- Suite 4 flexible range picker -->
            @case (4) {
                <thy-range-picker
                    #rangePicker
                    [(ngModel)]="flexibleDateRange"
                    thyMode="flexible"
                    [thySeparator]="thySeparator"
                    (thyDateChange)="thyDateChange($event)"
                    (ngModelChange)="modelValueChange($event)"></thy-range-picker>
            }
        }
        <ng-template #tplDateRender let-current>
            <div [class.test-first-day]="current.getDate() === 1">{{ current.getDate() }}</div>
        </ng-template>
    `,
    imports: [FormsModule, ThyDatePickerModule]
})
class ThyTestRangePickerComponent {
    useSuite: 1 | 2 | 3 | 4;
    @ViewChild('tplDateRender', { static: true }) tplDateRender: TemplateRef<Date>;
    @ViewChild('tplExtraFooter', { static: true }) tplExtraFooter: TemplateRef<void>;
    thyMinDate: Date | number;
    thyMaxDate: Date | number;
    thyAllowClear: boolean;
    thyDisabled: boolean;
    thyDisabledDate: (d: Date) => boolean;
    thyPlaceHolder: string | string[];
    thyPanelClassName: string;
    thySize: string;
    thySuffixIcon: string;
    thyTimestampPrecision = 'seconds';
    modelValue: ThyDateRangeEntry;
    thyMode: ThyPanelMode;
    thyOpen: boolean;
    thyShowShortcut: boolean;
    thyShortcutPosition: ThyShortcutPosition = 'left';
    thyShortcutPresets: CompatiblePresets;
    flexibleDateRange: ThyDateRangeEntry;
    thySeparator = ' ~ ';
    thyOpenChange(): void {}
    modelValueChange(): void {}
    thyOnPanelChange(): void {}
    thyOnCalendarChange(): void {}
    thyOnOk(): void {}
    thyDateChange(): void {}
}
