import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayContainer } from '@angular/cdk/overlay';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { dispatchFakeEvent, dispatchMouseEvent } from 'ngx-tethys/testing';
import { DateRangeItemInfo } from './date-range.class';
import { addDays, addYears, endOfDay, endOfYear, startOfDay, startOfWeek, startOfYear } from '../util';
import { ThyDateRangeModule } from './module';
import {
    getUnixTime,
    startOfQuarter,
    endOfQuarter,
    setMonth,
    getMonth,
    startOfMonth,
    endOfMonth,
    addMonths,
    endOfWeek,
    format
} from 'date-fns';

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
            providers: [],
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
            const lastActionMenuItem = getPickerContainer()
                .querySelector('thy-popover-container')
                .querySelector('.thy-date-range-action-menu-container').lastChild;
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
            const actionMenuContainers = getPickerContainer().querySelector('.thy-date-range-action-menu-container');
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
    });

    describe('action api test', () => {
        beforeEach(() => (fixtureInstance.useSuite = 2));
        it('should show customDateRanges second text when choose second option', fakeAsync(() => {
            const value = fixtureInstance.customDateRanges[1].text;
            fixture.detectChanges();
            dispatchClickEvent(getPickerTriggerElement());
            const secondOptional = getPickerContainer()
                .querySelector('thy-popover-container')
                .querySelector('.thy-date-range-action-menu-container')
                .querySelectorAll('.action-menu-item')[1];
            dispatchClickEvent(secondOptional as HTMLElement);
            expect(getPickerTriggerElement().innerText).toEqual(value);
        }));

        it('should change month date text when when click arrow', fakeAsync(() => {
            const originDate = fixtureInstance.customDateRanges[0];
            fixture.detectChanges();
            const modelChangedSpy = spyOn(debugElement.componentInstance, 'dateChanged');
            const arrows = debugElement.queryAll(By.css('thy-icon-nav'));

            // previous icon
            const interval = originDate.timestamp.interval;
            dispatchFakeEvent(arrows[0].nativeElement, 'click', true);
            expect(modelChangedSpy).toHaveBeenCalledTimes(1);
            const beginDate = originDate.begin * 1000;
            const endDate = originDate.end * 1000;
            const previousModelData = {
                begin: getUnixTime(addMonths(beginDate, -1 * interval)),
                end: getUnixTime(endOfMonth(addMonths(endDate, -1 * interval))),
                key: 'custom'
            };
            expect(modelChangedSpy).toHaveBeenCalledWith(Object.assign({}, originDate, previousModelData));
            // next icon
            dispatchFakeEvent(arrows[1].nativeElement, 'click', true);
            expect(modelChangedSpy).toHaveBeenCalledTimes(2);
            const nextModelData = {
                begin: getUnixTime(addMonths(previousModelData.begin * 1000, 1 * interval)),
                end: getUnixTime(endOfMonth(addMonths(previousModelData.end * 1000, 1 * interval))),
                key: 'custom'
            };
            expect(modelChangedSpy).toHaveBeenCalledWith(Object.assign({}, originDate, nextModelData));
        }));

        it('should change day date text when when click arrow', fakeAsync(() => {
            fixtureInstance.customDateRanges = fixtureInstance.customDayDateRanges;

            const originDate = fixtureInstance.customDateRanges[0];
            fixture.detectChanges();
            const modelChangedSpy = spyOn(debugElement.componentInstance, 'dateChanged');
            const arrows = debugElement.queryAll(By.css('thy-icon-nav'));
            // previous icon
            const interval = originDate.timestamp.interval;
            dispatchFakeEvent(arrows[0].nativeElement, 'click', true);
            expect(modelChangedSpy).toHaveBeenCalledTimes(1);
            const beginDate = originDate.begin * 1000;
            const endDate = originDate.end * 1000;
            const previousModelData = {
                begin: getUnixTime(addDays(beginDate, -1 * interval)),
                end: getUnixTime(addDays(endDate, -1 * interval)),
                key: 'custom'
            };
            expect(modelChangedSpy).toHaveBeenCalledWith(Object.assign({}, originDate, previousModelData));
            // next icon
            dispatchFakeEvent(arrows[1].nativeElement, 'click', true);
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
            const arrows = debugElement.queryAll(By.css('thy-icon-nav'));
            // previous icon
            const interval = originDate.timestamp.interval;
            dispatchFakeEvent(arrows[0].nativeElement, 'click', true);
            expect(modelChangedSpy).toHaveBeenCalledTimes(1);
            const beginDate = originDate.begin * 1000;
            const endDate = originDate.end * 1000;
            const previousModelData = {
                begin: getUnixTime(addYears(beginDate, -1 * interval)),
                end: getUnixTime(addYears(endDate, -1 * interval)),
                key: 'custom'
            };
            expect(modelChangedSpy).toHaveBeenCalledWith(Object.assign({}, originDate, previousModelData));
            // next icon
            dispatchFakeEvent(arrows[1].nativeElement, 'click', true);
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
            const arrows = debugElement.queryAll(By.css('thy-icon-nav'));
            // previous icon
            const interval: number = originDate.end - originDate.begin + 24 * 60 * 60;
            dispatchFakeEvent(arrows[0].nativeElement, 'click', true);
            expect(modelChangedSpy).toHaveBeenCalledTimes(1);
            const beginDate = originDate.begin;
            const endDate = originDate.end;
            const previousModelData = {
                begin: beginDate - interval,
                end: endDate - interval,
                key: 'custom'
            };
            expect(modelChangedSpy).toHaveBeenCalledWith(Object.assign({}, originDate, previousModelData));
            // next icon
            dispatchFakeEvent(arrows[1].nativeElement, 'click', true);
            expect(modelChangedSpy).toHaveBeenCalledTimes(2);
            const nextModelData = {
                begin: previousModelData.begin + interval,
                end: previousModelData.end + interval,
                key: 'custom'
            };
            expect(modelChangedSpy).toHaveBeenCalledWith(Object.assign({}, originDate, nextModelData));
        }));
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
});

@Component({
    template: `
        <ng-container [ngSwitch]="useSuite">
            <!-- Suite 1 for test general Api -->
            <thy-date-range
                *ngSwitchCase="1"
                name="generalProperties"
                [thyHiddenMenu]="hiddenMenu"
                [thyDisabledSwitch]="hiddenSwitchRangeIcon"
                [thyCustomTextValue]="customValue"
                [thyOptionalDateRanges]="dateRanges"
                [(ngModel)]="selectedDate"
            ></thy-date-range>

            <!-- Suite 2 -->
            <thy-date-range
                *ngSwitchCase="2"
                name="setCustomDateRanges"
                [thyOptionalDateRanges]="customDateRanges"
                [ngModel]="selectedDate"
                (ngModelChange)="dateChanged($event)"
            ></thy-date-range>
        </ng-container>
    `
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

    dateChanged(date: DateRangeItemInfo) {}
}
