import { DateEntry, ThyDateRangeEntry } from 'ngx-tethys/date-picker';
import { Component, forwardRef, OnInit } from '@angular/core';

@Component({
    selector: 'thy-date-picker-basic-example',
    templateUrl: './basic.component.html'
})
export class ThyDatePickerBasicExampleComponent implements OnInit {
    dateShowTime = {
        date: 0,
        with_time: 1
    } as DateEntry;

    date = { date: new Date(), with_time: 0 };

    dateTime = 1234567890;

    week = { date: new Date(), with_time: 0 };

    dateRange = { begin: new Date('2021-10'), end: new Date('2021-12') };

    weekRange = { begin: new Date('2021-10-03'), end: new Date('2021-12-12') };

    yearRange = { begin: new Date('2021'), end: new Date('2028') };

    flexibleDateRange: ThyDateRangeEntry;

    isAllowClear = true;

    constructor() {}

    ngOnInit() {}

    onChange(result: Date): void {
        console.log('onChange: ', result);
        console.log(this.dateTime);
    }

    allowClearChange() {
        this.isAllowClear = !this.isAllowClear;
    }
}
