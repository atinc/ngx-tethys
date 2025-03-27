import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-calendar-basic-year-example',
    templateUrl: './basic-year.component.html',
    standalone: false
})
export class ThyCalendarBasicYearExampleComponent implements OnInit {
    date: Date;

    constructor() {}

    ngOnInit() {}

    onValueChange(e: Date) {
        this.date = e;
    }
}
