import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    Input,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { isValid } from 'date-fns';
import { getFlexiblePositions, InputBoolean, ThyPlacement } from 'ngx-tethys/core';
import { TinyDate, coerceBooleanProperty } from 'ngx-tethys/util';
import { ThyTimePanelComponent } from './time-picker-panel.component';
import { ThyIconComponent } from 'ngx-tethys/icon';
import { NgTemplateOutlet, NgIf, NgClass } from '@angular/common';
import { ThyInputDirective } from 'ngx-tethys/input';
import { scaleMotion, scaleXMotion, scaleYMotion } from 'ngx-tethys/core';

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
            useExisting: forwardRef(() => ThyTimePickerComponent)
        }
    ],
    host: {
        class: 'thy-time-picker',
        '[class.thy-time-picker-disabled]': `disabled`,
        '[class.thy-time-picker-readonly]': `readonly`
    },
    standalone: true,
    imports: [
        CdkOverlayOrigin,
        ThyInputDirective,
        FormsModule,
        NgTemplateOutlet,
        NgIf,
        ThyIconComponent,
        NgClass,
        CdkConnectedOverlay,
        ThyTimePanelComponent
    ],
    animations: [scaleXMotion, scaleYMotion, scaleMotion]
})
export class ThyTimePickerComponent implements OnInit, AfterViewInit, ControlValueAccessor {
    @ViewChild(CdkConnectedOverlay, { static: true }) cdkConnectedOverlay: CdkConnectedOverlay;

    @ViewChild('origin', { static: true }) origin: CdkOverlayOrigin;

    @ViewChild('pickerInput', { static: true }) inputRef: ElementRef<HTMLInputElement>;

    @ViewChild('overlayContainer', { static: false }) overlayContainer: ElementRef<HTMLElement>;

    /**
     * 输入框大小
     * @type 'xs' | 'sm' | 'md' | 'lg' | 'default'
     */
    @Input() thySize: TimePickerSize = 'default';

    /**
     * 输入框提示文字
     * @type string
     */
    @Input() thyPlaceholder: string = '选择时间';

    /**
     * 弹出位置
     * @type 'top' | 'topLeft'| 'topRight' | 'bottom' | 'bottomLeft' | 'bottomRight' | 'left' | 'leftTop' | 'leftBottom' | 'right' | 'rightTop' | 'rightBottom'
     */
    @Input() thyPlacement: ThyPlacement = 'bottomLeft';

    /**
     * 展示的日期格式，支持 'HH:mm:ss' | 'HH:mm' | 'mm:ss'
     * @type string
     * @default HH:mm:ss
     */
    @Input() set thyFormat(value: string) {
        this.format = value || 'HH:mm:ss';
        if (this.value && isValid(this.value)) {
            this.showText = new TinyDate(this.value).format(this.format);
        }
    }

    /**
     * 小时间隔步长
     * @type number
     */
    @Input() thyHourStep: number = 1;

    /**
     * 分钟间隔步长
     * @type number
     */
    @Input() thyMinuteStep: number = 1;

    /**
     * 秒间隔步长
     * @type number
     */
    @Input() thySecondStep: number = 1;

    /**
     * 弹出层组件 class
     * @type string
     */
    @Input() thyPopupClass: string;

    /**
     * 是否显示弹出层遮罩
     * @type boolean
     * @default false
     */
    @Input() @InputBoolean() thyBackdrop: boolean;

    /**
     * 禁用
     * @type boolean
     * @default false
     */
    @Input() @InputBoolean() set thyDisabled(value: boolean) {
        this.disabled = coerceBooleanProperty(value);
    }

    get thyDisabled(): boolean {
        return this.disabled;
    }

    /**
     * 只读
     * @type boolean
     * @default false
     */
    @Input() @InputBoolean() set thyReadonly(value: boolean) {
        this.readonly = value;
    }

    /**
     * 展示选择此刻
     * @type boolean
     */
    @Input() @InputBoolean() thyShowSelectNow = true;

    /**
     * 可清空值
     * @type boolean
     */
    @Input() @InputBoolean() thyAllowClear = true;

    /**
     * 打开/关闭弹窗事件
     * @type EventEmitter<boolean>
     */
    @Output() thyOpenChange = new EventEmitter<boolean>();

    prefixCls = 'thy-time-picker';

    overlayPositions = getFlexiblePositions(this.thyPlacement, 4);

    format: string = 'HH:mm:ss';

    disabled: boolean;

    readonly: boolean;

    showText: string = '';

    openState: boolean;

    value: Date = new TinyDate().setHms(0, 0, 0).nativeDate;

    originValue: Date;

    keepFocus: boolean;

    private isDisabledFirstChange = true;

    onValueChangeFn: (val: number | Date) => void = () => void 0;

    onTouchedFn: () => void = () => void 0;

    constructor(private cdr: ChangeDetectorRef, private elementRef: ElementRef) {}

    ngOnInit() {}

    ngAfterViewInit() {
        this.overlayPositions = getFlexiblePositions(this.thyPlacement, 4);
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
        this.originValue = new Date(value);
        this.setValue(value);
        this.emitValue();
    }

    onPickTimeConfirm(value: Date) {
        this.originValue = new Date(value);
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
            !this.overlayContainer.nativeElement.contains(event.target as Node)
        ) {
            this.closeOverlay();
            this.cdr.detectChanges();
        }
    }

    onOverlayAttach() {
        if (this.cdkConnectedOverlay && this.cdkConnectedOverlay.overlayRef) {
            this.cdkConnectedOverlay.overlayRef.updatePosition();
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
            if (this.showText?.length) {
                if (!this.validateCustomizeInput(this.showText)) {
                    this.setValue(this.originValue);
                } else {
                    this.showText = new TinyDate(this.value).format(this.format);
                }
            } else {
                if (!this.thyAllowClear) {
                    this.setValue(this.originValue);
                }
            }
            this.thyOpenChange.emit(this.openState);
        }
    }

    focus() {
        if (this.inputRef) {
            this.inputRef.nativeElement.focus();
        }
    }

    blur() {
        if (this.inputRef) {
            this.inputRef.nativeElement.blur();
        }
    }

    writeValue(value: Date | number): void {
        if (value && isValid(value)) {
            this.originValue = new Date(value);
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
        this.disabled = (this.isDisabledFirstChange && this.thyDisabled) || isDisabled;
        this.isDisabledFirstChange = false;
    }

    private setValue(value: Date, formatText: boolean = true) {
        if (value && isValid(value)) {
            this.value = new Date(value);
            if (formatText) {
                this.showText = new TinyDate(this.value).format(this.format);
            }
        } else {
            this.value = null;
            this.showText = '';
        }
        this.cdr.markForCheck();
    }

    private confirmValue(value: Date) {
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
                this.originValue = new Date(this.value);
                this.emitValue();
            }
        } else {
            if (this.thyAllowClear) {
                this.originValue = null;
                this.setValue(null);
                this.emitValue();
            } else {
                this.value = new Date(this.originValue);
                this.showText = ``;
                this.cdr.markForCheck();
            }
        }
    }

    private validateCustomizeInput(value: string): boolean {
        let valid: boolean = false;
        if (value.length > this.format.length) {
            return valid;
        }
        const formatRule = this.format.split(':');
        const formatter = value.split(':');
        valid = !formatRule
            .map((m, i) => {
                return !!formatter[i];
            })
            .includes(false);
        return valid;
    }

    private disabledUserOperation() {
        return this.disabled || this.readonly;
    }
}
