import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-date-picker-directive-example',
    templateUrl: './directive.component.html'
})
export class ThyDatePickerDirectiveExampleComponent implements OnInit {
    date = new Date();

    time = {
        date: 1234567890,
        with_time: 1
    };

    dateTime = {
        date: 1253498754,
        with_time: 0
    };
    dateRange = [];

    constructor() {}

    ngOnInit() {}

    onChange(result: Date): void {
        console.log('onChange: ', result);
    }
}
