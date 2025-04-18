import { endOfMonth, startOfMonth } from 'date-fns';
import { dispatchFakeEvent } from 'ngx-tethys/testing';
import { getUnixTime, TinyDate } from 'ngx-tethys/util';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ThyCalendarHeader, ThyCalendar, ThyCalendarModule } from 'ngx-tethys/calendar';
import { provideHttpClient } from '@angular/common/http';
import { DateRangeItemInfo } from 'ngx-tethys/date-range';

@Component({
    template: `
        <thy-calendar (thyDateRangeChange)="dateRangeChange($event)" (thySelectChange)="selectedChange($event)" [thyValue]="value">
            <ul *thyDateCell="let date">
                @switch (date.getDate()) {
                    @case (8) {
                        @for (item of listDataMap.eight; track $index) {
                            <li>
                                {{ item.content }}
                            </li>
                        }
                    }
                    @case (10) {
                        @for (item of listDataMap.ten; track $index) {
                            <li>
                                {{ item.content }}
                            </li>
                        }
                    }
                    @case (11) {
                        @for (item of listDataMap.eleven; track $index) {
                            <li>
                                {{ item.content }}
                            </li>
                        }
                    }
                }
            </ul>

            <div *thyCalendarHeaderOperation>
                <span class="app-sign"><span class="app-color-agile mr-2"></span>Agile</span>
                <span class="app-sign"><span class="app-color-plan mr-2"></span>Plan</span>
                <span class="app-sign"><span class="app-color-prod mr-2"></span>Prod</span>
            </div>
        </thy-calendar>

        <thy-calendar [(ngModel)]="value1"> </thy-calendar>

        <thy-calendar> </thy-calendar>
    `,
    imports: [FormsModule, ThyCalendarModule]
})
export class TestCalendarBasicComponent {
    value = new Date(2021, 2, 1);

    value1 = new Date(2020, 1, 3);

    dateRangeChange(event: DateRangeItemInfo) {}

    selectedChange(event: Date) {}

    listDataMap = {
        eight: [
            { type: 'warning', content: 'This is warning event.' },
            { type: 'success', content: 'This is usual event.' }
        ],
        ten: [
            { type: 'warning', content: 'This is warning event.' },
            { type: 'success', content: 'This is usual event.' },
            { type: 'error', content: 'This is error event.' }
        ],
        eleven: [
            { type: 'warning', content: 'This is warning event' },
            { type: 'success', content: 'This is very long usual event........' },
            { type: 'error', content: 'This is error event 1.' },
            { type: 'error', content: 'This is error event 2.' },
            { type: 'error', content: 'This is error event 3.' },
            { type: 'error', content: 'This is error event 4.' }
        ]
    };
}

@Component({
    template: ` <thy-calendar [thyDisabledDate]="thyDisabledDate"> </thy-calendar> `,
    imports: [ThyCalendarModule]
})
export class TestCalendarDisabledDateComponent {
    thyDisabledDate(date: Date) {
        return true;
    }

    listDataMap = {};
}

@Component({
    template: `
        <thy-calendar-header
            [operationRender]="operationRender"
            (monthChange)="onMonthSelect($event)"
            (yearChange)="onYearSelect($event)"
            (dateRangeChange)="onDateRangeSelect($event)"
            [currentDate]="currentDate">
            <ng-template #operationRender>
                <span class="app-sign">Agile</span>
                <span class="app-sign">Plan</span>
                <span class="app-sign">Prod</span>
            </ng-template>
        </thy-calendar-header>
    `,
    imports: [ThyCalendarModule]
})
export class TestCalendarHeaderComponent {
    currentDate = new TinyDate(new Date(2020, 0, 3));

    onMonthSelect(event: number) {}
    onYearSelect(event: number) {}
    onDateRangeSelect(event: DateRangeItemInfo) {}
}

describe('calendar', () => {
    describe('basic', () => {
        let component: TestCalendarBasicComponent;
        let fixture: ComponentFixture<TestCalendarBasicComponent>;
        let debugElement: DebugElement;

        beforeEach(waitForAsync(() => {
            TestBed.configureTestingModule({
                providers: [provideHttpClient()]
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TestCalendarBasicComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            debugElement = fixture.debugElement.query(By.directive(ThyCalendar));
            fixture.detectChanges();
        });

        it('should create calendar component', () => {
            expect(component).toBeTruthy();
            expect(debugElement.nativeElement.classList).toContain('thy-calendar-container');
        });

        it('should get correct class when thyMode is default', () => {
            expect(debugElement.nativeElement.querySelector('.thy-calendar-date-panel')).toBeTruthy();
            expect(debugElement.nativeElement.querySelector('.thy-calendar-full-table')).toBeTruthy();
        });

        it('should onDateSelect was beCalled when thyDisabledDate is default', waitForAsync(() => {
            fixture.detectChanges();

            fixture.whenStable().then(() => {
                const calendarSpy = spyOn(debugElement.componentInstance, 'onDateSelect');
                const tableCells = Array.from(
                    (fixture.debugElement.nativeElement as HTMLElement).querySelectorAll('.thy-calendar-full-cell')
                );
                dispatchFakeEvent(tableCells[0], 'click', true);
                expect(calendarSpy).toHaveBeenCalledTimes(1);
                expect(calendarSpy).toHaveBeenCalledWith(new TinyDate(new Date(2021, 2, 1)));
            });
        }));

        it('should selectedChange was beCalled when click cell', () => {
            const selectedChangeSpy = spyOn(component, 'selectedChange');
            const tableCells = Array.from((fixture.debugElement.nativeElement as HTMLElement).querySelectorAll('.thy-calendar-full-cell'));
            dispatchFakeEvent(tableCells[0], 'click', true);
            expect(selectedChangeSpy).toHaveBeenCalledTimes(1);
            expect(selectedChangeSpy).toHaveBeenCalledWith(new Date(2021, 2, 1));
        });

        it('should dateRangeChange was beCalled when icon-nav was clicked', () => {
            const dateRangeChangeSpy = spyOn(component, 'dateRangeChange');
            const dateRangeSelect = (fixture.debugElement.nativeElement as HTMLElement).querySelectorAll('.thy-calendar-full-header-left');
            const dateRangeIcons = dateRangeSelect[0].querySelectorAll('.thy-action');
            dispatchFakeEvent(dateRangeIcons[0], 'click', true);
            expect(dateRangeChangeSpy).toHaveBeenCalledTimes(1);
        });

        it('should support model binding', fakeAsync(() => {
            fixture.detectChanges();
            const now = new Date();

            const calendarInstance = fixture.debugElement.queryAll(By.directive(ThyCalendar))[1].componentInstance;
            component.value1 = now;
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();

            expect(calendarInstance.currentDate.getDate()).toEqual(new TinyDate(component.value1).getDate());
        }));

        it('should show the default date in the correct format', waitForAsync(() => {
            fixture.whenStable().then(() => {
                const calendar = fixture.debugElement.queryAll(By.directive(ThyCalendar))[2];
                const calendarElement = calendar.nativeElement;
                const selectedDateText = calendarElement.querySelector('.thy-date-range-text').innerText;

                const calendarHeader = calendar.query(By.directive(ThyCalendarHeader));
                const calendarHeaderInstance = calendarHeader.componentInstance;
                const expectedDateText = calendarHeaderInstance._currentDate.format(calendarHeaderInstance.pickerFormat);

                expect(selectedDateText).toEqual(expectedDateText);
            });
        }));
    });

    describe('disabledDate', () => {
        let component: TestCalendarDisabledDateComponent;
        let fixture: ComponentFixture<TestCalendarDisabledDateComponent>;
        let debugElement: DebugElement;

        beforeEach(waitForAsync(() => {
            TestBed.configureTestingModule({
                providers: [provideHttpClient()]
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TestCalendarDisabledDateComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            debugElement = fixture.debugElement.query(By.directive(ThyCalendar));
            fixture.detectChanges();
        });

        it('should onDateSelect was beCalled when thyDisabledDate is false', () => {
            const calendarSpy = spyOn(debugElement.componentInstance, 'onDateSelect');
            const tableCells = Array.from((fixture.debugElement.nativeElement as HTMLElement).querySelectorAll('.thy-calendar-full-cell'));
            dispatchFakeEvent(tableCells[0], 'click', true);
            expect(calendarSpy).toHaveBeenCalledTimes(0);
        });
    });
});

describe('calendar-header', () => {
    describe('basic', () => {
        let component: TestCalendarHeaderComponent;
        let fixture: ComponentFixture<TestCalendarHeaderComponent>;
        let debugElement: DebugElement;

        beforeEach(waitForAsync(() => {
            TestBed.configureTestingModule({
                providers: [provideHttpClient()]
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TestCalendarHeaderComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            debugElement = fixture.debugElement.query(By.directive(ThyCalendarHeader));
            fixture.detectChanges();
        });

        it('should backToday was be called', fakeAsync(() => {
            const rangeChangeSpy = spyOn(debugElement.componentInstance, 'onChangeRange');
            fixture.detectChanges();
            const todaySelect = (fixture.debugElement.nativeElement as HTMLElement).querySelectorAll(
                '.thy-calendar-full-header-left .btn-outline-default'
            );
            tick(500);
            dispatchFakeEvent(todaySelect[0], 'click', true);
            expect(debugElement.componentInstance.date.begin).toBe(getUnixTime(startOfMonth(new Date())));
            expect(debugElement.componentInstance.date.end).toBe(getUnixTime(endOfMonth(new Date())));
            expect(rangeChangeSpy).toHaveBeenCalledTimes(1);
            expect(rangeChangeSpy).toHaveBeenCalledWith({
                key: 'month',
                text: new TinyDate().format(debugElement.componentInstance.pickerFormat),
                begin: getUnixTime(startOfMonth(new Date())),
                end: getUnixTime(endOfMonth(new Date())),
                timestamp: {
                    interval: 1,
                    unit: 'month'
                }
            });
        }));

        it('should onChangeRange was be called', waitForAsync(() => {
            fixture.detectChanges();

            fixture.whenStable().then(() => {
                const isCurrentDateSpy = spyOn(debugElement.componentInstance, 'isCurrentDate');
                const onChangeYearSpy = spyOn(debugElement.componentInstance, 'onChangeYear');
                const onChangeMonthSpy = spyOn(debugElement.componentInstance, 'onChangeMonth');
                const dateRangeChangeSpy = spyOn(component, 'onDateRangeSelect');

                const leftSelect = (fixture.debugElement.nativeElement as HTMLElement).querySelectorAll(
                    '.select-date-range .thy-action'
                )[0];
                dispatchFakeEvent(leftSelect, 'click', true);

                fixture.detectChanges();
                const dateInfo = {
                    key: 'exception',
                    text: '2020年01月',
                    begin: getUnixTime(startOfMonth(new Date(2019, 11, 3))),
                    end: getUnixTime(endOfMonth(new Date(2019, 11, 3))),
                    timestamp: {
                        interval: 1,
                        unit: 'month'
                    }
                };

                expect(isCurrentDateSpy).toHaveBeenCalledTimes(1);
                expect(isCurrentDateSpy).toHaveBeenCalledWith(new TinyDate(new Date(2020, 0, 3)));
                expect(onChangeYearSpy).toHaveBeenCalledTimes(1);
                expect(onChangeMonthSpy).toHaveBeenCalledTimes(1);
                expect(dateRangeChangeSpy).toHaveBeenCalledTimes(1);
                expect(onChangeMonthSpy).toHaveBeenCalledWith(dateInfo);
                expect(onChangeYearSpy).toHaveBeenCalledWith(dateInfo);
                expect(dateRangeChangeSpy).toHaveBeenCalledWith(dateInfo);
            });
        }));

        it('should onChangeMonth was be called', waitForAsync(() => {
            fixture.detectChanges();

            fixture.whenStable().then(() => {
                const onMonthSelectSpy = spyOn(component, 'onMonthSelect');
                const leftSelect = (fixture.debugElement.nativeElement as HTMLElement).querySelectorAll(
                    '.select-date-range .thy-action'
                )[0];
                dispatchFakeEvent(leftSelect, 'click', true);

                fixture.detectChanges();
                expect(onMonthSelectSpy).toHaveBeenCalledWith(11);
                expect(onMonthSelectSpy).toHaveBeenCalledTimes(1);
            });
        }));

        it('should onChangeYear was be called', waitForAsync(() => {
            fixture.detectChanges();

            fixture.whenStable().then(() => {
                const onYearSelectSpy = spyOn(component, 'onYearSelect');
                const leftSelect = (fixture.debugElement.nativeElement as HTMLElement).querySelectorAll(
                    '.select-date-range .thy-action'
                )[0];
                dispatchFakeEvent(leftSelect, 'click', true);

                fixture.detectChanges();
                expect(onYearSelectSpy).toHaveBeenCalledWith(2019);
                expect(onYearSelectSpy).toHaveBeenCalledTimes(1);
            });
        }));

        it('should setDate was be called other month', fakeAsync(() => {
            fixture.detectChanges();
            const newDate = new Date(2020, 2, 3);
            component.currentDate = new TinyDate(newDate);
            fixture.detectChanges();

            tick(500);

            fixture.detectChanges();
            expect(debugElement.componentInstance.date.begin).toBe(getUnixTime(startOfMonth(newDate)));
            expect(debugElement.componentInstance.date.end).toBe(getUnixTime(endOfMonth(newDate)));
            expect(debugElement.componentInstance.isCurrent).toBe(true);
        }));

        it('should setDate was be called current month', fakeAsync(() => {
            fixture.detectChanges();
            const newDate = new Date();
            component.currentDate = new TinyDate(newDate);
            fixture.detectChanges();

            tick(500);

            fixture.detectChanges();
            expect(debugElement.componentInstance.date.begin).toBe(getUnixTime(startOfMonth(newDate)));
            expect(debugElement.componentInstance.date.end).toBe(getUnixTime(endOfMonth(newDate)));
            expect(debugElement.componentInstance.isCurrent).toBe(false);
        }));

        it('should operationRender was be rendered', fakeAsync(() => {
            fixture.detectChanges();
            const operationRenderSelect = (fixture.debugElement.nativeElement as HTMLElement).querySelectorAll(
                '.thy-calendar-full-header-right .app-sign'
            );

            expect(operationRenderSelect.length).toEqual(3);
            expect((operationRenderSelect[0] as HTMLElement).innerText).toBe('Agile');
        }));
    });
});
