import { coerceNumberProperty } from '@angular/cdk/coercion';
import { resource, Signal } from '@angular/core';
import {
    debounce,
    disabled,
    max,
    maxLength,
    min,
    minLength,
    pattern,
    readonly as readonlyField,
    required,
    SchemaFn,
    SchemaPath,
    validate,
    validateAsync
} from '@angular/forms/signals';

import { ThyDynamicFormValue, ThyFormFieldAsyncValidator, ThyFormFieldConfig, ThyFormFieldValidator } from './types';

export function buildDynamicFormSchema(fields: Signal<readonly ThyFormFieldConfig[]>): SchemaFn<ThyDynamicFormValue> {
    return rootPath => {
        for (const field of fields()) {
            const fieldPath = rootPath[field.key] as unknown as SchemaPath<unknown>;
            const currentField = () => fields().find(candidate => candidate.key === field.key);
            const currentProps = () => currentField()?.props;

            required(fieldPath, { when: () => !!currentProps()?.required });
            disabled(fieldPath, { when: () => !!currentProps()?.disabled });
            readonlyField(fieldPath, { when: () => !!currentProps()?.readonly });
            if (field.debounce !== undefined) {
                debounce(fieldPath, field.debounce);
            }

            if (field.kind === 'input' || field.kind === 'textarea') {
                bindTextRules(fieldPath as unknown as SchemaPath<string>, currentField);
            }
            if (field.kind === 'number') {
                bindNumberRules(fieldPath as unknown as SchemaPath<number | null>, currentField);
            }

            bindCustomValidators(rootPath, fieldPath, field.validators ?? []);
            bindAsyncValidators(rootPath, fieldPath, field.asyncValidators ?? []);
        }
    };
}

function bindTextRules(fieldPath: SchemaPath<string>, resolveField: () => ThyFormFieldConfig | undefined): void {
    const props = () => {
        const field = resolveField();
        return field?.kind === 'input' || field?.kind === 'textarea' ? field.props : undefined;
    };

    minLength(fieldPath, () => toOptionalNumber(props()?.minlength));
    maxLength(fieldPath, () => toOptionalNumber(props()?.maxlength));
    pattern(fieldPath, () => {
        const value = props()?.pattern;
        return value ? new RegExp(value) : undefined;
    });
}

function bindNumberRules(fieldPath: SchemaPath<number | null>, resolveField: () => ThyFormFieldConfig | undefined): void {
    const props = () => {
        const field = resolveField();
        return field?.kind === 'number' ? field.props : undefined;
    };

    min(fieldPath, () => toOptionalNumber(props()?.min));
    max(fieldPath, () => toOptionalNumber(props()?.max));
}

function toOptionalNumber(value: unknown): number | undefined {
    return coerceNumberProperty(value, null) ?? undefined;
}

function bindCustomValidators(
    rootPath: Parameters<SchemaFn<ThyDynamicFormValue>>[0],
    fieldPath: SchemaPath<unknown>,
    validators: readonly ThyFormFieldValidator[]
): void {
    for (const validator of validators) {
        validate(fieldPath, context =>
            validator({
                value: context.value(),
                form: context.valueOf(rootPath)
            })
        );
    }
}

function bindAsyncValidators(
    rootPath: Parameters<SchemaFn<ThyDynamicFormValue>>[0],
    fieldPath: SchemaPath<unknown>,
    validators: readonly ThyFormFieldAsyncValidator[]
): void {
    for (const validator of validators) {
        validateAsync(fieldPath, {
            params: context => ({
                value: context.value(),
                form: context.valueOf(rootPath)
            }),
            factory: params =>
                resource({
                    params: () => params(),
                    loader: ({ params: validatorContext }) => {
                        if (!validatorContext) {
                            return Promise.resolve(null);
                        }
                        return validator(validatorContext);
                    }
                }),
            onSuccess: result => result,
            onError: error => ({
                kind: 'asyncValidation',
                message: error instanceof Error ? error.message : String(error)
            })
        });
    }
}
