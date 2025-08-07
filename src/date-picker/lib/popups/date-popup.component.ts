import {
    coerceBooleanProperty,
    endOfDay,
    FunctionProp,
    helpers,
    isFunction,
    isUndefinedOrNull,
    sortRangeValue,
    startOfDay,
    TinyDate,
    TinyDateCompareGrain
} from 'ngx-tethys/util';

import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    computed,
    effect,
    inject,
    input,
    model,
    OnInit,
    output,
    Signal,
    TemplateRef
} from '@angular/core';

import { NgTemplateOutlet } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThyButtonIcon } from 'ngx-tethys/button';
import { injectLocale, ThyDatePickerLocale } from 'ngx-tethys/i18n';
import { ThyNav, ThyNavItemDirective } from 'ngx-tethys/nav';
import { ThyDatePickerConfigService } from '../../date-picker.service';
import { CompatibleValue, DatePickerFlexibleTab, RangeAdvancedValue, RangePartType } from '../../inner-types';
import { dateAddAmount, getShortcutValue, hasValue, makeValue, setValueByTimestampPrecision, transformDateValue } from '../../picker.util';
import {
    CompatibleDate,
    CompatiblePresets,
    DisabledDateFn,
    SupportTimeOptions,
    ThyDateChangeEvent,
    ThyDateGranularity,
    ThyPanelMode,
    ThyShortcutPosition,
    ThyShortcutPreset,
    ThyShortcutValue
} from '../../standard-types';
import { CalendarFooter } from '../calendar/calendar-footer.component';
import { DateCarousel } from '../date-carousel/date-carousel.component';
import { InnerPopup } from './inner-popup.component';

/**
 * @private
 */
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'date-popup',
    exportAs: 'datePopup',
    templateUrl: './date-popup.component.html',
    imports: [ThyNav, ThyNavItemDirective, ThyButtonIcon, DateCarousel, FormsModule, NgTemplateOutlet, InnerPopup, CalendarFooter]
})
export class DatePopup implements OnInit {
    private cdr = inject(ChangeDetectorRef);

    private datePickerConfigService = inject(ThyDatePickerConfigService);

    locale: Signal<ThyDatePickerLocale> = injectLocale('datePicker');

    readonly isRange = input<boolean>();

    readonly showWeek = input<boolean>();

    readonly format = input<string>();

    readonly disabledDate = model<DisabledDateFn>();

    readonly minDate = input<Date | number>();

    readonly maxDate = input<Date | number>();

    readonly showToday = input<boolean>();

    /**
     * 是否支持设置时间(时、分)
     */
    readonly showTime = input<SupportTimeOptions | boolean>();

    /**
     * 是否展示时间(时、分)
     */
    readonly mustShowTime = input(false, { transform: coerceBooleanProperty });

    readonly dateRender = input<FunctionProp<TemplateRef<Date> | string>>();

    readonly className = input<string>();

    readonly panelMode = model<ThyPanelMode | ThyPanelMode[]>();

    readonly defaultPickerValue = input<CompatibleDate | number>();

    value = model<CompatibleValue>();

    showShortcut = model<boolean>();

    shortcutPresets = model<CompatiblePresets>();

    readonly shortcutPosition = input<ThyShortcutPosition>();

    readonly flexible = input(false, { transform: coerceBooleanProperty });

    readonly flexibleDateGranularity = model<ThyDateGranularity>();

    readonly timestampPrecision = input<'seconds' | 'milliseconds'>();

    readonly timeZone = input<string>();

    readonly panelModeChange = output<ThyPanelMode | ThyPanelMode[]>();

    readonly calendarChange = output<CompatibleValue>();

    readonly valueChange = output<CompatibleValue | RangeAdvancedValue>();

    readonly resultOk = output<void>(); // Emitted when done with date selecting

    readonly showTimePickerChange = output<boolean>();

    readonly dateValueChange = output<ThyDateChangeEvent>();

    prefixCls = 'thy-calendar';
    showTimePicker = false;
    timeOptions: SupportTimeOptions | SupportTimeOptions[] | null;
    activeDate: TinyDate | TinyDate[];
    selectedValue: TinyDate[] = []; // Range ONLY
    hoverValue: TinyDate[] = []; // Range ONLY

    advancedSelectedValue: RangeAdvancedValue; // advanced ONLY

    flexibleActiveTab: DatePickerFlexibleTab = 'advanced';

    get hasTimePicker(): boolean {
        return !!this.showTime();
    }
    private partTypeMap: { [key: string]: number } = { left: 0, right: 1 };

    [property: string]: any;

    readonly endPanelMode = computed<ThyPanelMode | ThyPanelMode[]>(() => {
        const panelMode = this.panelMode();
        if (panelMode) {
            if (helpers.isArray(panelMode)) {
                return [...(panelMode as ThyPanelMode[])];
            } else {
                return panelMode;
            }
        }
    });

    innerShortcutPresets: ThyShortcutPreset[];

    readonly disableTimeConfirm = computed(() => {
        const isRange = this.isRange();
        const showTime = this.showTime();
        const value = this.value();
        const timeZone = this.timeZone();

        if (!isRange && showTime) {
            const date: TinyDate = value ? (value as TinyDate) : new TinyDate(undefined, timeZone);
            const minDate: TinyDate = this.getMinTinyDate();
            const maxDate: TinyDate = this.getMaxTinyDate();

            if ((minDate && date.getTime() < minDate.getTime()) || (maxDate && date.getTime() > maxDate.getTime())) {
                return true;
            } else {
                return false;
            }
        }
        return false;
    });

    setProperty<T extends keyof DatePopup>(key: T, value: this[T]): void {
        this[key] = value;
        this.cdr.markForCheck();
    }

    constructor() {
        effect(() => {
            if (this.defaultPickerValue() || this.value()) {
                this.updateActiveDate();
            }
        });
    }

    ngOnInit(): void {
        this.initShortcutPresets();
        // this.initPanelMode();

        const flexible = this.flexible();
        const isRange = this.isRange();
        const timeZone = this.timeZone();
        const flexibleDateGranularity = this.flexibleDateGranularity();

        if (flexible && flexibleDateGranularity === 'day') {
            this.flexibleActiveTab = 'custom';
        }

        const defaultPickerValue = this.defaultPickerValue();
        if (defaultPickerValue && !hasValue(this.value())) {
            const { value } = transformDateValue(defaultPickerValue);
            this.value.set(makeValue(value, isRange, timeZone));
        }

        this.updateActiveDate();
        this.initDisabledDate();

        const value = this.value();
        if (isRange && flexible && value) {
            this.advancedSelectedValue = {
                begin: (value as TinyDate[])[0],
                end: (value as TinyDate[])[1],
                dateGranularity: flexibleDateGranularity
            };
        }
    }

    initShortcutPresets(): void {
        const timeZone = this.timeZone();
        const { shortcutRangesPresets, shortcutDatePresets, showShortcut } = this.datePickerConfigService;

        this.showShortcut.set(
            ['date', 'date,date'].includes(this.panelMode()?.toString()) && isUndefinedOrNull(this.showShortcut())
                ? showShortcut
                : this.showShortcut()
        );

        if (this.showShortcut()) {
            if (!this.shortcutPresets()) {
                const presets = this.isRange() ? shortcutRangesPresets : shortcutDatePresets;
                this.shortcutPresets.set(presets);
            }

            if (isFunction(this.shortcutPresets())) {
                this.innerShortcutPresets = (this.shortcutPresets() as () => ThyShortcutPreset[])();
            } else {
                this.innerShortcutPresets = this.shortcutPresets() as ThyShortcutPreset[];
            }

            if (this.innerShortcutPresets.length) {
                const minDate: TinyDate = this.getMinTinyDate();
                const maxDate: TinyDate = this.getMaxTinyDate();

                const minTime = minDate ? minDate.getTime() : null;
                const maxTime = maxDate ? maxDate.getTime() : null;

                if (this.isRange()) {
                    this.innerShortcutPresets.forEach((preset: ThyShortcutPreset) => {
                        const begin: number | Date = getShortcutValue((preset.value as [ThyShortcutValue, ThyShortcutValue])[0]);
                        const beginTime: number = new TinyDate(startOfDay(begin), timeZone).getTime();

                        const end: number | Date = getShortcutValue((preset.value as [ThyShortcutValue, ThyShortcutValue])[1]);
                        const endTime: number = new TinyDate(endOfDay(end), timeZone).getTime();

                        if ((minDate && endTime < minTime) || (maxDate && beginTime > maxTime)) {
                            preset.disabled = true;
                        } else {
                            preset.disabled = false;
                        }
                    });
                } else {
                    this.innerShortcutPresets.forEach((preset: ThyShortcutPreset) => {
                        const singleValue: number | Date = getShortcutValue(preset.value as ThyShortcutValue);
                        const singleTime: number = new TinyDate(singleValue, timeZone).getTime();

                        if ((minDate && singleTime < minTime) || (maxDate && singleTime > maxTime)) {
                            preset.disabled = true;
                        } else {
                            preset.disabled = false;
                        }
                    });
                }
            }
        }
    }

    updateActiveDate() {
        this.clearHoverValue();
        const value = this.value();
        if (!value) {
            const { value } = transformDateValue(this.defaultPickerValue());
            this.value.set(makeValue(value, this.isRange(), this.timeZone()));
        }
        if (this.isRange()) {
            if (!this.flexible() || this.flexibleDateGranularity() === 'day') {
                this.selectedValue = value as TinyDate[];
            }
            this.activeDate = this.normalizeRangeValue(value as TinyDate[], this.getPanelMode(this.endPanelMode()) as ThyPanelMode);
        } else {
            this.activeDate = value as TinyDate;
        }
    }

    // TODO
    // initPanelMode() {
    //     if (this.endPanelMode()) {
    //         if (helpers.isArray(this.endPanelMode())) {
    //             this.panelMode.set([...(this.endPanelMode() as ThyPanelMode[])]);
    //         } else {
    //             this.panelMode.set(this.endPanelMode());
    //         }
    //     }
    // }

    initDisabledDate(): void {
        const timeZone = this.timeZone();
        let minDate: TinyDate;
        let maxDate: TinyDate;
        let disabledDateFn: DisabledDateFn;
        if (this.minDate()) {
            const { value } = transformDateValue(this.minDate());
            minDate = new TinyDate(value as Date, timeZone);
        }
        if (this.maxDate()) {
            const { value } = transformDateValue(this.maxDate());
            maxDate = new TinyDate(value as Date, timeZone);
        }
        if (this.disabledDate()) {
            disabledDateFn = this.disabledDate();
        }
        this.disabledDate.set(d => {
            let expression = false;
            if (minDate) {
                expression = d < minDate.startOfDay().nativeDate;
            }
            if (maxDate && !expression) {
                expression = d > maxDate.endOfDay().nativeDate;
            }
            if (disabledDateFn && typeof disabledDateFn === 'function' && !expression) {
                expression = disabledDateFn(d);
            }
            return expression;
        });
    }

    onShowTimePickerChange(show: boolean): void {
        this.showTimePicker = show;
        this.showTimePickerChange.emit(show);
    }

    onClickOk(): void {
        const value = this.value();
        this.setValue(value);
        this.valueChange.emit(value);
        this.resultOk.emit();
    }

    onClickRemove(): void {
        this.value.set(this.isRange() ? [] : null);
        this.valueChange.emit(this.value());
    }

    onDayHover(value: TinyDate): void {
        if (this.isRange() && this.selectedValue[0] && !this.selectedValue[1]) {
            // When right value is selected, don't do hover
            const base = this.selectedValue[0]; // Use the left of selected value as the base to decide later hoverValue
            if (base.isBeforeDay(value)) {
                this.hoverValue = [base, value];
            } else {
                this.hoverValue = [value, base];
            }
        }
    }

    onPanelModeChange(mode: ThyPanelMode, partType?: RangePartType): void {
        if (this.isRange()) {
            (this.panelMode() as ThyPanelMode[])[this.getPartTypeIndex(partType)] = mode;
        } else {
            this.panelMode.set(mode);
        }
        this.panelModeChange.emit(this.panelMode());
    }

    onHeaderChange(value: TinyDate, partType?: RangePartType): void {
        if (this.isRange()) {
            (this.activeDate as TinyDate[])[this.getPartTypeIndex(partType)] = value;
            this.activeDate = this.normalizeRangeValue(
                this.activeDate as TinyDate[],
                this.getPanelMode(this.endPanelMode(), partType) as ThyPanelMode
            );
        } else {
            this.activeDate = value;
        }
    }

    onSelectTime(value: TinyDate, partType?: RangePartType): void {
        if (this.isRange()) {
            // TODO:range picker set time
        } else {
            this.setValue(new TinyDate(value.nativeDate, this.timeZone()));
        }
    }

    selectTab(active: DatePickerFlexibleTab) {
        this.flexibleActiveTab = active;
    }

    clearFlexibleValue() {
        this.flexibleDateGranularity.set(null);
        if (this.flexibleActiveTab === 'advanced') {
            this.advancedSelectedValue = {};
        } else {
            this.selectedValue = [];
        }
        this.valueChange.emit({ begin: null, end: null, dateGranularity: this.flexibleDateGranularity() });
    }

    changeValueFromAdvancedSelect(value: RangeAdvancedValue) {
        this.valueChange.emit(value);
        // clear custom date when select a advanced date
        this.selectedValue = [];
        this.dateValueChange.emit({ value: [value.begin, value.end] });
    }

    changeValueFromSelect(value: TinyDate, partType?: RangePartType): void {
        if (this.isRange()) {
            // clear advanced date when select a custom date
            this.advancedSelectedValue = {};

            const [left, right] = this.selectedValue as TinyDate[];

            if ((!left && !right) || (left && right)) {
                // If totally full or empty, clean up && re-assign left first
                this.hoverValue = this.selectedValue = [value];
                this.selectedValue = [this.selectedValue[0].startOfDay()];
                this.calendarChange.emit([this.selectedValue[0].clone()]);
            } else if (left && !right) {
                // If one of them is empty, assign the other one and sort, then set the final values
                this.clearHoverValue(); // Clean up
                this.setRangeValue('right', value);
                this.selectedValue = sortRangeValue(this.selectedValue); // Sort
                this.selectedValue = this.getSelectedRangeValueByMode(this.selectedValue);
                this.activeDate = this.normalizeRangeValue(
                    this.selectedValue,
                    this.getPanelMode(this.endPanelMode(), partType) as ThyPanelMode
                );
                this.setValue(this.cloneRangeDate(this.selectedValue));
                this.calendarChange.emit(this.cloneRangeDate(this.selectedValue));
                this.dateValueChange.emit({ value: this.cloneRangeDate(this.selectedValue) });
            }
        } else {
            const updatedValue = this.updateHourMinute(value);
            this.setValue(updatedValue);
            this.dateValueChange.emit({ value: updatedValue });
        }
    }

    private getSelectedRangeValueByMode(value: TinyDate[]): TinyDate[] {
        const panelMode = this.getPanelMode(this.endPanelMode());
        if (panelMode === 'year') {
            return [value[0].startOfYear(), value[1].endOfYear()];
        } else if (panelMode === 'quarter') {
            return [value[0].startOfQuarter(), value[1].endOfQuarter()];
        } else if (panelMode === 'month') {
            return [value[0].startOfMonth(), value[1].endOfMonth()];
        } else if (panelMode === 'week') {
            return [value[0].startOfISOWeek(), value[1].endOfISOWeek()];
        } else {
            return [value[0].startOfDay(), value[1].endOfDay()];
        }
    }

    private updateHourMinute(value: TinyDate): TinyDate {
        if (!this.value()) {
            return value;
        }
        const originDate = this.value() as TinyDate;
        const dateTime = [value.getHours(), value.getMinutes(), value.getSeconds()];
        const originDateTime = [originDate.getHours(), originDate.getMinutes(), originDate.getSeconds()];

        const isEqualTime = dateTime.toString() === originDateTime.toString();
        if (isEqualTime) {
            return value;
        } else {
            return value.setHms(originDateTime[0], originDateTime[1], originDateTime[2]);
        }
    }

    // enablePrevNext(direction: 'prev' | 'next', partType?: RangePartType): boolean {
    //     if (this.isRange() && this.panelMode() === this.endPanelMode()) {
    //         const [start, end] = this.activeDate as TinyDate[];
    //         const showMiddle = !start.addMonths(1).isSame(end, 'month'); // One month diff then don't show middle prev/next
    //         if ((partType === 'left' && direction === 'next') || (partType === 'right' && direction === 'prev')) {
    //             return showMiddle;
    //         }
    //         return true;
    //     } else {
    //         return true;
    //     }
    // }

    getPanelMode(panelMode: ThyPanelMode | ThyPanelMode[], partType?: RangePartType): ThyPanelMode {
        if (this.isRange()) {
            return panelMode[this.getPartTypeIndex(partType)] as ThyPanelMode;
        } else {
            return panelMode as ThyPanelMode;
        }
    }

    getValueBySelector(partType?: RangePartType): TinyDate {
        if (this.isRange()) {
            const valueShow = this.selectedValue; // Use the real time value that without decorations when timepicker is shown up
            return (valueShow as TinyDate[])[this.getPartTypeIndex(partType)];
        } else {
            return this.value() as TinyDate;
        }
    }

    getActiveDate(partType?: RangePartType): TinyDate {
        if (this.isRange()) {
            return (this.activeDate as TinyDate[])[this.getPartTypeIndex(partType)];
        } else {
            return this.activeDate as TinyDate;
        }
    }

    getPartTypeIndex(partType: RangePartType = 'left'): number {
        return this.partTypeMap[partType];
    }

    private getMinTinyDate() {
        return this.minDate() ? new TinyDate(transformDateValue(this.minDate()).value as Date, this.timeZone()) : null;
    }

    private getMaxTinyDate() {
        return this.maxDate() ? new TinyDate(transformDateValue(this.maxDate()).value as Date, this.timeZone()) : null;
    }

    private clearHoverValue(): void {
        this.hoverValue = [];
    }

    private setValue(value: CompatibleValue): void {
        this.value.set(value);
        if (this.isRange() && this.flexible()) {
            this.flexibleDateGranularity.set('day');
            this.valueChange.emit({
                begin: (value as TinyDate[])[0],
                end: (value as TinyDate[])[1],
                dateGranularity: this.flexibleDateGranularity()
            });
        } else {
            if (!this.showTime() || !this.showTimePicker) {
                this.valueChange.emit(this.value());
            }
        }
    }

    private normalizeRangeValue(value: TinyDate[], mode: ThyPanelMode = 'month'): TinyDate[] {
        const headerModes: { [key in ThyPanelMode]?: ThyPanelMode } = {
            week: 'month',
            date: 'month',
            month: 'year',
            quarter: 'year',
            year: 'decade'
        };
        const headerMode = headerModes[mode];
        const [start, end] = value;
        const newStart = start || new TinyDate(undefined, this.timeZone());
        let newEnd = end;
        if (!newEnd || newStart.isSame(end, headerMode as TinyDateCompareGrain)) {
            newEnd = dateAddAmount(newStart, 1, headerMode);
        }
        return [newStart, newEnd];
    }

    private setRangeValue(partType: RangePartType, value: TinyDate): void {
        const ref = (this.selectedValue = this.cloneRangeDate(this.selectedValue as TinyDate[]));
        ref[this.getPartTypeIndex(partType)] = value;
    }

    private cloneRangeDate(value: TinyDate[]): TinyDate[] {
        return [value[0] && value[0].clone(), value[1] && value[1].clone()] as TinyDate[];
    }

    private getSelectedShortcutPreset(date: CompatibleValue): CompatibleValue {
        const minDate: TinyDate = this.getMinTinyDate();
        const maxDate: TinyDate = this.getMaxTinyDate();

        const minTime: number = (minDate && minDate.getTime()) || null;
        const maxTime: number = (maxDate && maxDate.getTime()) || null;

        if (helpers.isArray(date)) {
            const startDate: TinyDate = date[0];
            const endDate: TinyDate = date[1];

            const startTime: number = startDate.getTime();
            const endTime: number = endDate.getTime();

            if ((maxDate && startTime > maxTime) || (minDate && endTime < minTime)) {
                return [];
            }

            if (minDate && startTime < minTime && maxDate && endTime > maxTime) {
                return [minDate, maxDate];
            }

            if (minDate && startTime < minTime) {
                return [minDate, endDate];
            }

            if (maxDate && endTime > maxTime) {
                return [startDate, maxDate];
            }

            return date;
        } else {
            const singleTime: number = date.getTime();

            if ((minDate && singleTime < minTime) || (maxDate && singleTime > maxTime)) {
                return null;
            }

            return date;
        }
    }

    shortcutSetValue(shortcutPresets: ThyShortcutPreset) {
        if (shortcutPresets.disabled) {
            return;
        }

        const { value } = shortcutPresets;
        if (!value) {
            return;
        }

        const timeZone = this.timeZone();
        let selectedPresetValue: CompatibleValue;
        if (helpers.isArray(value)) {
            const begin: number | Date = getShortcutValue(value[0]);
            const end: number | Date = getShortcutValue(value[1]);

            if (begin && end) {
                this.selectedValue = this.getSelectedShortcutPreset([
                    new TinyDate(begin, timeZone).startOfDay(),
                    new TinyDate(end, timeZone).endOfDay()
                ]) as TinyDate[];
                selectedPresetValue = this.cloneRangeDate(this.selectedValue);
            }
        } else {
            const originDate = this.value() as TinyDate;
            const zonedTime = this.createInZoneTime(
                new TinyDate(getShortcutValue(value), timeZone),
                originDate?.getHours() ?? 0,
                originDate?.getMinutes() ?? 0,
                originDate?.getSeconds() ?? 0
            );
            const singleTinyDate: TinyDate = this.updateHourMinute(new TinyDate(zonedTime, timeZone));
            selectedPresetValue = this.getSelectedShortcutPreset(singleTinyDate) as TinyDate;
        }
        this.setValue(selectedPresetValue);
        const shortcutPresetsValue = setValueByTimestampPrecision(
            shortcutPresets?.value,
            this.isRange(),
            this.timestampPrecision(),
            timeZone
        ) as number;
        this.dateValueChange.emit({
            value: helpers.isArray(value) ? this.selectedValue : selectedPresetValue,
            triggerPreset: Object.assign({}, shortcutPresets, { value: shortcutPresetsValue })
        });
        if (!helpers.isArray(value) && this.showTime() && this.showTimePicker) {
            this.updateActiveDate();
        }
    }

    private createInZoneTime(date: TinyDate, hours?: number, minutes?: number, seconds?: number): Date {
        return TinyDate.createDateInTimeZone(date.getYear(), date.getMonth(), date.getDate(), hours, minutes, seconds, this.timeZone());
    }
}
