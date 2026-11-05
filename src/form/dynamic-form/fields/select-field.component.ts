import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ThyFormControlSize } from 'ngx-tethys/core';
import { Field, FormField } from '@angular/forms/signals';
import { SafeAny } from 'ngx-tethys/types';
import { ThySelect } from 'ngx-tethys/select';

import { ThyFormSelectFieldProps } from '../types';

@Component({
    selector: 'thy-dynamic-form-select-field',
    template: `
        <thy-select
            [formField]="field()"
            [id]="key()"
            [class.is-invalid]="invalid()"
            [thyDisabled]="field()().disabled()"
            [thyOptions]="props()?.options ?? []"
            [thyPlaceholder]="props()?.placeholder ?? ''"
            [thySearchable]="props()?.searchable"
            [thyClearable]="props()?.clearable"
            [thyMultiple]="props()?.multiple"
            [thyEmptyStateText]="props()?.emptyText ?? ''"
            [thySearchEmptyText]="props()?.searchEmptyText ?? ''"
            [thySize]="size()" />
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FormField, ThySelect]
})
export class ThyDynamicFormSelectField {
    readonly field = input.required<Field<SafeAny>>();
    readonly props = input<ThyFormSelectFieldProps>();
    readonly size = input<ThyFormControlSize>('md');
    readonly invalid = input(false);
    readonly key = input('');
}
