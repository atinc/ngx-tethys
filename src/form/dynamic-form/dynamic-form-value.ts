import { ThyDynamicFormValue, ThyFormFieldSchema } from './types';

export function validateDynamicFormFields(fields: readonly ThyFormFieldSchema[]): readonly ThyFormFieldSchema[] {
    const keys = new Set<string>();

    for (const field of fields) {
        if (keys.has(field.key)) {
            throw new Error(`Duplicate dynamic form field key: "${field.key}"`);
        }
        keys.add(field.key);
    }

    return fields;
}

export function buildDynamicFormValue(fields: readonly ThyFormFieldSchema[], value?: ThyDynamicFormValue): ThyDynamicFormValue {
    const result: ThyDynamicFormValue = {};

    for (const field of fields) {
        result[field.key] = value?.[field.key] !== undefined ? value[field.key] : fieldDefaultValue(field);
    }

    return result;
}

function fieldDefaultValue(field: ThyFormFieldSchema): unknown {
    if (field.defaultValue !== undefined) {
        return field.defaultValue;
    }
    switch (field.kind) {
        case 'select':
            return field.props?.multiple === true ? [] : null;
        case 'checkbox':
        case 'switch':
            return false;
        case 'input':
        case 'textarea':
        case 'number':
            return '';
        default:
            return null;
    }
}

export function isSameDynamicFormValue(previous: ThyDynamicFormValue, current: ThyDynamicFormValue): boolean {
    const previousKeys = Object.keys(previous);
    const currentKeys = Object.keys(current);
    return (
        previousKeys.length === currentKeys.length &&
        previousKeys.every(key => Object.hasOwn(current, key) && Object.is(previous[key], current[key]))
    );
}
