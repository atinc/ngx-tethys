import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ThyFormControlSize } from 'ngx-tethys/core';
import { Field, FormField } from '@angular/forms/signals';
import { SafeAny } from 'ngx-tethys/types';
import { ThyDatePicker } from 'ngx-tethys/date-picker';

import { ThyFormDateFieldProps } from '../types';

@Component({
    selector: 'thy-dynamic-form-date-field',
    template: `
        <thy-date-picker
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
            [thyDisabled]="field()().disabled()"
            [thyReadonly]="field()().readonly()" />
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FormField, ThyDatePicker]
})
export class ThyDynamicFormDateField {
    readonly field = input.required<Field<SafeAny>>();
    readonly props = input<ThyFormDateFieldProps>();
    readonly size = input<ThyFormControlSize>('md');
    readonly invalid = input(false);
    readonly key = input('');
}
