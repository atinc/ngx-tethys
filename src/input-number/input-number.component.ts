import { InputBoolean, InputNumber, TabIndexDisabledControlValueAccessorMixin, useHostFocusControl } from 'ngx-tethys/core';
import { ThyMaxDirective, ThyMinDirective } from 'ngx-tethys/form';
import { ThyIconComponent } from 'ngx-tethys/icon';
import { ThyInputDirective } from 'ngx-tethys/input';
import { ThyAutofocusDirective } from 'ngx-tethys/shared';
import { DOWN_ARROW, ENTER, isFloat, isNumber, isUndefinedOrNull, UP_ARROW } from 'ngx-tethys/util';

import { FocusOrigin } from '@angular/cdk/a11y';
import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild
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
            useExisting: forwardRef(() => ThyInputNumberComponent),
            multi: true
        }
    ],
    standalone: true,
    imports: [ThyIconComponent, ThyInputDirective, ThyAutofocusDirective, FormsModule, ThyMinDirective, ThyMaxDirective],
    host: {
        class: 'thy-input-number',
        '[attr.tabindex]': 'tabIndex'
    }
})
export class ThyInputNumberComponent
    extends TabIndexDisabledControlValueAccessorMixin
    implements ControlValueAccessor, OnChanges, OnInit, OnDestroy
{
    @ViewChild('input', { static: true }) inputElement: ElementRef<any>;

    private autoStepTimer: any;

    private hostFocusControl = useHostFocusControl();

    validValue: number | string;

    displayValue: number | string;

    disabledUp = false;

    disabledDown = false;

    activeValue: string = '';

    /**
     * 是否自动聚焦
     * @default false
     */
    @Input() @InputBoolean() thyAutoFocus: boolean;

    /**
     * 输入框的placeholder
     */
    @Input() thyPlaceholder: string = '';

    /**
     * 是否禁用
     * @default false
     */
    @Input() @InputBoolean() thyDisabled: boolean;

    /**
     * 最大值
     * @default Infinity
     */
    @Input() set thyMax(value: number) {
        this.innerMax = isNumber(value) ? value : this.innerMax;
        if (this.displayValue || this.displayValue === 0) {
            const val = Number(this.displayValue);
            this.disabledUp = val >= this.innerMax;
        }
    }

    get thyMax() {
        return this.innerMax;
    }

    /**
     * 最小值
     * @default -Infinity
     */
    @Input() set thyMin(value: number) {
        this.innerMin = isNumber(value) ? value : this.innerMin;
        if (this.displayValue || this.displayValue === 0) {
            const val = Number(this.displayValue);
            this.disabledDown = val <= this.innerMin;
        }
    }

    get thyMin() {
        return this.innerMin;
    }

    /**
     * 每次改变步数，可以为小数
     */
    @Input() @InputNumber() thyStep = 1;

    /**
     * 改变步数时的延迟毫秒数，值越小变化的速度越快
     * @default 300
     */
    @input() @InputNumber() thyStepDelay = 300;

    /**
     * 输入框大小
     * @type xs | sm | md | lg
     */
    @Input() thySize: InputSize;

    /**
     * 数值精度
     */
    @Input() thyPrecision: number;

    /**
     * 数值后缀
     */
    @Input() thySuffix: string;

    /**
     * 焦点失去事件
     */
    @Output() thyBlur = new EventEmitter<Event>();

    /**
     * 焦点激活事件
     */
    @Output() thyFocus = new EventEmitter<Event>();

    private innerMax: number = Infinity;

    private innerMin: number = -Infinity;

    private isFocused: boolean;

    constructor(private cdr: ChangeDetectorRef) {
        super();
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
                    this.inputElement.nativeElement.focus();
                }
            } else {
                if (this.isFocused) {
                    this.displayValue = this.formatterValue(this.validValue);
                    this.onTouchedFn();
                    this.thyBlur.emit();
                    this.isFocused = false;
                }
            }
        };
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.thySuffix && !changes.thySuffix.isFirstChange()) {
            const validValue = this.getCurrentValidValue(this.validValue);
            this.updateValidValue(validValue);
            this.displayValue = this.formatterValue(validValue);
        }
    }

    writeValue(value: number | string): void {
        const _value = this.getCurrentValidValue(value);
        this.updateValidValue(_value);
        this.displayValue = this.formatterValue(_value);
        this.cdr.markForCheck();
    }

    updateValidValue(value: number | string): void {
        if (this.isNotValid(value)) {
            this.validValue = '';
        } else if (this.validValue !== value) {
            this.validValue = value;
        }
        this.disabledUp = this.disabledDown = false;
        if (value || value === 0) {
            const val = Number(value);
            if (val >= this.thyMax) {
                this.disabledUp = true;
            }
            if (val <= this.thyMin) {
                this.disabledDown = true;
            }
        }
    }

    onModelChange(value: string): void {
        if (this.isInputNumber(value)) {
            this.activeValue = value;
        } else {
            this.displayValue = this.activeValue;
            this.inputElement.nativeElement.value = this.displayValue;
        }
        const parseValue = this.parser(value);
        const validValue = this.getCurrentValidValue(parseValue);
        if (this.validValue !== validValue) {
            this.updateValidValue(validValue);
            this.onChangeFn(this.validValue);
        }
    }

    onInputFocus(event?: Event) {
        this.activeValue = this.parser(this.displayValue.toString());
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
            this.displayValue = this.formatterValue(this.validValue);
        }
    }

    stop() {
        if (this.autoStepTimer) {
            clearTimeout(this.autoStepTimer);
        }
        this.displayValue = this.toNumber(this.displayValue);
    }

    step(type: Type, e: MouseEvent | KeyboardEvent): void {
        this.stop();
        e.preventDefault();
        if (this.thyDisabled) {
            return;
        }
        const value = this.validValue as number;
        let val;
        if (type === Type.up) {
            val = this.upStep(value);
        } else if (type === Type.down) {
            val = this.downStep(value);
        }
        const outOfRange = val > this.thyMax || val < this.thyMin;
        val = this.getCurrentValidValue(val);
        this.updateValidValue(val);
        this.onChangeFn(this.validValue);
        this.displayValue = this.formatterValue(val);
        if (outOfRange) {
            return;
        }
        this.autoStepTimer = setTimeout(() => {
            (this[Type[type]] as (e: MouseEvent | KeyboardEvent) => void)(e);
        }, this.thyStepDelay);
    }

    upStep(value: number): number {
        const precisionFactor = this.getPrecisionFactor(value);
        const precision = this.getMaxPrecision(value);
        const result = ((precisionFactor * value + precisionFactor * this.thyStep) / precisionFactor).toFixed(precision);
        return this.toNumber(result);
    }

    downStep(value: number): number {
        const precisionFactor = this.getPrecisionFactor(value);
        const precision = Math.abs(this.getMaxPrecision(value));
        const result = ((precisionFactor * value - precisionFactor * this.thyStep) / precisionFactor).toFixed(precision);
        return this.toNumber(result);
    }

    getMaxPrecision(value: string | number): number {
        if (!isUndefinedOrNull(this.thyPrecision)) {
            return this.thyPrecision;
        }
        const stepPrecision = this.getPrecision(this.thyStep);
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
        this.inputElement.nativeElement.focus();
        this.step(Type.up, e);
    }

    down(e: MouseEvent | KeyboardEvent) {
        this.inputElement.nativeElement.focus();
        this.step(Type.down, e);
    }

    formatterValue(value: number | string) {
        const parseValue = this.parser(`${value}`);
        if (parseValue) {
            return this.thySuffix ? `${parseValue} ${this.thySuffix}` : parseValue;
        } else {
            return '';
        }
    }

    parser(value: string) {
        return value
            .trim()
            .replace(/。/g, '.')
            .replace(/[^\w\.-]+/g, '')
            .replace(this.thySuffix, '');
    }

    getCurrentValidValue(value: string | number): number | string {
        let val = value;
        if (value === '' || value === undefined) {
            return '';
        }
        val = parseFloat(value as string);
        if (this.isNotValid(val)) {
            val = this.validValue;
        }
        if ((val as number) < this.thyMin) {
            val = this.thyMin;
        }
        if ((val as number) > this.thyMax) {
            val = this.thyMax;
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
        if (numStr.indexOf('.') >= 0 && !isUndefinedOrNull(this.thyPrecision)) {
            return Number(Number(num).toFixed(this.thyPrecision));
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
