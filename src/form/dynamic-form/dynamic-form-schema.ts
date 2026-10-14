import { coerceNumberProperty } from '@angular/cdk/coercion';
import { resource, Signal } from '@angular/core';
import {
    debounce,
    disabled,
    max,
    maxDateError,
    maxLength,
    min,
    minDateError,
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
import { fromUnixTime, isObject, isValid, startOfDay } from 'ngx-tethys/util';

import { ThyDynamicFormValue, ThyFormFieldAsyncValidator, ThyFormFieldSchema, ThyFormFieldValidator } from './types';

interface DisabledDateValidationError extends ValidationError {
    readonly kind: 'disabledDate';
    readonly date: Date;
}

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
            if (field.kind === 'date' || field.kind === 'dateRange') {
                bindDateRules(fieldPath, currentField);
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

function bindDateRules(fieldPath: SchemaPath<unknown>, resolveField: () => ThyFormFieldSchema | undefined): void {
    validate(fieldPath, context => {
        const field = resolveField();
        if (field?.kind !== 'date' && field?.kind !== 'dateRange') {
            return null;
        }

        const dates = field.kind === 'date' ? toDates(context.value()) : toDateRange(context.value());
        if (!dates.length) {
            return null;
        }

        const minDate = normalizeDate(field.props?.min);
        const maxDate = normalizeDate(field.props?.max);
        const errors: ValidationError[] = [];

        if (minDate && dates.some(date => startOfDay(date).getTime() < startOfDay(minDate).getTime())) {
            errors.push(minDateError(minDate));
        }
        if (maxDate && dates.some(date => startOfDay(date).getTime() > startOfDay(maxDate).getTime())) {
            errors.push(maxDateError(maxDate));
        }

        const disabledDate = field.props?.disabledDate;
        const disabledValue = disabledDate ? dates.find(date => disabledDate(date)) : undefined;
        if (disabledValue) {
            const error: DisabledDateValidationError = { kind: 'disabledDate', date: disabledValue };
            errors.push(error);
        }

        return errors;
    });
}

function toDates(value: unknown): Date[] {
    const dateValue = isObject(value) && 'date' in value ? value['date'] : value;
    const date = normalizeDate(dateValue);
    return date ? [date] : [];
}

function toDateRange(value: unknown): Date[] {
    if (Array.isArray(value)) {
        return value.map(normalizeDate).filter((date): date is Date => !!date);
    }
    if (!isObject(value)) {
        return [];
    }
    return [normalizeDate('begin' in value ? value['begin'] : undefined), normalizeDate('end' in value ? value['end'] : undefined)].filter(
        (date): date is Date => !!date
    );
}

function normalizeDate(value: unknown): Date | undefined {
    if (!(value instanceof Date) && (typeof value !== 'number' || !Number.isFinite(value))) {
        return undefined;
    }

    const date = value instanceof Date ? value : Math.abs(value).toString().length < 13 ? fromUnixTime(value) : new Date(value);
    return isValid(date) ? date : undefined;
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
