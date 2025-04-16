import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    forwardRef,
    inject,
    Input,
    OnChanges,
    OnDestroy,
    Output,
    SimpleChanges,
    StaticProvider
} from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { getControlsValue } from '../time-picker-controls.util';
import { TimePickerConfig } from './inner-time-picker.config';

import { TimeChangeSource, TimePickerComponentState, TimePickerControls } from './inner-time-picker.class';

import {
    isHourInputValid,
    isInputLimitValid,
    isInputValid,
    isMinuteInputValid,
    isSecondInputValid,
    isValidDate,
    padNumber,
    parseTime
} from '../time-picker.utils';

import { Subscription } from 'rxjs';

import { ThyTimePickerStore } from './inner-time-picker.store';

export const TIMEPICKER_CONTROL_VALUE_ACCESSOR: StaticProvider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ThyInnerTimePicker),
    multi: true
};

/**
 * @internal
 */
@Component({
    selector: 'thy-inner-time-picker',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [TIMEPICKER_CONTROL_VALUE_ACCESSOR, ThyTimePickerStore],
    templateUrl: './inner-time-picker.component.html',
    imports: []
})
export class ThyInnerTimePicker implements ControlValueAccessor, TimePickerComponentState, TimePickerControls, OnChanges, OnDestroy {
    private _cd = inject(ChangeDetectorRef);
    private _store = inject(ThyTimePickerStore);

    /** hours change step */
    @Input() hourStep: number;
    /** hours change step */
    @Input() minuteStep: number;
    /** seconds change step */
    @Input() secondsStep: number;
    /** if true hours and minutes fields will be readonly */
    @Input() readonlyInput: boolean;
    /** if true hours and minutes fields will be disabled */
    @Input() disabled: boolean;
    /** if true scroll inside hours and minutes inputs will change time */
    @Input() mousewheel: boolean;
    /** if true the values of hours and minutes can be changed using the up/down arrow keys on the keyboard */
    @Input() arrowKeys: boolean;
    /** if true spinner arrows above and below the inputs will be shown */
    @Input() showSpinners: boolean;
    /** if true meridian button will be shown */
    @Input() showMeridian: boolean;
    /** show minutes in timePicker */
    @Input() showMinutes: boolean;
    /** show seconds in timePicker */
    @Input() showSeconds: boolean;
    /** meridian labels based on locale */
    @Input() meridians: string[];
    /** minimum time user can select */
    @Input() min: Date;
    /** maximum time user can select */
    @Input() max: Date;
    /** placeholder for hours field in timePicker */
    @Input() hoursPlaceholder: string;
    /** placeholder for minutes field in timePicker */
    @Input() minutesPlaceholder: string;
    /** placeholder for seconds field in timePicker */
    @Input() secondsPlaceholder: string;
    /** timezone */
    @Input() timeZone: string;

    /** emits true if value is a valid date */
    @Output() isValid = new EventEmitter<boolean>();

    // ui variables
    hours: string;
    minutes: string;
    seconds: string;
    meridian: string;

    get isEditable(): boolean {
        return !(this.readonlyInput || this.disabled);
    }

    // min/max validation for input fields
    invalidHours = false;
    invalidMinutes = false;
    invalidSeconds = false;

    // time picker controls state
    canIncrementHours: boolean;
    canIncrementMinutes: boolean;
    canIncrementSeconds: boolean;

    canDecrementHours: boolean;
    canDecrementMinutes: boolean;
    canDecrementSeconds: boolean;

    canToggleMeridian: boolean;

    // control value accessor methods
    onChange = Function.prototype;
    onTouched = Function.prototype;

    private timerPickerSubscription = new Subscription();

    constructor() {
        const _config = inject(TimePickerConfig);
        const _cd = this._cd;
        const _store = this._store;

        Object.assign(this, _config);

        this.timerPickerSubscription.add(
            _store
                .select(state => state.value)
                .subscribe((value: Date) => {
                    // update UI values if date changed
                    this._renderTime(value);
                    this.onChange(value);
                    this._store.updateControls(getControlsValue(this), this.timeZone);
                })
        );

        this.timerPickerSubscription.add(
            _store
                .select(state => state.controls)
                .subscribe((controlsState: TimePickerControls) => {
                    this.isValid.emit(isInputValid(this.hours, this.minutes, this.seconds, this.isPM()));
                    Object.assign(this, controlsState);
                    _cd.markForCheck();
                })
        );
    }

    resetValidation(): void {
        this.invalidHours = false;
        this.invalidMinutes = false;
        this.invalidSeconds = false;
    }

    isPM(): boolean {
        return this.showMeridian && this.meridian === this.meridians[1];
    }

    prevDef($event: Event) {
        $event.preventDefault();
    }

    wheelSign($event: WheelEventInit): number {
        return Math.sign($event.deltaY) * -1;
    }

    ngOnChanges(changes: SimpleChanges): void {
        this._store.updateControls(getControlsValue(this), this.timeZone);
    }

    changeHours(step: number, source: TimeChangeSource = ''): void {
        this.resetValidation();
        this._store.changeHours({ step, source }, this.timeZone);
    }

    changeMinutes(step: number, source: TimeChangeSource = ''): void {
        this.resetValidation();
        this._store.changeMinutes({ step, source }, this.timeZone);
    }

    changeSeconds(step: number, source: TimeChangeSource = ''): void {
        this.resetValidation();
        this._store.changeSeconds({ step, source }, this.timeZone);
    }

    updateHours(hours: string): void {
        this.resetValidation();
        this.hours = hours;

        const isValid = isHourInputValid(this.hours, this.isPM()) && this.isValidLimit();

        if (!isValid) {
            this.invalidHours = true;
            this.isValid.emit(false);
            this.onChange(null);

            return;
        }

        this._updateTime();
    }

    updateMinutes(minutes: string) {
        this.resetValidation();
        this.minutes = minutes;

        const isValid = isMinuteInputValid(this.minutes) && this.isValidLimit();

        if (!isValid) {
            this.invalidMinutes = true;
            this.isValid.emit(false);
            this.onChange(null);

            return;
        }

        this._updateTime();
    }

    updateSeconds(seconds: string) {
        this.resetValidation();
        this.seconds = seconds;

        const isValid = isSecondInputValid(this.seconds) && this.isValidLimit();

        if (!isValid) {
            this.invalidSeconds = true;
            this.isValid.emit(false);
            this.onChange(null);

            return;
        }

        this._updateTime();
    }

    isValidLimit(): boolean {
        return isInputLimitValid(
            {
                hour: this.hours,
                minute: this.minutes,
                seconds: this.seconds,
                isPM: this.isPM()
            },
            this.max,
            this.min,
            this.timeZone
        );
    }

    _updateTime() {
        const _seconds = this.showSeconds ? this.seconds : void 0;
        const _minutes = this.showMinutes ? this.minutes : void 0;
        if (!isInputValid(this.hours, _minutes, _seconds, this.isPM())) {
            this.isValid.emit(false);
            this.onChange(null);

            return;
        }

        this._store.setTime(
            {
                hour: this.hours,
                minute: this.minutes,
                seconds: this.seconds,
                isPM: this.isPM()
            },
            this.timeZone
        );
    }

    toggleMeridian(): void {
        if (!this.showMeridian || !this.isEditable) {
            return;
        }

        const _hoursPerDayHalf = 12;
        this._store.changeHours({
            step: _hoursPerDayHalf,
            source: ''
        });
    }

    writeValue(obj: string | null | undefined | Date): void {
        if (isValidDate(obj)) {
            this._store.writeValue(parseTime(obj, this.timeZone));
        } else if (obj == null) {
            this._store.writeValue(null);
        }
    }

    registerOnChange(fn: (_: any) => {}): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => {}): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
        this._cd.markForCheck();
    }

    ngOnDestroy(): void {
        this.timerPickerSubscription.unsubscribe();
    }

    private _renderTime(value: string | Date): void {
        if (!isValidDate(value)) {
            this.hours = '';
            this.minutes = '';
            this.seconds = '';
            this.meridian = this.meridians[0];

            return;
        }

        const _value = parseTime(value, this.timeZone);
        const _hoursPerDayHalf = 12;
        let _hours = _value.getHours();

        if (this.showMeridian) {
            this.meridian = this.meridians[_hours >= _hoursPerDayHalf ? 1 : 0];
            _hours = _hours % _hoursPerDayHalf;
            // should be 12 PM, not 00 PM
            if (_hours === 0) {
                _hours = _hoursPerDayHalf;
            }
        }

        this.hours = padNumber(_hours);
        this.minutes = padNumber(_value.getMinutes());
        this.seconds = padNumber(_value.getUTCSeconds());
    }
}
