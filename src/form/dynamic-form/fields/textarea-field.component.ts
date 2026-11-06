import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Field, FormField } from '@angular/forms/signals';
import { ThyFormControlSize } from 'ngx-tethys/core';
import { ThyInputDirective } from 'ngx-tethys/input';
import { SafeAny } from 'ngx-tethys/types';

import { ThyFormTextareaFieldSchema } from '../types';

@Component({
    selector: 'thy-dynamic-form-textarea-field',
    template: `
        <textarea
            thyInput
            [formField]="field()"
            [id]="fieldSchema().key"
            [class.is-invalid]="invalid()"
            [attr.placeholder]="fieldSchema().props?.placeholder || null"
            [attr.rows]="fieldSchema().props?.rows ?? 3"
            [style.resize]="fieldSchema().props?.resize ?? 'none'"
            [thySize]="size()"></textarea>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FormField, ThyInputDirective]
})
export class ThyDynamicFormTextareaField {
    readonly field = input.required<Field<SafeAny>>();
    readonly fieldSchema = input.required<ThyFormTextareaFieldSchema>();
    readonly size = input<ThyFormControlSize>('md');
    readonly invalid = input(false);
}
