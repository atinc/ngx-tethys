import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ThyFormControlSize } from 'ngx-tethys/core';
import { Field, FormField } from '@angular/forms/signals';
import { SafeAny } from 'ngx-tethys/types';
import { ThyInputDirective } from 'ngx-tethys/input';

import { ThyFormTextareaFieldProps } from '../types';

@Component({
    selector: 'thy-dynamic-form-textarea-field',
    template: `
        <textarea
            thyInput
            [formField]="field()"
            [id]="key()"
            [class.is-invalid]="invalid()"
            [attr.placeholder]="props()?.placeholder || null"
            [attr.rows]="props()?.rows ?? 3"
            [style.resize]="props()?.resize ?? 'none'"
            [thySize]="size()"></textarea>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FormField, ThyInputDirective]
})
export class ThyDynamicFormTextareaField {
    readonly field = input.required<Field<SafeAny>>();
    readonly props = input<ThyFormTextareaFieldProps>();
    readonly size = input<ThyFormControlSize>('md');
    readonly invalid = input(false);
    readonly key = input('');
}
