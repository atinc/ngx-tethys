import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-calendar-basic-year-example',
    templateUrl: './basic-year.component.html'
})
export class ThyCalendarBasicYearExampleComponent implements OnInit {
    date = new Date();

    constructor() {}

    ngOnInit() {}

    onValueChange(e: Date) {}
}
