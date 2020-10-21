import { Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { TinyDate } from '../util/tiny-date';

@Component({
    selector: 'thy-calendar-header',
    templateUrl: './calendar-header.component.html'
})
export class ThyCalendarHeaderComponent implements OnInit {
    @Input() mode: 'month' | 'year' = 'month';

    @Input() fullscreen = true;

    @Input() currentDate = new TinyDate();

    @ContentChild('calendarHeaderOperation', { static: false }) operationTemplateRef: TemplateRef<any>;

    @Output() readonly modeChange: EventEmitter<'month' | 'year'> = new EventEmitter();

    @Output() readonly yearChange: EventEmitter<number> = new EventEmitter();

    @Output() readonly monthChange: EventEmitter<number> = new EventEmitter();

    constructor() {}

    ngOnInit(): void {}
}
