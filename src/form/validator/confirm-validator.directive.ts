import { Directive, input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn } from '@angular/forms';

export function confirmValidator(value: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const isEqual = value === control.value;
        return !isEqual ? { confirm: { value: value, actual: control.value } } : null;
    };
}

/**
 * confirm validator，用于确认两次输入是否一致
 * @name confirm
 * @order 25
 */
@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[confirm]',
    providers: [{ provide: NG_VALIDATORS, useExisting: ThyConfirmValidatorDirective, multi: true }]
})
export class ThyConfirmValidatorDirective implements Validator {
    /**
     * 表单控件的校验值
     */
    readonly confirm = input<string>(undefined);

    validate(control: AbstractControl) {
        return confirmValidator(this.confirm())(control);
    }
}
