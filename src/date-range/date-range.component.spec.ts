import { OverlayContainer } from '@angular/cdk/overlay';
import { registerLocaleData } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import zh from '@angular/common/locales/zh';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, inject, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
    addMonths,
    differenceInDays,
    endOfMonth,
    endOfQuarter,
    endOfWeek,
    format,
    getMonth,
    getUnixTime,
    setMonth,
    startOfMonth,
    startOfQuarter
} from 'date-fns';
import { dispatchFakeEvent, dispatchMouseEvent } from 'ngx-tethys/testing';
import { addDays, addYears, endOfDay, endOfYear, startOfDay, startOfWeek, startOfYear } from '../util';
import { DateRangeItemInfo } from './date-range.class';
import { ThyDateRangeModule } from './module';

registerLocaleData(zh);

const CURRENT_DATE = new Date();

describe('ThyTestDateRangeComponent', () => {
    let fixture: ComponentFixture<ThyTestDateRangeComponent>;
    let fixtureInstance: ThyTestDateRangeComponent;
    let debugElement: DebugElement;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ThyDateRangeModule, NoopAnimationsModule],
            providers: [provideHttpClient()],
            declarations: [ThyTestDateRangeComponent]
        });

        TestBed.compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyTestDateRangeComponent);
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
            dispatchClickEvent(getPickerTriggerElement());
            expect(getPickerContainer()).not.toBeNull();
            dispatchClickEvent(queryFromOverlay('.cdk-overlay-backdrop'));
            fixture.detectChanges();
            tick(500);
            expect(getPickerContainer()).toBeNull();
        }));

        it('should not open by click when thyHiddenMenu is true', fakeAsync(() => {
            fixtureInstance.hiddenMenu = true;
            fixture.detectChanges();
            dispatchClickEvent(getPickerTriggerElement());
            expect(overlayContainerElement.childElementCount).toEqual(0);
        }));

        it('should have thy-date-range-text-active class in .thy-date-range-text element when click this element', fakeAsync(() => {
            fixture.detectChanges();
            dispatchClickEvent(getPickerTriggerElement());
            expect(debugElement.query(By.css('.thy-date-range-container .thy-date-range-text-active'))).not.toBeNull();
        }));

        it('hidden left and right arrow when thyHiddenSwitchRangeIcon is true', fakeAsync(() => {
            fixtureInstance.hiddenSwitchRangeIcon = true;
            fixture.detectChanges();
            expect(debugElement.queryAll(By.css('.thy-date-range-container .btn-icon')).length).toEqual(0);
        }));

        it('should show customValue property value when customValue is not empty string', fakeAsync(() => {
            const text = '自定义日期选择入口';
            fixtureInstance.customValue = text;
            fixture.detectChanges();
            dispatchClickEvent(getPickerTriggerElement());
            tick(100);
            fixture.detectChanges();
            const lastActionMenuItem = getPickerContainer().querySelector('.thy-dropdown-menu').lastElementChild;
            expect((lastActionMenuItem as HTMLElement).innerText).toEqual(text);
        }));

        it('should show setting right date when ngModel have init value', fakeAsync(() => {
            const text = '这是本周';
            const currentSelectedDate = {
                key: 'Week',
                text,
                begin: getUnixTime(startOfWeek(new Date())),
                end: getUnixTime(endOfWeek(new Date())),
                timestamp: {
                    interval: 7,
                    unit: 'day'
                }
            } as DateRangeItemInfo;
            fixtureInstance.selectedDate = currentSelectedDate;

            fixture.detectChanges();
            fixture.whenStable().then(() => {
                const node = debugElement.query(By.css('.thy-date-range-text')).nativeNode;
                expect(node.innerText).toEqual(text);
            });
        }));

        it('should be custom date when select custom date from date popover', fakeAsync(() => {
            fixture.detectChanges();
            dispatchClickEvent(getPickerTriggerElement());
            const actionMenuContainers = getPickerContainer().querySelector('.thy-date-range-dropdown-menu-container');
            dispatchClickEvent(actionMenuContainers.lastElementChild as HTMLElement);
            expect(queryFromOverlay('.thy-calendar-picker-container')).not.toBeNull();

            const leftCell = getFirstCell('left');
            const leftCellText = leftCell.innerText.trim();
            const leftIsPrevMonth = +leftCellText > 1;
            dispatchClickEvent(leftCell);

            const rightCell = getFirstCell('right');
            const rightCellText = rightCell.innerText.trim();
            const rightIsPrevMonth = +rightCellText > 1;

            dispatchClickEvent(rightCell);
            const leftDate = addMonths(CURRENT_DATE, leftIsPrevMonth ? -3 : -2);
            const rightDate = addMonths(CURRENT_DATE, rightIsPrevMonth ? -1 : 0);
            const currentText = getPickerTriggerElement().innerText;
            const currentTextToPureNumber = currentText.replace(/[^\d.]/g, '');

            expect(currentTextToPureNumber).toEqual(
                `${format(leftDate, 'yyyyMM')}${addZeroToSingleDigits(+leftCellText)}${format(rightDate, 'yyyyMM')}${addZeroToSingleDigits(
                    +rightCellText
                )}`
            );
        }));

        it('should support thyDisabledDate', fakeAsync(() => {
            fixture.detectChanges();
            fixtureInstance.thyDisabledDate = (date: Date) => {
                const tooLate = differenceInDays(date, CURRENT_DATE) > 7;
                const tooEarly = differenceInDays(CURRENT_DATE, date) > 7;
                return tooEarly || tooLate;
            };
            fixture.detectChanges();
            dispatchClickEvent(getPickerTriggerElement());
            fixture.detectChanges();
            const actionMenuContainers = getPickerContainer().querySelector('.thy-date-range-dropdown-menu-container');
            dispatchClickEvent(actionMenuContainers.lastElementChild as HTMLElement);
            const disabledCell = queryFromOverlay(
                '.thy-calendar-picker-container .thy-calendar-range-left tbody.thy-calendar-tbody td.thy-calendar-disabled-cell'
            );
            expect(disabledCell).not.toBeNull();
        }));
    });

    describe('action api test', () => {
        beforeEach(() => (fixtureInstance.useSuite = 2));

        it('should show customDateRanges second text when choose second option', fakeAsync(() => {
            const value = fixtureInstance.customDateRanges[1].text;
            fixture.detectChanges();
            dispatchClickEvent(getPickerTriggerElement());
            const secondOptional = getPickerContainer()
                .querySelector('thy-popover-container')
                .querySelector('.thy-date-range-dropdown-menu-container')
                .querySelectorAll('.dropdown-menu-item')[1];
            dispatchClickEvent(secondOptional as HTMLElement);
            expect(getPickerTriggerElement().innerText).toEqual(value);
        }));

        it('should support thyOnCalendarChange', fakeAsync(() => {
            const thyOnCalendarChange = spyOn(debugElement.componentInstance, 'calendarChange');
            fixture.detectChanges();
            dispatchClickEvent(getPickerTriggerElement());
            tick(100);
            fixture.detectChanges();
            const actionMenuContainers = getPickerContainer().querySelector('.thy-date-range-dropdown-menu-container');
            dispatchClickEvent(actionMenuContainers.lastElementChild as HTMLElement);
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

        it('should be connectable for the previous and next date range, when beginDate is first day and endDate is end day of month', () => {
            customDateRanges({
                text: '开始在月首，结束在月尾 - 向前、向后步进',
                begin: '2023-02-01',
                end: '2023-02-28',
                interval: 1
            });

            clickPrevious();
            expect(getDateRangeText()).toEqual('2023-01-01 ~ 2023-01-31');

            clickPrevious();
            expect(getDateRangeText()).toEqual('2022-12-01 ~ 2022-12-31');

            clickNext();
            clickNext();
            expect(getDateRangeText()).toEqual('2023-02-01 ~ 2023-02-28');
        });

        it('should be connectable for the previous date range, when beginDate is first day and endDate is not end day of month', () => {
            customDateRanges({
                text: '开始在月首，结束在月中 - 向前、向后步进',
                begin: '2023-03-01',
                end: '2023-03-27',
                interval: 1
            });

            clickPrevious();
            expect(getDateRangeText()).toEqual('2023-02-01 ~ 2023-02-28');

            clickNext();
            expect(getDateRangeText()).toEqual('2023-03-01 ~ 2023-03-31');
        });

        it('should be connectable for the next date range, when beginDate is first day and endDate is not end day of month', () => {
            customDateRanges({
                text: '开始在月首，结束在月中 - 向后步进',
                begin: '2023-03-01',
                end: '2023-03-27',
                interval: 1
            });

            clickNext();
            expect(getDateRangeText()).toEqual('2023-03-28 ~ 2023-04-27');

            clickNext();
            expect(getDateRangeText()).toEqual('2023-04-28 ~ 2023-05-27');
        });

        it('should be connectable for the previous date range, when the beginDate is not first day and endDate is end day of month', () => {
            customDateRanges({
                text: '开始在月中，结束在月尾 - 向前、向后步进',
                begin: '2023-02-09',
                end: '2023-03-31',
                interval: 2
            });

            clickPrevious();
            expect(getDateRangeText()).toEqual('2022-12-09 ~ 2023-02-08');

            clickNext();
            expect(getDateRangeText()).toEqual('2023-02-09 ~ 2023-04-08');
        });

        it('should be connectable for the next date range, when the beginDate is not first day and endDate is end day of month', () => {
            customDateRanges({
                text: '开始在月中，结束在月尾 - 向后步进',
                begin: '2023-02-09',
                end: '2023-03-31',
                interval: 2
            });

            clickNext();
            expect(getDateRangeText()).toEqual('2023-04-01 ~ 2023-05-31');

            clickPrevious();
            expect(getDateRangeText()).toEqual('2023-02-01 ~ 2023-03-31');
        });

        it('should be connectable for the previous and next date range, when the beginDate is not first day and endDate is not end day of month', () => {
            customDateRanges({
                text: '开始在月中，结束在月中 - 向前、向后步进',
                begin: '2023-06-23',
                end: '2023-08-22',
                interval: 2
            });

            clickPrevious();
            expect(getDateRangeText()).toEqual('2023-04-23 ~ 2023-06-22');

            clickPrevious();
            expect(getDateRangeText()).toEqual('2023-02-23 ~ 2023-04-22');

            clickNext();
            expect(getDateRangeText()).toEqual('2023-04-23 ~ 2023-06-22');
        });

        it('should change day date text when when click arrow', fakeAsync(() => {
            fixtureInstance.customDateRanges = fixtureInstance.customDayDateRanges;

            const originDate = fixtureInstance.customDateRanges[0];
            fixture.detectChanges();
            const modelChangedSpy = spyOn(debugElement.componentInstance, 'dateChanged');

            clickPrevious();
            expect(modelChangedSpy).toHaveBeenCalledTimes(1);
            const interval = originDate.timestamp.interval;
            const beginDate = originDate.begin * 1000;
            const endDate = originDate.end * 1000;
            const previousModelData = {
                begin: getUnixTime(addDays(beginDate, -1 * interval)),
                end: getUnixTime(addDays(endDate, -1 * interval)),
                key: 'custom'
            };
            expect(modelChangedSpy).toHaveBeenCalledWith(Object.assign({}, originDate, previousModelData));

            clickNext();
            expect(modelChangedSpy).toHaveBeenCalledTimes(2);
            const nextModelData = {
                begin: getUnixTime(addDays(previousModelData.begin * 1000, 1 * interval)),
                end: getUnixTime(addDays(previousModelData.end * 1000, 1 * interval)),
                key: 'custom'
            };
            expect(modelChangedSpy).toHaveBeenCalledWith(Object.assign({}, originDate, nextModelData));
        }));

        it('should change day date text when when click arrow', fakeAsync(() => {
            fixtureInstance.customDateRanges = fixtureInstance.customYearDateRanges;

            const originDate = fixtureInstance.customDateRanges[0];
            fixture.detectChanges();
            const modelChangedSpy = spyOn(debugElement.componentInstance, 'dateChanged');

            clickPrevious();
            expect(modelChangedSpy).toHaveBeenCalledTimes(1);
            const interval = originDate.timestamp.interval;
            const beginDate = originDate.begin * 1000;
            const endDate = originDate.end * 1000;
            const previousModelData = {
                begin: getUnixTime(addYears(beginDate, -1 * interval)),
                end: getUnixTime(addYears(endDate, -1 * interval)),
                key: 'custom'
            };
            expect(modelChangedSpy).toHaveBeenCalledWith(Object.assign({}, originDate, previousModelData));

            clickNext();
            expect(modelChangedSpy).toHaveBeenCalledTimes(2);
            const nextModelData = {
                begin: getUnixTime(addYears(previousModelData.begin * 1000, 1 * interval)),
                end: getUnixTime(addYears(previousModelData.end * 1000, 1 * interval)),
                key: 'custom'
            };
            expect(modelChangedSpy).toHaveBeenCalledWith(Object.assign({}, originDate, nextModelData));
        }));

        it('should change customs range days date when when click arrow', fakeAsync(() => {
            fixtureInstance.customDateRanges = fixtureInstance.customWithoutTimestampDateRanges;

            const originDate = fixtureInstance.customDateRanges[0];
            fixture.detectChanges();
            const modelChangedSpy = spyOn(debugElement.componentInstance, 'dateChanged');

            clickPrevious();
            expect(modelChangedSpy).toHaveBeenCalledTimes(1);
            const interval: number = originDate.end - originDate.begin + 24 * 60 * 60;
            const beginDate = originDate.begin;
            const endDate = originDate.end;
            const previousModelData = {
                begin: beginDate - interval,
                end: endDate - interval,
                key: 'custom'
            };
            expect(modelChangedSpy).toHaveBeenCalledWith(Object.assign({}, originDate, previousModelData));

            clickNext();
            expect(modelChangedSpy).toHaveBeenCalledTimes(2);
            const nextModelData = {
                begin: previousModelData.begin + interval,
                end: previousModelData.end + interval,
                key: 'custom'
            };
            expect(modelChangedSpy).toHaveBeenCalledWith(Object.assign({}, originDate, nextModelData));
        }));

        function customDateRanges(options: { text: string; begin: string; end: string; interval: number }) {
            fixtureInstance.customDateRanges = [
                {
                    key: 'month',
                    text: options.text,
                    begin: getUnixTime(new Date(`${options.begin}`)),
                    end: getUnixTime(new Date(`${options.end}`)),
                    timestamp: {
                        interval: options.interval,
                        unit: 'month'
                    }
                }
            ];
            fixture.detectChanges();
        }

        function clickPrevious() {
            const previousButton = debugElement.queryAll(By.css('.thy-action'))[0].nativeElement;
            dispatchFakeEvent(previousButton, 'click', true);
            fixture.detectChanges();
        }

        function clickNext() {
            const nextButton = debugElement.queryAll(By.css('.thy-action'))[1].nativeElement;
            dispatchFakeEvent(nextButton, 'click', true);
            fixture.detectChanges();
        }
    });

    function getPickerTriggerElement(): HTMLInputElement {
        return debugElement.query(By.css('.thy-date-range-text')).nativeElement as HTMLInputElement;
    }

    function getPickerContainer(): HTMLElement {
        return queryFromOverlay('.cdk-overlay-pane') as HTMLElement;
    }

    function queryFromOverlay(selector: string): HTMLElement {
        return overlayContainerElement.querySelector(selector) as HTMLElement;
    }
    function getFirstCell(partial: 'left' | 'right'): HTMLElement {
        return queryFromOverlay(`.thy-calendar-range-${partial} tbody.thy-calendar-tbody td.thy-calendar-cell`) as HTMLElement;
    }

    function getHeader(partial: 'left' | 'right'): HTMLElement {
        return queryFromOverlay(`.thy-calendar-range-${partial} .thy-calendar-header .thy-calendar-my-select`) as HTMLElement;
    }

    function dispatchClickEvent(selector: HTMLElement | HTMLInputElement): void {
        dispatchMouseEvent(selector, 'click');
        fixture.detectChanges();
        tick(500);
        fixture.detectChanges();
    }

    function addZeroToSingleDigits(value: number): string {
        if (value < 10) {
            return '0' + value;
        }
        return value.toString();
    }

    function getDateRangeText(): string {
        return debugElement.query(By.css('.thy-date-range-text')).nativeNode.innerText;
    }
});

@Component({
    template: `
        @switch (useSuite) {
            <!-- Suite 1 for test general Api -->
            @case (1) {
                <thy-date-range
                    name="generalProperties"
                    [thyHiddenMenu]="hiddenMenu"
                    [thyDisabledSwitch]="hiddenSwitchRangeIcon"
                    [thyCustomTextValue]="customValue"
                    [thyOptionalDateRanges]="dateRanges"
                    [thySeparator]="separator"
                    [thyDisabledDate]="thyDisabledDate"
                    [(ngModel)]="selectedDate"></thy-date-range>
            }
            <!-- Suite 2 -->
            @case (2) {
                <thy-date-range
                    name="setCustomDateRanges"
                    [thyOptionalDateRanges]="customDateRanges"
                    [ngModel]="selectedDate"
                    [thySeparator]="separator"
                    (ngModelChange)="dateChanged($event)"
                    (thyOnCalendarChange)="calendarChange($event)"></thy-date-range>
            }
        }
    `,
    standalone: false
})
class ThyTestDateRangeComponent {
    useSuite: 1 | 2 | 3;

    selectedDate: DateRangeItemInfo;

    dateRanges: DateRangeItemInfo[] = [
        {
            key: '3month',
            text: '近三个月',
            begin: getUnixTime(startOfMonth(setMonth(CURRENT_DATE, getMonth(CURRENT_DATE) - 2))),
            end: getUnixTime(endOfMonth(CURRENT_DATE)),
            timestamp: {
                interval: 3,
                unit: 'month'
            }
        }
    ];

    customDateRanges: DateRangeItemInfo[] = [
        {
            key: 'lastThreeMonths',
            text: '最近三个月',
            begin: getUnixTime(startOfMonth(setMonth(new Date(), getMonth(new Date()) - 2))),
            end: getUnixTime(endOfMonth(new Date())),
            timestamp: {
                interval: 3,
                unit: 'month'
            }
        },
        {
            key: 'season',
            text: '本季度',
            begin: getUnixTime(startOfQuarter(new Date())),
            end: getUnixTime(endOfQuarter(new Date())),
            timestamp: {
                interval: 3,
                unit: 'month'
            }
        }
    ];

    customDayDateRanges: DateRangeItemInfo[] = [
        {
            key: 'day',
            text: '今日',
            begin: getUnixTime(startOfDay(new Date())),
            end: getUnixTime(endOfDay(new Date())),
            timestamp: {
                interval: 1,
                unit: 'day'
            }
        }
    ];

    customYearDateRanges: DateRangeItemInfo[] = [
        {
            key: 'year',
            text: '今年',
            begin: getUnixTime(startOfYear(new Date())),
            end: getUnixTime(endOfYear(new Date())),
            timestamp: {
                interval: 1,
                unit: 'year'
            }
        }
    ];

    customWithoutTimestampDateRanges: DateRangeItemInfo[] = [
        {
            key: 'year',
            text: '2008/08/08-2008/08/24',
            begin: getUnixTime(startOfDay(new Date('2008-08-08'))),
            end: getUnixTime(endOfDay(new Date('2008-08-24')))
        }
    ];

    hiddenMenu = false;

    hiddenSwitchRangeIcon = false;

    customValue = '';

    separator = '~';

    thyDisabledDate: (d: Date) => boolean;

    dateChanged(date: DateRangeItemInfo) {}

    calendarChange(date: Date[]) {}
}
