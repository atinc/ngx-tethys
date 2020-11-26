import { Component, OnInit, forwardRef, HostBinding, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ThyTranslate } from 'ngx-tethys/shared';

enum ThyStrengthEnum {
    highest = 4,
    high = 3,
    average = 2,
    low = 1
}

const strengthMap = {
    [ThyStrengthEnum.highest]: {
        level: 'highest',
        text: '最高'
    },
    [ThyStrengthEnum.high]: {
        level: 'high',
        text: '高'
    },
    [ThyStrengthEnum.average]: {
        level: 'average',
        text: '中'
    },
    [ThyStrengthEnum.low]: {
        level: 'low',
        text: '低'
    }
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
export class ThyStrengthComponent implements OnInit, ControlValueAccessor {
    @HostBinding('class.password-strength-container') styleClass = true;

    strengthTitle: string;

    strength: ThyStrengthEnum;

    strengthMap = JSON.parse(JSON.stringify(strengthMap));

    @Input()
    set titleKey(value: string) {
        this.strengthTitle = this.translate.instant(value);
    }
    @Input()
    set highestKey(value: string) {
        this.strengthMap[ThyStrengthEnum.highest].text = this.translate.instant(value);
    }
    @Input()
    set highKey(value: string) {
        this.strengthMap[ThyStrengthEnum.high].text = this.translate.instant(value);
    }
    @Input()
    set averageKey(value: string) {
        this.strengthMap[ThyStrengthEnum.average].text = this.translate.instant(value);
    }
    @Input()
    set lowKey(value: string) {
        this.strengthMap[ThyStrengthEnum.low].text = this.translate.instant(value);
    }

    private _onChange = Function.prototype;

    private _onTouched = Function.prototype;

    constructor(public translate: ThyTranslate) {}

    ngOnInit() {}

    writeValue(value: ThyStrengthEnum) {
        this.strength = value;
    }

    registerOnChange(fn: (value: any) => any): void {
        this._onChange = fn;
    }

    registerOnTouched(fn: () => any): void {
        this._onTouched = fn;
    }
}
