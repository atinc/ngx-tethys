import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-calendar-disabled-mode-year-example',
    templateUrl: './disabled-mode-year.component.html',
    standalone: false
})
export class ThyCalendarDisabledYearExampleComponent implements OnInit {
    date = new Date();

    constructor() {}

    ngOnInit() {}

    disabledDate = (date: Date) => {
        return date <= this.date;
    };
}
