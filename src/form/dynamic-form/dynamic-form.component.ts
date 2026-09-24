import { coerceNumberProperty } from '@angular/cdk/coercion';
import { ThyFormControlSize } from 'ngx-tethys/core';
import { ThyColDirective, ThyRowDirective } from 'ngx-tethys/grid';
import { ThyInputDirective } from 'ngx-tethys/input';
import { ThySelect } from 'ngx-tethys/select';

import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    DestroyRef,
    effect,
    inject,
    input,
    output,
    signal,
    untracked,
    viewChild
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
    AbstractControl,
    AsyncValidatorFn,
    FormControl,
    FormControlStatus,
    FormGroup,
    FormGroupDirective,
    ReactiveFormsModule,
    ValidationErrors,
    ValidatorFn,
    Validators
} from '@angular/forms';
import { Subscription } from 'rxjs';

import { ThyFormGroup } from '../form-group.component';
import { ThyFormDirective } from '../form.directive';
import { THY_FORM_CONFIG_PROVIDER } from '../form.class';
import { ThyFormValidatorLoader } from '../form-validator-loader';
import { ThyDynamicFormSpanPipe } from './dynamic-form.pipe';
import { resolveFieldErrorMessage } from './error-messages';
import { ThyFormFieldConfig, ThyFormFieldValueChange, ThyFormFieldValidator, ThyDynamicFormValue } from './types';

/**
 * 动态表单
 * @name thy-dynamic-form
 * @order 25
 */
@Component({
    selector: 'thy-dynamic-form',
    templateUrl: './dynamic-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ReactiveFormsModule, ThyFormGroup, ThyRowDirective, ThyColDirective, ThySelect, ThyInputDirective, ThyDynamicFormSpanPipe],
    providers: [
        {
            provide: ThyFormDirective,
            useExisting: ThyDynamicForm
        },
        ThyFormValidatorLoader,
        THY_FORM_CONFIG_PROVIDER
    ],
    host: {
        class: 'thy-form thy-dynamic-form'
    }
})
export class ThyDynamicForm {
    /**
     * 字段配置。每一项是 ThyFormFieldConfig，kind 目前支持 input、textarea、select，具体配置见 ThyFormFieldConfig
     * @type ThyFormFieldConfig[]
     * @default []
     */
    readonly thyFields = input<ThyFormFieldConfig[]>([]);

    /**
     * 外部写入的表单值，不传时用各字段的 defaultValue
     */
    readonly thyValue = input<ThyDynamicFormValue | undefined>(undefined);

    /**
     * 表单控件大小
     * @type xs | sm | md | lg
     * @default md
     */
    readonly thySize = input<ThyFormControlSize, ThyFormControlSize | null | undefined>('md', {
        transform: value => value ?? 'md'
    });

    readonly isHorizontal = false;

    /**
     * 表单值变化时触发，参数为当前表单值
     */
    readonly thyValueChange = output<ThyDynamicFormValue>();

    /**
     * 单个字段变化时触发，参数为包含 key 和 value 的对象 ThyFormFieldValueChange
     */
    readonly thyFieldValueChange = output<ThyFormFieldValueChange>();

    /**
     * 表单值变化时触发，参数为当前表单状态 VALID | INVALID | PENDING | DISABLED
     */
    readonly thyStatusChange = output<FormControlStatus>();

    /**
     * 点击 submit 按钮提交表单且校验通过后触发，参数为当前表单值
     */
    readonly thySubmit = output<ThyDynamicFormValue>();

    readonly formGroup = new FormGroup<Record<string, AbstractControl>>({});

    protected readonly submitted = signal(false);

    private readonly cdr = inject(ChangeDetectorRef);
    private readonly destroyRef = inject(DestroyRef);
    private readonly validatorLoader = inject(ThyFormValidatorLoader);
    private readonly formGroupDir = viewChild(FormGroupDirective);

    private lastValue = '';
    private readonly fieldsByKey = new Map<string, ThyFormFieldConfig>();
    private fieldValueChangeSubscriptions = new Subscription();

    constructor() {
        this.destroyRef.onDestroy(() => this.fieldValueChangeSubscriptions.unsubscribe());
        this.formGroup.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
            this.emitValue();
        });
        this.formGroup.statusChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(status => {
            this.thyStatusChange.emit(status);
            this.cdr.markForCheck();
        });
        effect(() => {
            const fields = this.thyFields() ?? [];
            const formValue = this.thyValue();
            untracked(() => {
                this.rebuild(fields, formValue);
                this.applyValue(fields, formValue);
            });
        });
        effect(onCleanup => {
            const formGroupDir = this.formGroupDir();
            if (!formGroupDir) {
                return;
            }
            const sub = formGroupDir.ngSubmit.subscribe(() => {
                this.submitted.set(true);
                this.formGroup.markAllAsTouched();
                if (this.formGroup.valid) {
                    this.thySubmit.emit(this.formGroup.getRawValue() as ThyDynamicFormValue);
                }
                this.cdr.markForCheck();
            });
            onCleanup(() => sub.unsubscribe());
        });
    }

    /**
     * 恢复为 defaultValue，并清掉已显示的错误。
     */
    reset(): void {
        const value: ThyDynamicFormValue = {};
        for (const field of this.thyFields() ?? []) {
            value[field.key] = this.getFieldDefaultValue(field);
        }
        this.submitted.set(false);
        const formGroupDir = this.formGroupDir();
        if (formGroupDir) {
            formGroupDir.resetForm(value);
        } else {
            this.formGroup.reset(value);
        }
        this.cdr.markForCheck();
    }

    protected showError(field: ThyFormFieldConfig): boolean {
        const control = this.formGroup.get(field.key);
        if (!(control instanceof FormControl) || !control.invalid) {
            return false;
        }
        if (this.submitted()) {
            return true;
        }
        switch (field.updateOn) {
            case 'blur':
                return control.touched;
            case 'change':
                return control.dirty;
            default:
                return false;
        }
    }

    protected errorMessage(field: ThyFormFieldConfig): string | null {
        const control = this.formGroup.get(field.key);
        if (!(control instanceof FormControl)) {
            return null;
        }
        return resolveFieldErrorMessage(field, control, (name, code) => this.validatorLoader.getErrorMessage(name, code));
    }

    private emitValue(): void {
        const formValue = this.formGroup.getRawValue() as ThyDynamicFormValue;
        const value = JSON.stringify(formValue) ?? '';
        if (value === this.lastValue) {
            return;
        }
        this.lastValue = value;
        this.thyValueChange.emit(formValue);
    }

    private rebuild(fields: ThyFormFieldConfig[], formValue: ThyDynamicFormValue | undefined): void {
        this.fieldValueChangeSubscriptions.unsubscribe();
        this.fieldValueChangeSubscriptions = new Subscription();

        const fieldKeys = new Set(fields.map(field => field.key));
        for (const key of Object.keys(this.formGroup.controls)) {
            if (!fieldKeys.has(key)) {
                this.formGroup.removeControl(key, { emitEvent: false });
                this.fieldsByKey.delete(key);
            }
        }

        for (const field of fields) {
            let control = this.formGroup.get(field.key);
            const validators = this.builtinValidators(field);
            const asyncValidators = this.bindCustomValidators(field.validators ?? []);
            if (this.canReuseControl(control, field)) {
                control.setValidators(validators);
                control.setAsyncValidators(asyncValidators);
                control.updateValueAndValidity({ emitEvent: false });
            } else {
                if (control) {
                    this.formGroup.removeControl(field.key, { emitEvent: false });
                }
                control = new FormControl(this.resolveFieldValue(field, formValue), {
                    validators,
                    asyncValidators,
                    updateOn: field.updateOn ?? 'change'
                });
                this.formGroup.addControl(field.key, control, { emitEvent: false });
            }
            this.fieldsByKey.set(field.key, field);
            this.syncFieldDisabled(field, control);
            this.fieldValueChangeSubscriptions.add(
                control.valueChanges.subscribe(fieldValue => {
                    this.thyFieldValueChange.emit({ key: field.key, value: fieldValue });
                })
            );
        }
    }

    private builtinValidators(field: ThyFormFieldConfig): ValidatorFn[] {
        const validators: ValidatorFn[] = [];
        if (field.props?.required) {
            validators.push(Validators.required);
        }
        if (field.kind === 'input' || field.kind === 'textarea') {
            const props = field.props;
            const minlength = coerceNumberProperty(props?.minlength, null);
            if (minlength != null) {
                validators.push(Validators.minLength(minlength));
            }
            const maxlength = coerceNumberProperty(props?.maxlength, null);
            if (maxlength != null) {
                validators.push(Validators.maxLength(maxlength));
            }
            if (typeof props?.pattern === 'string' && props.pattern) {
                validators.push(Validators.pattern(props.pattern));
            }
        }
        if (field.kind === 'input') {
            const min = coerceNumberProperty(field.props?.min, null);
            if (min != null) {
                validators.push(Validators.min(min));
            }
            const max = coerceNumberProperty(field.props?.max, null);
            if (max != null) {
                validators.push(Validators.max(max));
            }
        }
        return validators;
    }

    private bindCustomValidators(fns: ThyFormFieldValidator[]): AsyncValidatorFn[] {
        return fns.map(fn => (control: AbstractControl) => {
            return Promise.resolve(
                fn({
                    value: control.value,
                    form: this.formGroup.getRawValue() as ThyDynamicFormValue
                })
            ).then(result => {
                if (result != null && typeof result === 'object' && !isThenable(result)) {
                    return result as ValidationErrors;
                }
                return null;
            });
        });
    }

    private canReuseControl(control: AbstractControl | null, field: ThyFormFieldConfig): control is FormControl {
        const previous = this.fieldsByKey.get(field.key);
        return (
            control instanceof FormControl &&
            previous?.kind === field.kind &&
            (previous.updateOn ?? 'change') === (field.updateOn ?? 'change')
        );
    }

    private applyValue(fields: ThyFormFieldConfig[], formValue: ThyDynamicFormValue | null | undefined): void {
        for (const field of fields) {
            const control = this.formGroup.get(field.key);
            if (!(control instanceof FormControl)) {
                continue;
            }
            const fieldValue = this.resolveFieldValue(field, formValue);
            if (!Object.is(control.value, fieldValue)) {
                control.setValue(fieldValue, { emitEvent: false });
            }
        }
    }

    private syncFieldDisabled(field: ThyFormFieldConfig, control: AbstractControl): void {
        const disabled = field.props?.disabled === true;
        if (disabled && control.enabled) {
            control.disable({ emitEvent: false });
        } else if (!disabled && control.disabled) {
            control.enable({ emitEvent: false });
        }
    }

    private resolveFieldValue(field: ThyFormFieldConfig, formValue: ThyDynamicFormValue | null | undefined): unknown {
        if (formValue?.[field.key] !== undefined) {
            return formValue[field.key];
        }
        return this.getFieldDefaultValue(field);
    }

    private getFieldDefaultValue(field: ThyFormFieldConfig): unknown {
        return field.defaultValue ?? this.getFieldEmptyValue(field);
    }

    private getFieldEmptyValue(field: ThyFormFieldConfig): unknown {
        if (field.kind === 'select') {
            return field.props?.multiple === true ? [] : null;
        }
        return '';
    }
}

function isThenable(value: object): value is Promise<unknown> {
    return typeof (value as Promise<unknown>).then === 'function';
}
