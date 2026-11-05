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
 * @internal — 轻量适配组件（因 Signal Forms `[formField]` 须写在模板）；无基类继承。
 */
export const THY_DYNAMIC_FORM_BUILTIN_FIELD_TYPES: readonly ThyDynamicFormFieldType[] = [
    { kind: 'input', component: ThyDynamicFormInputField },
    { kind: 'textarea', component: ThyDynamicFormTextareaField },
    { kind: 'number', component: ThyDynamicFormNumberField },
    { kind: 'select', component: ThyDynamicFormSelectField },
    { kind: 'checkbox', component: ThyDynamicFormCheckboxField },
    { kind: 'radio', component: ThyDynamicFormRadioField },
    { kind: 'switch', component: ThyDynamicFormSwitchField },
    { kind: 'time', component: ThyDynamicFormTimeField },
    { kind: 'date', component: ThyDynamicFormDateField },
    { kind: 'dateRange', component: ThyDynamicFormDateRangeField }
];
