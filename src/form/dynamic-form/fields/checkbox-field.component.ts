import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Field, FormField } from '@angular/forms/signals';
import { ThyCheckbox } from 'ngx-tethys/checkbox';
import { SafeAny } from 'ngx-tethys/types';

import { ThyFormCheckboxFieldSchema } from '../types';

@Component({
    selector: 'thy-dynamic-form-checkbox-field',
    template: `
        <thy-checkbox
            [formField]="field()"
            [id]="fieldSchema().key"
            [class.is-invalid]="invalid()"
            [thyDisabled]="field()().disabled()" />
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FormField, ThyCheckbox]
})
export class ThyDynamicFormCheckboxField {
    readonly field = input.required<Field<SafeAny>>();
    readonly fieldSchema = input.required<ThyFormCheckboxFieldSchema>();
    readonly size = input('md');
    readonly invalid = input(false);
}
