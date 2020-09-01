import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn } from '@angular/forms';

export function ThyRepeatValidator(value: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const isEqual = value === control.value;
        return !isEqual ? { confirm: { value: control.value } } : null;
    };
}

@Directive({
    selector: '[confirm]',
    providers: [{ provide: NG_VALIDATORS, useExisting: ThyRepeatValidatorDirective, multi: true }]
})
export class ThyRepeatValidatorDirective implements Validator {
    @Input() confirm: string;

    validate(control: AbstractControl) {
        return ThyRepeatValidator(this.confirm)(control);
    }
}
