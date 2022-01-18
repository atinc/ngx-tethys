import { DateEntry, ShortcutRange } from 'ngx-tethys/date-picker';

import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-date-picker-basic-example',
    templateUrl: './basic.component.html'
})
export class ThyDatePickerBasicExampleComponent implements OnInit {
    dateShowTime = {
        date: 0,
        with_time: 1
    } as DateEntry;

    date = { date: new Date(), with_time: 0 };
    dateTime = 1234567890;

    dateRange = { begin: new Date('2021-10'), end: new Date('2021-12') };

    isAllowClear = true;

    thyCustomShortcut: ShortcutRange[];

    constructor() {}

    ngOnInit() {
        this.thyCustomShortcut = [
            {
                title: '昨天到前天',
                begin: new Date('2022-1-3'),
                end: new Date('2022-1-5')
            }
        ];
    }

    onChange(result: Date): void {
        console.log('onChange: ', result);
        console.log(this.dateTime);
    }

    thyShortcutClick(event: any) {
        console.log(event);
    }

    allowClearChange() {
        this.isAllowClear = !this.isAllowClear;
    }
}
