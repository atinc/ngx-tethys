import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Field, FormField } from '@angular/forms/signals';
import { ThyFormControlSize } from 'ngx-tethys/core';
import { ThyTimePicker } from 'ngx-tethys/time-picker';
import { SafeAny } from 'ngx-tethys/types';

import { ThyFormTimeFieldSchema } from '../types';

@Component({
    selector: 'thy-dynamic-form-time-field',
    template: `
        <thy-time-picker
            [formField]="field()"
            [id]="fieldSchema().key"
            [class.is-invalid]="invalid()"
            [thySize]="size()"
            [thyPlaceholder]="fieldSchema().props?.placeholder"
            [thyFormat]="fieldSchema().props?.format"
            [thyAllowClear]="fieldSchema().props?.allowClear ?? true"
            [thyShowSelectNow]="fieldSchema().props?.showSelectNow ?? true"
            [thyDisabled]="field()().disabled()"
            [thyReadonly]="field()().readonly()" />
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FormField, ThyTimePicker]
})
export class ThyDynamicFormTimeField {
    readonly field = input.required<Field<SafeAny>>();
    readonly fieldSchema = input.required<ThyFormTimeFieldSchema>();
    readonly size = input<ThyFormControlSize>('md');
    readonly invalid = input(false);
}
