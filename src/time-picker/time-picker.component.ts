import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import { isPlatformBrowser } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    Inject,
    Input,
    OnDestroy,
    OnInit,
    Output,
    PLATFORM_ID,
    ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { isValid } from 'date-fns';
import { getFlexiblePositions, InputBoolean, ThyPlacement } from 'ngx-tethys/core';
import { TinyDate } from 'ngx-tethys/util';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export type TimePickerSize = 'xs' | 'sm' | 'md' | 'lg' | 'default';

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
        '[class.thy-time-picker-disabled]': `thyDisabled`,
        '[class.thy-time-picker-readonly]': `thyReadonly`
    }
})
export class ThyTimePickerComponent implements OnInit, AfterViewInit, OnDestroy, ControlValueAccessor {
    @ViewChild(CdkConnectedOverlay, { static: true }) cdkConnectedOverlay: CdkConnectedOverlay;

    @ViewChild('origin', { static: true }) origin: CdkOverlayOrigin;

    @ViewChild('pickerInput', { static: true }) inputRef: ElementRef<HTMLInputElement>;

    @ViewChild('overlayContainer', { static: false }) overlayContainer: ElementRef<HTMLElement>;

    @Input() thySize: TimePickerSize = 'default';

    @Input() thyPlaceholder: string = '选择时间';

    @Input() thyPlacement: ThyPlacement = 'bottomLeft';

    @Input() thyFormat: string = 'HH:mm:ss';

    @Input() thyHourStep: number = 1;

    @Input() thyMinuteStep: number = 1;

    @Input() thySecondStep: number = 1;

    @Input() thyPopupClass: string;

    @Input() @InputBoolean() thyBackdrop: boolean;

    @Input() @InputBoolean() set thyDisabled(value: boolean) {
        this.disabled = value;
    }

    @Input() @InputBoolean() thyReadonly: boolean;

    @Input() @InputBoolean() thyShowSelectNow = true;

    @Input() @InputBoolean() thyAllowClear = true;

    @Output() thyOpenChange = new EventEmitter<boolean>();

    prefixCls = 'thy-time-picker';

    overlayPositions = getFlexiblePositions(this.thyPlacement, 4);

    disabled: boolean;

    showText: string = '';

    openState: boolean;

    value: Date = new TinyDate().setHms(0, 0, 0).nativeDate;

    keepFocus: boolean;

    onValueChangeFn: (val: number | Date) => void = () => void 0;

    onTouchedFn: () => void = () => void 0;

    private readonly destroy$ = new Subject<void>();

    constructor(private cdr: ChangeDetectorRef, private elementRef: ElementRef, @Inject(PLATFORM_ID) private platformId: string) {}

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.cdkConnectedOverlay.overlayOutsideClick.pipe(takeUntil(this.destroy$)).subscribe((event: Event) => {
                if (
                    this.openState &&
                    !this.elementRef.nativeElement.contains(event.target) &&
                    !this.overlayContainer.nativeElement.contains(event.target as Node)
                ) {
                    this.closeOverlay();
                    this.cdr.detectChanges();
                }
            });
        }
    }

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
        this.setValue(value);
        this.emitValue();
    }

    onPickTimeConfirm(value: Date) {
        this.confirmValue(value);
    }

    onClearTime(e: Event) {
        e.stopPropagation();
        this.setValue(null);
        this.focus();
        this.openOverlay();
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
        this.keepFocus = false;
        this.openState = false;
        this.blur();
        if (this.showText?.length && !this.validateCustomizeInput(this.showText)) {
            this.setValue(this.value);
        }
        this.thyOpenChange.emit(this.openState);
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

    writeValue(value: Date): void {
        this.setValue(value);
    }

    registerOnChange(fn: any): void {
        this.onValueChangeFn = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouchedFn = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    private setValue(value: Date) {
        if (value && isValid(value)) {
            this.value = new Date(value);
            this.showText = new TinyDate(this.value).format(this.thyFormat);
        } else {
            this.value = null;
            this.showText = '';
        }
        this.cdr.markForCheck();
    }

    private confirmValue(value: Date) {
        this.closeOverlay();
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
        if (value?.length > 0) {
            if (this.validateCustomizeInput(value)) {
                const formatter = value.split(':');
                const hour = formatter[0] || 0;
                const minute = formatter[1] || 0;
                const second = formatter[2] || 0;
                this.setValue(new TinyDate().setHms(+hour, +minute, +second).nativeDate);
                this.emitValue();
            }
        } else {
            this.setValue(null);
            this.emitValue();
        }
    }

    private validateCustomizeInput(value: string): boolean {
        let valid: boolean = false;
        const formatRule = this.thyFormat.split(':');
        const formatter = value.split(':');
        valid = !formatRule
            .map((m, i) => {
                if (m.toLowerCase().includes('h')) {
                    return !!formatter[i];
                } else {
                    return m.length === formatter[i]?.length;
                }
            })
            .includes(false);
        return valid;
    }

    private disabledUserOperation() {
        return this.thyDisabled || this.thyReadonly;
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
