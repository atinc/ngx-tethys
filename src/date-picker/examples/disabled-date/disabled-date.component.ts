import { differenceInDays } from 'date-fns';

import { Component, OnInit } from '@angular/core';

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
