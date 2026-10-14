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
    validateAsync,
    ValidationError
} from '@angular/forms/signals';

import { ThyDynamicFormValue, ThyFormFieldAsyncValidator, ThyFormFieldSchema, ThyFormFieldValidator } from './types';

export function buildDynamicFormSchema(fields: Signal<readonly ThyFormFieldSchema[]>): SchemaFn<ThyDynamicFormValue> {
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

function bindTextRules(fieldPath: SchemaPath<string>, resolveField: () => ThyFormFieldSchema | undefined): void {
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

function bindNumberRules(fieldPath: SchemaPath<number | null>, resolveField: () => ThyFormFieldSchema | undefined): void {
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
    if (!validators.length) {
        return;
    }

    validate(fieldPath, context => {
        const validatorContext = {
            value: context.value(),
            formValue: context.valueOf(rootPath)
        };
        return validators.flatMap(validator => normalizeValidationErrors(validator(validatorContext)));
    });
}

function bindAsyncValidators(
    rootPath: Parameters<SchemaFn<ThyDynamicFormValue>>[0],
    fieldPath: SchemaPath<unknown>,
    validators: readonly ThyFormFieldAsyncValidator[]
): void {
    if (!validators.length) {
        return;
    }

    validateAsync(fieldPath, {
        params: context => ({
            value: context.value(),
            formValue: context.valueOf(rootPath)
        }),
        factory: params =>
            resource({
                params: () => params(),
                loader: ({ params: validatorContext }) =>
                    validatorContext ? runAsyncValidators(validators, validatorContext) : Promise.resolve([])
            }),
        onSuccess: result => result,
        onError: toAsyncValidationError
    });
}

async function runAsyncValidators(
    validators: readonly ThyFormFieldAsyncValidator[],
    validatorContext: Parameters<ThyFormFieldAsyncValidator>[0]
): Promise<ValidationError[]> {
    const results = await Promise.all(
        validators.map(async validator => {
            try {
                return await validator(validatorContext);
            } catch (error) {
                return toAsyncValidationError(error);
            }
        })
    );
    return results.flatMap(normalizeValidationErrors);
}

function normalizeValidationErrors(result: ValidationError | ValidationError[] | null): ValidationError[] {
    if (!result) {
        return [];
    }
    return Array.isArray(result) ? result : [result];
}

function toAsyncValidationError(error: unknown): ValidationError {
    return {
        kind: 'asyncValidation',
        message: error instanceof Error ? error.message : String(error)
    };
}
