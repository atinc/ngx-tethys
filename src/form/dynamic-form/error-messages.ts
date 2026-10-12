import { ValidationError } from '@angular/forms/signals';
import { isUndefinedOrNull } from 'ngx-tethys/util';

import { ERROR_VALUE_REPLACE_REGEX } from '../form-validator-loader';
import { ThyFormFieldConfig } from './types';

const loaderErrorCodes: Readonly<Record<string, string>> = {
    minLength: 'minlength',
    maxLength: 'maxlength'
};

export function resolveFieldErrorMessage(
    field: ThyFormFieldConfig,
    error: ValidationError | undefined,
    getErrorMessage: (name: string, code: string) => string | undefined
): string | null {
    if (!error) {
        return null;
    }
    const code = error.kind;
    const loaderErrorCode = loaderErrorCodes[code] ?? code;
    const messageTemplate = field.errorMessages?.[code] ?? getErrorMessage(field.key, loaderErrorCode);

    if (messageTemplate) {
        return formatValidationMessage(error, messageTemplate, loaderErrorCode);
    }

    return error.message ?? null;
}

function formatValidationMessage(error: ValidationError, message: string, loaderErrorCode: string): string {
    const errorData = error as ValidationError & Record<string, unknown>;
    return message.replace(ERROR_VALUE_REPLACE_REGEX, (tag, key) => {
        const errorValue = errorData[key] ?? (key === loaderErrorCode ? errorData[error.kind] : undefined);
        if (!key || isUndefinedOrNull(errorValue)) {
            return tag;
        }
        return String(errorValue);
    });
}
