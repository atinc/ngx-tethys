import { Component, forwardRef, HostBinding, HostListener, Input, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ThyTranslate } from 'ngx-tethys/core';
import { coerceBooleanProperty } from 'ngx-tethys/util';

import { ThyFormCheckBaseComponent } from 'ngx-tethys/shared';

const noop = () => {};

@Component({
    selector: 'thy-checkbox,[thy-checkbox],[thyCheckbox]',
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
        this.isIndeterminate = coerceBooleanProperty(value);
    }

    constructor(thyTranslate: ThyTranslate) {
        super(thyTranslate);
    }
}
