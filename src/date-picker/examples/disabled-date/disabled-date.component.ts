import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-date-picker-disabled-date-example',
    templateUrl: './disabled-date.component.html'
})
export class ThyDatePickerDisabledDateExampleComponent implements OnInit {
    today = new Date();

    defaultPickerValue = [new Date('2020-01-12'), new Date('2020-02-20')];

    minDate = new Date('2020-01-11');

    maxDate = new Date('2020-02-22');

    constructor() {}

    ngOnInit() {}
}
