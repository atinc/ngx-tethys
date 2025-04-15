import {
    ThyDateChangeEvent,
    ThyDatePicker,
    ThyDatePickerDirective,
    ThyDatePickerFormatPipe,
    ThyDateRangeEntry,
    ThyRangePicker,
    ThyRangePickerDirective,
    ThyShortcutPreset
} from 'ngx-tethys/date-picker';
import { Component, OnInit } from '@angular/core';
import { addWeeks, startOfDay, startOfWeek, TinyDate } from 'ngx-tethys/util';
import { FormsModule } from '@angular/forms';
import { ThyPropertyOperation } from 'ngx-tethys/property-operation';

@Component({
    selector: 'thy-range-picker-shortcut-example',
    templateUrl: './shortcut.component.html',
    imports: [
        ThyRangePicker,
        FormsModule,
        ThyDatePicker,
        ThyPropertyOperation,
        ThyRangePickerDirective,
        ThyDatePickerDirective,
        ThyDatePickerFormatPipe
    ]
})
export class ThyDatePickerShortcutExampleComponent implements OnInit {
    dateRange = { begin: new TinyDate('2023-05-30')?.nativeDate, end: new TinyDate('2023-06-02')?.nativeDate };
    date = { date: new TinyDate().getTime(), with_time: 0 };
    minDate = new TinyDate('2023-05-30')?.nativeDate;
    maxDate = new TinyDate('2023-06-03')?.nativeDate;
    customShortcut: ThyShortcutPreset[];
    shortcutDatePresets: ThyShortcutPreset[];
    constructor() {}

    ngOnInit() {
        this.customShortcut = [
            {
                title: '22年1号到5号',
                value: [new TinyDate('2022-1-1')?.nativeDate, new TinyDate('2022-1-5')?.nativeDate]
            }
        ];
        this.shortcutDatePresets = [
            {
                title: '今天',
                value: startOfDay(new TinyDate().getTime()).getTime()
            },
            {
                title: '下周',
                value: startOfWeek(addWeeks(new TinyDate().getTime(), 1), { weekStartsOn: 1 }).getTime()
            }
        ];
    }

    onChange(result: ThyDateRangeEntry): void {
        console.log('onChange: ', result);
    }

    dateValueChange(event: ThyDateChangeEvent) {
        console.log(event);
    }
}
