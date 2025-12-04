import { Component, OnInit } from '@angular/core';
import { ThyDatePicker, ThyMonthPicker, ThyQuarterPicker, ThyRangePicker, ThyYearPicker } from 'ngx-tethys/date-picker';

@Component({
    selector: 'thy-date-picker-disabled-example',
    templateUrl: './disabled.component.html',
    imports: [ThyDatePicker, ThyMonthPicker, ThyQuarterPicker, ThyRangePicker, ThyYearPicker]
})
export class ThyDatePickerDisabledExampleComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
