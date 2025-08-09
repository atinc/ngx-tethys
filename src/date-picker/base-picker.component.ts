import { ThyClickDispatcher, ThyPlacement } from 'ngx-tethys/core';
import { elementMatchClosest, FunctionProp, TinyDate } from 'ngx-tethys/util';
import { Component, ElementRef, inject, input, NgZone, OnInit, output, PLATFORM_ID, TemplateRef, viewChild } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { isPlatformBrowser } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractPickerComponent } from './abstract-picker.component';
import { CompatibleValue, RangeAdvancedValue } from './inner-types';
import { ThyPicker } from './picker.component';
import { hasTimeInStringDate, isValidStringDate, parseStringDate, transformDateValue } from './picker.util';
import { ThyCompatibleDate, ThyPanelMode } from './standard-types';

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
export class BasePicker extends AbstractPickerComponent implements OnInit {
    protected element = inject(ElementRef);

    showWeek = false;

    panelMode: ThyPanelMode | ThyPanelMode[];

    private innerPreviousDate: string;

    readonly thyPicker = viewChild<ThyPicker>('thyPicker');

    readonly thyDateRender = input<FunctionProp<TemplateRef<Date> | string>>();

    /**
     * 是否有幕布
     */
    readonly thyHasBackdrop = input(true, { transform: coerceBooleanProperty });

    readonly thyOnPanelChange = output<ThyPanelMode | ThyPanelMode[]>();

    readonly thyOnCalendarChange = output<Date[]>();

    /**
     * 增加时间选择功能
     */
    readonly thyShowTime = input(false, {
        transform: (value: object | boolean) => {
            return typeof value === 'object' ? value : coerceBooleanProperty(value);
        }
    });

    /**
     * 是否展示时间(时、分)
     */
    readonly thyMustShowTime = input(false, { transform: coerceBooleanProperty });

    /**
     * 弹出位置
     * @type top | topLeft | topRight | bottom | bottomLeft | bottomRight | left | leftTop | leftBottom | right | rightTop | rightBottom
     */
    readonly thyPlacement = input<ThyPlacement>('bottomLeft');

    readonly thyOnOk = output<ThyCompatibleDate | null>();

    takeUntilDestroyed = takeUntilDestroyed();

    thyClickDispatcher = inject(ThyClickDispatcher);

    platformId = inject(PLATFORM_ID);

    ngZone = inject(NgZone);

    ngOnInit(): void {
        super.ngOnInit();
        this.setDefaultTimePickerState(this.thyMode());

        if (isPlatformBrowser(this.platformId)) {
            this.thyClickDispatcher
                .clicked(0)
                .pipe(this.takeUntilDestroyed)
                .subscribe((event: Event) => {
                    if (
                        !this.element.nativeElement.contains(event.target) &&
                        !this.thyPicker()
                            ?.overlayContainer()
                            ?.nativeElement.contains(event.target as Node) &&
                        this.realOpenState()
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
        this.innerPreviousDate = this.thyPicker().getReadableValue(this.thyValue());
    }

    onInputValueChange(formatDate: string | null | Array<null>) {
        if (!formatDate || !formatDate.length) {
            const compatibleValue = formatDate ? (formatDate as CompatibleValue) : null;
            this.restoreTimePickerState(compatibleValue);
            super.onValueChange(compatibleValue);
            return;
        }
        let value = formatDate as string;
        const timeZone = this.thyTimeZone();
        const valueValid = isValidStringDate(value, timeZone);
        const valueLimitValid = valueValid ? this.isValidDateLimit(parseStringDate(value, timeZone)) : false;
        if (valueValid && valueLimitValid) {
            this.innerPreviousDate = value;
        } else {
            value = this.innerPreviousDate;
        }
        const tinyDate = value
            ? this.thyShowTime()
                ? parseStringDate(value, timeZone)
                : parseStringDate(value, timeZone).startOfDay()
            : null;
        this.restoreTimePickerState(tinyDate);
        super.onValueChange(tinyDate);
    }

    // Displays the time directly when the time must be displayed by default
    setDefaultTimePickerState(value: ThyPanelMode) {
        this.withTime = this.thyMustShowTime();
        if (this.isRange()) {
            this.panelMode = this.flexible() ? ['date', 'date'] : [value, value];
        } else {
            this.panelMode = value;
        }
        this.showWeek = value === 'week';
        if (!this.thyFormat()) {
            const inputFormats: { [key in ThyPanelMode]?: string } = {
                year: 'yyyy',
                quarter: 'yyyy-qqq',
                month: 'yyyy-MM',
                week: this.locale().weekThFormat,
                date: this.thyShowTime() ? 'yyyy-MM-dd HH:mm' : 'yyyy-MM-dd'
            };
            const format = this.flexible() ? inputFormats['date'] : inputFormats[value];
            this.thyFormat.set(format);
        }
    }

    // Restore after clearing time to select whether the original picker time is displayed or not
    restoreTimePickerState(value: CompatibleValue | null) {
        if (!value) {
            this.withTime = this.thyMustShowTime() || this.originWithTime;
        }
    }

    // Emit thyOnCalendarChange when select date by thy-range-picker
    onCalendarChange(value: TinyDate[]): void {
        if (this.isRange()) {
            const rangeValue = value.map(x => x.nativeDate);
            console.log('====onCalendarChange==>', rangeValue);
            this.thyOnCalendarChange.emit(rangeValue);
        }
    }

    onShowTimePickerChange(show: boolean): void {
        this.withTime = show;
    }

    onResultOk(): void {
        if (this.isRange()) {
            const value = this.thyValue() as TinyDate[];
            if (value && (value as TinyDate[]).length) {
                this.thyOnOk.emit([value[0].nativeDate, value[1].nativeDate]);
            } else {
                this.thyOnOk.emit([]);
            }
        } else {
            const value = this.thyValue() as TinyDate;
            if (value) {
                this.thyOnOk.emit(value.nativeDate);
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
        const timeZone = this.thyTimeZone();
        if (value && isValidStringDate(value, timeZone)) {
            if (this.thyShowTime()) {
                this.withTime = hasTimeInStringDate(value, timeZone);
            }
            this.thyValue.set(parseStringDate(value, timeZone));
        }
    }

    private isValidDateLimit(date: TinyDate): boolean {
        let disable = false;

        const disabledDate = this.thyDisabledDate();
        if (disabledDate !== undefined) {
            disable = disabledDate(date.nativeDate);
        }

        const timeZone = this.thyTimeZone();
        const _minDate = this.thyMinDate();
        const minDate = _minDate ? new TinyDate(transformDateValue(_minDate).value as Date, timeZone) : null;

        const _maxDate = this.thyMaxDate();
        const maxDate = _maxDate ? new TinyDate(transformDateValue(_maxDate).value as Date, timeZone) : null;
        return (
            (!minDate || date.startOfDay().nativeDate >= minDate.startOfDay().nativeDate) &&
            (!maxDate || date.startOfDay().nativeDate <= maxDate.startOfDay().nativeDate) &&
            !disable
        );
    }
}
