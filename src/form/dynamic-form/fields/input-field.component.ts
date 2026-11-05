import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Field, FormField } from '@angular/forms/signals';
import { ThyFormControlSize } from 'ngx-tethys/core';
import { ThyInputDirective } from 'ngx-tethys/input';
import { SafeAny } from 'ngx-tethys/types';

import { ThyFormInputFieldSchema } from '../types';

@Component({
    selector: 'thy-dynamic-form-input-field',
    template: `
        <input
            thyInput
            [formField]="field()"
            [id]="fieldSchema().key"
            [class.is-invalid]="invalid()"
            [attr.placeholder]="fieldSchema().props?.placeholder || null"
            [attr.type]="fieldSchema().props?.type || 'text'"
            [thySize]="size()" />
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FormField, ThyInputDirective]
})
export class ThyDynamicFormInputField {
    readonly field = input.required<Field<SafeAny>>();
    readonly fieldSchema = input.required<ThyFormInputFieldSchema>();
    readonly size = input<ThyFormControlSize>('md');
    readonly invalid = input(false);
}
