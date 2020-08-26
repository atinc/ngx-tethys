import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-date-picker-default-picker-value-example',
    templateUrl: './default-picker-value.component.html'
})
export class ThyDatePickerDefaultPickerValueExampleComponent implements OnInit {
    today = new Date();

    defaultPickerValue = new Date('2022-03-03');

    defaultRangePickerValue = [new Date('2022-03-03'), new Date('2022-04-04')];

    constructor() {}

    ngOnInit() {}
}
