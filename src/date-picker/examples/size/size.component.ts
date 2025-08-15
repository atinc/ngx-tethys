import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ThyButton, ThyButtonGroup } from 'ngx-tethys/button';
import { ThyDatePicker } from '../../date-picker.component';
import { ThyMonthPicker } from '../../month-picker.component';
import { ThyQuarterPicker } from '../../quarter-picker.component';
import { ThyRangePicker } from '../../range-picker.component';

@Component({
    selector: 'thy-date-picker-size-example',
    templateUrl: './size.component.html',
    imports: [ThyButtonGroup, ThyButton, NgClass, ThyDatePicker, ThyMonthPicker, ThyQuarterPicker, ThyRangePicker]
})
export class ThyDatePickerSizeExampleComponent implements OnInit {
    currentSize = 'default';
    btnSizes = ['xs', 'sm', 'md', 'default', 'lg'];

    constructor() {}

    ngOnInit() {}
}
