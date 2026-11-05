import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ThyFormControlSize } from 'ngx-tethys/core';
import { Field, FormField } from '@angular/forms/signals';
import { SafeAny } from 'ngx-tethys/types';
import { ThySwitch } from 'ngx-tethys/switch';

import { ThyFormSwitchFieldProps } from '../types';

@Component({
    selector: 'thy-dynamic-form-switch-field',
    template: `
        <thy-switch
            [formField]="field()"
            [id]="key()"
            [thyColor]="props()?.color"
            [thyDisabled]="field()().disabled()"
            [thySize]="size()" />
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FormField, ThySwitch]
})
export class ThyDynamicFormSwitchField {
    readonly field = input.required<Field<SafeAny>>();
    readonly props = input<ThyFormSwitchFieldProps>();
    readonly size = input<ThyFormControlSize>('md');
    readonly invalid = input(false);
    readonly key = input('');
}
