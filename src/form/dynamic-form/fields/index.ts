import { ThyCheckbox } from 'ngx-tethys/checkbox';
import { ThyDatePicker, ThyRangePicker } from 'ngx-tethys/date-picker';
import { ThyInputNumber } from 'ngx-tethys/input-number';
import { ThySelect } from 'ngx-tethys/select';
import { ThySwitch } from 'ngx-tethys/switch';
import { ThyTimePicker } from 'ngx-tethys/time-picker';

import { ThyDynamicFormFieldOutletContext, ThyDynamicFormFieldType } from '../dynamic-form-field-types';
import {
    ThyFormDateFieldProps,
    ThyFormDateRangeFieldProps,
    ThyFormNumberFieldProps,
    ThyFormSelectFieldProps,
    ThyFormSwitchFieldProps,
    ThyFormTimeFieldProps
} from '../types';
import { ThyDynamicFormInputField } from './input-field.component';
import { ThyDynamicFormRadioField } from './radio-field.component';
import { ThyDynamicFormTextareaField } from './textarea-field.component';

function hostControlInputs(ctx: ThyDynamicFormFieldOutletContext, options?: { readonly?: boolean }): Record<string, unknown> {
    return {
        thyDisabled: ctx.field().disabled(),
        thySize: ctx.size,
        ...(options?.readonly ? { thyReadonly: ctx.field().readonly() } : {})
    };
}

function selectLikeInputs(ctx: ThyDynamicFormFieldOutletContext): Record<string, unknown> {
    const props = ctx.props as ThyFormSelectFieldProps | undefined;
    return {
        ...hostControlInputs(ctx),
        thyOptions: props?.options ?? [],
        thyPlaceholder: props?.placeholder ?? '',
        thySearchable: props?.searchable,
        thyClearable: props?.clearable,
        thyMultiple: props?.multiple,
        thyEmptyStateText: props?.emptyText ?? '',
        thySearchEmptyText: props?.searchEmptyText ?? ''
    };
}

function numberInputs(ctx: ThyDynamicFormFieldOutletContext): Record<string, unknown> {
    const props = ctx.props as ThyFormNumberFieldProps | undefined;
    return {
        ...hostControlInputs(ctx),
        thyPlaceholder: props?.placeholder || null,
        thySuffix: props?.suffix,
        thyMax: props?.max,
        thyMin: props?.min,
        thyStep: props?.step
    };
}

function timePickerLikeInputs(ctx: ThyDynamicFormFieldOutletContext): Record<string, unknown> {
    const props = ctx.props as ThyFormTimeFieldProps | undefined;
    return {
        ...hostControlInputs(ctx, { readonly: true }),
        thyPlaceholder: props?.placeholder,
        thyFormat: props?.format,
        thyAllowClear: props?.allowClear ?? true,
        thyShowSelectNow: props?.showSelectNow ?? true
    };
}

function datePickerInputs(ctx: ThyDynamicFormFieldOutletContext): Record<string, unknown> {
    const props = ctx.props as ThyFormDateFieldProps | ThyFormDateRangeFieldProps | undefined;
    return {
        ...hostControlInputs(ctx, { readonly: true }),
        thyPlaceholder: props?.placeholder,
        thyFormat: props?.format,
        thyMinDate: props?.min,
        thyMaxDate: props?.max,
        thyAllowClear: props?.allowClear ?? true,
        thyShowTime: props?.showTime ?? false,
        thyDisabledDate: props?.disabledDate
    };
}

/** @internal */
export const THY_DYNAMIC_FORM_BUILTIN_FIELD_TYPES: readonly ThyDynamicFormFieldType[] = [
    { kind: 'input', component: ThyDynamicFormInputField, defaultValue: '' },
    { kind: 'textarea', component: ThyDynamicFormTextareaField, defaultValue: '' },
    { kind: 'number', component: ThyInputNumber, defaultValue: null, attachFormField: true, mapInputs: numberInputs },
    { kind: 'select', component: ThySelect, defaultValue: null, attachFormField: true, mapInputs: selectLikeInputs },
    {
        kind: 'checkbox',
        component: ThyCheckbox,
        defaultValue: false,
        attachFormField: true,
        mapInputs: ctx => ({ thyDisabled: ctx.field().disabled() })
    },
    { kind: 'radio', component: ThyDynamicFormRadioField, defaultValue: null },
    {
        kind: 'switch',
        component: ThySwitch,
        defaultValue: false,
        attachFormField: true,
        mapInputs: ctx => {
            const props = ctx.props as ThyFormSwitchFieldProps | undefined;
            return {
                ...hostControlInputs(ctx),
                thyColor: props?.color
            };
        }
    },
    { kind: 'time', component: ThyTimePicker, defaultValue: null, attachFormField: true, mapInputs: timePickerLikeInputs },
    { kind: 'date', component: ThyDatePicker, defaultValue: null, attachFormField: true, mapInputs: datePickerInputs },
    { kind: 'dateRange', component: ThyRangePicker, defaultValue: null, attachFormField: true, mapInputs: datePickerInputs }
];

export { selectLikeInputs as thyDynamicFormSelectLikeInputs };
