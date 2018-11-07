import {
    Component, OnInit, HostBinding, OnDestroy,
    Input, forwardRef, AfterContentInit, Output, EventEmitter
} from '@angular/core';
import { ThyDatepickerNextStore, datepickerNextActions } from './datepicker-next.store';
import {
    ThyDatepickerNextEventsEnum, ThyDatepickerNextInfo,
    DatepickerNextValueInfo, DatepickerNextValueType,
    CombineToTypeDPValueInterface,
    DatepickerNextModeType
} from './datepicker-next.interface';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { exploreValueTypePipe, combineToTypeDPValue } from './util';

@Component({
    selector: 'thy-datepicker-next',
    templateUrl: 'datepicker-container.component.html',
    providers: [
        ThyDatepickerNextStore
    ],
})

export class ThyDatepickerNextContainerComponent implements OnInit, OnDestroy, AfterContentInit {

    loadingDone = false;

    @HostBinding('class.thy-datepicker-next-container') styleClass = true;

    @Input() set thyNgModel(value: DatepickerNextValueType) {
        this._initViewComponent(value);
        if (this._isAfterContentInit) {
        }
    }

    @Input() thyShortcut = true;

    @Input() thyWithTime = true;

    @Input() thyOperation = true;

    @Input() thyModeType: DatepickerNextModeType = DatepickerNextModeType.simply;

    @Output() thyNgModelChange: EventEmitter<DatepickerNextValueType> = new EventEmitter<DatepickerNextValueType>();

    private _isAfterContentInit = false;

    constructor(
        public store: ThyDatepickerNextStore,
    ) { }

    ngOnInit() {
        this._initViewFeature();
        this.loadingDone = true;
    }

    ngAfterContentInit() {
        this._isAfterContentInit = true;
    }

    //#region init view feature
    private _initViewFeature() {
        const payload = {
            shortcut: this.thyShortcut,
            time: this.thyWithTime,
            operation: this.thyOperation,
        };
        if (!this.thyOperation) {
            payload.time = false;
        }

        this.store.dispatch(datepickerNextActions.changeViewFeatureConfig, payload);
    }
    //#endregion


    private _initViewComponent(value: DatepickerNextValueType) {
        const value$ = of(value);
        const subscribe = value$
            .pipe(
                map(exploreValueTypePipe),
                map(combineToTypeDPValue),
            )
            .subscribe((result: CombineToTypeDPValueInterface) => {
                const payload: any = {
                    calendarDate: {
                        year: result.value.year,
                        month: result.value.month,
                        day: result.value.day,
                    }
                };
                if (result.value.hour !== undefined) {
                    payload.calendarTime = {
                        hour: result.value.hour,
                        minute: result.value.minute,
                    };
                }
                this.store.dispatch(datepickerNextActions.initState, payload);
            });
        subscribe.unsubscribe();
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
        this.thyNgModelChange.emit(result);
    }

    ngOnDestroy() {

    }
}
