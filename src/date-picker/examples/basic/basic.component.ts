import { DateEntry, RangeAdvancedValue, ThyDateRangeEntry } from 'ngx-tethys/date-picker';
import { Component, forwardRef, OnInit } from '@angular/core';
import { TinyDate } from 'ngx-tethys/util';

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

    dateRange = { begin: new Date('2021-10'), end: new Date('2021-12') };

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
