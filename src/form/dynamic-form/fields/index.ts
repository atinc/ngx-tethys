import { ThyDynamicFormFieldType } from '../dynamic-form-field-types';
import { ThyDynamicFormCheckboxField } from './checkbox-field.component';
import { ThyDynamicFormDateField } from './date-field.component';
import { ThyDynamicFormDateRangeField } from './date-range-field.component';
import { ThyDynamicFormInputField } from './input-field.component';
import { ThyDynamicFormNumberField } from './number-field.component';
import { ThyDynamicFormRadioField } from './radio-field.component';
import { ThyDynamicFormSelectField } from './select-field.component';
import { ThyDynamicFormSwitchField } from './switch-field.component';
import { ThyDynamicFormTextareaField } from './textarea-field.component';
import { ThyDynamicFormTimeField } from './time-field.component';

/**
 * 动态表单库内预置字段类型。
 * @internal — 轻量 duck-type 适配组件（因 Signal Forms `[formField]` 须写在模板）；无基类继承。
 */
export const THY_DYNAMIC_FORM_BUILTIN_FIELD_TYPES: readonly ThyDynamicFormFieldType[] = [
    { kind: 'input', component: ThyDynamicFormInputField, defaultValue: '' },
    { kind: 'textarea', component: ThyDynamicFormTextareaField, defaultValue: '' },
    { kind: 'number', component: ThyDynamicFormNumberField, defaultValue: null },
    { kind: 'select', component: ThyDynamicFormSelectField, defaultValue: null },
    { kind: 'checkbox', component: ThyDynamicFormCheckboxField, defaultValue: false },
    { kind: 'radio', component: ThyDynamicFormRadioField, defaultValue: null },
    { kind: 'switch', component: ThyDynamicFormSwitchField, defaultValue: false },
    { kind: 'time', component: ThyDynamicFormTimeField, defaultValue: null },
    { kind: 'date', component: ThyDynamicFormDateField, defaultValue: null },
    { kind: 'dateRange', component: ThyDynamicFormDateRangeField, defaultValue: null }
];
