import { Directive, Input, StaticProvider, forwardRef } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { instanceOfDateEntry, instanceOfRangeEntry } from './picker.util';
import { DateEntry, ThyDateRangeEntry } from './standard-types';

const DATE_PICKER_REQUIRED_VALIDATOR: StaticProvider = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => DatePickerRequiredValidator),
    multi: true
};

/**
 * @private
 */
@Directive({
    selector:
        '[thyDatePicker][required][formControlName],[thyDatePicker][required][formControl],[thyDatePicker][required][ngModel],thy-date-picker[required][formControlName],thy-date-picker[required][formControl],thy-date-picker[required][ngModel]',
    providers: [DATE_PICKER_REQUIRED_VALIDATOR],
    standalone: true
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

/**
 * @private
 */
@Directive({
    selector:
        '[thyRangePicker][required][formControlName],[thyRangePicker][required][formControl],[thyRangePicker][required][ngModel],thy-range-picker[required][formControlName],thy-range-picker[required][formControl],thy-range-picker[required][ngModel]',
    providers: [RANGE_PICKER_REQUIRED_VALIDATOR],
    standalone: true
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

function isEmptyInputRangeValue(value: ThyDateRangeEntry): boolean {
    return value == null || (instanceOfRangeEntry(value) && (value.begin == null || value.end == null));
}

function isEmptyInputDateValue(value: DateEntry): boolean {
    return value == null || (instanceOfDateEntry(value) && value.date == null);
}
