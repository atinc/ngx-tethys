import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyButton, ThyButtonGroup } from 'ngx-tethys/button';
import { ThyDatePicker, ThyRangePicker } from 'ngx-tethys/date-picker';
import { TinyDate } from 'ngx-tethys/util';

@Component({
    selector: 'thy-date-picker-format-example',
    templateUrl: './format.component.html',
    imports: [ThyButtonGroup, ThyButton, NgClass, ThyDatePicker, FormsModule, ThyRangePicker]
})
export class ThyDatePickerFormatExampleComponent {
    monthFormat = 'yyyy/MM';
    date = new TinyDate().getTime();

    formatTypes = ['yyyy/MM/dd', 'yyyy-MM-dd'];

    monthFormatTypes = ['yyyy/MM', 'yyyy-MM'];

    currentFormat = 'yyyy/MM/dd';
}
