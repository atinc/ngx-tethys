import { Directive, Input, forwardRef } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS, Validators, ValidatorFn } from '@angular/forms';

/**
 * @name min
 * @order 35
 */
@Directive({
    selector: '[min][formControlName],[min][formControl],[min][ngModel]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => ThyMinDirective),
            multi: true
        }
    ]
})
export class ThyMinDirective implements Validator {
    private _validator: ValidatorFn;
    @Input() public set min(value: string) {
        this._validator = Validators.min(parseFloat(value));
    }

    public validate(control: AbstractControl): { [key: string]: any } {
        return this._validator(control);
    }
}
