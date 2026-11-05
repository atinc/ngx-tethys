import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Field, FormField } from '@angular/forms/signals';
import { ThyCheckbox } from 'ngx-tethys/checkbox';
import { ThyFormControlSize } from 'ngx-tethys/core';
import { SafeAny } from 'ngx-tethys/types';

import { ThyFormFieldBaseProps } from '../types';

@Component({
    selector: 'thy-dynamic-form-checkbox-field',
    template: ` <thy-checkbox [formField]="field()" [id]="key()" [class.is-invalid]="invalid()" [thyDisabled]="field()().disabled()" /> `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FormField, ThyCheckbox]
})
export class ThyDynamicFormCheckboxField {
    readonly field = input.required<Field<SafeAny>>();
    readonly props = input<ThyFormFieldBaseProps>();
    readonly size = input<ThyFormControlSize>('md');
    readonly invalid = input(false);
    readonly key = input('');
}
