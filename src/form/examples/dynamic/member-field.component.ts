import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Field, FormField } from '@angular/forms/signals';
import { ThyFormControlSize } from 'ngx-tethys/core';
import { ThySelect } from 'ngx-tethys/select';
import { SafeAny } from 'ngx-tethys/types';

interface MemberFieldProps {
    label?: string;
    placeholder?: string;
    multiple?: boolean;
    options?: { value: string; label: string }[];
}

/**
 * 示例用 mock 选人字段（非真实选人控件）。
 * duck-type 声明 field/props/size/invalid/key，不继承库内任何基类。
 */
@Component({
    selector: 'thy-dynamic-form-member-field-example',
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
export class ThyDynamicFormMemberFieldExample {
    readonly field = input.required<Field<SafeAny>>();
    readonly props = input<MemberFieldProps>();
    readonly size = input<ThyFormControlSize>('md');
    readonly invalid = input(false);
    readonly key = input('');
}
