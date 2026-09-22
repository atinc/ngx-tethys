import { coerceNumberProperty } from '@angular/cdk/coercion';
import { ThyFormControlSize } from 'ngx-tethys/core';
import { ThyColDirective, ThyRowDirective } from 'ngx-tethys/grid';
import { ThyInputDirective } from 'ngx-tethys/input';
import { ThySelect } from 'ngx-tethys/select';

import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    computed,
    DestroyRef,
    effect,
    inject,
    input,
    output,
    signal,
    viewChild
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
    AbstractControl,
    AsyncValidatorFn,
    FormControl,
    FormGroup,
    FormGroupDirective,
    ReactiveFormsModule,
    ValidationErrors,
    ValidatorFn,
    Validators
} from '@angular/forms';
import { Subscription } from 'rxjs';

import { ThyFormGroup } from '../form-group.component';
import { ThyFormGroupFooter } from '../from-group-footer/form-group-footer.component';
import { ThyFormDirective } from '../form.directive';
import { THY_FORM_CONFIG_PROVIDER, ThyFormLayout } from '../form.class';
import { ThyFormValidatorLoader } from '../form-validator-loader';
import { ThyDynamicFormSpanPipe } from './dynamic-form.pipe';
import { resolveFieldErrorMessage } from './error-messages';
import {
    ThyDynamicFormFieldConfig,
    ThyDynamicFormFieldValueChange,
    ThyDynamicFormSubmitEvent,
    ThyDynamicFormValidatorFn,
    ThyDynamicFormValue
} from './types';

/**
 * 动态表单
 * @name thy-dynamic-form
 * @order 25
 */
@Component({
    selector: 'thy-dynamic-form',
    templateUrl: './dynamic-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ReactiveFormsModule,
        ThyFormGroup,
        ThyFormGroupFooter,
        ThyRowDirective,
        ThyColDirective,
        ThySelect,
        ThyInputDirective,
        ThyDynamicFormSpanPipe
    ],
    providers: [
        {
            provide: ThyFormDirective,
            useExisting: ThyDynamicForm
        },
        ThyFormValidatorLoader,
        THY_FORM_CONFIG_PROVIDER
    ],
    host: {
        class: 'thy-dynamic-form'
    }
})
export class ThyDynamicForm {
    readonly thyFields = input<ThyDynamicFormFieldConfig[]>([]);

    readonly thyValue = input<ThyDynamicFormValue | undefined>(undefined);

    readonly thySize = input<ThyFormControlSize>('md');

    readonly thyLayout: ThyFormLayout = 'vertical';

    get isHorizontal() {
        return this.thyLayout === 'horizontal';
    }

    readonly thyValueChange = output<ThyDynamicFormValue>();

    readonly thyFieldValueChange = output<ThyDynamicFormFieldValueChange>();

    readonly thyStatusChange = output<string>();

    readonly thySubmit = output<ThyDynamicFormSubmitEvent>();

    readonly formGroup = new FormGroup<Record<string, AbstractControl>>({});

    protected readonly submitted = signal(false);

    protected readonly fieldSize = computed(() => this.thySize() || 'md');

    protected readonly controls = computed(() => {
        const fields = this.thyFields() ?? [];
        const formValue = this.thyValue();
        if (!this.isSameFields(fields, this.lastFields)) {
            this.lastFields = fields;
            this.rebuild(fields, formValue);
        }
        this.applyValue(fields, formValue);
        return this.formGroup;
    });

    private readonly cdr = inject(ChangeDetectorRef);
    private readonly destroyRef = inject(DestroyRef);
    private readonly validatorLoader = inject(ThyFormValidatorLoader);
    private readonly formGroupDir = viewChild(FormGroupDirective);

    private lastFields: ThyDynamicFormFieldConfig[] = [];
    private lastValue = '';
    private readonly fieldsByKey = new Map<string, ThyDynamicFormFieldConfig>();
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
        effect(onCleanup => {
            const formGroupDir = this.formGroupDir();
            if (!formGroupDir) {
                return;
            }
            const sub = formGroupDir.ngSubmit.subscribe(() => {
                this.submitted.set(true);
                this.formGroup.markAllAsTouched();
                this.thySubmit.emit({
                    value: this.formGroup.getRawValue() as ThyDynamicFormValue,
                    valid: !!this.formGroup.valid
                });
                this.cdr.markForCheck();
            });
            onCleanup(() => sub.unsubscribe());
        });
    }

    protected showError(field: ThyDynamicFormFieldConfig): boolean {
        const control = this.formGroup.get(field.key);
        if (!(control instanceof FormControl) || !control.invalid) {
            return false;
        }
        if (this.submitted()) {
            return true;
        }
        switch (field.updateOn ?? 'submit') {
            case 'blur':
                return control.touched;
            case 'change':
                return control.dirty;
            default:
                return false;
        }
    }

    protected errorMessage(field: ThyDynamicFormFieldConfig): string | null {
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

    private rebuild(fields: ThyDynamicFormFieldConfig[], formValue: ThyDynamicFormValue | undefined): void {
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

    builtinValidators(field: ThyDynamicFormFieldConfig): ValidatorFn[] {
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

    private bindCustomValidators(fns: ThyDynamicFormValidatorFn[]): AsyncValidatorFn[] {
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

    private canReuseControl(control: AbstractControl | null, field: ThyDynamicFormFieldConfig): control is FormControl {
        const previous = this.fieldsByKey.get(field.key);
        return (
            control instanceof FormControl &&
            previous?.kind === field.kind &&
            (previous.updateOn ?? 'change') === (field.updateOn ?? 'change')
        );
    }

    private applyValue(fields: ThyDynamicFormFieldConfig[], formValue: ThyDynamicFormValue | undefined): void {
        if (formValue == null) {
            return;
        }
        for (const field of fields) {
            const control = this.formGroup.get(field.key);
            if (!(control instanceof FormControl)) {
                continue;
            }
            const fieldValue = Object.prototype.hasOwnProperty.call(formValue, field.key)
                ? formValue[field.key]
                : this.getFieldEmptyValue(field);
            if (!Object.is(control.value, fieldValue)) {
                control.setValue(fieldValue, { emitEvent: false });
            }
        }
    }

    private syncFieldDisabled(field: ThyDynamicFormFieldConfig, control: AbstractControl): void {
        const disabled = field.disabled === true;
        if (disabled && control.enabled) {
            control.disable({ emitEvent: false });
        } else if (!disabled && control.disabled) {
            control.enable({ emitEvent: false });
        }
    }

    private resolveFieldValue(field: ThyDynamicFormFieldConfig, formValue: ThyDynamicFormValue | undefined): unknown {
        if (formValue != null && Object.prototype.hasOwnProperty.call(formValue, field.key)) {
            return formValue[field.key];
        }
        const control = this.formGroup.get(field.key);
        if (control) {
            return control.value;
        }
        return field.defaultValue ?? this.getFieldEmptyValue(field);
    }

    private getFieldEmptyValue(field: ThyDynamicFormFieldConfig): unknown {
        if (field.kind === 'select') {
            return field.props?.multiple === true ? [] : null;
        }
        return '';
    }

    private isSameFields(fields: ThyDynamicFormFieldConfig[], lastFields: ThyDynamicFormFieldConfig[]): boolean {
        return fields === lastFields || JSON.stringify(fields) === JSON.stringify(lastFields);
    }
}

function isThenable(value: object): value is Promise<unknown> {
    return typeof (value as Promise<unknown>).then === 'function';
}
