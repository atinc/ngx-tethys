import { Component, OnInit } from '@angular/core';
import { TinyDate } from 'ngx-tethys/util';

@Component({
    selector: 'thy-date-picker-separator-example',
    templateUrl: './separator.component.html'
})
export class ThyDatePickerSeparatorExampleComponent implements OnInit {
    date = { date: new TinyDate().getTime(), with_time: 0 };

    dateTime = 1234567890;

    dateRange = { begin: new TinyDate().getTime(), end: new TinyDate().getTime() };

    dateShowTime = {
        date: 0,
        with_time: 1
    };

    separator = '/';

    constructor() {}

    ngOnInit() {}

    onChange(result: Date): void {
        console.log('onChange: ', result);
    }
}
