import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyDateRangeEntry, ThyRangePicker } from 'ngx-tethys/date-picker';

@Component({
    selector: 'thy-date-picker-advance-range-example',
    templateUrl: './advance-range.component.html',
    imports: [FormsModule, ThyRangePicker]
})
export class ThyDatePickerAdvanceRangeExampleComponent implements OnInit {
    flexibleDateRange: ThyDateRangeEntry;

    isAllowClear = true;

    constructor() {}

    ngOnInit() {}

    onChange(result: Date): void {
        console.log('onChange: ', result);
    }
}
