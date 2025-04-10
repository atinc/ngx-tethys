import { ThyClickDispatcher, ThyPlacement } from 'ngx-tethys/core';
import { elementMatchClosest, FunctionProp, TinyDate } from 'ngx-tethys/util';

import {
    Component,
    ElementRef,
    EventEmitter,
    inject,
    Input,
    NgZone,
    OnChanges,
    OnInit,
    Output,
    PLATFORM_ID,
    TemplateRef,
    ViewChild
} from '@angular/core';

import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { isPlatformBrowser } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractPickerComponent } from './abstract-picker.component';
import { CompatibleValue, RangeAdvancedValue } from './inner-types';
import { ThyPicker } from './picker.component';
import { hasTimeInStringDate, isValidStringDate, parseStringDate, transformDateValue } from './picker.util';
import { CompatibleDate, ThyPanelMode } from './standard-types';

/**
 * @private
 */
@Component({
    template: ``,
    standalone: true,
    host: {
        '[attr.tabindex]': `tabIndex`,
        '(focus)': 'onFocus($event)',
        '(blur)': 'onBlur($event)'
    }
})
export class BasePicker extends AbstractPickerComponent implements OnInit, OnChanges {
    protected element = inject(ElementRef);

    showWeek = false;

    panelMode: ThyPanelMode | ThyPanelMode[];

    initialized: boolean;

    private innerPreviousDate: string;

    @ViewChild('thyPicker', { static: true }) thyPicker: ThyPicker;

    @Input() thyDateRender: FunctionProp<TemplateRef<Date> | string>;

    @Input() set thyMode(value: ThyPanelMode) {
        this._panelMode = value ?? 'date';
        if (this.initialized) {
            this.setDefaultTimePickerState(this._panelMode);
        }
    }

    get thyMode() {
        return this._panelMode;
    }

    /**
     * 是否有幕布
     * @default true
     */
    @Input({ transform: coerceBooleanProperty }) thyHasBackdrop = true;

    /**
     * @type EventEmitter<ThyPanelMode | ThyPanelMode[]>
     */
    @Output() readonly thyOnPanelChange = new EventEmitter<ThyPanelMode | ThyPanelMode[]>();

    /**
     * @type EventEmitter<Date[]>
     */
    @Output() readonly thyOnCalendarChange = new EventEmitter<Date[]>();

    private _showTime: object | boolean;

    /**
     * 增加时间选择功能
     * @default false
     */
    @Input() get thyShowTime(): object | boolean {
        return this._showTime;
    }
    set thyShowTime(value: object | boolean) {
        this._showTime = typeof value === 'object' ? value : coerceBooleanProperty(value);
    }

    /**
     * 是否展示时间(时、分)
     * @default false
     */
    @Input({ transform: coerceBooleanProperty }) thyMustShowTime = false;

    /**
     * 弹出位置
     * @type top | topLeft | topRight | bottom | bottomLeft | bottomRight | left | leftTop | leftBottom | right | rightTop | rightBottom
     */
    @Input() thyPlacement: ThyPlacement = 'bottomLeft';

    /**
     * @type EventEmitter<CompatibleDate | null>
     */
    @Output() readonly thyOnOk = new EventEmitter<CompatibleDate | null>();

    takeUntilDestroyed = takeUntilDestroyed();

    thyClickDispatcher = inject(ThyClickDispatcher);

    platformId = inject(PLATFORM_ID);

    ngZone = inject(NgZone);

    ngOnInit(): void {
        super.ngOnInit();
        this.setDefaultTimePickerState(this._panelMode);
        this.initialized = true;

        if (isPlatformBrowser(this.platformId)) {
            this.thyClickDispatcher
                .clicked(0)
                .pipe(this.takeUntilDestroyed)
                .subscribe((event: Event) => {
                    if (
                        !this.element.nativeElement.contains(event.target) &&
                        !this.thyPicker?.overlayContainer?.nativeElement.contains(event.target as Node) &&
                        this.realOpenState
                    ) {
                        this.ngZone.run(() => {
                            this.closeOverlay();
                            this.cdr.markForCheck();
                        });
                    }
                });
        }
    }

    onValueChange(value: CompatibleValue | RangeAdvancedValue): void {
        this.thyPicker.entering = false;
        this.restoreTimePickerState(value as CompatibleValue);
        console.log('onValueChange: ', value);
        super.onValueChange(value);
        if (!this.flexible) {
            this.closeOverlay();
        }
        this.innerPreviousDate = this.thyPicker.getReadableValue(this.thyValue);
    }

    onInputValueChange(formatDate: string | null | Array<null>) {
        if (!formatDate || !formatDate.length) {
            const compatibleValue = formatDate ? (formatDate as CompatibleValue) : null;
            this.restoreTimePickerState(compatibleValue);
            super.onValueChange(compatibleValue);
            return;
        }
        let value = formatDate as string;
        const valueValid = isValidStringDate(value, this.thyTimeZone);
        const valueLimitValid = valueValid ? this.isValidDateLimit(parseStringDate(value, this.thyTimeZone)) : false;
        if (valueValid && valueLimitValid) {
            this.innerPreviousDate = value;
        } else {
            value = this.innerPreviousDate;
        }
        const tinyDate = value
            ? this.thyShowTime
                ? parseStringDate(value, this.thyTimeZone)
                : parseStringDate(value, this.thyTimeZone).startOfDay()
            : null;
        this.restoreTimePickerState(tinyDate);
        super.onValueChange(tinyDate);
    }

    // Displays the time directly when the time must be displayed by default
    setDefaultTimePickerState(value: ThyPanelMode) {
        this.withTime = this.thyMustShowTime;
        if (this.isRange) {
            this.panelMode = this.flexible ? ['date', 'date'] : [value, value];
        } else {
            this.panelMode = value;
        }
        this.showWeek = value === 'week';
        if (!this.thyFormat) {
            const inputFormats: { [key in ThyPanelMode]?: string } = {
                year: 'yyyy',
                quarter: 'yyyy-qqq',
                month: 'yyyy-MM',
                week: this.locale().weekThFormat,
                date: this.thyShowTime ? 'yyyy-MM-dd HH:mm' : 'yyyy-MM-dd'
            };
            this.thyFormat = this.flexible ? inputFormats['date'] : inputFormats[value];
        }
    }

    // Restore after clearing time to select whether the original picker time is displayed or not
    restoreTimePickerState(value: CompatibleValue | null) {
        if (!value) {
            this.withTime = this.thyMustShowTime || this.originWithTime;
        }
    }

    // Emit thyOnCalendarChange when select date by thy-range-picker
    onCalendarChange(value: TinyDate[]): void {
        if (this.isRange) {
            const rangeValue = value.map(x => x.nativeDate);
            this.thyOnCalendarChange.emit(rangeValue);
        }
    }

    onShowTimePickerChange(show: boolean): void {
        this.withTime = show;
    }

    onResultOk(): void {
        if (this.isRange) {
            const value = this.thyValue as TinyDate[];
            if (value.length) {
                this.thyOnOk.emit([value[0].nativeDate, value[1].nativeDate]);
            } else {
                this.thyOnOk.emit([]);
            }
        } else {
            if (this.thyValue) {
                this.thyOnOk.emit((this.thyValue as TinyDate).nativeDate);
            } else {
                this.thyOnOk.emit(null);
            }
        }
        this.closeOverlay();
    }

    onOpenChange(open: boolean): void {
        this.thyOpenChange.emit(open);
        if (!open) {
            this.onTouchedFn();
        }
    }

    onFocus(event: Event) {
        this.picker.focus();
    }

    onBlur(event?: FocusEvent) {
        // Tab 聚焦后自动聚焦到 input 输入框，此分支下直接返回，无需触发 onTouchedFn
        if (elementMatchClosest(event?.relatedTarget as HTMLElement, ['date-popup', 'thy-picker'])) {
            return;
        }
        this.onTouchedFn();
    }

    onInputDate(value: string) {
        if (value && isValidStringDate(value, this.thyTimeZone)) {
            if (this.thyShowTime) {
                this.withTime = hasTimeInStringDate(value, this.thyTimeZone);
            }
            this.thyValue = parseStringDate(value, this.thyTimeZone);
            console.log('onInputDate: this.thyValue++++++++++++++++++', this.thyValue.nativeDate);
            console.log('onInputDate: this.thyValue++++++++++++++++++', this.thyValue.getTime());
            console.log('onInputDate: this.withTime++++++++++++++++++', this.withTime);
        }
    }

    private isValidDateLimit(date: TinyDate): boolean {
        let disable = false;
        if (this.thyDisabledDate !== undefined) {
            disable = this.thyDisabledDate(date.nativeDate);
        }
        const minDate = this.thyMinDate ? new TinyDate(transformDateValue(this.thyMinDate).value as Date, this.thyTimeZone) : null;
        const maxDate = this.thyMaxDate ? new TinyDate(transformDateValue(this.thyMaxDate).value as Date, this.thyTimeZone) : null;
        return (
            (!minDate || date.startOfDay().nativeDate >= minDate.startOfDay().nativeDate) &&
            (!maxDate || date.startOfDay().nativeDate <= maxDate.startOfDay().nativeDate) &&
            !disable
        );
    }
}
