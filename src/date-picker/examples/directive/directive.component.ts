import { Component, OnInit } from '@angular/core';
import { DateEntry } from 'ngx-tethys/date-picker';

@Component({
    selector: 'thy-date-picker-directive-example',
    templateUrl: './directive.component.html'
})
export class ThyDatePickerDirectiveExampleComponent implements OnInit {
    date = { date: new Date(), with_time: 1 } as DateEntry;

    time = {
        date: 1234567890,
        with_time: 1
    } as DateEntry;

    dateTime = {
        date: 1253498754,
        with_time: 0
    } as DateEntry;
    dateRange: Date[] = [];

    constructor() {}

    ngOnInit() {}

    onChange(result: Date): void {
        console.log('onChange: ', result);
    }
}
