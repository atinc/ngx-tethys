import { Component, forwardRef, HostBinding, Input, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { UpdateHostClassService } from '../../shared';
import { ThyTranslate } from '../../shared';

export type InputSize = 'xs' | 'sm' | 'md' | 'lg' | '';

const noop = () => {
};

const inputGroupSizeMap = {
    'xs': ['form-control-xs'],
    'sm': ['form-control-sm'],
    'md': ['form-control-md'],
    'lg': ['form-control-lg']
};

@Component({
    selector: '[thyFormCheck]',
    templateUrl: `./form-check.component.html`,
    providers: [
        UpdateHostClassService,
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ThyFormCheckComponent),
            multi: true
        }
    ],
})
export class ThyFormCheckComponent {

    _labelText: string;

    @HostBinding('class.form-check') _isFormCheck = true;

    @Input()
    set thyLabelText(value: string) {
        this._labelText = value;
    }

    @Input()
    set thyLabelTranslateKey(value: string) {
        if (value) {
            this._labelText = this.thyTranslate.instant(value);
        } else {
            this._labelText = '';
        }
    }

    constructor(
        private updateHostClassService: UpdateHostClassService,
        private elementRef: ElementRef,
        private thyTranslate: ThyTranslate
    ) {
        this.updateHostClassService.initializeElement(elementRef.nativeElement);
    }

}
