import { Directive, Input, forwardRef } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS, Validators, ValidatorFn } from '@angular/forms';

/**
 * @name max
 * @order 30
 */
@Directive({
    selector: '[max][formControlName],[max][formControl],[max][ngModel]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => ThyMaxDirective),
            multi: true
        }
    ]
})
export class ThyMaxDirective implements Validator {
    private _validator: ValidatorFn;
    @Input() public set max(value: string) {
        this._validator = Validators.max(parseFloat(value));
    }

    public validate(control: AbstractControl): { [key: string]: any } {
        return this._validator(control);
    }
}
