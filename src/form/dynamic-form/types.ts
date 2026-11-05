import { ValidationError } from '@angular/forms/signals';
import { ThySelectOptionModel } from 'ngx-tethys/select';
import { ThySwitchColor } from 'ngx-tethys/switch';

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

export interface ThyFormFieldBaseProps {
    label?: string;
    placeholder?: string;
    required?: boolean;
    readonly?: boolean;
    disabled?: boolean;
    /** 多选时值为数组；空数组按未填处理 required。 */
    multiple?: boolean;
}

export interface ThyFormFieldBaseSchema<TKind extends string = string, TProps extends object = ThyFormFieldBaseProps> {
    key: string;
    kind: TKind;
    props?: TProps;
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

export interface ThyFormInputFieldSchema extends ThyFormFieldBaseSchema<'input', ThyFormInputFieldProps> {}

export interface ThyFormNumberFieldSchema extends ThyFormFieldBaseSchema<'number', ThyFormNumberFieldProps> {}

export interface ThyFormTextareaFieldSchema extends ThyFormFieldBaseSchema<'textarea', ThyFormTextareaFieldProps> {}

export interface ThyFormSelectFieldSchema extends ThyFormFieldBaseSchema<'select', ThyFormSelectFieldProps> {}

export interface ThyFormCheckboxFieldSchema extends ThyFormFieldBaseSchema<'checkbox', ThyFormFieldBaseProps> {}

export interface ThyFormRadioFieldSchema extends ThyFormFieldBaseSchema<'radio', ThyFormRadioFieldProps> {}

export interface ThyFormSwitchFieldSchema extends ThyFormFieldBaseSchema<'switch', ThyFormSwitchFieldProps> {}

export interface ThyFormTimeFieldSchema extends ThyFormFieldBaseSchema<'time', ThyFormTimeFieldProps> {}

export interface ThyFormDateFieldSchema extends ThyFormFieldBaseSchema<'date', ThyFormDateFieldProps> {}

export interface ThyFormDateRangeFieldSchema extends ThyFormFieldBaseSchema<'dateRange', ThyFormDateRangeFieldProps> {}

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
    | ThyFormDateRangeFieldSchema;

/** 内置 + 自定义：`ThyFormFieldSchemaWith<MemberSchema>`。 */
export type ThyFormFieldSchemaWith<TCustom extends ThyFormFieldBaseSchema> = ThyFormFieldSchema | TCustom;

/** thyFields / 运行时字段（内置联合或任意自定义 BaseSchema）。 */
export type ThyDynamicFormFieldSchema = ThyFormFieldSchemaWith<ThyFormFieldBaseSchema>;
