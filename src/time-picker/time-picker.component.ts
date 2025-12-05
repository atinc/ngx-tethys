import { CdkConnectedOverlay, CdkOverlayOrigin, ConnectionPositionPair } from '@angular/cdk/overlay';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    effect,
    ElementRef,
    EventEmitter,
    forwardRef,
    inject,
    input,
    model,
    OnInit,
    output,
    Signal,
    viewChild
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { getFlexiblePositions, scaleMotion, scaleXMotion, scaleYMotion, ThyPlacement } from 'ngx-tethys/core';
import { injectLocale, ThyTimePickerLocale } from 'ngx-tethys/i18n';
import { ThyIcon } from 'ngx-tethys/icon';
import { ThyInputDirective } from 'ngx-tethys/input';
import { coerceBooleanProperty, isValid, TinyDate } from 'ngx-tethys/util';
import { ThyTimePanel } from './time-picker-panel.component';

export type TimePickerSize = 'xs' | 'sm' | 'md' | 'lg' | 'default';

/**
 * 时间选择组件
 * @name thy-time-picker
 */
@Component({
    selector: 'thy-time-picker',
    templateUrl: './time-picker.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => ThyTimePicker)
        }
    ],
    host: {
        class: 'thy-time-picker',
        '[class.thy-time-picker-disabled]': `thyDisabled()`,
        '[class.thy-time-picker-readonly]': `thyReadonly()`
    },
    imports: [CdkOverlayOrigin, ThyInputDirective, FormsModule, NgTemplateOutlet, ThyIcon, NgClass, CdkConnectedOverlay, ThyTimePanel],
    animations: [scaleXMotion, scaleYMotion, scaleMotion]
})
export class ThyTimePicker implements OnInit, AfterViewInit, ControlValueAccessor {
    private cdr = inject(ChangeDetectorRef);
    private elementRef = inject(ElementRef);
    locale: Signal<ThyTimePickerLocale> = injectLocale('timePicker');

    readonly cdkConnectedOverlay = viewChild(CdkConnectedOverlay);

    readonly origin = viewChild<CdkOverlayOrigin>('origin');

    readonly inputRef = viewChild<ElementRef<HTMLInputElement>>('pickerInput');

    readonly overlayContainer = viewChild.required<ElementRef<HTMLElement>>('overlayContainer');

    /**
     * 输入框大小
     * @type 'xs' | 'sm' | 'md' | 'lg' | 'default'
     */
    readonly thySize = input<TimePickerSize>('default');

    /**
     * 输入框提示文字
     * @type string
     */
    readonly thyPlaceholder = input<string>(this.locale().placeholder);

    /**
     * 弹出位置
     * @type 'top' | 'topLeft'| 'topRight' | 'bottom' | 'bottomLeft' | 'bottomRight' | 'left' | 'leftTop' | 'leftBottom' | 'right' | 'rightTop' | 'rightBottom'
     */
    readonly thyPlacement = input<ThyPlacement>('bottomLeft');

    /**
     * 展示的日期格式，支持 'HH:mm:ss' | 'HH:mm' | 'mm:ss'
     * @type string
     * @default HH:mm:ss
     */
    readonly thyFormat = input<string, string>('HH:mm:ss', { transform: (value: string) => value || 'HH:mm:ss' });

    /**
     * 小时间隔步长
     * @type number
     */
    readonly thyHourStep = input<number>(1);

    /**
     * 分钟间隔步长
     * @type number
     */
    readonly thyMinuteStep = input<number>(1);

    /**
     * 秒间隔步长
     * @type number
     */
    readonly thySecondStep = input<number>(1);

    /**
     * 弹出层组件 class
     * @type string
     */
    readonly thyPopupClass = input<string>();

    /**
     * 是否显示弹出层遮罩
     * @type boolean
     * @default false
     */
    readonly thyBackdrop = input<boolean, unknown>(false, { transform: coerceBooleanProperty });

    /**
     * 禁用
     * @type boolean
     * @default false
     */
    readonly thyDisabled = model<boolean>(false);

    /**
     * 只读
     * @type boolean
     * @default false
     */
    readonly thyReadonly = input<boolean, unknown>(false, { transform: coerceBooleanProperty });

    /**
     * 展示选择此刻
     * @type boolean
     */
    readonly thyShowSelectNow = input(true, { transform: coerceBooleanProperty });

    /**
     * 可清空值
     * @type boolean
     */
    readonly thyAllowClear = input(true, { transform: coerceBooleanProperty });

    /**
     * 打开/关闭弹窗事件
     * @type EventEmitter<boolean>
     */
    readonly thyOpenChange = output<boolean>();

    prefixCls = 'thy-time-picker';

    overlayPositions: ConnectionPositionPair[] = getFlexiblePositions(this.thyPlacement(), 4);

    readonly showText = model<string>('');

    openState!: boolean;

    value: Date | null = new TinyDate().setHms(0, 0, 0).nativeDate;

    originValue!: Date | null;

    keepFocus!: boolean;

    private isDisabledFirstChange = true;

    onValueChangeFn: (val: number | Date | null) => void = () => void 0;

    onTouchedFn: () => void = () => void 0;

    constructor() {
        effect(() => {
            if (this.thyFormat() && this.value && isValid(this.value)) {
                this.showText.set(new TinyDate(this.value).format(this.thyFormat()));
            }
        });
    }

    ngOnInit() {}

    ngAfterViewInit() {
        this.overlayPositions = getFlexiblePositions(this.thyPlacement(), 4);
    }

    onInputPickerClick() {
        if (this.disabledUserOperation()) {
            return;
        }
        this.openOverlay();
    }

    onInputPickerBlur() {
        if (this.keepFocus) {
            this.focus();
        } else {
            if (this.openState) {
                this.closeOverlay();
            }
        }
    }

    onPickTime(value: Date) {
        this.originValue = new TinyDate(value)?.nativeDate;
        this.setValue(value);
        this.emitValue();
    }

    onPickTimeConfirm(value: Date) {
        this.originValue = new TinyDate(value)?.nativeDate;
        this.confirmValue(value);
    }

    onClearTime(e: Event) {
        e.stopPropagation();
        this.originValue = null;
        this.setValue(null);
        this.emitValue();
    }

    onCustomizeInput(value: string) {
        this.formatInputValue(value);
        this.cdr.detectChanges();
    }

    onKeyupEnter() {
        this.confirmValue(this.value);
        this.closeOverlay();
    }

    onKeyupEsc() {
        this.closeOverlay();
    }

    onPositionChange(e: Event) {
        this.cdr.detectChanges();
    }

    onClickBackdrop() {
        this.closeOverlay();
    }

    onOverlayDetach() {
        this.closeOverlay();
    }

    onOutsideClick(event: Event) {
        if (
            this.openState &&
            !this.elementRef.nativeElement.contains(event.target) &&
            !this.overlayContainer().nativeElement.contains(event.target as Node)
        ) {
            this.closeOverlay();
            this.cdr.detectChanges();
        }
    }

    onOverlayAttach() {
        const cdkConnectedOverlay = this.cdkConnectedOverlay();
        if (cdkConnectedOverlay && cdkConnectedOverlay.overlayRef) {
            cdkConnectedOverlay.overlayRef.updatePosition();
        }
    }

    openOverlay() {
        if (this.disabledUserOperation()) {
            return;
        }
        this.keepFocus = true;
        this.openState = true;
        this.thyOpenChange.emit(this.openState);
    }

    closeOverlay() {
        if (this.openState) {
            this.keepFocus = false;
            this.openState = false;
            this.blur();
            if (this.showText()?.length) {
                if (!this.validateCustomizeInput(this.showText())) {
                    this.setValue(this.originValue);
                } else {
                    this.showText.set(new TinyDate(this.value!).format(this.thyFormat()));
                }
            } else {
                if (!this.thyAllowClear()) {
                    this.setValue(this.originValue);
                }
            }
            this.thyOpenChange.emit(this.openState);
        }
    }

    focus() {
        const inputRef = this.inputRef();
        if (inputRef) {
            inputRef.nativeElement.focus();
        }
    }

    blur() {
        const inputRef = this.inputRef();
        if (inputRef) {
            inputRef.nativeElement.blur();
        }
    }

    writeValue(value: Date | number): void {
        if (value && isValid(value)) {
            this.originValue = new TinyDate(value)?.nativeDate;
            this.setValue(new TinyDate(value).nativeDate);
        } else {
            this.value = new TinyDate().setHms(0, 0, 0).nativeDate;
        }
    }

    registerOnChange(fn: any): void {
        this.onValueChangeFn = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouchedFn = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.thyDisabled.set((this.isDisabledFirstChange && this.thyDisabled()) || isDisabled);
        this.isDisabledFirstChange = false;
    }

    private setValue(value: Date | null, formatText: boolean = true) {
        if (value && isValid(value)) {
            this.value = new TinyDate(value)?.nativeDate;
            if (formatText) {
                this.showText.set(new TinyDate(this.value).format(this.thyFormat()));
            }
        } else {
            this.value = null;
            this.showText.set('');
        }
        this.cdr.markForCheck();
    }

    private confirmValue(value: Date | null) {
        this.setValue(value);
        this.emitValue();
        this.cdr.markForCheck();
    }

    private emitValue() {
        if (this.onValueChangeFn) {
            this.onValueChangeFn(this.value);
        }
        if (this.onTouchedFn) {
            this.onTouchedFn();
        }
    }

    private formatInputValue(value: string) {
        if (!this.openState) {
            this.openOverlay();
        }
        if (value?.length) {
            if (this.validateCustomizeInput(value)) {
                const formatter = value.split(':');
                const hour = formatter[0] || 0;
                const minute = formatter[1] || 0;
                const second = formatter[2] || 0;
                this.setValue(new TinyDate().setHms(+hour, +minute, +second).nativeDate, false);
                this.originValue = new TinyDate(this.value!)?.nativeDate;
                this.emitValue();
            }
        } else {
            if (this.thyAllowClear()) {
                this.originValue = null;
                this.setValue(null);
                this.emitValue();
            } else {
                this.value = new TinyDate(this.originValue!)?.nativeDate;
                this.showText.set('');
                this.cdr.markForCheck();
            }
        }
    }

    private validateCustomizeInput(value: string): boolean {
        let valid = false;
        if (value.length > this.thyFormat().length) {
            return valid;
        }
        const formatRule = this.thyFormat().split(':');
        const formatter = value.split(':');
        valid = !formatRule
            .map((m, i) => {
                return !!formatter[i];
            })
            .includes(false);
        return valid;
    }

    private disabledUserOperation() {
        return this.thyDisabled() || this.thyReadonly();
    }
}
