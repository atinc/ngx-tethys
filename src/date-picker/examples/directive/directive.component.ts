import { differenceInDays } from 'date-fns';
import { DateEntry, RangeEntry } from 'ngx-tethys/date-picker';

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

    selectedDateRange: Date[] = [];

    flexibleDateRange: RangeEntry;

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
