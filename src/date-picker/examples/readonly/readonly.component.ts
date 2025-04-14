import { Component, OnInit } from '@angular/core';
import { ThyQuarterPicker, ThyRangePicker, ThyMonthPicker, ThyDatePicker } from 'ngx-tethys/date-picker';
import { FormsModule } from '@angular/forms';
import { TinyDate } from 'ngx-tethys/util';

@Component({
    selector: 'thy-date-picker-readonly-example',
    templateUrl: './readonly.component.html',
    imports: [ThyDatePicker, FormsModule, ThyMonthPicker, ThyRangePicker, ThyQuarterPicker]
})
export class ThyDatePickerReadonlyExampleComponent implements OnInit {
    date = new TinyDate()?.nativeDate;
    dateRange = {
        begin: 1434567890,
        end: 1534567890
    };

    constructor() {}

    ngOnInit() {}
}
