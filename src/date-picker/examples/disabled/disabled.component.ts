import { Component, OnInit } from '@angular/core';
import { ThyRangePicker, ThyDatePicker, ThyMonthPicker, ThyQuarterPicker } from 'ngx-tethys/date-picker';

@Component({
    selector: 'thy-date-picker-disabled-example',
    templateUrl: './disabled.component.html',
    imports: [ThyDatePicker, ThyMonthPicker, ThyQuarterPicker, ThyRangePicker]
})
export class ThyDatePickerDisabledExampleComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
