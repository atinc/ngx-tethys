import { InjectionToken, Provider, Type } from '@angular/core';

/**
 * 动态表单自定义字段类型注册项（方案 B：仅扩展非内置 kind）。
 */
export interface ThyDynamicFormFieldTypeDef {
    kind: string;
    component: Type<unknown>;
    /**
     * 无 schema.defaultValue 时回落。
     */
    defaultValue?: unknown;
}

export const THY_DYNAMIC_FORM_FIELD_TYPES = new InjectionToken<ThyDynamicFormFieldTypeDef>('THY_DYNAMIC_FORM_FIELD_TYPES');

/**
 * 注册自定义字段类型。内置 kind 仍由模板 @switch 渲染，注册同名内置 kind **不会覆盖**内置实现。
 */
export function provideThyDynamicFormFieldTypes(
    defs: ThyDynamicFormFieldTypeDef | ThyDynamicFormFieldTypeDef[]
): Provider[] {
    const list = Array.isArray(defs) ? defs : [defs];
    return list.map(def => ({
        provide: THY_DYNAMIC_FORM_FIELD_TYPES,
        useValue: def,
        multi: true
    }));
}

/**
 * 合并自定义字段类型：injected < overrides，后写覆盖先写。
 */
export function createDynamicFormFieldTypeMap(
    injected: readonly ThyDynamicFormFieldTypeDef[],
    overrides: readonly ThyDynamicFormFieldTypeDef[] = []
): Map<string, ThyDynamicFormFieldTypeDef> {
    const map = new Map<string, ThyDynamicFormFieldTypeDef>();
    for (const def of injected) {
        map.set(def.kind, def);
    }
    for (const def of overrides) {
        map.set(def.kind, def);
    }
    return map;
}
