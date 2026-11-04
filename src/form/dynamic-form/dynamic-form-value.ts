import { ThyDynamicFormFieldTypeDef } from './field-types';
import { ThyDynamicFormValue, ThyFormFieldSchema, ThyFormSelectFieldProps } from './types';

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

export function buildDynamicFormValue(
    fields: readonly ThyFormFieldSchema[],
    value?: ThyDynamicFormValue,
    typeMap?: ReadonlyMap<string, ThyDynamicFormFieldTypeDef>
): ThyDynamicFormValue {
    const result: ThyDynamicFormValue = {};

    for (const field of fields) {
        result[field.key] = value?.[field.key] !== undefined ? value[field.key] : fieldDefaultValue(field, typeMap?.get(field.kind));
    }

    return result;
}

function fieldDefaultValue(field: ThyFormFieldSchema, typeDef?: ThyDynamicFormFieldTypeDef): unknown {
    if (field.defaultValue !== undefined) {
        return field.defaultValue;
    }
    if (field.kind === 'select') {
        const selectProps = field.props as ThyFormSelectFieldProps | undefined;
        return selectProps?.multiple === true ? [] : null;
    }
    if (typeDef && Object.prototype.hasOwnProperty.call(typeDef, 'defaultValue')) {
        return typeDef.defaultValue;
    }
    switch (field.kind) {
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
