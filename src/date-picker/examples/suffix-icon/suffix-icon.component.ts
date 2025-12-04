import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyDatePicker, ThyRangePicker } from 'ngx-tethys/date-picker';
import { TinyDate } from 'ngx-tethys/util';

@Component({
    selector: 'thy-date-picker-suffix-icon-example',
    templateUrl: './suffix-icon.component.html',
    imports: [ThyDatePicker, FormsModule, ThyRangePicker]
})
export class ThyDatePickerSuffixIconExampleComponent {
    date = { date: new TinyDate().getTime(), with_time: 0 };

    dateRange = { begin: new TinyDate().getTime(), end: new TinyDate().getTime() };

    onChange(result: Date): void {
        console.log('onChange: ', result);
    }
}
