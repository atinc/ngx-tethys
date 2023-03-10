import { ThyDateRangeEntry, ThyShortcutPreset, ThyShortcutValueChange } from 'ngx-tethys/date-picker';

import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-range-picker-shortcut-example',
    templateUrl: './shortcut.component.html'
})
export class ThyDatePickerShortcutExampleComponent implements OnInit {
    dateRange = { begin: new Date('2021-10'), end: new Date('2021-12') };

    customShortcut: ThyShortcutPreset[];

    constructor() {}

    ngOnInit() {
        this.customShortcut = [
            {
                title: '22年1号到5号',
                value: [new Date('2022-1-1'), new Date('2022-1-5')]
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
