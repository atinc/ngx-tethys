import { DateEntry } from 'ngx-tethys/date-picker';

import { Component, OnInit } from '@angular/core';
import { TinyDate } from 'ngx-tethys';

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

    dateRange = { begin: new Date(), end: new Date('2021-11-1') };

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
