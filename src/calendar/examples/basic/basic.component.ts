import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThyCalendar } from 'ngx-tethys/calendar';

@Component({
    selector: 'thy-calendar-basic-example',
    templateUrl: './basic.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyCalendar]
})
export class ThyCalendarBasicExampleComponent implements OnInit {
    date!: Date;

    constructor() {}

    ngOnInit() {}

    onValueChange(e: Date) {
        this.date = e;
    }
}
