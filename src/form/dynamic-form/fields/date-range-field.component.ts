import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Field, FormField } from '@angular/forms/signals';
import { ThyFormControlSize } from 'ngx-tethys/core';
import { ThyRangePicker } from 'ngx-tethys/date-picker';
import { SafeAny } from 'ngx-tethys/types';

import { ThyFormDateRangeFieldSchema } from '../types';

@Component({
    selector: 'thy-dynamic-form-date-range-field',
    template: `
        <thy-range-picker
            [formField]="field()"
            [id]="fieldSchema().key"
            [class.is-invalid]="invalid()"
            [thySize]="size()"
            [thyPlaceholder]="fieldSchema().props?.placeholder"
            [thyFormat]="fieldSchema().props?.format"
            [thyMinDate]="fieldSchema().props?.min"
            [thyMaxDate]="fieldSchema().props?.max"
            [thyAllowClear]="fieldSchema().props?.allowClear ?? true"
            [thyShowTime]="fieldSchema().props?.showTime ?? false"
            [thyDisabledDate]="fieldSchema().props?.disabledDate"
            [thyDisabled]="field()().disabled()"
            [thyReadonly]="field()().readonly()" />
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FormField, ThyRangePicker]
})
export class ThyDynamicFormDateRangeField {
    readonly field = input.required<Field<SafeAny>>();
    readonly fieldSchema = input.required<ThyFormDateRangeFieldSchema>();
    readonly size = input<ThyFormControlSize>('md');
    readonly invalid = input(false);
}
