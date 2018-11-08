import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { getFullTimeText } from '../util';
import { ThyDatepickerNextTimeInfo } from '../datepicker-next.interface';
import { datepickerNextActions, ThyDatepickerNextStore } from '../datepicker-next.store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

interface ThyDatepickerNextTime extends ThyDatepickerNextTimeInfo {
    text: string;
    isActive?: boolean;
}

@Component({
    selector: 'thy-datepicker-next-time-simply',
    templateUrl: 'time-simply.component.html'
})

export class ThyDatepickerNextTimeSimplyComponent implements OnInit, OnDestroy {

    @HostBinding('class') stylesClass = 'time-simply-container';

    times: ThyDatepickerNextTime[] = [];

    private ngUnsubscribe$ = new Subject();

    constructor(
        private store: ThyDatepickerNextStore,
    ) { }

    ngOnInit() {
        this.store.select(ThyDatepickerNextStore.timeSelected)
            .pipe(takeUntil(this.ngUnsubscribe$))
            .subscribe(n => {
                this._combinationTimes();
            });
    }

    private _combinationTimes() {
        this.times.length = 0;
        for (let index = 0; index < 24; index++) {
            let time: ThyDatepickerNextTime = {
                text: `${getFullTimeText(index)}:00`,
                hour: index,
                minute: 0,
            };
            if (this.store.snapshot.timeSelected
                && this.store.snapshot.timeSelected.hour === time.hour
                && this.store.snapshot.timeSelected.minute === time.minute) {
                time.isActive = true;
            }
            this.times.push(time);

            time = { ...time };
            time.isActive = false;
            time.text = `${getFullTimeText(index)}:30`;
            time.minute = 30;
            if (this.store.snapshot.timeSelected
                && this.store.snapshot.timeSelected.hour === time.hour
                && this.store.snapshot.timeSelected.minute === time.minute) {
                time.isActive = true;
            }
            this.times.push(time);
        }
    }

    onSelectTime(time: ThyDatepickerNextTime) {
        this.times.forEach(n => n.isActive = false);
        time.isActive = true;

        this.store.dispatch(datepickerNextActions.changeTimeSelected, {
            hour: time.hour,
            minute: time.minute,
        });
    }

    trackByFn(index: number) {
        return index;
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe$.next();
        this.ngUnsubscribe$.complete();
    }
}
