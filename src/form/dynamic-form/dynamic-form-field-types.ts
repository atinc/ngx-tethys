import { InjectionToken, Provider, Type } from '@angular/core';
import { Field } from '@angular/forms/signals';
import { ThyFormControlSize } from 'ngx-tethys/core';

/** 动态表单字段 outlet 上下文（对标 Formily field + props）。 */
export interface ThyDynamicFormFieldOutletContext {
    field: Field<unknown>;
    props?: Record<string, unknown>;
    size: ThyFormControlSize;
    invalid: boolean;
    key: string;
}

/**
 * 动态表单字段类型注册项。
 * - 省略 mapInputs：duck-type 下发 field / props / size / invalid / key
 * - 提供 mapInputs：将 outlet 上下文（含 field / props / key 等）映射为控件 input
 */
export interface ThyDynamicFormFieldType {
    kind: string;
    component: Type<unknown>;
    defaultValue?: unknown;
    mapInputs?: (ctx: ThyDynamicFormFieldOutletContext) => Record<string, unknown>;
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

/** @internal */
export function resolveDynamicFormFieldOutletContext(
    fieldType: ThyDynamicFormFieldType,
    ctx: ThyDynamicFormFieldOutletContext
): Record<string, unknown> {
    return fieldType.mapInputs ? fieldType.mapInputs(ctx) : { ...ctx };
}
