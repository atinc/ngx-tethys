import { ThyClickDispatcher, ThyPlacement } from 'ngx-tethys/core';
import { elementMatchClosest, FunctionProp, TinyDate } from 'ngx-tethys/util';
import {
    Component,
    ElementRef,
    inject,
    input,
    Input,
    NgZone,
    OnChanges,
    OnInit,
    output,
    PLATFORM_ID,
    TemplateRef,
    viewChild
} from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { isPlatformBrowser } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractPickerComponent } from './abstract-picker.component';
import { CompatibleValue, RangeAdvancedValue } from './inner-types';
import { ThyPicker } from './picker.component';
import { hasTimeInStringDate, isValidStringDate, parseStringDate, transformDateValue } from './picker.util';
import { ThyCompatibleDate, ThyPanelMode } from './standard-types';
import { QUARTER_FORMAT } from './date-picker.config';

/**
 * @private
 */
@Component({
    template: ``,
    host: {
        '[attr.tabindex]': `tabIndex`,
        '(focus)': 'onFocus($event)',
        '(blur)': 'onBlur($event)'
    }
})
export class BasePicker extends AbstractPickerComponent implements OnInit, OnChanges {
    protected element = inject(ElementRef);

    initialized: boolean;

    private innerPreviousDate: string;

    private thyPicker = viewChild<ThyPicker>('thyPicker');

    readonly thyDateRender = input<FunctionProp<TemplateRef<Date> | string>>();

    @Input() set thyMode(value: ThyPanelMode) {
        this._panelMode = value ?? 'date';
        if (this.initialized) {
            this.setPanelMode();
            this.setFormat();
        }
    }

    get thyMode() {
        return this._panelMode;
    }

    /**
     * 是否有幕布
     */
    readonly thyHasBackdrop = input(true, { transform: coerceBooleanProperty });

    /**
     * 弹出位置
     * @type top | topLeft | topRight | bottom | bottomLeft | bottomRight | left | leftTop | leftBottom | right | rightTop | rightBottom
     */
    readonly thyPlacement = input<ThyPlacement>('bottomLeft');

    readonly thyOnPanelChange = output<ThyPanelMode | ThyPanelMode[]>();

    readonly thyOnCalendarChange = output<Date[]>();

    readonly thyOnOk = output<ThyCompatibleDate | null>();

    thyClickDispatcher = inject(ThyClickDispatcher);

    platformId = inject(PLATFORM_ID);

    ngZone = inject(NgZone);

    ngOnInit(): void {
        super.ngOnInit();
        this.setPanelMode();
        this.setFormat();
        this.initialized = true;

        if (isPlatformBrowser(this.platformId)) {
            this.thyClickDispatcher
                .clicked(0)
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe((event: Event) => {
                    if (
                        !this.element.nativeElement.contains(event.target) &&
                        !this.thyPicker()
                            ?.overlayContainer()
                            ?.nativeElement.contains(event.target as Node) &&
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
        this.thyPicker().entering = false;
        this.restoreTimePickerState(value as CompatibleValue);
        super.onValueChange(value);
        if (!this.flexible()) {
            this.closeOverlay();
        }
        this.innerPreviousDate = this.thyPicker().getReadableValue(this.thyValue);
    }

    onInputValueChange(formatDate: string | null | Array<null>) {
        if (!formatDate || !formatDate.length) {
            const compatibleValue = formatDate ? (formatDate as CompatibleValue) : null;
            this.restoreTimePickerState(compatibleValue);
            super.onValueChange(compatibleValue);
            return;
        }
        let value = formatDate as string;
        const valueValid = isValidStringDate(value, this.thyTimeZone());
        const valueLimitValid = valueValid ? this.isValidDateLimit(parseStringDate(value, this.thyTimeZone())) : false;
        if (valueValid && valueLimitValid) {
            this.innerPreviousDate = value;
        } else {
            value = this.innerPreviousDate;
        }
        const tinyDate = value
            ? this.thyShowTime()
                ? parseStringDate(value, this.thyTimeZone())
                : parseStringDate(value, this.thyTimeZone()).startOfDay()
            : null;
        this.restoreTimePickerState(tinyDate);
        super.onValueChange(tinyDate);
    }

    setFormat() {
        if (!this.thyFormat()) {
            const inputFormats: { [key in ThyPanelMode]?: string } = {
                year: 'yyyy',
                quarter: `yyyy-${QUARTER_FORMAT}`,
                month: 'yyyy-MM',
                week: this.locale().weekThFormat,
                date: this.thyShowTime() ? 'yyyy-MM-dd HH:mm' : 'yyyy-MM-dd'
            };
            this.thyFormat.set(this.flexible() ? inputFormats['date'] : inputFormats[this.thyMode]);
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
        this.picker().focus();
    }

    onBlur(event?: FocusEvent) {
        // Tab 聚焦后自动聚焦到 input 输入框，此分支下直接返回，无需触发 onTouchedFn
        if (elementMatchClosest(event?.relatedTarget as HTMLElement, ['date-popup', 'thy-picker'])) {
            return;
        }
        this.onTouchedFn();
    }

    onInputDate(value: string) {
        if (value && isValidStringDate(value, this.thyTimeZone())) {
            if (this.thyShowTime()) {
                this.withTime = hasTimeInStringDate(value, this.thyTimeZone());
            }
            this.thyValue = parseStringDate(value, this.thyTimeZone());
        }
    }

    private isValidDateLimit(date: TinyDate): boolean {
        let disable = false;
        if (this.thyDisabledDate() !== undefined) {
            disable = this.thyDisabledDate()(date.nativeDate);
        }
        const minDate = this.thyMinDate() ? new TinyDate(transformDateValue(this.thyMinDate()).value as Date, this.thyTimeZone()) : null;
        const maxDate = this.thyMaxDate() ? new TinyDate(transformDateValue(this.thyMaxDate()).value as Date, this.thyTimeZone()) : null;
        return (
            (!minDate || date.startOfDay().nativeDate >= minDate.startOfDay().nativeDate) &&
            (!maxDate || date.startOfDay().nativeDate <= maxDate.startOfDay().nativeDate) &&
            !disable
        );
    }
}
