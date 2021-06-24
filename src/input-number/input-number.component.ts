import {
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    HostBinding,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DOWN_ARROW, ENTER, helpers, UP_ARROW } from 'ngx-tethys/util';

enum Type {
    up,
    down
}

@Component({
    selector: 'thy-input-number',
    templateUrl: './input-number.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ThyInputNumberComponent),
            multi: true
        }
    ]
})
export class ThyInputNumberComponent implements ControlValueAccessor, OnChanges, OnInit, OnDestroy {
    @HostBinding('class.input-number') _isInputNumber = true;

    @ViewChild('input', { static: true }) inputElement: ElementRef<any>;

    private onChangeFn: (value: number | string) => void = () => {};

    private onTouchFn: () => void = () => {};

    private autoStepTimer: any;

    validValue: number | string; // number or ''

    displayValue: number | string;

    disabledUp = false;

    disabledDown = false;

    @Input() thyAutoFocus = false;

    @Input() thyPlaceHolder: string = '';

    @Input() thyDisabled: string;

    @Input() thyMax: number = Infinity;

    @Input() thyMin: number = -Infinity;

    @Input() thyStep = 1;

    @Input() thySize: string;

    @Input() thyPrecision: number;

    @Input() thySuffix: string;

    @Output() thyBlur = new EventEmitter<Event>();

    @Output() thyFocus = new EventEmitter<Event>();

    constructor() {}

    ngOnInit() {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes.thySuffix && !changes.thySuffix.isFirstChange()) {
            const validValue = this.getCurrentValidValue(this.validValue);
            this.updateValidValue(validValue);
            this.displayValue = this.formatterValue(validValue);
        }
    }

    writeValue(value: number | string): void {
        if (!helpers.isUndefinedOrNull(value)) {
            const _value = this.getCurrentValidValue(value);
            this.updateValidValue(_value);
            this.displayValue = this.formatterValue(_value);
        }
    }

    updateValidValue(value: number | string): void {
        if (this.validValue !== value) {
            this.validValue = value;
            this.onChangeFn(this.validValue);
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
        const parseValue = this.parser(value);
        const validValue = this.getCurrentValidValue(parseValue);
        this.updateValidValue(validValue);
    }

    onBlur(event: Event) {
        this.displayValue = this.formatterValue(this.validValue);
        this.thyBlur.emit(event);
    }

    onFocus(event: Event) {
        this.thyFocus.emit(event);
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
        this.displayValue = this.formatterValue(val);
        if (outOfRange) {
            return;
        }
        this.autoStepTimer = setTimeout(() => {
            (this[Type[type]] as (e: MouseEvent | KeyboardEvent) => void)(e);
        }, 300);
    }

    upStep(value: number): number {
        const precisionFactor = this.getPrecisionFactor(value);
        const precision = this.getMaxPrecision(value);
        let result;
        if (isNaN(value)) {
            result = this.thyMin === -Infinity ? this.thyStep : this.thyMin;
        } else {
            result = ((precisionFactor * value + precisionFactor * this.thyStep) / precisionFactor).toFixed(precision);
        }
        return this.toNumber(result);
    }

    downStep(value: number): number {
        const precisionFactor = this.getPrecisionFactor(value);
        const precision = Math.abs(this.getMaxPrecision(value));
        let result;
        if (isNaN(value)) {
            result = this.thyMin === -Infinity ? -this.thyStep : this.thyMin;
        } else {
            result = ((precisionFactor * value - precisionFactor * this.thyStep) / precisionFactor).toFixed(precision);
        }
        return this.toNumber(result);
    }

    getMaxPrecision(value: string | number): number {
        if (!helpers.isUndefinedOrNull(this.thyPrecision)) {
            return this.thyPrecision;
        }
        const stepPrecision = this.getPrecision(this.thyStep);
        const currentValuePrecision = this.getPrecision(value as number);
        if (!value) {
            return stepPrecision;
        }
        return Math.max(currentValuePrecision, stepPrecision);
    }

    getPrecisionFactor(currentValue: string | number): number {
        const precision = this.getMaxPrecision(currentValue);
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
        if (value === '') {
            return value;
        }
        val = parseFloat(value as string);
        if (this.isNotValid(val)) {
            val = this.validValue;
        }
        if (val < this.thyMin) {
            val = this.thyMin;
        }
        if (val > this.thyMax) {
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
        if (numStr.indexOf('.') >= 0 && !helpers.isUndefinedOrNull(this.thyPrecision)) {
            return Number(Number(num).toFixed(this.thyPrecision));
        }
        return Number(num);
    }

    registerOnChange(fn: () => void): void {
        this.onChangeFn = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouchFn = fn;
    }

    ngOnDestroy() {}
}
