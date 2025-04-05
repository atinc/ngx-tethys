import { NgClass } from '@angular/common';
import { ThyMonthPicker, ThyRangePicker } from 'ngx-tethys/date-picker';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyButton } from 'ngx-tethys/button';
import { ThyButtonGroup } from 'ngx-tethys/button';
import { ThyDatePicker } from 'ngx-tethys/date-picker';
import { TinyDate } from 'ngx-tethys/util';

@Component({
    selector: 'thy-date-picker-format-example',
    templateUrl: './format.component.html',
    imports: [ThyButtonGroup, ThyButton, NgClass, ThyDatePicker, FormsModule, ThyRangePicker, ThyMonthPicker]
})
export class ThyDatePickerFormatExampleComponent implements OnInit {
    monthFormat = 'yyyy/MM';
    date = new TinyDate().getTime();

    formatTypes = ['yyyy/MM/dd', 'yyyy-MM-dd'];

    monthFormatTypes = ['yyyy/MM', 'yyyy-MM'];

    currentFormat = 'yyyy/MM/dd';

    constructor() {}

    ngOnInit() {}
}
