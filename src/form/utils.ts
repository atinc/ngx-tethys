import { SafeAny } from 'ngx-tethys/types';
import { AsyncValidatorFn, FormControl, FormControlOptions, FormControlState, ValidatorFn } from '@angular/forms';
import { helpers } from 'ngx-tethys/util';

export function createFormControl<T = SafeAny>(
    name: string,
    value: FormControlState<T> | T,
    validatorOrOpts?: ValidatorFn | ValidatorFn[] | FormControlOptions | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
): FormControl<T> {
    const formControl = new FormControl(value, validatorOrOpts, asyncValidator);
    helpers.set(formControl, 'name', name);
    return formControl;
}
