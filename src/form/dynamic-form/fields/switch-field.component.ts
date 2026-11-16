import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Field, FormField } from '@angular/forms/signals';
import { ThyFormControlSize } from 'ngx-tethys/core';
import { ThySwitch } from 'ngx-tethys/switch';
import { SafeAny } from 'ngx-tethys/types';

import { ThyFormSwitchFieldSchema } from '../types';

@Component({
    selector: 'thy-dynamic-form-switch-field',
    template: `
        <thy-switch
            [formField]="field()"
            [id]="fieldSchema().key"
            [thyColor]="fieldSchema().props?.color"
            [thyDisabled]="field()().disabled()"
            [thySize]="size()" />
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FormField, ThySwitch]
})
export class ThyDynamicFormSwitchField {
    readonly field = input.required<Field<SafeAny>>();
    readonly fieldSchema = input.required<ThyFormSwitchFieldSchema>();
    readonly size = input<ThyFormControlSize>('md');
    readonly invalid = input(false);
}
