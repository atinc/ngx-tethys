import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    TemplateRef,
    ChangeDetectorRef
} from '@angular/core';

import { FunctionProp } from '../../../util/helpers';
import { TinyDate, sortRangeValue } from '../../../util';

import { CompatibleValue, DisabledDateFn, PanelMode, SupportTimeOptions, CompatibleDate } from '../../standard-types';
import { transformDateValue, hasValue, makeValue } from '../../picker.util';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'date-popup',
    exportAs: 'datePopup',
    templateUrl: './date-popup.component.html'
})
export class DatePopupComponent implements OnChanges, OnInit {
    @Input() isRange: boolean;
    @Input() showWeek: boolean;

    @Input() format: string;
    @Input() disabledDate: DisabledDateFn;
    @Input() minDate: Date | number;
    @Input() maxDate: Date | number;
    @Input() showToday: boolean;
    @Input() showTime: SupportTimeOptions | boolean;
    @Input() mustShowTime: boolean;
    @Input() dateRender: FunctionProp<TemplateRef<Date> | string>;
    @Input() className: string;
    @Input() panelMode: PanelMode | PanelMode[];
    @Input() value: CompatibleValue;
    @Input() defaultPickerValue: CompatibleDate | number;

    @Output() readonly panelModeChange = new EventEmitter<PanelMode | PanelMode[]>();
    @Output() readonly calendarChange = new EventEmitter<CompatibleValue>();
    @Output() readonly valueChange = new EventEmitter<CompatibleValue>();
    @Output() readonly resultOk = new EventEmitter<void>(); // Emitted when done with date selecting
    @Output() readonly showTimePickerChange = new EventEmitter<boolean>();
    prefixCls = 'thy-calendar';
    showTimePicker = false;
    timeOptions: SupportTimeOptions | SupportTimeOptions[] | null;
    valueForRangeShow: TinyDate[]; // Range ONLY
    selectedValue: TinyDate[]; // Range ONLY
    hoverValue: TinyDate[]; // Range ONLY
    private partTypeMap: { [key: string]: number } = { left: 0, right: 1 };

    [property: string]: any;

    constructor(private cdr: ChangeDetectorRef) {}

    setProperty<T extends keyof DatePopupComponent>(key: T, value: this[T]): void {
        this[key] = value;
        this.cdr.markForCheck();
    }

    ngOnInit(): void {
        // Initialization for range properties to prevent errors while later assignment
        if (this.isRange) {
            ['panelMode', 'selectedValue', 'hoverValue'].forEach(prop => this.initialArray(prop));
        }
        if (this.defaultPickerValue && !hasValue(this.value)) {
            const { value } = transformDateValue(this.defaultPickerValue);
            this.value = makeValue(value, this.isRange);
            if (this.isRange) {
                this.reInitializeRangeRelatedValue();
            }
        }
        this.initDisabledDate();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.isRange) {
            if (changes.value) {
                this.reInitializeRangeRelatedValue();
            }
        }
    }

    reInitializeRangeRelatedValue() {
        this.clearHoverValue();
        this.selectedValue = this.value as TinyDate[];
        this.valueForRangeShow = this.normalizeRangeValue(this.value as TinyDate[]);
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
        this.setValue(this.value);
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

    onPanelModeChange(mode: PanelMode, partType?: RangePartType): void {
        if (this.isRange) {
            (this.panelMode as PanelMode[])[this.getPartTypeIndex(partType)] = mode;
        } else {
            this.panelMode = mode;
        }
        this.panelModeChange.emit(this.panelMode);
    }

    onHeaderChange(value: TinyDate, partType?: RangePartType): void {
        if (this.isRange) {
            this.valueForRangeShow[this.getPartTypeIndex(partType)] = value;
            this.valueForRangeShow = this.normalizeRangeValue(this.valueForRangeShow); // Should always take care of start/end
        } else {
            if (this.showTimePicker) {
                this.setValue(value);
            }
        }
    }

    onSelectTime(value: TinyDate, partType?: RangePartType): void {
        if (this.isRange) {
            // TODO:range picker set time
        } else {
            this.setValue(new TinyDate(value.nativeDate));
        }
    }

    changeValueFromSelect(value: TinyDate): void {
        if (this.isRange) {
            const [left, right] = this.selectedValue as TinyDate[];

            if ((!left && !right) || (left && right)) {
                // If totally full or empty, clean up && re-assign left first
                this.hoverValue = this.selectedValue = [value];
                this.calendarChange.emit([value.clone()]);
            } else if (left && !right) {
                // If one of them is empty, assign the other one and sort, then set the final values
                this.clearHoverValue(); // Clean up
                this.setRangeValue('right', value);
                this.selectedValue = sortRangeValue(this.selectedValue); // Sort
                this.valueForRangeShow = this.normalizeRangeValue(this.selectedValue);
                this.setValue(this.cloneRangeDate(this.selectedValue));
                this.calendarChange.emit(this.cloneRangeDate(this.selectedValue));
            }
        } else {
            this.setValue(value);
        }
    }

    enablePrevNext(direction: 'prev' | 'next', partType?: RangePartType): boolean {
        if (this.isRange) {
            const [start, end] = this.valueForRangeShow;
            const showMiddle = !start.addMonths(1).isSame(end, 'month'); // One month diff then don't show middle prev/next
            if ((partType === 'left' && direction === 'next') || (partType === 'right' && direction === 'prev')) {
                return showMiddle;
            }
            return true;
        } else {
            return true;
        }
    }

    getPanelMode(partType?: RangePartType): PanelMode {
        if (this.isRange) {
            return this.panelMode[this.getPartTypeIndex(partType)] as PanelMode;
        } else {
            return this.panelMode as PanelMode;
        }
    }

    getValueBySelector(partType?: RangePartType): TinyDate {
        if (this.isRange) {
            const valueShow = this.valueForRangeShow; // Use the real time value that without decorations when timepicker is shown up
            return (valueShow as TinyDate[])[this.getPartTypeIndex(partType)];
        } else {
            return this.value as TinyDate;
        }
    }

    getPartTypeIndex(partType?: RangePartType): number {
        return this.partTypeMap[partType];
    }

    private clearHoverValue(): void {
        this.hoverValue = [];
    }

    private setValue(value: CompatibleValue): void {
        this.value = value;
        if (!this.showTime || !this.showTimePicker) {
            this.valueChange.emit(this.value);
        }
    }

    private normalizeRangeValue(value: TinyDate[]): TinyDate[] {
        const [start, end] = value;
        const newStart = start || new TinyDate();
        const newEnd = end && end.isSameMonth(newStart) ? end.addMonths(1) : end || newStart.addMonths(1);
        return [newStart, newEnd];
    }

    // Renew and set a range value to trigger sub-component's change detection
    private setRangeValue(partType: RangePartType, value: TinyDate): void {
        const ref = (this.selectedValue = this.cloneRangeDate(this.selectedValue as TinyDate[]));
        ref[this.getPartTypeIndex(partType)] = value;
    }

    private cloneRangeDate(value: TinyDate[]): TinyDate[] {
        return [value[0] && value[0].clone(), value[1] && value[1].clone()] as TinyDate[];
    }

    private initialArray(key: string): void {
        if (!this[key] || !Array.isArray(this[key])) {
            this[key] = [];
        }
    }
}

export type RangePartType = 'left' | 'right';
