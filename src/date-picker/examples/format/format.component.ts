import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-date-picker-format-example',
    templateUrl: './format.component.html'
})
export class ThyDatePickerFormatExampleComponent implements OnInit {
    monthFormat = 'yyyy/MM';
    date = new Date();

    formatTypes = ['yyyy/MM/dd', 'yyyy-MM-dd'];

    currentFormat = 'yyyy/MM/dd';

    constructor() {}

    ngOnInit() {}
}
