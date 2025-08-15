import { getFlexiblePositions, ThyPlacement } from 'ngx-tethys/core';
import { coerceBooleanProperty, TinyDate } from 'ngx-tethys/util';
import { CdkConnectedOverlay, CdkOverlayOrigin, ConnectedOverlayPositionChange, ConnectionPositionPair } from '@angular/cdk/overlay';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    inject,
    input,
    effect,
    OnChanges,
    output,
    SimpleChanges,
    viewChild
} from '@angular/core';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { scaleMotion, scaleXMotion, scaleYMotion } from 'ngx-tethys/core';
import { ThyI18nService } from 'ngx-tethys/i18n';
import { ThyIcon } from 'ngx-tethys/icon';
import { ThyInputDirective } from 'ngx-tethys/input';
import { ThyEnterDirective } from 'ngx-tethys/shared';
import { DateHelperService } from './date-helper.service';
import { CompatibleValue, RangePartType } from './inner-types';
import { getFlexibleAdvancedReadableValue } from './picker.util';
import { ThyDateGranularity } from './standard-types';

/**
 * @private
 */
@Component({
    selector: 'thy-picker',
    exportAs: 'thyPicker',
    templateUrl: './picker.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CdkOverlayOrigin, ThyInputDirective, ThyEnterDirective, NgTemplateOutlet, ThyIcon, NgClass, CdkConnectedOverlay],
    animations: [scaleXMotion, scaleYMotion, scaleMotion]
})
export class ThyPicker implements AfterViewInit {
    private changeDetector = inject(ChangeDetectorRef);

    private dateHelper = inject(DateHelperService);

    private i18n = inject(ThyI18nService);

    readonly isRange = input(false, { transform: coerceBooleanProperty });

    readonly opened = input<boolean | undefined>(undefined);

    readonly disabled = input(false, { transform: coerceBooleanProperty });

    readonly placeholder = input<string | string[]>();

    readonly readonly = input(false, { transform: coerceBooleanProperty });

    readonly allowClear = input(false, { transform: coerceBooleanProperty });

    readonly autoFocus = input(false, { transform: coerceBooleanProperty });

    readonly className = input<string>();

    readonly size = input<'sm' | 'xs' | 'lg' | 'md' | 'default'>();

    readonly suffixIcon = input<string>();

    readonly placement = input<ThyPlacement>('bottomLeft');

    readonly flexible = input(false, { transform: coerceBooleanProperty });

    readonly mode = input<string>();

    readonly hasBackdrop = input(false, { transform: coerceBooleanProperty });

    readonly separator = input<string>();

    readonly timeZone = input<string>();

    readonly blur = output<Event>();

    readonly valueChange = output<TinyDate | TinyDate[] | null>();

    readonly openChange = output<boolean>(); // Emitted when overlay's open state change

    readonly inputChange = output<string>();

    readonly origin = viewChild<CdkOverlayOrigin>('origin');

    readonly cdkConnectedOverlay = viewChild<CdkConnectedOverlay>(CdkConnectedOverlay);

    readonly pickerInput = viewChild<ElementRef>('pickerInput');

    readonly overlayContainer = viewChild<ElementRef<HTMLElement>>('overlayContainer');

    readonly format = input<string>();

    readonly flexibleDateGranularity = input<ThyDateGranularity>();

    readonly value = input<TinyDate | TinyDate[] | null>();

    private innerflexibleDateGranularity: ThyDateGranularity;

    private innerFormat: string;

    private innerValue: TinyDate | TinyDate[] | null;

    entering = false;

    prefixCls = 'thy-calendar';

    isShowDatePopup = false;

    overlayOpen = false; // Available when "open"=undefined

    overlayPositions: ConnectionPositionPair[] = getFlexiblePositions(this.placement(), 4);

    get realOpenState(): boolean {
        // The value that really decide the open state of overlay
        return this.isOpenHandledByUser() ? !!this.opened() : this.overlayOpen;
    }

    get readonlyState(): boolean {
        return this.isRange() || this.readonly() || this.mode() !== 'date';
    }

    constructor() {
        effect(() => {
            this.innerValue = this.value();
            if (this.innerValue) {
                if (!this.entering) {
                    this.updateReadableDate(this.innerValue);
                }
            }
        });

        effect(() => {
            this.innerFormat = this.format();
            if (this.innerFormat) {
                this.updateReadableDate(this.innerValue);
            }
        });

        effect(() => {
            this.innerflexibleDateGranularity = this.flexibleDateGranularity();
            if (this.innerflexibleDateGranularity) {
                this.updateReadableDate(this.innerValue);
            }
        });

        effect(() => {
            if (this.timeZone()) {
                this.formatDate(this.innerValue as TinyDate);
            }
        });

        effect(() => {
            const openedState = this.opened();
            if (openedState != undefined) {
                if (openedState) {
                    this.showDatePopup();
                } else {
                    this.closeDatePopup();
                }
            }
        });
    }

    ngAfterViewInit(): void {
        this.overlayPositions = getFlexiblePositions(this.placement(), 4);
        if (this.autoFocus()) {
            this.focus();
        }
    }

    focus(): void {
        this.pickerInput()?.nativeElement.focus();
    }

    onBlur(event: FocusEvent) {
        this.blur.emit(event);
        if (this.entering) {
            this.valueChange.emit(this.pickerInput()?.nativeElement.value);
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
        this.valueChange.emit(this.pickerInput()?.nativeElement.value || this.getReadableValue(new TinyDate(undefined, this.timeZone())));
        this.entering = false;
    }

    showOverlay(): void {
        if (!this.realOpenState) {
            this.overlayOpen = true;
            this.showDatePopup();

            this.openChange.emit(this.overlayOpen);
            setTimeout(() => {
                if (this.cdkConnectedOverlay() && this.cdkConnectedOverlay()?.overlayRef) {
                    this.cdkConnectedOverlay()?.overlayRef.updatePosition();
                }
            });
        }
    }

    hideOverlay(): void {
        if (this.realOpenState) {
            this.overlayOpen = false;
            this.closeDatePopup();

            this.openChange.emit(this.overlayOpen);
            this.focus();
        }
    }

    showDatePopup() {
        this.isShowDatePopup = true;
        this.changeDetector.markForCheck();
    }

    closeDatePopup() {
        // Delay 200ms before destroying the date-popup, otherwise you will not see the closing animation.
        setTimeout(() => {
            this.isShowDatePopup = false;
            this.changeDetector.markForCheck();
        }, 200);
    }

    onClickInputBox(): void {
        if (!this.disabled() && !this.readonly() && !this.isOpenHandledByUser()) {
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

        this.innerValue = this.isRange() ? [] : null;
        this.valueChange.emit(this.innerValue);
    }

    getPartTypeIndex(partType: RangePartType): number {
        return { left: 0, right: 1 }[partType];
    }

    isEmptyValue(value: CompatibleValue | null): boolean {
        if (value === null) {
            return true;
        } else if (this.isRange()) {
            return !value || !Array.isArray(value) || value.every(val => !val);
        } else {
            return !value;
        }
    }

    // Whether open state is permanently controlled by user himself
    isOpenHandledByUser(): boolean {
        return this.opened() !== undefined;
    }

    getReadableValue(tinyDate: TinyDate | TinyDate[]): string | null {
        let value: TinyDate;
        if (this.isRange()) {
            if (this.flexible() && this.innerflexibleDateGranularity !== 'day') {
                return getFlexibleAdvancedReadableValue(
                    tinyDate as TinyDate[],
                    this.innerflexibleDateGranularity,
                    this.separator(),
                    this.i18n.getLocale()
                );
            } else {
                const start = tinyDate[0] ? this.formatDate(tinyDate[0]) : '';
                const end = tinyDate[1] ? this.formatDate(tinyDate[1]) : '';
                return start && end ? `${start}${this.separator()}${end}` : null;
            }
        } else {
            value = tinyDate as TinyDate;
            return value ? this.formatDate(value) : null;
        }
    }

    formatDate(value: TinyDate) {
        // dateHelper.format() 使用的是 angular 的 format，不支持季度，修改的话，改动比较大。
        // 此处通过对 innerFormat 做下判断，如果是季度的 format，使用 date-fns 的 format()
        if (this.innerFormat && (this.innerFormat.includes('q') || this.innerFormat.includes('Q'))) {
            return value.format(this.innerFormat);
        } else {
            return this.dateHelper.format(value?.nativeDate, this.innerFormat);
        }
    }

    getPlaceholder(): string {
        return this.isRange() && this.placeholder() && Array.isArray(this.placeholder())
            ? (this.placeholder() as string[]).join(this.separator())
            : (this.placeholder() as string);
    }

    private updateReadableDate(setValue: TinyDate | TinyDate[] | null) {
        const readableValue = this.getReadableValue(setValue);
        if (readableValue === this.pickerInput()?.nativeElement['value']) {
            return;
        }

        this.pickerInput().nativeElement.value = readableValue;
    }
}
