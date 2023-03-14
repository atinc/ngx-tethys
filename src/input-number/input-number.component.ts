import {
    AbstractControlValueAccessor,
    Constructor,
    InputBoolean, mixinDisabled, mixinTabIndex,
    ThyCanDisable, ThyHasTabIndex
} from 'ngx-tethys/core';
import { DOWN_ARROW, elementMatchClosest, ENTER, isNumber, isUndefinedOrNull, UP_ARROW } from 'ngx-tethys/util';

import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef, Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ThyMaxDirective, ThyMinDirective } from 'ngx-tethys/form';
import { ThyIconComponent } from 'ngx-tethys/icon';
import { ThyInputDirective } from 'ngx-tethys/input';
import { ThyAutofocusDirective } from 'ngx-tethys/shared';

type InputSize = 'xs' | 'sm' | 'md' | 'lg' | '';

enum Type {
    up,
    down
}

const _MixinBase: Constructor<ThyHasTabIndex> & Constructor<ThyCanDisable> & typeof AbstractControlValueAccessor = mixinTabIndex(
    mixinDisabled(AbstractControlValueAccessor)
);
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
        '[attr.tabindex]': 'tabIndex',
        '(focus)': 'onFocus($event)',
        '(blur)': 'onBlur($event)'
    }
})
export class ThyInputNumberComponent extends _MixinBase implements ControlValueAccessor, OnChanges, OnInit, OnDestroy {
    @ViewChild('input', { static: true }) inputElement: ElementRef<any>;

    private autoStepTimer: any;

    validValue: number | string; // number or ''

    displayValue: number | string;

    disabledUp = false;

    disabledDown = false;

    @Input() @InputBoolean() thyAutoFocus: boolean;

    @Input() thyPlaceholder: string = '';

    @Input() @InputBoolean() thyDisabled: boolean;

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

    @Input() thyStep = 1;

    @Input() thySize: InputSize;

    @Input() thyPrecision: number;

    @Input() thySuffix: string;

    @Output() thyBlur = new EventEmitter<Event>();

    @Output() thyFocus = new EventEmitter<Event>();

    private innerMax: number = Infinity;

    private innerMin: number = -Infinity;

    constructor(private cdr: ChangeDetectorRef, private elementRef: ElementRef) {
        super();
    }

    setDisabledState?(isDisabled: boolean): void {
        this.thyDisabled = isDisabled;
    }

    ngOnInit() {}

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
        const parseValue = this.parser(value);
        const validValue = this.getCurrentValidValue(parseValue);
        if (this.validValue !== validValue) {
            this.updateValidValue(validValue);
            this.onChangeFn(this.validValue);
        }
    }

    onBlur(event?: FocusEvent) {
        // Tab 聚焦后自动聚焦到 input 输入框，此分支下直接返回，无需触发 onTouchedFn
        if (elementMatchClosest(event?.relatedTarget as HTMLElement, 'thy-input-number')) {
            return;
        }
        this.displayValue = this.formatterValue(this.validValue);
        this.onTouchedFn();
        this.thyBlur.emit(event);
    }

    onFocus(event?: Event) {
        this.inputElement.nativeElement.focus();
    }

    onInputFocus(event?: Event) {
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
        this.onChangeFn(this.validValue);
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
        if (value === '' || value === undefined) {
            return '';
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
        if (numStr.indexOf('.') >= 0 && !isUndefinedOrNull(this.thyPrecision)) {
            return Number(Number(num).toFixed(this.thyPrecision));
        }
        return Number(num);
    }

    ngOnDestroy() {}
}
