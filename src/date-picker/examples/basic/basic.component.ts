import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-date-picker-basic-example',
    templateUrl: './basic.component.html'
})
export class ThyDatePickerBasicExampleComponent implements OnInit {
    date = { date: new Date(), with_time: 0 };
    dateTime = 1234567890;
    dateRange = { begin: new Date(), end: new Date() };

    constructor() {}

    ngOnInit() {}

    onChange(result: Date): void {
        console.log('onChange: ', result);
    }
}
