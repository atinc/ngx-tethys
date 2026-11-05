import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Field, FormField } from '@angular/forms/signals';
import { ThyFormControlSize } from 'ngx-tethys/core';
import { ThySelect } from 'ngx-tethys/select';
import { SafeAny } from 'ngx-tethys/types';

import { ThyFormSelectFieldSchema } from '../types';

@Component({
    selector: 'thy-dynamic-form-select-field',
    template: `
        <thy-select
            [formField]="field()"
            [id]="fieldSchema().key"
            [class.is-invalid]="invalid()"
            [thyDisabled]="field()().disabled()"
            [thyOptions]="fieldSchema().props?.options ?? []"
            [thyPlaceholder]="fieldSchema().props?.placeholder ?? ''"
            [thySearchable]="fieldSchema().props?.searchable"
            [thyClearable]="fieldSchema().props?.clearable"
            [thyMultiple]="fieldSchema().props?.multiple"
            [thyEmptyStateText]="fieldSchema().props?.emptyText ?? ''"
            [thySearchEmptyText]="fieldSchema().props?.searchEmptyText ?? ''"
            [thySize]="size()" />
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FormField, ThySelect]
})
export class ThyDynamicFormSelectField {
    readonly field = input.required<Field<SafeAny>>();
    readonly fieldSchema = input.required<ThyFormSelectFieldSchema>();
    readonly size = input<ThyFormControlSize>('md');
    readonly invalid = input(false);
}
