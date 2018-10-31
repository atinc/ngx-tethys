import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ThyDatepickerNextStore, DatepickerNextState, datepickerNextActions } from '../datepicker-next.store';
import { forkJoin, Subject } from 'rxjs';
import { DatepickerNextCalendarViewModeEnum } from '../datepicker-next.interface';
import { CALENDAR_YEAR_CONSTANT } from './calendar-year.component';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'thy-datepicker-next-calendar-head',
    templateUrl: 'calendar.head.component.html'
})

export class ThyDatepickerNextCalendarHeadComponent implements OnInit, OnDestroy {

    @Output() preClick: EventEmitter<Event> = new EventEmitter<Event>();

    @Output() nextClick: EventEmitter<Event> = new EventEmitter<Event>();

    navigationText: string;

    private ngUnsubscribe$ = new Subject();

    constructor(
        public store: ThyDatepickerNextStore,
    ) { }

    ngOnInit() {
        this.store.select(ThyDatepickerNextStore.calendarCurrent)
            .pipe(takeUntil(this.ngUnsubscribe$))
            .subscribe(n => {
                this._combinationNavigationText();
            });
    }

    changeViewMode() {
        const mode = this.store.snapshot.calendarViewMode;
        let jumpMode;
        if (mode === DatepickerNextCalendarViewModeEnum.day) {
            jumpMode = DatepickerNextCalendarViewModeEnum.year;
        } else if (mode === DatepickerNextCalendarViewModeEnum.month) {
            jumpMode = DatepickerNextCalendarViewModeEnum.year;
        } else {
            return;
        }

        this.store.dispatch(datepickerNextActions.changeCalendarViewMode, {
            viewMode: jumpMode
        });
    }

    viewPreClick() {
        this.preClick.emit();
    }

    viewNextClick() {
        this.nextClick.emit();
    }

    _combinationNavigationText() {
        const mode = this.store.snapshot.calendarViewMode;
        if (mode === DatepickerNextCalendarViewModeEnum.day) {
            this.navigationText = `${this.store.snapshot.calendarCurrent.year}年${this.store.snapshot.calendarCurrent.month + 1}月`;
        } else if (mode === DatepickerNextCalendarViewModeEnum.month) {
            this.navigationText = `${this.store.snapshot.calendarCurrent.year}年`;
        } else if (mode === DatepickerNextCalendarViewModeEnum.year) {
            let begin: number, end: number;
            begin = this.store.snapshot.calendarCurrent.year
                + CALENDAR_YEAR_CONSTANT.currentReciprocalPosition
                - CALENDAR_YEAR_CONSTANT.yearInterval;
            end = this.store.snapshot.calendarCurrent.year + CALENDAR_YEAR_CONSTANT.currentReciprocalPosition - 1;
            this.navigationText = `${begin}~${end}`;
        }
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe$.next();
        this.ngUnsubscribe$.complete();
    }
}
