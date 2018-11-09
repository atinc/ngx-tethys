import {
    Component, OnInit, HostBinding, OnDestroy,
    Input, forwardRef, AfterContentInit, Output, EventEmitter
} from '@angular/core';
import { ThyDatepickerNextStore, datepickerNextActions } from './datepicker-next.store';
import {
    ThyDatepickerNextEventsEnum, ThyDatepickerNextInfo,
    DatepickerNextValueType,
    DatepickerNextTimeModeType,
    ValueInRxPipeInterface,
    ValueOutRxPipeInterface,
    DatepickerNextViewFeatureConfig,
    DatepickerNextDisableRules,
} from './datepicker-next.interface';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { exploreValueTypePipe, combiningDataAccordingToDatepickerType, combiningDataAccordingToOriginalDataType } from './util';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
    selector: 'thy-datepicker-next',
    templateUrl: 'datepicker-container.component.html',
    providers: [
        ThyDatepickerNextStore,
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ThyDatepickerNextContainerComponent),
            multi: true
        }
    ],
})

export class ThyDatepickerNextContainerComponent implements OnInit, OnDestroy, AfterContentInit, ControlValueAccessor {

    loadingDone = false;

    @HostBinding('class.thy-datepicker-next-container') styleClass = true;

    @Input() set thyNgModel(value: DatepickerNextValueType) {
        this._initViewComponent(value);
        if (this._isAfterContentInit) {
        }
    }

    @Input() thyShortcut = true;

    @Input() thyWithTime = false;

    @Input() thyOperation = false;

    @Input() thyTimeType = DatepickerNextTimeModeType.simply;

    @Input() set thyDisabledRules(rules: DatepickerNextDisableRules) {
        this.store.dispatch(datepickerNextActions.changeDisableRules, rules);
    }

    @Input() thyModeType: DatepickerNextTimeModeType = DatepickerNextTimeModeType.simply;

    @Output() thyNgModelChange: EventEmitter<DatepickerNextValueType> = new EventEmitter<DatepickerNextValueType>();

    private _isAfterContentInit = false;

    private _onChange = Function.prototype;

    private _onTouched = Function.prototype;

    private _originValueType: DatepickerNextValueType;

    private _originValue: DatepickerNextValueType;

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
        const payload: DatepickerNextViewFeatureConfig = {
            shortcut: this.thyShortcut,
            time: this.thyWithTime,
            timeComponentType: this.thyTimeType,
            operation: this.thyWithTime,
        };
        this.store.dispatch(datepickerNextActions.changeViewFeatureConfig, payload);
    }
    //#endregion


    writeValue(value: any) {
        this._initViewComponent(value);
    }

    registerOnChange(fn: (value: any) => any): void {
        this._onChange = fn;
    }

    registerOnTouched(fn: () => any): void {
        this._onTouched = fn;
    }


    private _initViewComponent(value: DatepickerNextValueType) {
        this._originValue = value;
        if (this._originValue && this._originValue.with_time) {
            this.store.dispatch(datepickerNextActions.changeViewFeatureConfig, {
                time: true,
                operation: true,
            });
        }

        const value$ = of(value);
        const subscribe = value$
            .pipe(
                map(exploreValueTypePipe),
                map(combiningDataAccordingToDatepickerType),
            )
            .subscribe((result: ValueInRxPipeInterface) => {
                const payload: any = {};
                if (result.value.year !== undefined) {
                    payload.calendarDate = {
                        year: result.value.year,
                        month: result.value.month,
                        day: result.value.day,
                    };
                }
                if (result.value.hour !== undefined) {
                    payload.calendarTime = {
                        hour: result.value.hour,
                        minute: result.value.minute,
                    };
                }
                this._originValueType = result.type;
                this.store.dispatch(datepickerNextActions.initState, payload);
            });
        subscribe.unsubscribe();
    }

    public behaviorValueChange(event?: ThyDatepickerNextEventsEnum) {
        let result: ThyDatepickerNextInfo = {};
        switch (event) {
            case ThyDatepickerNextEventsEnum.done:
            case ThyDatepickerNextEventsEnum.calendarDone:
            case ThyDatepickerNextEventsEnum.shortcutDone:
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
                    result = Object.assign({}, result, time);
                }
                break;
            case ThyDatepickerNextEventsEnum.clean:
                result = null;
                break;
        }

        console.log(result);
        const value$ = of<ValueOutRxPipeInterface>({
            value: result
        });
        const subscribe = value$
            .pipe(
                map(n => {
                    n.originType = this._originValueType;
                    return n;
                }),
                map(combiningDataAccordingToOriginalDataType),
            )
            .subscribe((res: ValueOutRxPipeInterface) => {
                this.thyNgModelChange.emit(res);
                if (event === ThyDatepickerNextEventsEnum.done) {
                    this._onChange(res);
                    this._onTouched(res);
                } else {
                    if (this.store.snapshot.viewFeatureConfig.time === false) {
                        this._onChange(res);
                        this._onTouched(res);
                    }
                }
            });
        subscribe.unsubscribe();
    }

    ngOnDestroy() {

    }
}
