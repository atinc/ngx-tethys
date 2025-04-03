import { Component, OnInit } from '@angular/core';
import { TinyDate } from 'ngx-tethys/util';

@Component({
    selector: 'thy-date-picker-suffix-icon-example',
    templateUrl: './suffix-icon.component.html'
})
export class ThyDatePickerSuffixIconExampleComponent implements OnInit {
    date = { date: new TinyDate().getTime(), with_time: 0 };
    dateTime = 1234567890;
    dateRange = { begin: new TinyDate().getTime(), end: new TinyDate().getTime() };

    constructor() {}

    ngOnInit() {}

    onChange(result: Date): void {
        console.log('onChange: ', result);
    }
}
