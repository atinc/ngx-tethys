import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    HostBinding,
    Input,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputBoolean } from 'ngx-tethys/core';
import { ThyInputSize } from 'ngx-tethys/input';

@Component({
    selector: 'thy-input-count',
    templateUrl: './input-count.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ThyInputCountComponent),
            multi: true
        }
    ]
})
export class ThyInputCountComponent implements ControlValueAccessor, OnInit, OnDestroy {
    @HostBinding('class.thy-input-count') _isInputCount = true;

    @ViewChild('input', { static: true }) inputElement: ElementRef<any>;

    private onChangeFn: (value: number | string) => void = () => {};

    private onTouchFn: () => void = () => {};

    displayValue: number | string = '';

    appendText: number | string = '';

    maxLength: number = 120;

    /**
     * 输入框的placeholder
     */
    @Input() thyPlaceholder: string = '';

    /**
     * 自定义显示前缀
     */
    @Input() set thyAppendText(v: string | string) {
        this.appendText = v;
        this.updateValidValue(this.displayValue);
    }

    /**
     * 限制输入最大字符长度
     * @default 120
     */
    @Input() set thyMaxLength(v: number) {
        this.maxLength = v || this.maxLength;
        this.updateValidValue(this.displayValue);
    }

    /**
     * 是否自动聚焦
     * @default false
     */
    @Input() @InputBoolean() thyAutoFocus: boolean = false;

    /**
     * 是否禁用
     * @default false
     */
    @Input() @InputBoolean() thyDisabled: boolean = false;

    /**
     * 输入框大小
     * @type 'xs' | 'sm' | 'md' | 'lg' | ''
     */
    @Input() thySize: ThyInputSize = '';

    /**
     * 焦点失去事件
     */
    @Output() thyBlur = new EventEmitter<Event>();

    /**
     * 焦点激活事件
     */
    @Output() thyFocus = new EventEmitter<Event>();

    get currentLength(): number {
        return this.appendText?.toString().length + this.displayValue.toString().trim().length;
    }

    constructor(private cdr: ChangeDetectorRef) {}

    ngOnInit() {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes.thySuffix && !changes.thySuffix.isFirstChange()) {
            this.updateValidValue(this.displayValue);
        }
    }

    writeValue(value: number | string): void {
        this.updateValidValue(value);
        this.cdr.markForCheck();
    }

    updateValidValue(value: number | string): void {
        const _value = value || '';
        if (this.currentLength < this.maxLength) {
            this.displayValue = _value;
        } else {
            const value = _value.toString().slice(0, this.maxLength - this.appendText?.toString().length);
            if (value !== this.displayValue) {
                this.inputElement.nativeElement.value = value;
                this.displayValue = value;
            }
        }
    }

    onModelChange(value: string): void {
        this.updateValidValue(value);
        this.onChangeFn(this.displayValue);
    }

    onBlur(event?: Event) {
        this.thyBlur.emit(event);
    }

    onFocus(event?: Event) {
        this.thyFocus.emit(event);
    }

    registerOnChange(fn: () => void): void {
        this.onChangeFn = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouchFn = fn;
    }

    ngOnDestroy() {}
}
