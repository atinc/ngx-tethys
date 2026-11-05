import { ThyFormControlSize } from 'ngx-tethys/core';
import { ThyViewOutletDirective } from 'ngx-tethys/shared';

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
import { Field, FieldTree, form, FormRoot, ValidationError } from '@angular/forms/signals';

import { ThyFormGroup } from '../form-group.component';
import { ThyFormValidatorLoader } from '../form-validator-loader';
import { THY_FORM_CONFIG, ThyFormLayout } from '../form.class';
import { ThyFormDirective } from '../form.directive';
import { createDynamicFormFieldTypeMap, injectThyDynamicFormFieldTypes, ThyDynamicFormFieldType } from './dynamic-form-field-types';
import { buildDynamicFormSchema } from './dynamic-form-schema';
import { buildDynamicFormValue, isSameDynamicFormValue, validateDynamicFormFields } from './dynamic-form-value';
import { resolveFieldErrorMessage } from './error-messages';
import { THY_DYNAMIC_FORM_BUILTIN_FIELD_TYPES } from './fields';
import {
    ThyDynamicFormFieldSchema,
    ThyDynamicFormStatus,
    ThyDynamicFormValue,
    ThyFormFieldAsyncValidator,
    ThyFormFieldValidator,
    ThyFormFieldValueChange
} from './types';

interface FieldTreeRebuildDependency {
    readonly key: string;
    readonly kind: string;
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
    imports: [FormRoot, ThyFormGroup, ThyViewOutletDirective],
    providers: [
        {
            provide: ThyFormDirective,
            useExisting: ThyDynamicForm
        },
        ThyFormValidatorLoader
    ],
    host: {
        class: 'thy-form thy-dynamic-form',
        '[class.thy-form-horizontal]': 'layout() === "horizontal"',
        '[class.thy-form-vertical]': 'layout() === "vertical"',
        '[class.thy-dynamic-form-inline]': 'layout() === "inline"',
        '[class.thy-dynamic-form-xs]': 'thySize() === "xs"',
        '[class.thy-dynamic-form-sm]': 'thySize() === "sm"',
        '[class.thy-dynamic-form-lg]': 'thySize() === "lg"',
        '[style.--thy-dynamic-form-label-width]': 'thyLabelWidth()'
    }
})
export class ThyDynamicForm {
    /**
     * 字段配置。内置见 `ThyFormFieldSchema`；自定义用 `ThyFormFieldSchemaWith` 扩展。
     * @type ThyDynamicFormFieldSchema[]
     * @default []
     */
    readonly thyFields = input<ThyDynamicFormFieldSchema[]>([]);

    /** 表单值。支持双向绑定；不传时用各字段的 defaultValue */
    readonly thyValue = model<ThyDynamicFormValue>({});

    /**
     * 表单布局，与 `thyForm` 一致。`horizontal` 左右布局；`vertical` 上下布局；`inline` 行内布局。
     * 未传入时回落 `THY_FORM_CONFIG.layout`（默认 `horizontal`）。
     * @type horizontal | vertical | inline
     * @default horizontal
     */
    readonly thyLayout = input<ThyFormLayout>();

    /**
     * 表单控件大小
     * @type xs | sm | md | lg
     * @default md
     */
    readonly thySize = input<ThyFormControlSize, ThyFormControlSize | null | undefined>('md', {
        transform: value => value ?? 'md'
    });

    /**
     * Horizontal 下 label 固定宽度，默认 `120px`；`vertical` / `inline` 不生效。
     */
    readonly thyLabelWidth = input('120px');

    private readonly config = inject(THY_FORM_CONFIG, { optional: true });

    protected readonly layout = computed(() => this.thyLayout() || this.config?.layout || 'horizontal');

    get isHorizontal(): boolean {
        return this.layout() === 'horizontal';
    }

    private readonly injectedFieldTypes = injectThyDynamicFormFieldTypes();

    protected readonly fieldTypeMap = computed(() =>
        createDynamicFormFieldTypeMap(THY_DYNAMIC_FORM_BUILTIN_FIELD_TYPES, this.injectedFieldTypes)
    );

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

    protected resolveFieldType(kind: string): ThyDynamicFormFieldType | undefined {
        return this.fieldTypeMap().get(kind);
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

    protected errorMessage(field: ThyDynamicFormFieldSchema, error: ValidationError | undefined): string | null {
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
