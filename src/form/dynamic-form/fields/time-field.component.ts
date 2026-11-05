import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ThyFormControlSize } from 'ngx-tethys/core';
import { Field, FormField } from '@angular/forms/signals';
import { SafeAny } from 'ngx-tethys/types';
import { ThyTimePicker } from 'ngx-tethys/time-picker';

import { ThyFormTimeFieldProps } from '../types';

@Component({
    selector: 'thy-dynamic-form-time-field',
    template: `
        <thy-time-picker
            [formField]="field()"
            [id]="key()"
            [class.is-invalid]="invalid()"
            [thySize]="size()"
            [thyPlaceholder]="props()?.placeholder"
            [thyFormat]="props()?.format"
            [thyAllowClear]="props()?.allowClear ?? true"
            [thyShowSelectNow]="props()?.showSelectNow ?? true"
            [thyDisabled]="field()().disabled()"
            [thyReadonly]="field()().readonly()" />
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FormField, ThyTimePicker]
})
export class ThyDynamicFormTimeField {
    readonly field = input.required<Field<SafeAny>>();
    readonly props = input<ThyFormTimeFieldProps>();
    readonly size = input<ThyFormControlSize>('md');
    readonly invalid = input(false);
    readonly key = input('');
}
