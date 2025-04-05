import { NgClass } from '@angular/common';
import { ThyRangePicker } from 'ngx-tethys/date-picker';
import { ThyMonthPicker } from 'ngx-tethys/date-picker';
import { Component, OnInit } from '@angular/core';
import { ThyButton } from 'ngx-tethys/button';
import { ThyQuarterPicker } from 'ngx-tethys/date-picker';
import { ThyButtonGroup } from 'ngx-tethys/button';
import { ThyDatePicker } from 'ngx-tethys/date-picker';

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
