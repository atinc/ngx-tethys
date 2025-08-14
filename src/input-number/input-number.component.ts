import { TabIndexDisabledControlValueAccessorMixin, useHostFocusControl } from 'ngx-tethys/core';
import { ThyMaxDirective, ThyMinDirective } from 'ngx-tethys/form';
import { ThyIcon } from 'ngx-tethys/icon';
import { ThyInputDirective } from 'ngx-tethys/input';
import { ThyAutofocusDirective } from 'ngx-tethys/shared';
import { coerceBooleanProperty, DOWN_ARROW, ENTER, isFloat, isNumber, isUndefinedOrNull, UP_ARROW } from 'ngx-tethys/util';

import { FocusOrigin } from '@angular/cdk/a11y';
import {
    Component,
    ElementRef,
    forwardRef,
    Input,
    numberAttribute,
    OnDestroy,
    OnInit,
    input,
    effect,
    signal,
    output,
    viewChild
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

type InputSize = 'xs' | 'sm' | 'md' | 'lg' | '';

enum Type {
    up,
    down
}

/**
 * 数字输入框
 * @name thy-input-number
 * @order 10
 */
@Component({
    selector: 'thy-input-number',
    templateUrl: './input-number.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ThyInputNumber),
            multi: true
        }
    ],
    imports: [ThyIcon, ThyInputDirective, ThyAutofocusDirective, FormsModule],
    host: {
        class: 'thy-input-number',
        '[attr.tabindex]': 'tabIndex'
    }
})
export class ThyInputNumber extends TabIndexDisabledControlValueAccessorMixin implements ControlValueAccessor, OnInit, OnDestroy {
    readonly inputElement = viewChild<ElementRef<any>>('input');

    private autoStepTimer: any;

    private hostFocusControl = useHostFocusControl();

    validValue: number | string;

    displayValue = signal<number | string>(undefined);

    disabledUp = signal(false);

    disabledDown = signal(false);

    activeValue: string = '';

    /**
     * 是否自动聚焦
     * @default false
     */
    readonly thyAutoFocus = input(false, { transform: coerceBooleanProperty });

    /**
     * 输入框的placeholder
     */
    readonly thyPlaceholder = input<string>('');

    /**
     * 是否禁用
     * @default false
     */
    @Input({ transform: coerceBooleanProperty }) thyDisabled: boolean;

    /**
     * 最大值
     * @default Infinity
     */
    readonly thyMax = input(Infinity, { transform: (value: number) => (isNumber(value) ? value : Infinity) });

    /**
     * 最小值
     * @default -Infinity
     */
    readonly thyMin = input(-Infinity, { transform: (value: number) => (isNumber(value) ? value : -Infinity) });

    /**
     * 每次改变步数，可以为小数
     */
    readonly thyStep = input(1, { transform: numberAttribute });

    /**
     * 改变步数时的延迟毫秒数，值越小变化的速度越快
     * @default 300
     */
    readonly thyStepDelay = input(300, { transform: numberAttribute });

    /**
     * 输入框大小
     * @type xs | sm | md | lg
     */
    readonly thySize = input<InputSize>();

    /**
     * 数值精度
     */
    readonly thyPrecision = input<number>();

    /**
     * 数值后缀
     */
    readonly thySuffix = input<string>();

    /**
     * 焦点失去事件
     */
    readonly thyBlur = output();

    /**
     * 焦点激活事件
     */
    readonly thyFocus = output<Event>();

    /**
     * 上下箭头点击事件
     */
    readonly thyStepChange = output<{ value: number; type: Type }>();

    private isFocused: boolean;

    constructor() {
        super();

        effect(() => {
            const displayValue = this.displayValue();
            const max = this.thyMax();
            if (displayValue || displayValue === 0) {
                const val = Number(displayValue);
                this.disabledUp.set(val >= max);
            }
        });

        effect(() => {
            const min = this.thyMin();
            const displayValue = this.displayValue();
            if (displayValue || displayValue === 0) {
                const val = Number(displayValue);
                this.disabledDown.set(val <= min);
            }
        });

        effect(() => {
            const suffix = this.thySuffix();
            const validValue = this.getCurrentValidValue(this.validValue);
            this.updateValidValue(validValue);
            this.displayValue.set(this.formatterValue(validValue));
        });
    }

    setDisabledState?(isDisabled: boolean): void {
        this.thyDisabled = isDisabled;
    }

    ngOnInit() {
        this.hostFocusControl.focusChanged = (origin: FocusOrigin) => {
            if (this.thyDisabled) {
                return;
            }

            if (origin) {
                if (!this.isFocused) {
                    this.inputElement().nativeElement.focus();
                }
            } else {
                if (this.isFocused) {
                    this.displayValue.set(this.formatterValue(this.validValue));
                    this.onTouchedFn();
                    this.thyBlur.emit();
                    this.isFocused = false;
                }
            }
        };
    }

    writeValue(value: number | string): void {
        const _value = this.getCurrentValidValue(value);
        this.updateValidValue(_value);
        this.displayValue.set(this.formatterValue(_value));
    }

    updateValidValue(value: number | string): void {
        if (this.isNotValid(value)) {
            this.validValue = '';
        } else if (this.validValue !== value) {
            this.validValue = value;
        }
        this.disabledUp.set(false);
        this.disabledDown.set(false);
        if (value || value === 0) {
            const val = Number(value);
            if (val >= this.thyMax()) {
                this.disabledUp.set(true);
            }
            if (val <= this.thyMin()) {
                this.disabledDown.set(true);
            }
        }
    }

    onModelChange(value: string): void {
        const parseValue = this.parser(value);
        if (this.isInputNumber(value)) {
            this.activeValue = value;
        } else {
            this.displayValue.set(parseValue);
            this.inputElement().nativeElement.value = parseValue;
        }
        const validValue = this.getCurrentValidValue(parseValue);
        if (`${this.validValue}` !== `${validValue}`) {
            this.updateValidValue(validValue);
            this.onChangeFn(validValue);
        }
    }

    onInputFocus(event?: Event) {
        this.activeValue = this.parser(this.displayValue().toString());
        if (!this.isFocused) {
            this.isFocused = true;
            this.thyFocus.emit(event);
        }
    }

    onKeyDown(e: KeyboardEvent): void {
        if (e.keyCode === UP_ARROW) {
            this.up(e);
            this.stop();
        } else if (e.keyCode === DOWN_ARROW) {
            this.down(e);
            this.stop();
        } else if (e.keyCode === ENTER) {
            this.displayValue.set(this.formatterValue(this.validValue));
        }
    }

    stop() {
        if (this.autoStepTimer) {
            clearTimeout(this.autoStepTimer);
        }
        this.displayValue.set(this.toNumber(this.displayValue()));
    }

    step(type: Type, e: MouseEvent | KeyboardEvent): void {
        this.stop();
        e.preventDefault();
        if (this.thyDisabled) {
            return;
        }
        const value = this.validValue as number;
        let val: number | string | undefined = undefined;
        if (type === Type.up) {
            val = this.upStep(value);
        } else if (type === Type.down) {
            val = this.downStep(value);
        }
        const outOfRange = (val as number) > this.thyMax() || (val as number) < this.thyMin();
        val = this.getCurrentValidValue(val);
        this.updateValidValue(val);
        this.onChangeFn(this.validValue);
        this.thyStepChange.emit({ value: this.validValue as number, type });
        this.displayValue.set(this.formatterValue(val));
        if (outOfRange) {
            return;
        }
        this.autoStepTimer = setTimeout(() => {
            (this[Type[type] as keyof typeof Type] as (e: MouseEvent | KeyboardEvent) => void)(e);
        }, this.thyStepDelay());
    }

    upStep(value: number): number {
        const precisionFactor = this.getPrecisionFactor(value);
        const precision = this.getMaxPrecision(value);
        const result = ((precisionFactor * value + precisionFactor * this.thyStep()) / precisionFactor).toFixed(precision);
        return this.toNumber(result);
    }

    downStep(value: number): number {
        const precisionFactor = this.getPrecisionFactor(value);
        const precision = Math.abs(this.getMaxPrecision(value));
        const result = ((precisionFactor * value - precisionFactor * this.thyStep()) / precisionFactor).toFixed(precision);
        return this.toNumber(result);
    }

    getMaxPrecision(value: string | number): number {
        const precision = this.thyPrecision();
        if (!isUndefinedOrNull(precision)) {
            return precision;
        }
        const stepPrecision = this.getPrecision(this.thyStep());
        const currentValuePrecision = this.getPrecision(value as number);
        if (!value) {
            return stepPrecision;
        }
        return Math.max(currentValuePrecision, stepPrecision);
    }

    getPrecisionFactor(activeValue: string | number): number {
        const precision = this.getMaxPrecision(activeValue);
        return Math.pow(10, precision);
    }

    getPrecision(value: number): number {
        const valueString = value.toString();
        // 0.0000000004.toString() = 4e10  => 10
        if (valueString.indexOf('e-') >= 0) {
            return parseInt(valueString.slice(valueString.indexOf('e-') + 2), 10);
        }
        let precision = 0;
        // 1.2222 =>  4
        if (valueString.indexOf('.') >= 0) {
            precision = valueString.length - valueString.indexOf('.') - 1;
        }
        return precision;
    }

    up(e: MouseEvent | KeyboardEvent) {
        this.inputElement().nativeElement.focus();
        this.step(Type.up, e);
    }

    down(e: MouseEvent | KeyboardEvent) {
        this.inputElement().nativeElement.focus();
        this.step(Type.down, e);
    }

    formatterValue(value: number | string) {
        const parseValue = this.parser(`${value}`);
        if (parseValue) {
            const suffix = this.thySuffix();
            return suffix ? `${parseValue} ${suffix}` : parseValue;
        } else {
            return '';
        }
    }

    parser(value: string) {
        return value
            .trim()
            .replace(/。/g, '.')
            .replace(/[^\w\.-]+/g, '')
            .replace(this.thySuffix(), '');
    }

    getCurrentValidValue(value: string | number): number | string {
        let val = value;
        if (value === '' || isUndefinedOrNull(value)) {
            return '';
        }
        val = parseFloat(value as string);
        if (this.isNotValid(val)) {
            val = this.validValue;
        }
        if ((val as number) < this.thyMin()) {
            val = this.thyMin();
        }
        if ((val as number) > this.thyMax()) {
            val = this.thyMax();
        }

        return this.toNumber(val);
    }

    isNotValid(num: string | number): boolean {
        return isNaN(num as number) || num === '' || num === null || !!(num && num.toString().indexOf('.') === num.toString().length - 1);
    }

    toNumber(num: string | number): number {
        if (this.isNotValid(num)) {
            return num as number;
        }
        const numStr = String(num);
        const precision = this.thyPrecision();
        if (numStr.indexOf('.') >= 0 && !isUndefinedOrNull(precision)) {
            return Number(Number(num).toFixed(precision));
        }
        return Number(num);
    }

    isInputNumber(value: string) {
        return isFloat(value) || /^[-+Ee]$|^([-+.]?[0-9])*(([.]|[.eE])?[eE]?[+-]?)?$|^$/.test(value);
    }

    ngOnDestroy() {
        this.hostFocusControl.destroy();
    }
}
