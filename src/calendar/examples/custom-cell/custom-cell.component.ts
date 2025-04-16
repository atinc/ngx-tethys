import { Component, OnInit } from '@angular/core';
import { ThyCalendar, ThyDateCellDirective, ThyCalendarHeaderOperationDirective } from 'ngx-tethys/calendar';

@Component({
    selector: 'thy-calendar-advance-example',
    templateUrl: './custom-cell.component.html',
    styleUrls: ['./custom-cell.component.scss'],
    imports: [ThyCalendar, ThyDateCellDirective, ThyCalendarHeaderOperationDirective]
})
export class ThyCalendarCustomCellExampleComponent implements OnInit {
    // date = new Date(2012, 11, 21);

    listDataMap = {
        eight: [
            { type: 'warning', content: 'This is warning event.' },
            { type: 'success', content: 'This is usual event.' }
        ],
        ten: [
            { type: 'warning', content: 'This is warning event.' },
            { type: 'success', content: 'This is usual event.' },
            { type: 'error', content: 'This is error event.' }
        ],
        eleven: [
            { type: 'warning', content: 'This is warning event' },
            { type: 'success', content: 'This is very long usual event........' },
            { type: 'error', content: 'This is error event 1.' },
            { type: 'error', content: 'This is error event 2.' },
            { type: 'error', content: 'This is error event 3.' },
            { type: 'error', content: 'This is error event 4.' }
        ]
    };

    constructor() {}

    ngOnInit() {}
}
