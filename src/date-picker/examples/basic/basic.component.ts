import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyDatePicker, ThyMonthPicker, ThyQuarterPicker, ThyYearPicker } from 'ngx-tethys/date-picker';
import { ThyFormGroup } from 'ngx-tethys/form';
import { TinyDate } from 'ngx-tethys/util';

@Component({
    selector: 'thy-date-picker-basic-example',
    templateUrl: './basic.component.html',
    imports: [ThyFormGroup, ThyDatePicker, FormsModule, ThyMonthPicker, ThyYearPicker, ThyQuarterPicker]
})
export class ThyDatePickerBasicExampleComponent {
    date = new Date();

    dateTime = new Date();

    week = { date: new TinyDate().getTime(), with_time: 0 };

    isAllowClear = true;

    onChange(result: Date): void {
        console.log('onChange: ', result);
    }
}
