import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ThyFormControlSize } from 'ngx-tethys/core';
import { Field, FormField } from '@angular/forms/signals';
import { SafeAny } from 'ngx-tethys/types';
import { ThyInputDirective } from 'ngx-tethys/input';

import { ThyFormInputFieldProps } from '../types';

@Component({
    selector: 'thy-dynamic-form-input-field',
    template: `
        <input
            thyInput
            [formField]="field()"
            [id]="key()"
            [class.is-invalid]="invalid()"
            [attr.placeholder]="props()?.placeholder || null"
            [attr.type]="props()?.type || 'text'"
            [thySize]="size()" />
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FormField, ThyInputDirective]
})
export class ThyDynamicFormInputField {
    readonly field = input.required<Field<SafeAny>>();
    readonly props = input<ThyFormInputFieldProps>();
    readonly size = input<ThyFormControlSize>('md');
    readonly invalid = input(false);
    readonly key = input('');
}
