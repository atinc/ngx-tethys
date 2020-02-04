import { Directive, Input, StaticProvider, forwardRef } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, ValidationErrors, Validator } from '@angular/forms';
import { DateEntry, RangeEntry } from './standard-types';

const DATE_PICKER_REQUIRED_VALIDATOR: StaticProvider = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => DatePickerRequiredValidator),
    multi: true
};

@Directive({
    selector:
        'thy-date-picker[required][formControlName],thy-date-picker[required][formControl],thy-date-picker[required][ngModel]',
    providers: [DATE_PICKER_REQUIRED_VALIDATOR]
})
export class DatePickerRequiredValidator implements Validator {
    private _required!: boolean;

    @Input()
    get required(): boolean | string {
        return this._required;
    }

    set required(value: boolean | string) {
        this._required = value != null && value !== false && `${value}` !== 'false';
    }

    validate(control: AbstractControl): ValidationErrors | null {
        return this.required ? this.validateRequired(control) : null;
    }

    private validateRequired(control: AbstractControl): ValidationErrors | null {
        return isEmptyInputDateValue(control.value) ? { required: true } : null;
    }
}

const RANGE_PICKER_REQUIRED_VALIDATOR: StaticProvider = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => RangePickerRequiredValidator),
    multi: true
};

@Directive({
    selector:
        'thy-range-picker[required][formControlName],thy-range-picker[required][formControl],thy-range-picker[required][ngModel]',
    providers: [RANGE_PICKER_REQUIRED_VALIDATOR]
})
export class RangePickerRequiredValidator implements Validator {
    private _required!: boolean;

    @Input()
    get required(): boolean | string {
        return this._required;
    }

    set required(value: boolean | string) {
        this._required = value != null && value !== false && `${value}` !== 'false';
    }

    validate(control: AbstractControl): ValidationErrors | null {
        return this.required ? this.validateRequired(control) : null;
    }

    private validateRequired(control: AbstractControl): ValidationErrors | null {
        return isEmptyInputRangeValue(control.value) ? { required: true } : null;
    }
}

function isEmptyInputRangeValue(value: RangeEntry): boolean {
    return value == null || value.begin == null || value.end == null;
}

function isEmptyInputDateValue(value: DateEntry): boolean {
    return value == null || value.date == null;
}
