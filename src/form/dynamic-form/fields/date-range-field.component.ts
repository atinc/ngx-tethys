import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ThyFormControlSize } from 'ngx-tethys/core';
import { Field, FormField } from '@angular/forms/signals';
import { SafeAny } from 'ngx-tethys/types';
import { ThyRangePicker } from 'ngx-tethys/date-picker';

import { ThyFormDateRangeFieldProps } from '../types';

@Component({
    selector: 'thy-dynamic-form-date-range-field',
    template: `
        <thy-range-picker
            [formField]="field()"
            [id]="key()"
            [class.is-invalid]="invalid()"
            [thySize]="size()"
            [thyPlaceholder]="props()?.placeholder"
            [thyFormat]="props()?.format"
            [thyMinDate]="props()?.min"
            [thyMaxDate]="props()?.max"
            [thyAllowClear]="props()?.allowClear ?? true"
            [thyShowTime]="props()?.showTime ?? false"
            [thyDisabledDate]="props()?.disabledDate"
            [thyReadonly]="field()().readonly()" />
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FormField, ThyRangePicker]
})
export class ThyDynamicFormDateRangeField {
    readonly field = input.required<Field<SafeAny>>();
    readonly props = input<ThyFormDateRangeFieldProps>();
    readonly size = input<ThyFormControlSize>('md');
    readonly invalid = input(false);
    readonly key = input('');
}
