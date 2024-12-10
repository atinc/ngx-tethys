import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-date-picker-suffix-icon-example',
    templateUrl: './suffix-icon.component.html',
    standalone: false
})
export class ThyDatePickerSuffixIconExampleComponent implements OnInit {
    date = { date: new Date(), with_time: 0 };
    dateTime = 1234567890;
    dateRange = { begin: new Date(), end: new Date() };

    constructor() {}

    ngOnInit() {}

    onChange(result: Date): void {
        console.log('onChange: ', result);
    }
}
