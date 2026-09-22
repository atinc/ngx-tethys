export type ThyDynamicFormFieldKind = 'input' | 'textarea' | 'select';

export type ThyDynamicFormErrorMessages = Partial<Record<string, string>>;

export type ThyDynamicFormUpdateOn = 'change' | 'blur' | 'submit';

export type ThyDynamicFormValue = Record<string, unknown>;

export type ThyDynamicFormTextareaResize = 'none' | 'vertical' | 'horizontal' | 'both';

export interface ThyDynamicFormValidatorContext {
    value: unknown;
    form: ThyDynamicFormValue;
}

export type ThyDynamicFormValidatorFn = (
    ctx: ThyDynamicFormValidatorContext
) => Record<string, unknown> | null | Promise<Record<string, unknown> | null>;

export interface ThyDynamicFormFieldValueChange {
    key: string;
    value: unknown;
}

export interface ThyDynamicFormSubmitEvent {
    value: ThyDynamicFormValue;
    valid: boolean;
}

interface ThyDynamicFormFieldBase {
    key: string;
    kind: ThyDynamicFormFieldKind;
    /**
     * 栅格占位列数，按 12 列计算。默认 12（整行），6 为半行。
     */
    col?: number;
    disabled?: boolean;
    defaultValue?: unknown;
    errorMessages?: ThyDynamicFormErrorMessages;
    /**
     * 控件值更新时机。未设置时值为 `change`，错误展示默认跟随提交。
     */
    updateOn?: ThyDynamicFormUpdateOn;
    validators?: ThyDynamicFormValidatorFn[];
}

export interface ThyDynamicFormInputField extends ThyDynamicFormFieldBase {
    kind: 'input';
    props?: ThyDynamicFormInputFieldProps;
}

export interface ThyDynamicFormTextareaField extends ThyDynamicFormFieldBase {
    kind: 'textarea';
    props?: ThyDynamicFormTextareaFieldProps;
}

export interface ThyDynamicFormSelectField extends ThyDynamicFormFieldBase {
    kind: 'select';
    props?: ThyDynamicFormSelectFieldProps;
}

export interface ThyDynamicFormFieldBaseProps {
    label?: string;
    placeholder?: string;
    required?: boolean;
    readonly?: boolean;
}

export interface ThyDynamicFormInputFieldProps extends ThyDynamicFormFieldBaseProps {
    type?: string;
    minlength?: number;
    maxlength?: number;
    min?: number | string;
    max?: number | string;
    step?: number | string;
    pattern?: string;
}

export interface ThyDynamicFormTextareaFieldProps extends ThyDynamicFormFieldBaseProps {
    minlength?: number;
    maxlength?: number;
    rows?: number;
    resize?: ThyDynamicFormTextareaResize;
    pattern?: string;
}

export interface ThyDynamicFormSelectOption {
    value?: string | number;
    label?: string;
    disabled?: boolean;
    icon?: string;
}

export type ThyDynamicFormSelectOptions = ThyDynamicFormSelectOption[];

export interface ThyDynamicFormSelectFieldProps extends ThyDynamicFormFieldBaseProps {
    options?: ThyDynamicFormSelectOptions;
    multiple?: boolean;
    searchable?: boolean;
    clearable?: boolean;
    emptyText?: string;
    searchEmptyText?: string;
}

export type ThyDynamicFormFieldConfig = ThyDynamicFormInputField | ThyDynamicFormTextareaField | ThyDynamicFormSelectField;
