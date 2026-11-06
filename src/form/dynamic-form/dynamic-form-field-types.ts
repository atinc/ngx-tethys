import { inject, InjectionToken, Provider, Type } from '@angular/core';
import { Field } from '@angular/forms/signals';
import { ThyFormControlSize } from 'ngx-tethys/core';

import { ThyDynamicFormFieldSchema } from './types';

export interface ThyDynamicFormFieldOutletContext {
    field: Field<unknown>;
    fieldSchema: ThyDynamicFormFieldSchema;
    size: ThyFormControlSize;
    invalid: boolean;
}

export interface ThyDynamicFormFieldType {
    kind: string;
    component: Type<unknown>;
}

export const THY_DYNAMIC_FORM_FIELD_TYPES = new InjectionToken<ThyDynamicFormFieldType>('THY_DYNAMIC_FORM_FIELD_TYPES');

/** 注册动态表单字段类型。同名 kind 后注册覆盖先注册。 */
export function provideThyDynamicFormFieldTypes(fieldTypes: ThyDynamicFormFieldType | ThyDynamicFormFieldType[]): Provider[] {
    const list = Array.isArray(fieldTypes) ? fieldTypes : [fieldTypes];
    return list.map(fieldType => ({
        provide: THY_DYNAMIC_FORM_FIELD_TYPES,
        useValue: fieldType,
        multi: true
    }));
}

/** @internal */
export function injectThyDynamicFormFieldTypes(): readonly ThyDynamicFormFieldType[] {
    return (inject(THY_DYNAMIC_FORM_FIELD_TYPES, { optional: true }) as unknown as ThyDynamicFormFieldType[] | null) ?? [];
}

/**
 * 合并字段类型：builtins < injected，后写覆盖先写。
 * @internal
 */
export function createDynamicFormFieldTypeMap(
    builtins: readonly ThyDynamicFormFieldType[],
    injected: readonly ThyDynamicFormFieldType[]
): Map<string, ThyDynamicFormFieldType> {
    const map = new Map<string, ThyDynamicFormFieldType>();
    for (const fieldType of builtins) {
        map.set(fieldType.kind, fieldType);
    }
    for (const fieldType of injected) {
        map.set(fieldType.kind, fieldType);
    }
    return map;
}
