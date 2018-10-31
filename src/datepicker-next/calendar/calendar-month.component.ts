import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { ThyDatepickerNextStore, datepickerNextActions } from '../datepicker-next.store';
import { sliceArray } from '../util';
import { DatepickerNextCalendarViewModeEnum } from '../datepicker-next.interface';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

interface DatepickerNextCalendarMonthInfo {
    month: number;
    isActive?: boolean;
}

const monthEnum = {
    0: '一月',
    1: '二月',
    2: '三月',
    3: '四月',
    4: '五月',
    5: '六月',
    6: '七月',
    7: '八月',
    8: '九月',
    9: '十月',
    10: '十一月',
    11: '十二月',
};

@Component({
    selector: 'thy-datepicker-next-calendar-month',
    templateUrl: 'calendar-month.component.html'
})

export class ThyDatepickerNextCalendarMonthComponent implements OnInit, OnDestroy {

    @HostBinding('class') styleClass = 'calendar-container calendar-month-container';

    calendarRows: any;

    monthEnum = monthEnum;

    private ngUnsubscribe$ = new Subject();

    constructor(
        public store: ThyDatepickerNextStore
    ) { }

    ngOnInit() {
        this._combinationMonths();
        this.store.select(ThyDatepickerNextStore.calendarCurrent)
            .pipe(takeUntil(this.ngUnsubscribe$))
            .subscribe(n => {
                this._combinationMonths();
            });
    }

    preYearClick() {
        this.store.dispatch(datepickerNextActions.changeCalendarCurrent, { year: this.store.snapshot.calendarCurrent.year - 1 });
    }

    nextYearClick() {
        this.store.dispatch(datepickerNextActions.changeCalendarCurrent, { year: this.store.snapshot.calendarCurrent.year + 1 });
    }

    cellClick(item: DatepickerNextCalendarMonthInfo) {
        this.store.dispatch(datepickerNextActions.changeCalendarCurrent, {
            month: item.month,
            viewMode: DatepickerNextCalendarViewModeEnum.day,
        });
    }

    _combinationMonths() {
        const months = [];
        for (let index = 0; index < 12; index++) {
            const month: DatepickerNextCalendarMonthInfo = {
                month: index
            };
            if (this.store.snapshot.calendarSelected
                && this.store.snapshot.calendarCurrent.year === this.store.snapshot.calendarSelected.year
                && index === this.store.snapshot.calendarSelected.month) {
                month.isActive = true;
            }
            months.push(month);
        }
        this.calendarRows = sliceArray(months, 3);
    }

    trackByFn(index: number) {
        return index;
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe$.next();
        this.ngUnsubscribe$.complete();
    }
}
