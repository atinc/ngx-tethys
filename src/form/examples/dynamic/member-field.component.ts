import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormField } from '@angular/forms/signals';
import { ThyDynamicFormFieldBase } from 'ngx-tethys/form';
import { ThySelect } from 'ngx-tethys/select';

interface MemberFieldProps {
    label?: string;
    placeholder?: string;
    multiple?: boolean;
    options?: { value: string; label: string }[];
}

/**
 * 示例用 mock 选人字段（非真实选人控件）。
 */
@Component({
    selector: 'thy-form-dynamic-member-field-example',
    template: `
        <thy-select
            [formField]="field()"
            [id]="key()"
            [class.is-invalid]="invalid()"
            [thyMultiple]="props()?.multiple"
            [thyOptions]="props()?.options ?? []"
            [thyPlaceholder]="props()?.placeholder ?? 'Select member'"
            [thySize]="size()" />
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FormField, ThySelect]
})
export class ThyFormDynamicMemberFieldExample extends ThyDynamicFormFieldBase<MemberFieldProps> {}
