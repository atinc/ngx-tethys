import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-date-picker-readonly-example',
    templateUrl: './readonly.component.html',
    standalone: false
})
export class ThyDatePickerReadonlyExampleComponent implements OnInit {
    date = new Date();
    dateRange = {
        begin: 1434567890,
        end: 1534567890
    };

    constructor() {}

    ngOnInit() {}
}
