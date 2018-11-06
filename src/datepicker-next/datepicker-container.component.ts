import {
    Component, OnInit, HostBinding, OnDestroy,
    Input, forwardRef, AfterContentInit
} from '@angular/core';
import { ThyDatepickerNextStore, datepickerNextActions } from './datepicker-next.store';
import {
    ThyDatepickerNextEventsEnum, ThyDatepickerNextInfo,
    DatepickerNextValueInfo, DatepickerNextValueType,
    CombineToTypeDPValueInterface
} from './datepicker-next.interface';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { exploreValueTypePipe, combineToTypeDPValue } from './util';

@Component({
    selector: 'thy-datepicker-next',
    templateUrl: 'datepicker-container.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => ThyDatepickerNextContainerComponent),
        multi: true
    }]
})

export class ThyDatepickerNextContainerComponent implements OnInit, OnDestroy, AfterContentInit, ControlValueAccessor {

    @HostBinding('class.thy-datepicker-next-container') styleClass = true;

    @Input() thyOnlyCalendar = false;

    @Input() thyHiddenShortcut = false;

    @Input() thyHiddenTime = false;

    @Input() thyModeType = false;

    loadingDone = false;

    private _onChange = Function.prototype;
    private _onTouched = Function.prototype;
    private _isAfterContentInit = false;
    constructor(
        public store: ThyDatepickerNextStore,
    ) { }

    ngOnInit() {

        this.loadingDone = true;
    }

    ngAfterContentInit() {
        this._isAfterContentInit = true;
    }

    // #region  ng-model
    writeValue(value: DatepickerNextValueInfo | Date | number) {
        if (this._isAfterContentInit) {
            this._initViewComponent(value);
        }
    }

    registerOnChange(fn: (value: any) => any): void {
        this._onChange = fn;
    }

    registerOnTouched(fn: () => any): void {
        this._onTouched = fn;
    }

    // #endregion


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
        this._onChange(result);
    }

    ngOnDestroy() {

    }
}
