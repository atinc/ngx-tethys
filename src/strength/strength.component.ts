import { ThyTranslate } from 'ngx-tethys/core';

import { Component, forwardRef, HostBinding, Input, OnInit, inject, Signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { injectLocale, ThyStrengthLocale } from 'ngx-tethys/i18n';

enum ThyStrengthEnum {
    highest = 4,
    high = 3,
    average = 2,
    low = 1
}

/**
 * 程度展示组件
 * @name thy-strength
 * @order 10
 */
@Component({
    selector: 'thy-strength',
    templateUrl: 'strength.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ThyStrength),
            multi: true
        }
    ]
})
export class ThyStrength implements OnInit, ControlValueAccessor {
    translate = inject(ThyTranslate);

    @HostBinding('class.password-strength-container') styleClass = true;

    strengthTitle: string;

    strength: ThyStrengthEnum;

    locale: Signal<ThyStrengthLocale> = injectLocale('strength');

    strengthMap = {
        [ThyStrengthEnum.highest]: {
            level: 'highest',
            text: this.locale().highest
        },
        [ThyStrengthEnum.high]: {
            level: 'high',
            text: this.locale().high
        },
        [ThyStrengthEnum.average]: {
            level: 'average',
            text: this.locale().medium
        },
        [ThyStrengthEnum.low]: {
            level: 'low',
            text: this.locale().low
        }
    };

    /**
     * 组件标题，描述程度所指类型
     */
    @Input()
    set titleKey(value: string) {
        this.strengthTitle = this.translate.instant(value);
    }

    /**
     * 程度最高值文本
     * @default 最高
     */
    @Input()
    set highestKey(value: string) {
        this.strengthMap[ThyStrengthEnum.highest].text = this.translate.instant(value);
    }

    /**
     * 程度为高值时展示的文本
     * @default 高
     */
    @Input()
    set highKey(value: string) {
        this.strengthMap[ThyStrengthEnum.high].text = this.translate.instant(value);
    }

    /**
     * 程度为中值时展示的文本
     * @default 中
     */
    @Input()
    set averageKey(value: string) {
        this.strengthMap[ThyStrengthEnum.average].text = this.translate.instant(value);
    }

    /**
     * 程度为低值时展示的文本
     * @default 低
     */
    @Input()
    set lowKey(value: string) {
        this.strengthMap[ThyStrengthEnum.low].text = this.translate.instant(value);
    }

    private _onChange = Function.prototype;

    private _onTouched = Function.prototype;

    ngOnInit() {}

    writeValue(value: ThyStrengthEnum) {
        this.strength = value;
        this._onChange(value);
        this._onTouched();
    }

    registerOnChange(fn: (value: any) => any): void {
        this._onChange = fn;
    }

    registerOnTouched(fn: () => any): void {
        this._onTouched = fn;
    }
}
