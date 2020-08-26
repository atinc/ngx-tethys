import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-date-picker-format-example',
    templateUrl: './format.component.html'
})
export class ThyDatePickerFormatExampleComponent implements OnInit {
    dateFormat = 'yyyy/MM/dd';
    monthFormat = 'yyyy/MM';
    date = null;

    constructor() {}

    ngOnInit() {}
}
