import { Component, OnInit, HostBinding, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { ThyDatepickerNextStore, datepickerNextActions } from './datepicker-next.store';
import { ThyDatepickerNextEventsEnum, ThyDatepickerNextInfo } from './datepicker-next.interface';
import {
    ComponentType,
    Overlay,
    OverlayRef,
    OverlayConfig,
    ScrollStrategy,
} from '@angular/cdk/overlay';

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

    constructor(
        public store: ThyDatepickerNextStore,
    ) { }

    ngOnInit() {
        this._initViewComponent();
        this.loadingDone = true;
    }

    private _initViewComponent() {
        this.store.dispatch(datepickerNextActions.initCalendarView);
    }

    public behaviorValueChange(event?: ThyDatepickerNextEventsEnum) {
        let result: ThyDatepickerNextInfo = {};
        switch (event) {
            case ThyDatepickerNextEventsEnum.done:
                result = {
                    year: this.store.snapshot.calendarSelected.year,
                    month: this.store.snapshot.calendarSelected.month,
                    day: this.store.snapshot.calendarSelected.day,
                };
                if (this.store.snapshot.timeSelected) {
                    const time = {
                        hour: this.store.snapshot.timeSelected.hour,
                        minute: this.store.snapshot.timeSelected.minute,
                    };
                    Object.assign(result, time);
                }
                break;
            case ThyDatepickerNextEventsEnum.calendarDone:
                result = {
                    year: this.store.snapshot.calendarSelected.year,
                    month: this.store.snapshot.calendarSelected.month,
                    day: this.store.snapshot.calendarSelected.day,
                };
                break;
            case ThyDatepickerNextEventsEnum.clean:
                result = null;
                break;
        }
        this.thyValueChange.emit(result);
    }

    ngOnDestroy() {

    }
}
