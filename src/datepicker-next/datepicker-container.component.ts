import { Component, OnInit, HostBinding, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { ThyDatepickerNextStore, datepickerNextActions } from './datepicker-next.store';
import { DatepickerNextCalendarViewModeEnum } from './datepicker-next.interface';

import { ThyDatepickerNextCalendarDayComponent } from './calendar/calendar-day.component';
import { ThyDatepickerNextCalendarMonthComponent } from './calendar/calendar-month.component';
import { ThyDatepickerNextCalendarYearComponent } from './calendar/calendar-year.component';

import { ThyDatepickerNextShortcutComponent } from './shortcut/shortcut.component';

import { ThyDatepickerNextTimeComponent } from './time/time.component';

import { ThyDatepickerNextOperationComponent } from './operation/operation.component';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';


const CalendarViewModeComponentEnum = {
    [DatepickerNextCalendarViewModeEnum.day]: ThyDatepickerNextCalendarDayComponent,
    [DatepickerNextCalendarViewModeEnum.month]: ThyDatepickerNextCalendarMonthComponent,
    [DatepickerNextCalendarViewModeEnum.year]: ThyDatepickerNextCalendarYearComponent,
};

@Component({
    selector: 'thy-datepicker-next',
    templateUrl: 'datepicker-container.component.html'
})

export class ThyDatepickerNextContainerComponent implements OnInit, OnDestroy {

    @HostBinding('class.thy-datepicker-next-container') styleClass = true;

    @Input() thyOnlyCalendar = false;

    @Input() thyHiddenShortcut = false;

    @Input() thyHiddenTime = false;

    @Output() thyValueChange: EventEmitter<any> = new EventEmitter<any>();

    loadingDone = false;

    calendarViewModeComponentEnum = CalendarViewModeComponentEnum;

    shortcutComponent = ThyDatepickerNextShortcutComponent;

    timeComponent = ThyDatepickerNextTimeComponent;

    operationComponent = ThyDatepickerNextOperationComponent;

    private ngUnsubscribe$ = new Subject();

    constructor(
        public store: ThyDatepickerNextStore
    ) { }

    ngOnInit() {
        this._initViewComponent();
        this.loadingDone = true;
    }

    private _initViewComponent() {
        this.store.dispatch(datepickerNextActions.initCalendarView);
    }

    public behaviorValueChange() {
        const result = this.store.snapshot.calendarSelected;
        this.thyValueChange.emit(result);
    }

    ngOnDestroy() {

    }
}
