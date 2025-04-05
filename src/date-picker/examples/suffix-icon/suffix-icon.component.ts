import { Component, OnInit } from '@angular/core';
import { TinyDate } from 'ngx-tethys/util';
import { FormsModule } from '@angular/forms';
import { ThyDatePicker, ThyRangePicker } from 'ngx-tethys/date-picker';

@Component({
    selector: 'thy-date-picker-suffix-icon-example',
    templateUrl: './suffix-icon.component.html',
    imports: [ThyDatePicker, FormsModule, ThyRangePicker]
})
export class ThyDatePickerSuffixIconExampleComponent implements OnInit {
    date = { date: new TinyDate().getTime(), with_time: 0 };
    dateTime = 1234567890;
    dateRange = { begin: new TinyDate().getTime(), end: new TinyDate().getTime() };

    constructor() {}

    ngOnInit() {}

    onChange(result: Date): void {
        console.log('onChange: ', result);
    }
}
