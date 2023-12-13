import { addDays, differenceInDays, endOfDay, startOfDay } from 'date-fns';

import { Component, OnInit } from '@angular/core';
import { TinyDate } from 'ngx-tethys/util';

@Component({
    selector: 'thy-date-picker-disabled-date-example',
    templateUrl: './disabled-date.component.html'
})
export class ThyDatePickerDisabledDateExampleComponent implements OnInit {
    date: Date;

    start: Date;

    due: Date;

    limitDate = new Date();

    defaultPickerValue = [new Date('2020-01-12'), new Date('2020-02-20')];

    minDate = new Date('2020-01-11');

    maxDate = new Date('2020-02-22');

    selectedDateRange: Date[] = [];

    dynamicDisabled: { begin: number; end: number };

    dateRange: { begin: number; end: number };

    minDateRange = startOfDay(addDays(new TinyDate().endOfWeek({ weekStartsOn: 1 }).getTime(), 3));

    maxDateRange = endOfDay(addDays(new Date(), -7));

    quarterDate = { date: new Date('2023-02-22'), with_time: 0 };

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

    disableDate1 = (date: Date) => {
        return date > this.limitDate;
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
