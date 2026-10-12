import { ThySelectOptionModel } from 'ngx-tethys/select';
import { ValidationError } from '@angular/forms/signals';

export type ThyFormFieldKind = 'input' | 'textarea' | 'select' | 'number';

export type ThyDynamicFormValue = Record<string, unknown>;

export type ThyFormTextareaResize = 'none' | 'vertical' | 'horizontal' | 'both';

export type ThyFormFieldValidator = (ctx: { value: unknown; form: ThyDynamicFormValue }) => ValidationError | ValidationError[] | null;

export type ThyFormFieldAsyncValidator = (ctx: {
    value: unknown;
    form: ThyDynamicFormValue;
}) => Promise<ValidationError | ValidationError[] | null>;

export interface FieldTreeRebuildDependency {
    readonly key: string;
    readonly kind: ThyFormFieldConfig['kind'];
    readonly validators: readonly ThyFormFieldValidator[];
    readonly asyncValidators: readonly ThyFormFieldAsyncValidator[];
}
export interface ThyDynamicFormStatus {
    readonly valid: boolean;
    readonly invalid: boolean;
    readonly pending: boolean;
    readonly submitting: boolean;
}

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
     * 控件值写入表单模型前的延迟。未设置时立即更新，`blur` 表示失焦后更新。
     */
    debounce?: number | 'blur';
    validators?: ThyFormFieldValidator[];
    asyncValidators?: ThyFormFieldAsyncValidator[];
}

export interface ThyFormInputFieldConfig extends ThyFormFieldBase {
    kind: 'input';
    props?: ThyFormInputFieldProps;
}

export interface ThyFormNumberFieldConfig extends ThyFormFieldBase {
    kind: 'number';
    props?: ThyFormNumberFieldProps;
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

export type ThyFormFieldConfig = ThyFormInputFieldConfig | ThyFormTextareaFieldConfig | ThyFormSelectFieldConfig | ThyFormNumberFieldConfig;
