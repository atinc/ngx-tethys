import { ThyFormControlSize } from 'ngx-tethys/core';
import { ThyColDirective, ThyRowDirective } from 'ngx-tethys/grid';
import { ThyInputDirective } from 'ngx-tethys/input';
import { ThySelect } from 'ngx-tethys/select';
import { ThyInputNumber } from 'ngx-tethys/input-number';

import {
    afterNextRender,
    ChangeDetectionStrategy,
    Component,
    computed,
    effect,
    inject,
    Injector,
    input,
    model,
    output,
    signal,
    untracked
} from '@angular/core';
import { Field, FieldTree, form, FormField, FormRoot, ValidationError } from '@angular/forms/signals';

import { ThyFormGroup } from '../form-group.component';
import { ThyFormDirective } from '../form.directive';
import { THY_FORM_CONFIG_PROVIDER } from '../form.class';
import { ThyFormValidatorLoader } from '../form-validator-loader';
import { ThyDynamicFormSpanPipe } from './dynamic-form.pipe';
import { buildDynamicFormSchema } from './dynamic-form-schema';
import { buildDynamicFormValue, isSameDynamicFormValue, validateDynamicFormFields } from './dynamic-form-value';
import { resolveFieldErrorMessage } from './error-messages';
import {
    ThyDynamicFormStatus,
    ThyDynamicFormValue,
    ThyFormFieldAsyncValidator,
    ThyFormFieldSchema,
    ThyFormFieldValidator,
    ThyFormFieldValueChange
} from './types';

interface FieldTreeRebuildDependency {
    readonly key: string;
    readonly kind: ThyFormFieldSchema['kind'];
    readonly validators: readonly ThyFormFieldValidator[];
    readonly asyncValidators: readonly ThyFormFieldAsyncValidator[];
}

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
        FormRoot,
        FormField,
        ThyFormGroup,
        ThyRowDirective,
        ThyColDirective,
        ThySelect,
        ThyInputDirective,
        ThyInputNumber,
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
        class: 'thy-form thy-dynamic-form'
    }
})
export class ThyDynamicForm {
    /**
     * 字段配置，kind 目前支持 input、textarea、select
     * @type ThyFormFieldSchema[]
     * @default []
     */
    readonly thyFields = input<ThyFormFieldSchema[]>([]);

    /** 表单值。支持双向绑定；不传时用各字段的 defaultValue */
    readonly thyValue = model<ThyDynamicFormValue>({});

    /**
     * 表单控件大小
     * @type xs | sm | md | lg
     * @default md
     */
    readonly thySize = input<ThyFormControlSize, ThyFormControlSize | null | undefined>('md', {
        transform: value => value ?? 'md'
    });

    readonly isHorizontal = false;

    /** 组件内部修改单个字段时触发。 */
    readonly thyFieldValueChange = output<ThyFormFieldValueChange>();

    /** Signal Forms 状态变化时触发。 */
    readonly thyStatusChange = output<ThyDynamicFormStatus>();

    /** 表单通过校验并提交时触发。 */
    readonly thySubmit = output<ThyDynamicFormValue>();

    private readonly injector = inject(Injector);
    private readonly validatorLoader = inject(ThyFormValidatorLoader);
    protected readonly fields = computed(() => validateDynamicFormFields(this.thyFields() || []));
    private readonly fieldTreeRebuildDependencies = computed<readonly FieldTreeRebuildDependency[]>(
        () => {
            return this.fields()
                .map(field => {
                    return {
                        key: field.key,
                        kind: field.kind,
                        validators: [...(field.validators ?? [])],
                        asyncValidators: [...(field.asyncValidators ?? [])]
                    };
                })
                .sort((previous, current) => {
                    return previous.key.localeCompare(current.key);
                });
        },
        { equal: isSameFieldTreeRebuildDependencies }
    );
    private readonly fieldTreeSignal = signal<FieldTree<ThyDynamicFormValue> | undefined>(undefined);
    private previousFieldValue: ThyDynamicFormValue = {};

    get fieldTree(): FieldTree<ThyDynamicFormValue> {
        return this.fieldTreeSignal()!;
    }

    readonly status = computed<ThyDynamicFormStatus>(
        () => {
            const state = this.fieldTree();
            return {
                valid: state.valid(),
                invalid: state.invalid(),
                submitting: state.submitting()
            };
        },
        { equal: isSameDynamicFormStatus }
    );

    constructor() {
        console.log('--test--');
        effect(() => {
            this.fieldTreeRebuildDependencies();
            this.fieldTreeSignal.set(untracked(() => this.createFieldTree()));
        });

        let previousStableStatus: ThyDynamicFormStatus | undefined;
        effect(() => {
            const status = this.status();
            if (this.fieldTree().pending()) {
                return;
            }
            if (previousStableStatus && !isSameDynamicFormStatus(previousStableStatus, status)) {
                this.thyStatusChange.emit(status);
            }
            previousStableStatus = status;
        });

        effect(() => {
            const value = this.thyValue();
            this.previousFieldValue = value;
        });

        afterNextRender(() => {
            this.thyValue.subscribe(value => {
                const previousValue = this.previousFieldValue;
                this.previousFieldValue = value;
                this.emitFieldValueChanges(previousValue, value);
            });
        });
    }

    private createFieldTree(): FieldTree<ThyDynamicFormValue> {
        const normalizedValue = buildDynamicFormValue(this.fields(), this.thyValue());
        if (!isSameDynamicFormValue(this.thyValue(), normalizedValue)) {
            this.thyValue.set(normalizedValue);
        }

        return form(this.thyValue, buildDynamicFormSchema(this.fields), {
            injector: this.injector,
            submission: {
                ignoreValidators: 'none',
                action: async submittedField => {
                    this.thySubmit.emit(submittedField().value());
                }
            }
        });
    }

    reset(value?: ThyDynamicFormValue): void {
        this.fieldTree().reset(buildDynamicFormValue(this.fields(), value));
    }

    protected handleReset(event: Event): void {
        event.preventDefault();
        this.reset();
    }

    getField<TValue = unknown>(key: string): Field<TValue> {
        return this.fieldTree[key] as unknown as Field<TValue>;
    }

    protected errorMessage(field: ThyFormFieldSchema, error: ValidationError | undefined): string | null {
        return resolveFieldErrorMessage(field, error, (name, code) => this.validatorLoader.getErrorMessage(name, code));
    }

    private emitFieldValueChanges(previousValue: ThyDynamicFormValue, value: ThyDynamicFormValue): void {
        for (const field of this.fields()) {
            if (!Object.is(previousValue[field.key], value[field.key])) {
                this.thyFieldValueChange.emit({ key: field.key, value: value[field.key] });
            }
        }
    }
}

function isSameDynamicFormStatus(previous: ThyDynamicFormStatus, current: ThyDynamicFormStatus): boolean {
    return previous.valid === current.valid && previous.invalid === current.invalid && previous.submitting === current.submitting;
}

function isSameFieldTreeRebuildDependencies(
    previous: readonly FieldTreeRebuildDependency[],
    current: readonly FieldTreeRebuildDependency[]
): boolean {
    return (
        previous.length === current.length &&
        previous.every((dependency, index) => {
            const currentDependency = current[index];
            return (
                dependency.key === currentDependency.key &&
                dependency.kind === currentDependency.kind &&
                isSameReferences(dependency.validators, currentDependency.validators) &&
                isSameReferences(dependency.asyncValidators, currentDependency.asyncValidators)
            );
        })
    );
}

function isSameReferences<T>(previous: readonly T[], current: readonly T[]): boolean {
    return previous.length === current.length && previous.every((item, index) => Object.is(item, current[index]));
}
