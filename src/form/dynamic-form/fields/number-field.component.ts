import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Field, FormField } from '@angular/forms/signals';
import { ThyFormControlSize } from 'ngx-tethys/core';
import { ThyInputNumber } from 'ngx-tethys/input-number';
import { SafeAny } from 'ngx-tethys/types';

import { ThyFormNumberFieldSchema } from '../types';

@Component({
    selector: 'thy-dynamic-form-number-field',
    template: `
        <thy-input-number
            [formField]="field()"
            [id]="fieldSchema().key"
            [attr.name]="fieldSchema().key"
            [class.is-invalid]="invalid()"
            [thyDisabled]="field()().disabled()"
            [thyPlaceholder]="fieldSchema().props?.placeholder || null"
            [thySuffix]="fieldSchema().props?.suffix"
            [thyMax]="fieldSchema().props?.max"
            [thyMin]="fieldSchema().props?.min"
            [thyStep]="fieldSchema().props?.step"
            [thySize]="size()" />
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FormField, ThyInputNumber]
})
export class ThyDynamicFormNumberField {
    readonly field = input.required<Field<SafeAny>>();
    readonly fieldSchema = input.required<ThyFormNumberFieldSchema>();
    readonly size = input<ThyFormControlSize>('md');
    readonly invalid = input(false);
}
