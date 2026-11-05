import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ThyFormControlSize } from 'ngx-tethys/core';
import { Field, FormField } from '@angular/forms/signals';
import { SafeAny } from 'ngx-tethys/types';
import { ThyInputNumber } from 'ngx-tethys/input-number';

import { ThyFormNumberFieldProps } from '../types';

@Component({
    selector: 'thy-dynamic-form-number-field',
    template: `
        <thy-input-number
            [formField]="field()"
            [id]="key()"
            [class.is-invalid]="invalid()"
            [thyDisabled]="field()().disabled()"
            [thyPlaceholder]="props()?.placeholder || null"
            [thySuffix]="props()?.suffix"
            [thyMax]="props()?.max"
            [thyMin]="props()?.min"
            [thyStep]="props()?.step"
            [thySize]="size()" />
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FormField, ThyInputNumber]
})
export class ThyDynamicFormNumberField {
    readonly field = input.required<Field<SafeAny>>();
    readonly props = input<ThyFormNumberFieldProps>();
    readonly size = input<ThyFormControlSize>('md');
    readonly invalid = input(false);
    readonly key = input('');
}
