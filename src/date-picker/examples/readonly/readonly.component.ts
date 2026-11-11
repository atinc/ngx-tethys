import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyDatePicker, ThyMonthPicker, ThyQuarterPicker, ThyRangePicker, ThyYearPicker } from 'ngx-tethys/date-picker';
import { TinyDate } from 'ngx-tethys/util';

@Component({
    selector: 'thy-date-picker-readonly-example',
    templateUrl: './readonly.component.html',
    imports: [ThyDatePicker, FormsModule, ThyMonthPicker, ThyRangePicker, ThyQuarterPicker, ThyYearPicker]
})
export class ThyDatePickerReadonlyExampleComponent {
    date = new TinyDate()?.nativeDate;

    dateRange = {
        begin: 1434567890,
        end: 1534567890
    };
}
