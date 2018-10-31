import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { ThyDatepickerNextStore, datepickerNextActions } from '../datepicker-next.store';
import { sliceArray } from '../util';
import { DatepickerNextCalendarViewModeEnum } from '../datepicker-next.interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export const CALENDAR_YEAR_CONSTANT = {
    yearInterval: 16,
    currentReciprocalPosition: 6
};

interface DatepickerNextCalendarYearInfo {
    year: number;
    isActive?: boolean;
}

@Component({
    selector: 'thy-datepicker-next-calendar-year',
    templateUrl: 'calendar-year.component.html'
})

export class ThyDatepickerNextCalendarYearComponent implements OnInit, OnDestroy {

    @HostBinding('class') styleClass = 'calendar-container calendar-year-container';

    yearRows: any;

    private ngUnsubscribe$ = new Subject();

    constructor(
        public store: ThyDatepickerNextStore
    ) { }

    ngOnInit() {
        this.store.select(ThyDatepickerNextStore.calendarCurrent)
            .pipe(takeUntil(this.ngUnsubscribe$))
            .subscribe(n => {
                this._combinationYears();
            });
    }

    preClick() {
        this.store.dispatch(datepickerNextActions.changeCalendarCurrent, {
            year: this.store.snapshot.calendarCurrent.year - CALENDAR_YEAR_CONSTANT.yearInterval
        });
    }

    nextClick() {
        this.store.dispatch(datepickerNextActions.changeCalendarCurrent, {
            year: this.store.snapshot.calendarCurrent.year + CALENDAR_YEAR_CONSTANT.yearInterval
        });
    }

    cellClick(item: DatepickerNextCalendarYearInfo) {
        this.store.dispatch(datepickerNextActions.changeCalendarCurrent, {
            year: item.year,
            viewMode: DatepickerNextCalendarViewModeEnum.month,
        });
    }

    _combinationYears() {
        const years = [];
        const lastYear = this.store.snapshot.calendarCurrent.year + CALENDAR_YEAR_CONSTANT.currentReciprocalPosition;
        for (let index = 1; index <= CALENDAR_YEAR_CONSTANT.yearInterval; index++) {
            const year: DatepickerNextCalendarYearInfo = { year: lastYear - index };
            if (this.store.snapshot.calendarSelected && year.year === this.store.snapshot.calendarSelected.year) {
                year.isActive = true;
            }
            years.push(year);
        }
        years.reverse();
        this.yearRows = sliceArray(years, 4);
    }

    trackByFn(index: number) {
        return index;
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe$.next();
        this.ngUnsubscribe$.complete();
    }
}
