import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ThyButton, ThyButtonGroup } from 'ngx-tethys/button';
import { ThyDatePicker, ThyMonthPicker, ThyQuarterPicker, ThyRangePicker, ThyYearPicker } from 'ngx-tethys/date-picker';

@Component({
    selector: 'thy-date-picker-size-example',
    templateUrl: './size.component.html',
    imports: [ThyButtonGroup, ThyButton, NgClass, ThyDatePicker, ThyMonthPicker, ThyQuarterPicker, ThyYearPicker, ThyRangePicker]
})
export class ThyDatePickerSizeExampleComponent implements OnInit {
    currentSize = 'default';
    btnSizes = ['xs', 'sm', 'md', 'default', 'lg'];

    constructor() {}

    ngOnInit() {}
}
