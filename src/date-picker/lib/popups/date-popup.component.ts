import { endOfDay, startOfDay } from 'date-fns';
import { FunctionProp, TinyDate, TinyDateCompareGrain, helpers, isFunction, isUndefinedOrNull, sortRangeValue } from 'ngx-tethys/util';

import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    TemplateRef
} from '@angular/core';

import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThyButtonIconComponent } from 'ngx-tethys/button';
import { ThyNavComponent, ThyNavItemDirective } from 'ngx-tethys/nav';
import { ThyDatePickerConfigService } from '../../date-picker.service';
import { CompatibleValue, DatePickerFlexibleTab, RangeAdvancedValue, RangePartType } from '../../inner-types';
import { dateAddAmount, getShortcutValue, hasValue, makeValue, transformDateValue } from '../../picker.util';
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
    ThyShortcutValue,
    ThyShortcutValueChange
} from '../../standard-types';
import { CalendarFooterComponent } from '../calendar/calendar-footer.component';
import { DateCarouselComponent } from '../date-carousel/date-carousel.component';
import { InnerPopupComponent } from './inner-popup.component';

/**
 * @private
 */
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'date-popup',
    exportAs: 'datePopup',
    templateUrl: './date-popup.component.html',
    standalone: true,
    imports: [
        NgIf,
        NgFor,
        ThyNavComponent,
        ThyNavItemDirective,
        ThyButtonIconComponent,
        DateCarouselComponent,
        FormsModule,
        NgTemplateOutlet,
        InnerPopupComponent,
        CalendarFooterComponent
    ]
})
export class DatePopupComponent implements OnChanges, OnInit {
    @Input() isRange: boolean;
    @Input() showWeek: boolean;

    @Input() format: string;
    @Input() disabledDate: DisabledDateFn;
    @Input() minDate: Date | number;
    @Input() maxDate: Date | number;
    @Input() showToday: boolean;

    /**
     * 是否支持设置时间(时、分)
     */
    @Input() showTime: SupportTimeOptions | boolean;

    /**
     * 是否展示时间(时、分)
     */
    @Input() mustShowTime: boolean;

    @Input() dateRender: FunctionProp<TemplateRef<Date> | string>;
    @Input() className: string;
    @Input() panelMode: ThyPanelMode | ThyPanelMode[];
    @Input() value: CompatibleValue;
    @Input() defaultPickerValue: CompatibleDate | number;

    @Input() showShortcut: boolean;

    @Input() shortcutPresets: CompatiblePresets;

    @Input() shortcutPosition: ThyShortcutPosition;

    @Input() flexible: boolean;

    @Input() flexibleDateGranularity: ThyDateGranularity;

    @Output() readonly panelModeChange = new EventEmitter<ThyPanelMode | ThyPanelMode[]>();
    @Output() readonly calendarChange = new EventEmitter<CompatibleValue>();
    @Output() readonly valueChange = new EventEmitter<CompatibleValue | RangeAdvancedValue>();
    @Output() readonly resultOk = new EventEmitter<void>(); // Emitted when done with date selecting
    @Output() readonly showTimePickerChange = new EventEmitter<boolean>();
    /**
     * @deprecated
     */
    @Output() readonly shortcutValueChange = new EventEmitter<ThyShortcutValueChange>();
    @Output() readonly dateValueChange = new EventEmitter<ThyDateChangeEvent>();

    prefixCls = 'thy-calendar';
    showTimePicker = false;
    timeOptions: SupportTimeOptions | SupportTimeOptions[] | null;
    activeDate: TinyDate | TinyDate[];
    selectedValue: TinyDate[] = []; // Range ONLY
    hoverValue: TinyDate[] = []; // Range ONLY

    advancedSelectedValue: RangeAdvancedValue; // advanced ONLY

    flexibleActiveTab: DatePickerFlexibleTab = 'advanced';

    get hasTimePicker(): boolean {
        return !!this.showTime;
    }
    private partTypeMap: { [key: string]: number } = { left: 0, right: 1 };

    [property: string]: any;

    endPanelMode: ThyPanelMode | ThyPanelMode[];

    innerShortcutPresets: ThyShortcutPreset[];

    disableTimeConfirm = false;

    constructor(private cdr: ChangeDetectorRef, private datePickerConfigService: ThyDatePickerConfigService) {}

    setProperty<T extends keyof DatePopupComponent>(key: T, value: this[T]): void {
        this[key] = value;
        this.cdr.markForCheck();
    }

    ngOnInit(): void {
        this.initShortcutPresets();
        this.initPanelMode();
        if (this.flexible && this.flexibleDateGranularity === 'day') {
            this.flexibleActiveTab = 'custom';
        }
        if (this.defaultPickerValue && !hasValue(this.value)) {
            const { value } = transformDateValue(this.defaultPickerValue);
            this.value = makeValue(value, this.isRange);
        }
        this.updateActiveDate();
        this.initDisabledDate();
        if (this.isRange && this.flexible && this.value) {
            this.advancedSelectedValue = {
                begin: this.value[0],
                end: this.value[1],
                dateGranularity: this.flexibleDateGranularity
            };
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.panelMode) {
            if (helpers.isArray(this.panelMode)) {
                this.endPanelMode = [...this.panelMode];
            } else {
                this.endPanelMode = this.panelMode;
            }
        }
        if (changes.defaultPickerValue) {
            this.updateActiveDate();
        }
        if (changes.value && changes.value.currentValue) {
            this.updateActiveDate();
        }
    }

    initShortcutPresets(): void {
        const { shortcutRangesPresets, shortcutDatePresets, showShortcut } = this.datePickerConfigService;

        this.showShortcut =
            ['date', 'date,date'].includes(this.panelMode.toString()) && isUndefinedOrNull(this.showShortcut)
                ? showShortcut
                : this.showShortcut;

        if (this.showShortcut) {
            if (!this.shortcutPresets) {
                this.shortcutPresets = this.isRange ? shortcutRangesPresets : shortcutDatePresets;
            }

            this.innerShortcutPresets = isFunction(this.shortcutPresets) ? this.shortcutPresets() : this.shortcutPresets;
            if (this.innerShortcutPresets.length) {
                const minDate: TinyDate = this.getMinTinyDate();
                const maxDate: TinyDate = this.getMaxTinyDate();

                const minTime = minDate ? minDate.getTime() : null;
                const maxTime = maxDate ? maxDate.getTime() : null;

                if (this.isRange) {
                    this.innerShortcutPresets.forEach((preset: ThyShortcutPreset) => {
                        const begin: number | Date = getShortcutValue(preset.value[0]);
                        const beginTime: number = new TinyDate(startOfDay(begin)).getTime();

                        const end: number | Date = getShortcutValue(preset.value[1]);
                        const endTime: number = new TinyDate(endOfDay(end)).getTime();

                        if ((minDate && endTime < minTime) || (maxDate && beginTime > maxTime)) {
                            preset.disabled = true;
                        } else {
                            preset.disabled = false;
                        }
                    });
                } else {
                    this.innerShortcutPresets.forEach((preset: ThyShortcutPreset) => {
                        const singleValue: number | Date = getShortcutValue(preset.value as ThyShortcutValue);
                        const singleTime: number = new TinyDate(singleValue).getTime();

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
        if (!this.value) {
            const { value } = transformDateValue(this.defaultPickerValue);
            this.value = makeValue(value, this.isRange);
        }
        if (this.isRange) {
            if (!this.flexible || this.flexibleDateGranularity === 'day') {
                this.selectedValue = this.value as TinyDate[];
            }
            this.activeDate = this.normalizeRangeValue(this.value as TinyDate[], this.getPanelMode(this.endPanelMode) as ThyPanelMode);
        } else {
            this.activeDate = this.value as TinyDate;
        }
        this.isDisableTimeConfirm();
    }

    initPanelMode() {
        if (!this.endPanelMode) {
            if (helpers.isArray(this.panelMode)) {
                this.endPanelMode = [...this.panelMode];
            } else {
                this.endPanelMode = this.panelMode;
            }
        } else {
            if (helpers.isArray(this.endPanelMode)) {
                this.panelMode = [...this.endPanelMode];
            } else {
                this.panelMode = this.endPanelMode;
            }
        }
    }

    initDisabledDate(): void {
        let minDate: TinyDate;
        let maxDate: TinyDate;
        let disabledDateFn: DisabledDateFn;
        if (this.minDate) {
            const { value } = transformDateValue(this.minDate);
            minDate = new TinyDate(value as Date);
        }
        if (this.maxDate) {
            const { value } = transformDateValue(this.maxDate);
            maxDate = new TinyDate(value as Date);
        }
        if (this.disabledDate) {
            disabledDateFn = this.disabledDate;
        }
        this.disabledDate = d => {
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
        };
    }

    onShowTimePickerChange(show: boolean): void {
        this.showTimePicker = show;
        this.showTimePickerChange.emit(show);
    }

    onClickOk(): void {
        this.setValue(this.value);
        this.valueChange.emit(this.value);
        this.resultOk.emit();
    }

    onClickRemove(): void {
        this.value = this.isRange ? [] : null;
        this.valueChange.emit(this.value);
    }

    onDayHover(value: TinyDate): void {
        if (this.isRange && this.selectedValue[0] && !this.selectedValue[1]) {
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
        if (this.isRange) {
            (this.panelMode as ThyPanelMode[])[this.getPartTypeIndex(partType)] = mode;
        } else {
            this.panelMode = mode;
        }
        this.panelModeChange.emit(this.panelMode);
    }

    onHeaderChange(value: TinyDate, partType?: RangePartType): void {
        if (this.isRange) {
            this.activeDate[this.getPartTypeIndex(partType)] = value;
            this.activeDate = this.normalizeRangeValue(
                this.activeDate as TinyDate[],
                this.getPanelMode(this.endPanelMode, partType) as ThyPanelMode
            );
        } else {
            this.activeDate = value;
        }
    }

    onSelectTime(value: TinyDate, partType?: RangePartType): void {
        if (this.isRange) {
            // TODO:range picker set time
        } else {
            this.setValue(new TinyDate(value.nativeDate));
        }
    }

    selectTab(active: DatePickerFlexibleTab) {
        this.flexibleActiveTab = active;
    }

    clearFlexibleValue() {
        this.flexibleDateGranularity = null;
        if (this.flexibleActiveTab === 'advanced') {
            this.advancedSelectedValue = {};
        } else {
            this.selectedValue = [];
        }
        this.valueChange.emit({
            begin: null,
            end: null,
            dateGranularity: this.flexibleDateGranularity
        });
    }

    changeValueFromAdvancedSelect(value: RangeAdvancedValue) {
        this.valueChange.emit(value);
        // clear custom date when select a advanced date
        this.selectedValue = [];
        this.dateValueChange.emit({
            value: [value.begin, value.end]
        });
    }

    changeValueFromSelect(value: TinyDate, partType?: RangePartType): void {
        if (this.isRange) {
            // clear advanced date when select a custom date
            this.advancedSelectedValue = {};

            const [left, right] = this.selectedValue as TinyDate[];

            if ((!left && !right) || (left && right)) {
                // If totally full or empty, clean up && re-assign left first
                this.hoverValue = this.selectedValue = [value];
                this.selectedValue = [new TinyDate(startOfDay(this.selectedValue[0].nativeDate))];
                this.calendarChange.emit([this.selectedValue[0].clone()]);
            } else if (left && !right) {
                // If one of them is empty, assign the other one and sort, then set the final values
                this.clearHoverValue(); // Clean up
                this.setRangeValue('right', value);
                this.selectedValue = sortRangeValue(this.selectedValue); // Sort
                this.selectedValue = [
                    new TinyDate(startOfDay(this.selectedValue[0].nativeDate)),
                    new TinyDate(endOfDay(this.selectedValue[1].nativeDate))
                ];
                this.activeDate = this.normalizeRangeValue(
                    this.selectedValue,
                    this.getPanelMode(this.endPanelMode, partType) as ThyPanelMode
                );
                this.setValue(this.cloneRangeDate(this.selectedValue));
                this.calendarChange.emit(this.cloneRangeDate(this.selectedValue));
                this.dateValueChange.emit({
                    value: this.cloneRangeDate(this.selectedValue)
                });
            }
        } else {
            const updatedValue = this.updateHourMinute(value);
            this.setValue(updatedValue);
            this.dateValueChange.emit({
                value: updatedValue
            });
        }
    }

    private updateHourMinute(value: TinyDate): TinyDate {
        if (!this.value) {
            return value;
        }
        const originDate = this.value as TinyDate;
        const dateTime = [value.getHours(), value.getMinutes(), value.getSeconds()];
        const originDateTime = [originDate.getHours(), originDate.getMinutes(), originDate.getSeconds()];

        const isEqualTime = dateTime.toString() === originDateTime.toString();
        if (isEqualTime) {
            return value;
        } else {
            return value.setHms(originDateTime[0], originDateTime[1], originDateTime[2]);
        }
    }

    enablePrevNext(direction: 'prev' | 'next', partType?: RangePartType): boolean {
        if (this.isRange && this.panelMode === this.endPanelMode) {
            const [start, end] = this.activeDate as TinyDate[];
            const showMiddle = !start.addMonths(1).isSame(end, 'month'); // One month diff then don't show middle prev/next
            if ((partType === 'left' && direction === 'next') || (partType === 'right' && direction === 'prev')) {
                return showMiddle;
            }
            return true;
        } else {
            return true;
        }
    }

    getPanelMode(panelMode: ThyPanelMode | ThyPanelMode[], partType?: RangePartType): ThyPanelMode {
        if (this.isRange) {
            return panelMode[this.getPartTypeIndex(partType)] as ThyPanelMode;
        } else {
            return panelMode as ThyPanelMode;
        }
    }

    getValueBySelector(partType?: RangePartType): TinyDate {
        if (this.isRange) {
            const valueShow = this.selectedValue; // Use the real time value that without decorations when timepicker is shown up
            return (valueShow as TinyDate[])[this.getPartTypeIndex(partType)];
        } else {
            return this.value as TinyDate;
        }
    }

    getActiveDate(partType?: RangePartType): TinyDate {
        if (this.isRange) {
            return this.activeDate[this.getPartTypeIndex(partType)];
        } else {
            return this.activeDate as TinyDate;
        }
    }

    getPartTypeIndex(partType: RangePartType = 'left'): number {
        return this.partTypeMap[partType];
    }

    private getMinTinyDate() {
        return this.minDate ? new TinyDate(transformDateValue(this.minDate).value as Date) : null;
    }

    private getMaxTinyDate() {
        return this.maxDate ? new TinyDate(transformDateValue(this.maxDate).value as Date) : null;
    }

    private clearHoverValue(): void {
        this.hoverValue = [];
    }

    private setValue(value: CompatibleValue): void {
        this.value = value;
        if (this.isRange && this.flexible) {
            this.flexibleDateGranularity = 'day';
            this.valueChange.emit({
                begin: value[0],
                end: value[1],
                dateGranularity: this.flexibleDateGranularity
            });
        } else {
            if (!this.showTime || !this.showTimePicker) {
                this.valueChange.emit(this.value);
            }
        }
        this.isDisableTimeConfirm();
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
        const newStart = start || new TinyDate();
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

    private isDisableTimeConfirm() {
        if (this.isRange || !this.showTime) {
            return;
        }

        const date: TinyDate = this.value ? (this.value as TinyDate) : new TinyDate();
        const minDate: TinyDate = this.getMinTinyDate();
        const maxDate: TinyDate = this.getMaxTinyDate();

        if ((minDate && date.getTime() < minDate.getTime()) || (maxDate && date.getTime() > maxDate.getTime())) {
            this.disableTimeConfirm = true;
        } else {
            this.disableTimeConfirm = false;
        }
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

        let selectedPresetValue: CompatibleValue;
        if (helpers.isArray(value)) {
            const begin: number | Date = getShortcutValue(value[0]);
            const end: number | Date = getShortcutValue(value[1]);

            if (begin && end) {
                this.selectedValue = this.getSelectedShortcutPreset([
                    new TinyDate(startOfDay(begin)),
                    new TinyDate(endOfDay(end))
                ]) as TinyDate[];

                selectedPresetValue = this.cloneRangeDate(this.selectedValue);
            }
        } else {
            const singleDate: number | Date = getShortcutValue(value);
            const singleTinyDate: TinyDate = this.updateHourMinute(new TinyDate(singleDate));
            selectedPresetValue = this.getSelectedShortcutPreset(singleTinyDate) as TinyDate;
        }
        this.shortcutValueChange.emit({
            value: selectedPresetValue,
            triggerPresets: shortcutPresets
        });
        this.setValue(selectedPresetValue);
        this.dateValueChange.emit({
            value: helpers.isArray(value) ? this.selectedValue : selectedPresetValue,
            triggerPreset: shortcutPresets
        });
    }

    public trackByFn(index: number) {
        return index;
    }
}
