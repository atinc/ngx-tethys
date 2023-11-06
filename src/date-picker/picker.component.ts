import { getFlexiblePositions, ThyPlacement } from 'ngx-tethys/core';
import { TinyDate } from 'ngx-tethys/util';

import { CdkConnectedOverlay, CdkOverlayOrigin, ConnectedOverlayPositionChange } from '@angular/cdk/overlay';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    ViewChild
} from '@angular/core';

import { AsyncPipe, NgClass, NgIf, NgTemplateOutlet } from '@angular/common';
import { ThyIconComponent } from 'ngx-tethys/icon';
import { ThyInputDirective } from 'ngx-tethys/input';
import { DateHelperService } from './date-helper.service';
import { CompatibleValue, RangePartType } from './inner-types';
import { getFlexibleAdvancedReadableValue, isValidDateString, parseFormatDate, transformDateValue } from './picker.util';
import { DisabledDateFn, ThyDateGranularity } from './standard-types';
import { ThyEnterDirective } from 'ngx-tethys/shared';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs/operators';

/**
 * @private
 */
@Component({
    selector: 'thy-picker',
    exportAs: 'thyPicker',
    templateUrl: './picker.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        CdkOverlayOrigin,
        ThyInputDirective,
        ThyEnterDirective,
        AsyncPipe,
        NgTemplateOutlet,
        NgIf,
        ThyIconComponent,
        NgClass,
        CdkConnectedOverlay
    ]
})
export class ThyPickerComponent implements AfterViewInit {
    @Input() isRange = false;
    @Input() open: boolean | undefined = undefined;
    @Input() disabled: boolean;
    @Input() placeholder: string | string[];
    @Input() readonly: boolean;
    @Input() allowClear: boolean;
    @Input() autoFocus: boolean;
    @Input() className: string;
    @Input() format: string;
    @Input() size: 'sm' | 'xs' | 'lg' | 'md' | 'default';
    // @Input() value: TinyDate | TinyDate[] | null;
    @Input() suffixIcon: string;
    @Input() placement: ThyPlacement = 'bottomLeft';
    @Input() flexible: boolean = false;
    @Input() max: Date | number;
    @Input() min: Date | number;
    @Input() disabledDate: DisabledDateFn;
    @Output() blur = new EventEmitter<Event>();
    @Output() readonly valueChange = new EventEmitter<TinyDate | TinyDate[] | null>();
    @Output() readonly openChange = new EventEmitter<boolean>(); // Emitted when overlay's open state change
    @Output() readonly updateDate = new EventEmitter<TinyDate | TinyDate[] | null>();
    @Output() readonly enterChange = new EventEmitter<TinyDate | TinyDate[] | null>();

    @ViewChild('origin', { static: true }) origin: CdkOverlayOrigin;
    @ViewChild(CdkConnectedOverlay, { static: true }) cdkConnectedOverlay: CdkConnectedOverlay;
    @ViewChild('pickerInput', { static: true }) pickerInput: ElementRef;

    @Input()
    get flexibleDateGranularity() {
        return this._flexibleDateGranularity;
    }

    set flexibleDateGranularity(granularity: ThyDateGranularity) {
        this._flexibleDateGranularity = granularity;
        this.updateReadableDate(this._value);
    }

    @Input()
    get value() {
        return this._value;
    }

    set value(value: TinyDate | TinyDate[] | null) {
        this._value = value;
        if (!this._previousDate) {
            this._previousDate = this._value;
        }
        if (!this.onTuoched) {
            this.updateReadableDate(this._value);
        }
    }

    private _flexibleDateGranularity: ThyDateGranularity;
    private _value: TinyDate | TinyDate[] | null;
    private _inputDate$ = new Subject<string>();
    private _previousDate: TinyDate | TinyDate[] | null;
    onTuoched = false;
    readableValue$ = new BehaviorSubject<string | null>(null);
    prefixCls = 'thy-calendar';
    animationOpenState = false;
    overlayOpen = false; // Available when "open"=undefined
    overlayPositions = getFlexiblePositions(this.placement, 4);
    takeUntilDestroyed = takeUntilDestroyed();

    get realOpenState(): boolean {
        // The value that really decide the open state of overlay
        return this.isOpenHandledByUser() ? !!this.open : this.overlayOpen;
    }

    get readonlyState(): boolean {
        return this.isRange || this.readonly || !this.format || !this.validFormat;
    }

    get validFormat() {
        return this.format.includes('yyyy') && this.format.includes('MM') && this.format.includes('dd');
    }

    constructor(private changeDetector: ChangeDetectorRef, private dateHelper: DateHelperService) {}

    ngAfterViewInit(): void {
        this.overlayPositions = getFlexiblePositions(this.placement, 4);
        if (this.autoFocus) {
            this.focus();
        }

        this._inputDate$
            .pipe(
                this.takeUntilDestroyed,
                filter((str: string) => {
                    if (!str) {
                        this._previousDate = null;
                    }
                    const formatValid = isValidDateString(str, this.format);
                    const limitValid = this.isValidDateLimit(
                        new TinyDate(parseFormatDate(str, this.format)),
                        this.min,
                        this.max,
                        this.disabledDate
                    );
                    if (!formatValid || !limitValid) {
                        this.updateDate.emit(null);
                    }
                    return formatValid && limitValid;
                }),
                map(date => {
                    return new TinyDate(parseFormatDate(date, this.format));
                })
            )
            .subscribe((date: TinyDate) => {
                this.updateDate.emit(date);
            });
    }

    focus(): void {
        this.pickerInput.nativeElement.focus();
    }

    onBlur(event: FocusEvent) {
        this.blur.emit(event);
    }

    onInput(event: InputEvent) {
        this.onTuoched = true;
        const inputValue = (event.target as HTMLElement)['value'];
        this._inputDate$.next(inputValue);
    }

    onEnter() {
        if (this.readonlyState) {
            return;
        }
        const setValue =
            this._value ||
            this._previousDate ||
            (this.isValidDateLimit(new TinyDate(new Date()), this.min, this.max, this.disabledDate) ? new TinyDate(new Date()) : null);
        this.updateValue(setValue);
        this._previousDate = setValue;
    }

    showOverlay(): void {
        if (!this.realOpenState) {
            this.overlayOpen = true;
            if (this.realOpenState) {
                this.animationOpenState = true;
            }
            this.openChange.emit(this.overlayOpen);
            setTimeout(() => {
                if (this.cdkConnectedOverlay && this.cdkConnectedOverlay.overlayRef) {
                    this.cdkConnectedOverlay.overlayRef.updatePosition();
                }
            });
        }
    }

    hideOverlay(): void {
        if (this.realOpenState) {
            this.overlayOpen = false;
            if (!this.realOpenState) {
                this.animationOpenState = false;
            }
            this.openChange.emit(this.overlayOpen);
            this.focus();
        }
    }

    onClickInputBox(): void {
        if (!this.disabled && !this.readonly && !this.isOpenHandledByUser()) {
            this.showOverlay();
        }
    }

    onClickBackdrop(): void {
        this.hideOverlay();
    }

    onOverlayDetach(): void {
        this.hideOverlay();
    }

    onPositionChange(position: ConnectedOverlayPositionChange): void {
        this.changeDetector.detectChanges();
    }

    onClickClear(event: MouseEvent): void {
        event.preventDefault();
        event.stopPropagation();

        this._previousDate = null;
        this._value = this.isRange ? [] : null;
        this.updateValue(this._value, false);
    }

    getPartTypeIndex(partType: RangePartType): number {
        return { left: 0, right: 1 }[partType];
    }

    isEmptyValue(value: CompatibleValue | null): boolean {
        if (value === null) {
            return true;
        } else if (this.isRange) {
            return !value || !Array.isArray(value) || value.every(val => !val);
        } else {
            return !value;
        }
    }

    // Whether open state is permanently controlled by user himself
    isOpenHandledByUser(): boolean {
        return this.open !== undefined;
    }

    getReadableValue(tinyDate: TinyDate | TinyDate[]): string | null {
        let value: TinyDate;
        if (this.isRange) {
            if (this.flexible && this._flexibleDateGranularity !== 'day') {
                return getFlexibleAdvancedReadableValue(tinyDate as TinyDate[], this._flexibleDateGranularity);
            } else {
                const start = tinyDate[0] ? this.dateHelper.format(tinyDate[0].nativeDate, this.format) : '';
                const end = tinyDate[1] ? this.dateHelper.format(tinyDate[1].nativeDate, this.format) : '';
                return start && end ? `${start} ~ ${end}` : null;
            }
        } else {
            value = tinyDate as TinyDate;
            return value ? this.dateHelper.format(value.nativeDate, this.format) : null;
        }
    }

    getPlaceholder(): string {
        return this.isRange && this.placeholder && Array.isArray(this.placeholder)
            ? (this.placeholder as string[]).join(' ~ ')
            : (this.placeholder as string);
    }

    private updateValue(setValue: TinyDate | TinyDate[] | null, sourceEnter = true) {
        if (sourceEnter) {
            this.enterChange.emit(setValue);
            this.updateReadableDate(setValue);
        } else {
            this.valueChange.emit(setValue);
        }
    }

    private updateReadableDate(setValue: TinyDate | TinyDate[] | null) {
        const readableValue = this.getReadableValue(setValue);
        if (readableValue === this.pickerInput.nativeElement['value']) {
            return;
        }
        if (this.readonlyState) {
            this.readableValue$.next(readableValue);
        } else {
            this.readableValue$.next(null);
            setTimeout(() => {
                this.readableValue$.next(readableValue);
            }, 0);
        }
    }

    private isValidDateLimit(date: TinyDate, min: Date | number, max: Date | number, disabledDate: DisabledDateFn): boolean {
        let disable = false;
        if (disabledDate !== undefined) {
            disable = disabledDate(date.nativeDate);
        }
        const minDate = min ? new TinyDate(transformDateValue(min).value as Date) : null;
        const maxDate = max ? new TinyDate(transformDateValue(max).value as Date) : null;
        return (
            (!minDate || date.startOfDay().nativeDate >= minDate.startOfDay().nativeDate) &&
            (!maxDate || date.startOfDay().nativeDate <= maxDate.startOfDay().nativeDate) &&
            !disable
        );
    }
}
