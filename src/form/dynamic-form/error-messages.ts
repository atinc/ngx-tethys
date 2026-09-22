import { AbstractControl } from '@angular/forms';
import { isUndefinedOrNull } from 'ngx-tethys/util';

import { ERROR_VALUE_REPLACE_REGEX } from '../form-validator-loader';
import { ThyDynamicFormFieldConfig } from './types';

export function resolveFieldErrorMessage(
    field: ThyDynamicFormFieldConfig,
    control: AbstractControl,
    getErrorMessage: (name: string, code: string) => string | undefined
): string | null {
    const errors = control.errors;
    if (!errors) {
        return null;
    }
    const code = Object.keys(errors)[0];
    if (!code) {
        return null;
    }
    const fromField = field.errorMessages?.[code];
    const fromLoader = getErrorMessage(field.key, code);
    const message = typeof fromField === 'string' ? fromField : fromLoader;
    if (typeof message === 'string' && message) {
        return formatValidationMessage(control, message);
    }
    const payload = errors[code];
    return typeof payload === 'string' ? payload : null;
}

function formatValidationMessage(control: AbstractControl, message: string): string {
    const errors = control.errors;
    if (!errors) {
        return message;
    }
    return message.replace(ERROR_VALUE_REPLACE_REGEX, (tag, key) => {
        if (!key || !errors[key]) {
            return tag;
        }
        const error = errors[key] as Record<string, unknown>;
        if (isUndefinedOrNull(error[key])) {
            return String(error['requiredLength'] ?? '');
        }
        return String(error[key]);
    });
}
