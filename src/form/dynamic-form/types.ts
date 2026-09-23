import { ThySelectOptionModel } from 'ngx-tethys/select';

export type ThyFormFieldKind = 'input' | 'textarea' | 'select';

export type ThyDynamicFormUpdateOn = 'change' | 'blur' | 'submit';

export type ThyDynamicFormValue = Record<string, unknown>;

export type ThyFormTextareaResize = 'none' | 'vertical' | 'horizontal' | 'both';

export type ThyFormFieldValidator = (ctx: {
    value: unknown;
    form: ThyDynamicFormValue;
}) => Record<string, unknown> | null | Promise<Record<string, unknown> | null>;

export interface ThyFormFieldValueChange {
    key: string;
    value: unknown;
}

interface ThyFormFieldBase {
    key: string;
    kind: ThyFormFieldKind;
    /**
     * 栅格占位列数，按 12 列计算。默认 12（整行），6 为半行。
     */
    col?: number;
    defaultValue?: unknown;
    errorMessages?: Partial<Record<string, string>>;
    /**
     * 控件值更新时机。未设置时值为 `change`，错误展示默认跟随提交。
     */
    updateOn?: ThyDynamicFormUpdateOn;
    validators?: ThyFormFieldValidator[];
}

export interface ThyFormInputFieldConfig extends ThyFormFieldBase {
    kind: 'input';
    props?: ThyFormInputFieldProps;
}

export interface ThyFormTextareaFieldConfig extends ThyFormFieldBase {
    kind: 'textarea';
    props?: ThyFormTextareaFieldProps;
}

export interface ThyFormSelectFieldConfig extends ThyFormFieldBase {
    kind: 'select';
    props?: ThyFormSelectFieldProps;
}

export interface ThyFormFieldBaseProps {
    label?: string;
    placeholder?: string;
    required?: boolean;
    readonly?: boolean;
    disabled?: boolean;
}

export interface ThyFormInputFieldProps extends ThyFormFieldBaseProps {
    type?: string;
    minlength?: number;
    maxlength?: number;
    min?: number | string;
    max?: number | string;
    step?: number | string;
    pattern?: string;
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

export type ThyFormFieldConfig = ThyFormInputFieldConfig | ThyFormTextareaFieldConfig | ThyFormSelectFieldConfig;
