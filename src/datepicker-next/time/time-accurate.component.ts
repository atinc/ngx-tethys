import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { getFullTimeText } from '../util';
import { ThyDatepickerNextTimeInfo } from '../datepicker-next.interface';
import { ThyDatepickerNextStore, datepickerNextActions } from '../datepicker-next.store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

interface ThyDatepickerNextTime extends ThyDatepickerNextTimeInfo {
    text: string;
    isActive?: boolean;
}

@Component({
    selector: 'thy-datepicker-next-time-accurate',
    templateUrl: 'time-accurate.component.html'
})

export class ThyDatepickerNextTimeAccurateComponent implements OnInit, OnDestroy {

    @HostBinding('class') stylesClass = 'time-accurate-container';

    hours: ThyDatepickerNextTime[] = [];

    minutes: ThyDatepickerNextTime[] = [];

    time: ThyDatepickerNextTimeInfo = {
        hour: null,
        minute: null,
    };

    private ngUnsubscribe$ = new Subject();

    constructor(
        private store: ThyDatepickerNextStore,
    ) { }

    ngOnInit() {
        this.store.select(ThyDatepickerNextStore.timeSelected)
            .pipe(takeUntil(this.ngUnsubscribe$))
            .subscribe(n => {
                if (this.store.snapshot.timeSelected) {
                    this.time = {
                        hour: this.store.snapshot.timeSelected.hour,
                        minute: this.store.snapshot.timeSelected.minute,
                    };
                }
                this._combinationHours();
                this._combinationMinutes();
            });
    }

    private _combinationHours() {
        this.hours.length = 0;
        for (let index = 0; index < 24; index++) {
            this.hours.push({
                text: getFullTimeText(index),
                hour: index,
                isActive: this.store.snapshot.timeSelected && this.store.snapshot.timeSelected.hour === index,
            });
        }
    }

    private _combinationMinutes() {
        this.minutes.length = 0;
        for (let index = 0; index < 60; index++) {
            this.minutes.push({
                text: getFullTimeText(index),
                minute: index,
                isActive: this.store.snapshot.timeSelected && this.store.snapshot.timeSelected.minute === index,
            });
        }
    }

    onSelectHour(hour: ThyDatepickerNextTime) {
        this.hours.forEach(n => n.isActive = false);
        hour.isActive = true;
        this.time.hour = hour.hour;
        this._behaviorTimeDone();
    }

    onSelectMinute(minute: ThyDatepickerNextTime) {
        this.minutes.forEach(n => n.isActive = false);
        minute.isActive = true;
        this.time.minute = minute.minute;
        this._behaviorTimeDone();
    }

    private _behaviorTimeDone() {
        if (this.time.hour !== null && this.time.minute !== null) {
            this.store.dispatch(datepickerNextActions.changeTimeSelected, {
                hour: this.time.hour,
                minute: this.time.minute,
            });
        }
    }

    trackByFn(index: number) {
        return index;
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe$.next();
        this.ngUnsubscribe$.complete();
    }
}
