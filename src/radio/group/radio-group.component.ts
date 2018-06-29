import { Component, forwardRef, HostBinding, HostListener, Input, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ThyRadioComponent } from '../radio.component';


@Component({
    selector: 'thy-radio-group',
    templateUrl: './radio-group.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ThyRadioGroupComponent),
            multi: true
        }
    ]
})
export class ThyRadioGroupComponent implements ControlValueAccessor {

    _innerValue: string | number;

    radios: ThyRadioComponent[] = [];

    onChange: (_: string) => void = () => null;
    onTouched: () => void = () => null;

    constructor(
    ) {
    }

    addRadio(radio: ThyRadioComponent): void {
        this.radios.push(radio);
        radio.thyChecked = radio.thyValue === this._innerValue;
    }

    updateValue(value: string, emit: boolean): void {
        this._innerValue = value;
        this.radios.forEach((radio) => {
            radio.thyChecked = radio.thyValue === this._innerValue;
        });
        if (emit) {
            this.onChange(value);
        }
    }

    writeValue(value: any): void {
        this.updateValue(value, false);
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.radios.forEach((radio) => {
            radio.setDisabledState(isDisabled);
        });
    }

}
