import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyDateRangeEntry, ThyRangePicker } from 'ngx-tethys/date-picker';

@Component({
    selector: 'thy-date-picker-advance-range-example',
    templateUrl: './advance-range.component.html',
    imports: [FormsModule, ThyRangePicker]
})
export class ThyDatePickerAdvanceRangeExampleComponent {
    flexibleDateRange: ThyDateRangeEntry;

    isAllowClear = true;

    onChange(result: ThyDateRangeEntry): void {
        console.log('onChange: ', result);
    }
}
