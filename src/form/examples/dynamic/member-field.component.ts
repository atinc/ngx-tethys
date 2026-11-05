import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Field, FormField } from '@angular/forms/signals';
import { ThyFormControlSize } from 'ngx-tethys/core';
import { ThyFormFieldBaseProps, ThyFormFieldBaseSchema } from 'ngx-tethys/form';
import { ThySelect } from 'ngx-tethys/select';
import { SafeAny } from 'ngx-tethys/types';

export interface ThyFormMemberFieldExampleProps extends ThyFormFieldBaseProps {
    options?: { value: string; label: string }[];
}

export interface ThyFormMemberFieldExampleSchema extends ThyFormFieldBaseSchema<'member', ThyFormMemberFieldExampleProps> {}

@Component({
    selector: 'thy-dynamic-form-member-field-example',
    template: `
        <thy-select
            [formField]="field()"
            [id]="fieldSchema().key"
            [class.is-invalid]="invalid()"
            [thyDisabled]="field()().disabled()"
            [thyMultiple]="fieldSchema().props?.multiple"
            [thyOptions]="fieldSchema().props?.options ?? []"
            [thyPlaceholder]="fieldSchema().props?.placeholder ?? 'Select member'"
            [thySize]="size()" />
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FormField, ThySelect]
})
export class ThyDynamicFormMemberFieldExample {
    readonly field = input.required<Field<SafeAny>>();
    readonly fieldSchema = input.required<ThyFormMemberFieldExampleSchema>();
    readonly size = input<ThyFormControlSize>('md');
    readonly invalid = input(false);
}
