import { Component, OnInit, forwardRef, HostBinding } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

enum strengthEnum {
    highest = 4,
    hight = 3,
    average = 2,
    low = 1
}

const strengthStyleClassName = {
    [strengthEnum.highest]: 'strength-level-highest',
    [strengthEnum.hight]: 'strength-level-high',
    [strengthEnum.average]: 'strength-level-average',
    [strengthEnum.low]: 'strength-level-low'
};

@Component({
    selector: 'thy-strength',
    templateUrl: 'strength.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ThyStrengthComponent),
            multi: true
        }
    ]
})
export class ThyStrengthComponent
    implements OnInit, ControlValueAccessor {
        @HostBinding('class.password-strength-container') styleClass=true;
    private _onChange = Function.prototype;

    private _onTouched = Function.prototype;

    strength: strengthEnum;

    strengthStyleClassName = strengthStyleClassName;

    constructor() {}

    ngOnInit() {}

    writeValue(value: strengthEnum) {
        this.strength = value;
    }

    registerOnChange(fn: (value: any) => any): void {
        this._onChange = fn;
    }

    registerOnTouched(fn: () => any): void {
        this._onTouched = fn;
    }
}
