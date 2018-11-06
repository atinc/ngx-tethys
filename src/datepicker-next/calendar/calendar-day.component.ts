import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { sliceArray, calendarDateConvert } from '../util';
import { ThyDatepickerNextStore, datepickerNextActions } from '../datepicker-next.store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ThyDatepickerNextContainerComponent } from '../datepicker-container.component';
import { ThyDatepickerNextEventsEnum } from '../datepicker-next.interface';

const weeks = ['日', '一', '二', '三', '四', '五', '六'];

interface DatepickerNextCalendarDayInfo {
    week: number;
    year: number;
    month: number;
    day: number;
    isActive?: boolean;
    isDisabled?: boolean;
    isToday?: boolean;
    isCurrentMonth?: boolean;
    isPreMonth?: boolean;
    isNextMonth?: boolean;
}

@Component({
    selector: 'thy-datepicker-next-date-day',
    templateUrl: 'calendar-day.component.html'
})

export class ThyDatepickerNextCalendarDayComponent implements OnInit, OnDestroy {

    @HostBinding('class') styleClass = 'calendar-container calendar-day-container';

    today = new Date();

    weeks = weeks;

    days: DatepickerNextCalendarDayInfo[] = [];

    calendarHeadNavigation: {
        text: string,
        year: number,
        month: number,
    };

    calendarRows: (DatepickerNextCalendarDayInfo[])[] = [];

    private ngUnsubscribe$ = new Subject();

    constructor(
        public store: ThyDatepickerNextStore,
        public parentComponent: ThyDatepickerNextContainerComponent,
    ) { }

    ngOnInit() {
        this.store.select(ThyDatepickerNextStore.calendarCurrent)
            .pipe(takeUntil(this.ngUnsubscribe$))
            .subscribe(n => {
                this._combinationMonthDays();
            });
    }

    _combinationMonthDays() {
        let allDays: DatepickerNextCalendarDayInfo[] = [];

        const nowDate = new Date(this.store.snapshot.calendarCurrent.year, this.store.snapshot.calendarCurrent.month);

        const nowMonthCountDays = this._getMonthCountDays();
        const nowMonthFirstDateWeek = this._getMonthFirstDayWeek();
        const nowMonthLastDateWeek = this._getMonthLastDayWeek();

        let _preMonthDays: DatepickerNextCalendarDayInfo[] = [];
        const _nowMonthDays: DatepickerNextCalendarDayInfo[] = [];
        const _nextMonthDays: DatepickerNextCalendarDayInfo[] = [];


        // _nowMonthDays
        for (let index = 1; index <= nowMonthCountDays; index++) {
            const item: DatepickerNextCalendarDayInfo = {
                year: this.store.snapshot.calendarCurrent.year,
                month: this.store.snapshot.calendarCurrent.month,
                day: index,
                week: (index - 1 + nowMonthFirstDateWeek) % 7,
                isCurrentMonth: true
            };
            if (index === this.today.getDate() && item.month === this.today.getMonth() && item.year === this.today.getFullYear()) {
                item.isToday = true;
            }
            if (this.store.snapshot.calendarSelected
                && index === this.store.snapshot.calendarSelected.day
                && item.month === this.store.snapshot.calendarSelected.month
                && item.year === this.store.snapshot.calendarSelected.year) {
                item.isActive = true;
            }
            _nowMonthDays.push(item);
        }


        // _preMonthDays
        const preMonthLastDate = this._getPreMonthLastDate();
        const preDateObject = calendarDateConvert(
            this.store.snapshot.calendarCurrent.year,
            this.store.snapshot.calendarCurrent.month - 1,
        );

        for (let index = 0; index < 6; index++) {
            _preMonthDays.push({
                year: preDateObject.year,
                month: preDateObject.month,
                day: preMonthLastDate - index,
                week: nowMonthFirstDateWeek - 1 - index,
                isPreMonth: true,
            });
        }
        _preMonthDays = _preMonthDays.reverse();


        // _nextMonthDays
        const nextDateObject = calendarDateConvert(
            this.store.snapshot.calendarCurrent.year,
            this.store.snapshot.calendarCurrent.month + 1,
        );
        for (let index = 1; index <= 6; index++) {
            _nextMonthDays.push({
                year: nextDateObject.year,
                month: nextDateObject.month,
                day: index,
                week: (nowMonthLastDateWeek + index) % 7,
                isNextMonth: true,
            });
        }


        // combination
        allDays = [..._preMonthDays, ..._nowMonthDays, ..._nextMonthDays];

        allDays = this._setBeginWeek(allDays);

        this.calendarRows = sliceArray(allDays, 7);
    }

    private _getMonthFirstDayWeek(): number {
        const date = new Date(this.store.snapshot.calendarCurrent.year, this.store.snapshot.calendarCurrent.month);
        return date.getDay();
    }

    private _getMonthLastDayWeek(): number {
        const date = new Date(this.store.snapshot.calendarCurrent.year, this.store.snapshot.calendarCurrent.month + 1, 0);
        return date.getDay();
    }

    private _getMonthCountDays(): number {
        const date = new Date(this.store.snapshot.calendarCurrent.year, this.store.snapshot.calendarCurrent.month + 1, 0);
        return date.getDate();
    }

    private _getPreMonthLastDate(): number {
        const date = new Date(this.store.snapshot.calendarCurrent.year, this.store.snapshot.calendarCurrent.month, 0);
        return date.getDate();
    }

    _setBeginWeek(allDays: DatepickerNextCalendarDayInfo[]) {
        if (allDays.length === 28) {
            return allDays;
        }

        let beginIndex: number, endIndex: number;
        for (let index = 0; index < allDays.length; index++) {
            if (beginIndex === undefined && allDays[index].week === 0) {
                beginIndex = index;
            }
            if (allDays[index].week === 0) {
                endIndex = index - 1;
            }
        }
        return allDays.filter((value, index) => {
            return index >= beginIndex && index <= endIndex;
        });
    }

    calendarCellStyleClass(calendarItem: DatepickerNextCalendarDayInfo) {
        return {
            'pre-month': calendarItem.isPreMonth,
            'next-month': calendarItem.isNextMonth,
            'today': calendarItem.isToday,
            'active': calendarItem.isActive,
        };
    }

    trackByFn(i: number) {
        return i;
    }

    preMonthClick() {
        this.store.dispatch(datepickerNextActions.changeCalendarCurrent, { month: this.store.snapshot.calendarCurrent.month - 1 });
    }

    nextMonthClick() {
        this.store.dispatch(datepickerNextActions.changeCalendarCurrent, { month: this.store.snapshot.calendarCurrent.month + 1 });
    }

    cellClick(item: DatepickerNextCalendarDayInfo) {
        this.store.dispatch(datepickerNextActions.changeCalendarSelected, {
            year: item.year,
            month: item.month,
            day: item.day,
        });

        if (item.isPreMonth) {
            this.preMonthClick();
        } else if (item.isNextMonth) {
            this.nextMonthClick();
        } else {
            this.calendarRows.forEach((n: DatepickerNextCalendarDayInfo[]) => {
                n.forEach((nn: DatepickerNextCalendarDayInfo) => {
                    nn.isActive = false;
                });
            });
            item.isActive = true;
        }

        this.parentComponent.behaviorValueChange(ThyDatepickerNextEventsEnum.calendarDone);
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe$.next();
        this.ngUnsubscribe$.complete();
    }

}
