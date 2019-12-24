import { Component, forwardRef, HostBinding, HostListener, Input, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ThyTranslate } from '../shared';
import { inputValueToBoolean } from '../util/helpers';

import { ThyFormCheckBaseComponent } from '../shared';

const noop = () => {};

@Component({
    selector: '[thy-checkbox],[thyCheckbox]',
    templateUrl: './checkbox.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ThyCheckboxComponent),
            multi: true
        }
    ]
})
export class ThyCheckboxComponent extends ThyFormCheckBaseComponent {
    isIndeterminate = false;

    @Input()
    set thyIndeterminate(value: boolean) {
        this.isIndeterminate = inputValueToBoolean(value);
    }

    constructor(thyTranslate: ThyTranslate) {
        super(thyTranslate);
    }
}
