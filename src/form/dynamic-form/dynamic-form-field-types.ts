import { InjectionToken, Provider, Type } from '@angular/core';
import { Field } from '@angular/forms/signals';
import { ThyFormControlSize } from 'ngx-tethys/core';

/** 动态表单字段渲染上下文。 */
export interface ThyDynamicFormFieldOutletContext {
    field: Field<unknown>;
    props?: Record<string, unknown>;
    size: ThyFormControlSize;
    invalid: boolean;
    key: string;
}

/**
 * 动态表单字段类型。
 * - `attachFormField: true`：由 outlet 在组件宿主挂上 `FormField`，适合直接注册库控件
 * - 否则：将上下文（或 `mapInputs` 结果）下发为 input，由组件模板自行绑定 `[formField]`
 */
export interface ThyDynamicFormFieldType {
    kind: string;
    component: Type<unknown>;
    defaultValue?: unknown;
    attachFormField?: boolean;
    mapInputs?: (ctx: ThyDynamicFormFieldOutletContext) => Record<string, unknown>;
}

export const THY_DYNAMIC_FORM_FIELD_TYPES = new InjectionToken<ThyDynamicFormFieldType>('THY_DYNAMIC_FORM_FIELD_TYPES');

/** 注册字段类型；同名 kind 后注册覆盖先注册。 */
export function provideThyDynamicFormFieldTypes(fieldTypes: ThyDynamicFormFieldType | ThyDynamicFormFieldType[]): Provider[] {
    const list = Array.isArray(fieldTypes) ? fieldTypes : [fieldTypes];
    return list.map(fieldType => ({
        provide: THY_DYNAMIC_FORM_FIELD_TYPES,
        useValue: fieldType,
        multi: true
    }));
}

/**
 * 合并字段类型表：预置 < DI，后写覆盖先写。
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
