import { Component, OnInit } from '@angular/core';
import { TinyDate } from 'ngx-tethys/util';

@Component({
    selector: 'thy-date-picker-readonly-example',
    templateUrl: './readonly.component.html'
})
export class ThyDatePickerReadonlyExampleComponent implements OnInit {
    date = new TinyDate()?.nativeDate;
    dateRange = {
        begin: 1434567890,
        end: 1534567890
    };

    constructor() {}

    ngOnInit() {}
}
