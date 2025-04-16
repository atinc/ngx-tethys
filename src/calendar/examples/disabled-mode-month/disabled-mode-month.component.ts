import { Component, OnInit } from '@angular/core';
import { ThyCalendar } from 'ngx-tethys/calendar';
import { TinyDate } from 'ngx-tethys/util';

@Component({
    selector: 'thy-calendar-disabled-mode-month-example',
    templateUrl: './disabled-mode-month.component.html',
    imports: [ThyCalendar]
})
export class ThyCalendarDisabledMonthExampleComponent implements OnInit {
    date = new TinyDate()?.nativeDate;

    constructor() {}

    ngOnInit() {}

    disabledDate = (date: Date) => {
        return date <= this.date;
    };
}
