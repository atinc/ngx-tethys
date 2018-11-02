import { Component, OnInit } from '@angular/core';
import { DatepickerNextCalendarViewModeEnum } from '../datepicker-next.interface';
import { ThyDatepickerNextCalendarDayComponent } from './calendar-day.component';
import { ThyDatepickerNextCalendarMonthComponent } from './calendar-month.component';
import { ThyDatepickerNextCalendarYearComponent } from './calendar-year.component';
import { ThyDatepickerNextStore } from '../datepicker-next.store';


const CalendarViewModeComponentEnum = {
    [DatepickerNextCalendarViewModeEnum.day]: ThyDatepickerNextCalendarDayComponent,
    [DatepickerNextCalendarViewModeEnum.month]: ThyDatepickerNextCalendarMonthComponent,
    [DatepickerNextCalendarViewModeEnum.year]: ThyDatepickerNextCalendarYearComponent,
};

@Component({
    selector: 'thy-datepicker-next-calendar',
    templateUrl: 'calendar.component.html'
})

export class ThyDatepickerNextCalendarComponent implements OnInit {
    calendarViewModeComponentEnum = CalendarViewModeComponentEnum;

    constructor(
        public store: ThyDatepickerNextStore
    ) { }

    ngOnInit() { }
}
