import { ValidationError } from '@angular/forms/signals';
import { ThySelectOptionModel } from 'ngx-tethys/select';
import { ThySwitchColor } from 'ngx-tethys/switch';

export type ThyFormFieldKind = 'input' | 'textarea' | 'number' | 'select' | 'checkbox' | 'radio' | 'switch' | 'time' | 'date' | 'dateRange';

export type ThyDynamicFormValue = Record<string, unknown>;

export type ThyFormTextareaResize = 'none' | 'vertical' | 'horizontal' | 'both';

export type ThyFormFieldValidator = (ctx: { value: unknown; formValue: ThyDynamicFormValue }) => ValidationError | ValidationError[] | null;

export type ThyFormFieldAsyncValidator = (ctx: {
    value: unknown;
    formValue: ThyDynamicFormValue;
}) => Promise<ValidationError | ValidationError[] | null>;

export interface ThyDynamicFormStatus {
    readonly valid: boolean;
    readonly invalid: boolean;
    readonly submitting: boolean;
}

export interface ThyFormFieldValueChange {
    key: string;
    value: unknown;
}

interface ThyFormFieldBaseSchema {
    key: string;
    kind: ThyFormFieldKind;
    /**
     * 外层栅格占位（1–12），默认 12；`inline` 下忽略。
     */
    col?: number;
    defaultValue?: unknown;
    errorMessages?: Partial<Record<string, string>>;
    /**
     * 控件值写入表单模型前的延迟。未设置时立即更新，`blur` 表示失焦后更新。
     */
    debounce?: number | 'blur';
    validators?: ThyFormFieldValidator[];
    asyncValidators?: ThyFormFieldAsyncValidator[];
}

export interface ThyFormInputFieldSchema extends ThyFormFieldBaseSchema {
    kind: 'input';
    props?: ThyFormInputFieldProps;
}

export interface ThyFormNumberFieldSchema extends ThyFormFieldBaseSchema {
    kind: 'number';
    props?: ThyFormNumberFieldProps;
}

export interface ThyFormTextareaFieldSchema extends ThyFormFieldBaseSchema {
    kind: 'textarea';
    props?: ThyFormTextareaFieldProps;
}

export interface ThyFormSelectFieldSchema extends ThyFormFieldBaseSchema {
    kind: 'select';
    props?: ThyFormSelectFieldProps;
}

export interface ThyFormCheckboxFieldSchema extends ThyFormFieldBaseSchema {
    kind: 'checkbox';
    props?: ThyFormFieldBaseProps;
}

export interface ThyFormRadioFieldSchema extends ThyFormFieldBaseSchema {
    kind: 'radio';
    props?: ThyFormRadioFieldProps;
}

export interface ThyFormSwitchFieldSchema extends ThyFormFieldBaseSchema {
    kind: 'switch';
    props?: ThyFormSwitchFieldProps;
}

export interface ThyFormTimeFieldSchema extends ThyFormFieldBaseSchema {
    kind: 'time';
    props?: ThyFormTimeFieldProps;
}

export interface ThyFormDateFieldSchema extends ThyFormFieldBaseSchema {
    kind: 'date';
    props?: ThyFormDateFieldProps;
}

export interface ThyFormDateRangeFieldSchema extends ThyFormFieldBaseSchema {
    kind: 'dateRange';
    props?: ThyFormDateRangeFieldProps;
}

export interface ThyFormFieldBaseProps {
    label?: string;
    placeholder?: string;
    required?: boolean;
    readonly?: boolean;
    disabled?: boolean;
}

/**
 * 自定义字段（通过 provideThyDynamicFormFieldTypes / thyFieldTypes 注册）。
 * 方案 B：内置 kind 仍走模板 @switch，同名注册不会覆盖内置。
 */
export interface ThyFormCustomFieldSchema extends Omit<ThyFormFieldBaseSchema, 'kind'> {
    kind: string;
    props?: ThyFormFieldBaseProps & Record<string, unknown>;
}

export interface ThyFormInputFieldProps extends ThyFormFieldBaseProps {
    type?: string;
    minlength?: number;
    maxlength?: number;
    pattern?: string;
}

export interface ThyFormNumberFieldProps extends ThyFormFieldBaseProps {
    min?: number | string;
    max?: number | string;
    step?: number | string;
    suffix?: string;
}

export interface ThyFormTextareaFieldProps extends ThyFormFieldBaseProps {
    minlength?: number;
    maxlength?: number;
    rows?: number;
    resize?: ThyFormTextareaResize;
    pattern?: string;
}

export interface ThyFormSelectFieldProps extends ThyFormFieldBaseProps {
    options?: ThySelectOptionModel[];
    multiple?: boolean;
    searchable?: boolean;
    clearable?: boolean;
    emptyText?: string;
    searchEmptyText?: string;
}

export interface ThyFormRadioFieldProps extends ThyFormFieldBaseProps {
    options?: {
        value: string;
        label: string;
    }[];
    layout?: 'flex';
    button?: boolean;
}

export interface ThyFormSwitchFieldProps extends ThyFormFieldBaseProps {
    color?: ThySwitchColor;
}

export interface ThyFormTimeFieldProps extends ThyFormFieldBaseProps {
    format?: string;
    allowClear?: boolean;
    showSelectNow?: boolean;
}

export interface ThyFormDateFieldProps extends ThyFormFieldBaseProps {
    format?: string;
    min?: Date | number;
    max?: Date | number;
    allowClear?: boolean;
    showTime?: boolean;
    disabledDate?: (date: Date) => boolean;
}

export interface ThyFormDateRangeFieldProps extends Omit<ThyFormDateFieldProps, 'placeholder'> {
    placeholder?: string | string[];
}

export type ThyFormFieldSchema =
    | ThyFormInputFieldSchema
    | ThyFormTextareaFieldSchema
    | ThyFormNumberFieldSchema
    | ThyFormSelectFieldSchema
    | ThyFormCheckboxFieldSchema
    | ThyFormRadioFieldSchema
    | ThyFormSwitchFieldSchema
    | ThyFormTimeFieldSchema
    | ThyFormDateFieldSchema
    | ThyFormDateRangeFieldSchema
    | ThyFormCustomFieldSchema;
