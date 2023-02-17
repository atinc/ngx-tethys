import { differenceInDays, endOfDay, startOfDay, subWeeks } from 'date-fns';
import { DateEntry, ThyDateRangeEntry } from 'ngx-tethys/date-picker';

import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-date-picker-directive-example',
    templateUrl: './directive.component.html'
})
export class ThyDatePickerDirectiveExampleComponent implements OnInit {
    date = { date: new Date(), with_time: 0 } as DateEntry;

    time = {
        date: 1234567890,
        with_time: 1
    } as DateEntry;

    dateTime = {
        date: 1253498754,
        with_time: 1
    } as DateEntry;

    dateRange: { begin: number; end: number };

    dateRangeDisabled: { begin: number; end: number };

    weekRange = { begin: new Date('2021-10-03'), end: new Date('2021-12-12') };

    selectedDateRange: Date[] = [];

    shortcutMonthRanges = [
        {
            title: '最近6周',
            begin: subWeeks(startOfDay(new Date()), 5).getTime(),
            end: endOfDay(new Date()).getTime()
        },
        {
            title: '最近12周',
            begin: subWeeks(startOfDay(new Date()), 11).getTime(),
            end: endOfDay(new Date()).getTime()
        }
    ];

    flexibleDateRange: ThyDateRangeEntry;

    constructor() {}

    ngOnInit() {}

    disableDate = (date: Date) => {
        if (!(this.selectedDateRange && this.selectedDateRange.length === 1)) {
            return false;
        }
        const tooLate = this.selectedDateRange.length > 0 && differenceInDays(date, this.selectedDateRange[0]) > 7;
        const tooEarly = this.selectedDateRange.length > 0 && differenceInDays(this.selectedDateRange[0], date) > 7;
        return tooEarly || tooLate;
    };

    calendarChange(date: Date[]) {
        this.selectedDateRange = date;
    }

    panelOpenChange(open: boolean) {
        if (!open) {
            this.selectedDateRange = [];
        }
    }
}
