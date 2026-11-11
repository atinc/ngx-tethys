import { ThyDynamicFormFieldSchema, ThyDynamicFormValue } from './types';

export function validateDynamicFormFields(fields: readonly ThyDynamicFormFieldSchema[]): readonly ThyDynamicFormFieldSchema[] {
    const keys = new Set<string>();

    for (const field of fields) {
        if (keys.has(field.key)) {
            throw new Error(`Duplicate dynamic form field key: "${field.key}"`);
        }
        keys.add(field.key);
    }

    return fields;
}

export function buildDynamicFormValue(fields: readonly ThyDynamicFormFieldSchema[], value?: ThyDynamicFormValue): ThyDynamicFormValue {
    const result: ThyDynamicFormValue = {};

    for (const field of fields) {
        result[field.key] = value?.[field.key] !== undefined ? value[field.key] : fieldDefaultValue(field);
    }

    return result;
}

function fieldDefaultValue(field: ThyDynamicFormFieldSchema): unknown {
    if (field.defaultValue !== undefined) {
        return field.defaultValue;
    }
    if (field.props?.multiple === true) {
        return [];
    }
    switch (field.kind) {
        case 'checkbox':
        case 'switch':
            return false;
        case 'input':
        case 'textarea':
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
