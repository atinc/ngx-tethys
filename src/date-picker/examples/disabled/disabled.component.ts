import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ThyDatePicker, ThyMonthPicker, ThyQuarterPicker, ThyRangePicker, ThyYearPicker } from 'ngx-tethys/date-picker';

@Component({
    selector: 'thy-date-picker-disabled-example',
    templateUrl: './disabled.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyDatePicker, ThyMonthPicker, ThyQuarterPicker, ThyRangePicker, ThyYearPicker]
})
export class ThyDatePickerDisabledExampleComponent {}
