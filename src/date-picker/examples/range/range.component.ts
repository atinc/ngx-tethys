import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyDateRangeEntry, ThyRangePicker } from 'ngx-tethys/date-picker';
import { ThyFormGroup } from 'ngx-tethys/form';
import { endOfDay, startOfDay, subWeeks, TinyDate } from 'ngx-tethys/util';

@Component({
    selector: 'thy-date-picker-range-example',
    templateUrl: './range.component.html',
    imports: [ThyFormGroup, ThyRangePicker, FormsModule]
})
export class ThyDatePickerRangeExampleComponent {
    dateRange = { begin: new TinyDate('2023-10')?.nativeDate, end: new TinyDate('2023-12')?.nativeDate };

    weekRange = { begin: new TinyDate('2021-10-03')?.nativeDate, end: new TinyDate('2021-12-12')?.nativeDate };

    yearRange = { begin: new TinyDate('2021')?.nativeDate, end: new TinyDate('2028')?.nativeDate };

    quarterRange = { begin: new TinyDate('2023-6')?.nativeDate, end: new TinyDate('2023-12')?.nativeDate };

    flexibleDateRange: ThyDateRangeEntry;

    isAllowClear = true;

    shortcutMonthPresets = () => {
        return [
            {
                title: '最近6周',
                value: [subWeeks(startOfDay(new TinyDate().getTime()), 5).getTime(), endOfDay(new TinyDate().getTime()).getTime()]
            },
            {
                title: '最近12周',
                value: [subWeeks(startOfDay(new TinyDate().getTime()), 11).getTime(), endOfDay(new TinyDate().getTime()).getTime()]
            }
        ];
    };

    onChange(result: Date | ThyDateRangeEntry): void {
        console.log('onChange: ', result);
    }
}
