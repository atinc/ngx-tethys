import { CdkConnectedOverlay, CdkOverlayOrigin, ConnectedOverlayPositionChange, ConnectionPositionPair } from '@angular/cdk/overlay';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    ViewChild,
    Renderer2
} from '@angular/core';
import { TinyDate } from 'ngx-tethys/util';
import { DateHelperService } from './date-helper.service';
import { CompatibleValue } from './standard-types';
import { getFlexiblePositions } from 'ngx-tethys/core';

export type RangePartType = 'left' | 'right';

@Component({
    selector: 'thy-picker',
    exportAs: 'thyPicker',
    templateUrl: './picker.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
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
    @Input() value: TinyDate | TinyDate[] | null;
    @Input() suffixIcon: string;
    @Output() readonly valueChange = new EventEmitter<TinyDate | TinyDate[] | null>();
    @Output() readonly openChange = new EventEmitter<boolean>(); // Emitted when overlay's open state change

    @ViewChild('origin', { static: true }) origin: CdkOverlayOrigin;
    @ViewChild(CdkConnectedOverlay, { static: true }) cdkConnectedOverlay: CdkConnectedOverlay;
    @ViewChild('pickerInput', { static: true }) pickerInput: ElementRef;

    prefixCls = 'thy-calendar';
    animationOpenState = false;
    overlayOpen = false; // Available when "open"=undefined
    overlayPositions = getFlexiblePositions('bottomLeft', 10);
    currentPositionX: 'start' | 'end' = 'start';
    currentPositionY: 'top' | 'bottom' = 'top';

    get realOpenState(): boolean {
        // The value that really decide the open state of overlay
        return this.isOpenHandledByUser() ? !!this.open : this.overlayOpen;
    }

    constructor(private changeDetector: ChangeDetectorRef, private dateHelper: DateHelperService) {}

    ngAfterViewInit(): void {
        if (this.autoFocus) {
            this.focus();
        }
    }

    focus(): void {
        this.pickerInput.nativeElement.focus();
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
        this.currentPositionX = position.connectionPair.originX as 'start' | 'end';
        this.currentPositionY = position.connectionPair.originY as 'top' | 'bottom';
        this.changeDetector.detectChanges();
    }

    onClickClear(event: MouseEvent): void {
        event.preventDefault();
        event.stopPropagation();

        this.value = this.isRange ? [] : null;
        this.valueChange.emit(this.value);
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

    getReadableValue(): string | null {
        let value: TinyDate;
        if (this.isRange) {
            const start = this.value[0] ? this.dateHelper.format(this.value[0].nativeDate, this.format) : '';
            const end = this.value[1] ? this.dateHelper.format(this.value[1].nativeDate, this.format) : '';
            return start && end ? `${start} ~ ${end}` : null;
        } else {
            value = this.value as TinyDate;
            return value ? this.dateHelper.format(value.nativeDate, this.format) : null;
        }
    }

    getPlaceholder(): string {
        return this.isRange && this.placeholder ? (this.placeholder as string[]).join(' ~ ') : (this.placeholder as string);
    }
}
