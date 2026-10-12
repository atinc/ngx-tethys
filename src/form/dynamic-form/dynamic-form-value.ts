import { ThyDynamicFormValue, ThyFormFieldConfig } from './types';

export function validateDynamicFormFields(fields: readonly ThyFormFieldConfig[]): readonly ThyFormFieldConfig[] {
    const keys = new Set<string>();

    for (const field of fields) {
        if (keys.has(field.key)) {
            throw new Error(`Duplicate dynamic form field key: "${field.key}"`);
        }
        keys.add(field.key);
    }

    return fields;
}

export function buildDynamicFormValue(fields: readonly ThyFormFieldConfig[], value?: ThyDynamicFormValue): ThyDynamicFormValue {
    const result: ThyDynamicFormValue = {};

    for (const field of fields) {
        result[field.key] = value?.[field.key] !== undefined ? value[field.key] : fieldDefaultValue(field);
    }

    return result;
}

function fieldDefaultValue(field: ThyFormFieldConfig): unknown {
    if (field.defaultValue !== undefined) {
        return field.defaultValue;
    }
    if (field.kind === 'select') {
        return field.props?.multiple === true ? [] : null;
    }
    return '';
}

export function isSameDynamicFormValue(previous: ThyDynamicFormValue, current: ThyDynamicFormValue): boolean {
    const previousKeys = Object.keys(previous);
    const currentKeys = Object.keys(current);
    return (
        previousKeys.length === currentKeys.length &&
        previousKeys.every(key => Object.hasOwn(current, key) && Object.is(previous[key], current[key]))
    );
}
