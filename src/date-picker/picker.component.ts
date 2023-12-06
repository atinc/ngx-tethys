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
import { getFlexibleAdvancedReadableValue } from './picker.util';
import { ThyDateGranularity } from './standard-types';
import { ThyEnterDirective } from 'ngx-tethys/shared';
import { scaleMotion, scaleXMotion, scaleYMotion } from 'ngx-tethys/core';

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
    ],
    animations: [scaleXMotion, scaleYMotion, scaleMotion]
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
    @Input() size: 'sm' | 'xs' | 'lg' | 'md' | 'default';
    @Input() suffixIcon: string;
    @Input() placement: ThyPlacement = 'bottomLeft';
    @Input() flexible: boolean = false;
    @Input() mode: string;
    @Output() blur = new EventEmitter<Event>();
    @Output() readonly valueChange = new EventEmitter<TinyDate | TinyDate[] | null>();
    @Output() readonly openChange = new EventEmitter<boolean>(); // Emitted when overlay's open state change
    @Output() readonly inputChange = new EventEmitter<string>();

    @ViewChild('origin', { static: true }) origin: CdkOverlayOrigin;
    @ViewChild(CdkConnectedOverlay, { static: true }) cdkConnectedOverlay: CdkConnectedOverlay;
    @ViewChild('pickerInput', { static: true }) pickerInput: ElementRef;

    @Input()
    get format() {
        return this.innerFormat;
    }

    set format(value: string) {
        this.innerFormat = value;
        this.updateReadableDate(this.innerValue);
    }

    @Input()
    get flexibleDateGranularity() {
        return this.innerflexibleDateGranularity;
    }

    set flexibleDateGranularity(granularity: ThyDateGranularity) {
        this.innerflexibleDateGranularity = granularity;
        this.updateReadableDate(this.innerValue);
    }

    @Input()
    get value() {
        return this.innerValue;
    }

    set value(value: TinyDate | TinyDate[] | null) {
        this.innerValue = value;
        if (!this.entering) {
            this.updateReadableDate(this.innerValue);
        }
    }

    private innerflexibleDateGranularity: ThyDateGranularity;

    private innerFormat: string;

    private innerValue: TinyDate | TinyDate[] | null;

    entering = false;

    prefixCls = 'thy-calendar';

    animationOpenState = false;

    overlayOpen = false; // Available when "open"=undefined

    overlayPositions = getFlexiblePositions(this.placement, 4);

    get realOpenState(): boolean {
        // The value that really decide the open state of overlay
        return this.isOpenHandledByUser() ? !!this.open : this.overlayOpen;
    }

    get readonlyState(): boolean {
        return this.isRange || this.readonly || this.mode !== 'date';
    }

    constructor(private changeDetector: ChangeDetectorRef, private dateHelper: DateHelperService) {}

    ngAfterViewInit(): void {
        this.overlayPositions = getFlexiblePositions(this.placement, 4);
        if (this.autoFocus) {
            this.focus();
        }
    }

    focus(): void {
        this.pickerInput.nativeElement.focus();
    }

    onBlur(event: FocusEvent) {
        this.blur.emit(event);
        if (this.entering) {
            this.valueChange.emit(this.pickerInput.nativeElement.value);
        }
        this.entering = false;
    }

    onInput(event: InputEvent) {
        this.entering = true;
        const inputValue = (event.target as HTMLElement)['value'];
        this.inputChange.emit(inputValue);
    }

    onEnter() {
        if (this.readonlyState) {
            return;
        }
        this.valueChange.emit(this.pickerInput.nativeElement.value || this.getReadableValue(new TinyDate(new Date())));
        this.entering = false;
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

        this.innerValue = this.isRange ? [] : null;
        this.valueChange.emit(this.innerValue);
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
            if (this.flexible && this.innerflexibleDateGranularity !== 'day') {
                return getFlexibleAdvancedReadableValue(tinyDate as TinyDate[], this.innerflexibleDateGranularity);
            } else {
                const start = tinyDate[0] ? this.dateHelper.format(tinyDate[0].nativeDate, this.innerFormat) : '';
                const end = tinyDate[1] ? this.dateHelper.format(tinyDate[1].nativeDate, this.innerFormat) : '';
                return start && end ? `${start} ~ ${end}` : null;
            }
        } else {
            value = tinyDate as TinyDate;
            return value ? this.dateHelper.format(value.nativeDate, this.innerFormat) : null;
        }
    }

    getPlaceholder(): string {
        return this.isRange && this.placeholder && Array.isArray(this.placeholder)
            ? (this.placeholder as string[]).join(' ~ ')
            : (this.placeholder as string);
    }

    private updateReadableDate(setValue: TinyDate | TinyDate[] | null) {
        const readableValue = this.getReadableValue(setValue);
        if (readableValue === this.pickerInput.nativeElement['value']) {
            return;
        }

        this.pickerInput.nativeElement.value = readableValue;
    }
}
