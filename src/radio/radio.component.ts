import { Component, forwardRef, HostBinding, HostListener, Input, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ThyTranslate } from '../shared';
import { ThyFormCheckBaseComponent } from '../shared';


@Component({
    selector: '[thy-radio],[thyRadio]',
    templateUrl: './radio.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ThyRadioComponent),
            multi: true
        }
    ]
})
export class ThyRadioComponent extends ThyFormCheckBaseComponent {

    constructor(
        thyTranslate: ThyTranslate
    ) {
        super(thyTranslate);
    }

}
