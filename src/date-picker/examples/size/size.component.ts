import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ThyButton, ThyButtonGroup } from 'ngx-tethys/button';
import { ThyQuarterPicker, ThyDatePicker, ThyRangePicker, ThyMonthPicker, ThyDatePickerSize } from 'ngx-tethys/date-picker';

@Component({
    selector: 'thy-date-picker-size-example',
    templateUrl: './size.component.html',
    imports: [ThyButtonGroup, ThyButton, NgClass, ThyDatePicker, ThyMonthPicker, ThyQuarterPicker, ThyRangePicker]
})
export class ThyDatePickerSizeExampleComponent implements OnInit {
    currentSize: ThyDatePickerSize = '';

    btnSizes = ['xs', 'sm', 'md', 'lg', ''];

    constructor() {}

    ngOnInit() {}
}
