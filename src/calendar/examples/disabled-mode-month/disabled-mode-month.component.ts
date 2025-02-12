import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-calendar-disabled-mode-month-example',
    templateUrl: './disabled-mode-month.component.html',
    standalone: false
})
export class ThyCalendarDisabledMonthExampleComponent implements OnInit {
    date = new Date();

    constructor() {}

    ngOnInit() {}

    disabledDate = (date: Date) => {
        return date <= this.date;
    };
}
