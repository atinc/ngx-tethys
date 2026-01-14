
import { Component } from '@angular/core';
import { ThyButton, ThyButtonGroup } from 'ngx-tethys/button';
import { ThyDatePicker, ThyMonthPicker, ThyQuarterPicker, ThyRangePicker, ThyYearPicker } from 'ngx-tethys/date-picker';

@Component({
    selector: 'thy-date-picker-size-example',
    templateUrl: './size.component.html',
    imports: [ThyButtonGroup, ThyButton, ThyDatePicker, ThyMonthPicker, ThyQuarterPicker, ThyYearPicker, ThyRangePicker]
})
export class ThyDatePickerSizeExampleComponent {
    currentSize = 'default';
    btnSizes = ['xs', 'sm', 'md', 'default', 'lg'];
}
