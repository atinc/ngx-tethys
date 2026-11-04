import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ThyFormControlSize } from 'ngx-tethys/core';
import { Field, FormField } from '@angular/forms/signals';
import { SafeAny } from 'ngx-tethys/types';
import { ThyRadio, ThyRadioButton, ThyRadioGroup } from 'ngx-tethys/radio';

import { ThyFormRadioFieldProps } from '../types';

@Component({
    selector: 'thy-dynamic-form-radio-field',
    template: `
        <thy-radio-group
            [formField]="field()"
            [thySize]="size()"
            [thyLayout]="props()?.layout"
            [thyDisabled]="field()().disabled()">
            @for (option of props()?.options ?? []; track option.value) {
                @if (props()?.button) {
                    <label
                        thyRadioButton
                        [thyLabelText]="option.label"
                        [thyValue]="option.value"
                        [thyDisabled]="field()().disabled()"></label>
                } @else {
                    <label
                        thyRadio
                        [thyLabelText]="option.label"
                        [thyValue]="option.value"
                        [thyDisabled]="field()().disabled()"></label>
                }
            }
        </thy-radio-group>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FormField, ThyRadio, ThyRadioButton, ThyRadioGroup]
})
export class ThyDynamicFormRadioField {
    readonly field = input.required<Field<SafeAny>>();
    readonly props = input<ThyFormRadioFieldProps>();
    readonly size = input<ThyFormControlSize>('md');
    readonly invalid = input(false);
    readonly key = input('');
}
