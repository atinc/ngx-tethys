import { ThyTranslate } from 'ngx-tethys/core';

import { Component, computed, forwardRef, HostBinding, inject, input, OnInit, Signal } from '@angular/core';
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

    strength!: ThyStrengthEnum;

    locale: Signal<ThyStrengthLocale> = injectLocale('strength');

    readonly strengthMap = computed(() => {
        return {
            [ThyStrengthEnum.highest]: {
                level: 'highest',
                text: this.highestKey()
            },
            [ThyStrengthEnum.high]: {
                level: 'high',
                text: this.highKey()
            },
            [ThyStrengthEnum.average]: {
                level: 'average',
                text: this.averageKey()
            },
            [ThyStrengthEnum.low]: {
                level: 'low',
                text: this.lowKey()
            }
        };
    });

    /**
     * 组件标题，描述程度所指类型
     */
    readonly titleKey = input<string, string>('', { transform: (value: string) => this.translate.instant(value) || '' });

    /**
     * 程度最高值文本
     */
    readonly highestKey = input<string, string>(this.locale().highest, {
        transform: (value: string) => this.translate.instant(value) || this.locale().highest
    });

    /**
     * 程度为高值时展示的文本
     */
    readonly highKey = input<string, string>(this.locale().high, {
        transform: (value: string) => this.translate.instant(value) || this.locale().high
    });

    /**
     * 程度为中值时展示的文本
     */
    readonly averageKey = input<string, string>(this.locale().medium, {
        transform: (value: string) => this.translate.instant(value) || this.locale().medium
    });

    /**
     * 程度为低值时展示的文本
     */
    readonly lowKey = input<string, string>(this.locale().low, {
        transform: (value: string) => this.translate.instant(value) || this.locale().low
    });

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
