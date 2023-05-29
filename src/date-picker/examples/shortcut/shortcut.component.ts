import { ThyDateRangeEntry, ThyShortcutPreset, ThyShortcutValueChange } from 'ngx-tethys/date-picker';

import { Component, OnInit } from '@angular/core';
import { addWeeks, startOfDay, startOfWeek } from 'date-fns';

@Component({
    selector: 'thy-range-picker-shortcut-example',
    templateUrl: './shortcut.component.html'
})
export class ThyDatePickerShortcutExampleComponent implements OnInit {
    dateRange = { begin: new Date('2021-10'), end: new Date('2021-12') };
    date = { date: new Date(), with_time: 0 };
    minDate = new Date('2023-05-28');
    maxDate = new Date('2023-06-04');
    customShortcut: ThyShortcutPreset[];
    shortcutDatePresets: ThyShortcutPreset[];
    constructor() {}

    ngOnInit() {
        this.customShortcut = [
            {
                title: '22年1号到5号',
                value: [new Date('2022-1-1'), new Date('2022-1-5')]
            }
        ];
        this.shortcutDatePresets = [
            {
                title: '今天',
                value: startOfDay(new Date()).getTime()
            },
            {
                title: '下周',
                value: startOfWeek(addWeeks(new Date(), 1), { weekStartsOn: 1 }).getTime()
            }
        ];
    }

    onChange(result: ThyDateRangeEntry): void {
        console.log('onChange: ', result);
    }

    shortcutValueChange(event: ThyShortcutValueChange) {
        console.log(event);
    }
}
