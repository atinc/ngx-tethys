import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-calendar-basic-example',
    templateUrl: './basic.component.html',
    standalone: false
})
export class ThyCalendarBasicExampleComponent implements OnInit {
    date: Date;

    constructor() {}

    ngOnInit() {}

    onValueChange(e: Date) {
        this.date = e;
    }
}
