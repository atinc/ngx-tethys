import { Component, OnInit } from '@angular/core';
import { DateEntry, ThyDateRangeEntry } from 'ngx-tethys/date-picker';
import { differenceInDays, endOfDay, startOfDay, subWeeks, TinyDate } from 'ngx-tethys/util';

@Component({
    selector: 'thy-date-picker-directive-example',
    templateUrl: './directive.component.html'
})
export class ThyDatePickerDirectiveExampleComponent implements OnInit {
    date = { date: new TinyDate()?.nativeDate, with_time: 0 } as DateEntry;

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

    weekRange = { begin: new TinyDate('2021-10-03')?.nativeDate, end: new TinyDate('2021-12-12')?.nativeDate };

    selectedDateRange: Date[] = [];

    shortcutMonthPresets = () => {
        return [
            {
                title: '最近6周',
                value: [subWeeks(startOfDay(new TinyDate()?.nativeDate), 5).getTime(), endOfDay(new TinyDate()?.nativeDate).getTime()]
            },
            {
                title: '最近12周',
                value: [subWeeks(startOfDay(new TinyDate()?.nativeDate), 11).getTime(), endOfDay(new TinyDate()?.nativeDate).getTime()]
            }
        ];
    };

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

    onChange(date: Date[]) {
        console.log('onChange', date);
    }

    panelOpenChange(open: boolean) {
        if (!open) {
            this.selectedDateRange = [];
        }
    }
}
