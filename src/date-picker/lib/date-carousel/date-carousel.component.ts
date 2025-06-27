import { NgClass, NgTemplateOutlet } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    forwardRef,
    HostBinding,
    inject,
    Input,
    OnDestroy,
    OnInit,
    Signal
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ThyButton } from 'ngx-tethys/button';
import { injectLocale, ThyDatePickerLocale } from 'ngx-tethys/i18n';
import { ThyIcon } from 'ngx-tethys/icon';
import { TinyDate } from 'ngx-tethys/util';
import { Subject } from 'rxjs';
import { DateHelperService } from '../../date-helper.service';
import { AdvancedSelectableCell, RangeAdvancedValue } from '../../inner-types';
import { DatePickerAdvancedShowYearTipPipe } from '../../picker.pipes';
import { ThyDateGranularity } from '../../standard-types';

/**
 * @private
 */
@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'date-carousel',
    templateUrl: './date-carousel.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => DateCarousel)
        }
    ],
    imports: [NgTemplateOutlet, ThyButton, ThyIcon, NgClass, DatePickerAdvancedShowYearTipPipe]
})
export class DateCarousel implements OnInit, ControlValueAccessor, OnDestroy {
    private cdr = inject(ChangeDetectorRef);
    private dateHelper = inject(DateHelperService);
    locale: Signal<ThyDatePickerLocale> = injectLocale('datePicker');

    @HostBinding('class') className = 'thy-date-picker-advanced-carousel';

    @Input() activeDate: TinyDate;

    set defaultValue(value: RangeAdvancedValue) {
        this.dateGranularity = value.dateGranularity;
        this.buildSelectableData(value.begin);

        if (value.begin && value.end) {
            const shouldBeSelectValue = this.getShouldBeToggleValue(value.begin, value.end);
            this.select(...shouldBeSelectValue);
        } else {
            this.clearSelect(true);
        }
        this.initialized = true;
    }

    selectableData: { year?: AdvancedSelectableCell[]; quarter?: AdvancedSelectableCell[]; month?: AdvancedSelectableCell[] } = {};

    dateGranularity: ThyDateGranularity;

    selectedValue: AdvancedSelectableCell[] = [];

    private initialized = false;

    private selectedValueChange$ = new Subject<RangeAdvancedValue>();

    private _onChange: (value: RangeAdvancedValue) => void;

    private _onTouched: (value: RangeAdvancedValue) => void;

    ngOnInit(): void {
        this.selectedValueChange$.subscribe(() => {
            if (this.selectedValue.length) {
                this.buildSelectableData(this.selectedValue[0]?.startValue, this.dateGranularity);
            }
            this.selectableData.year.forEach(item => (item.classMap = this.getClassMap(item)));
            this.selectableData.quarter.forEach(item => (item.classMap = this.getClassMap(item)));
            this.selectableData.month.forEach(item => (item.classMap = this.getClassMap(item)));
            if (this.initialized) {
                if (this.isSelectEmpty()) {
                    this._onChange({
                        dateGranularity: null,
                        begin: null,
                        end: null
                    });
                } else {
                    const selctedValue = this.selectedValue;
                    this._onChange({
                        dateGranularity: this.dateGranularity,
                        begin: selctedValue[0]?.startValue,
                        end: selctedValue[selctedValue.length - 1]?.endValue
                    });
                }
            }
        });
    }

    writeValue(value: RangeAdvancedValue): void {
        if (value) {
            this.defaultValue = value;
        }
    }

    registerOnChange(fn: any): void {
        this._onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this._onTouched = fn;
    }

    getClassMap(cell: AdvancedSelectableCell) {
        return {
            [`active`]: this.isSelected(cell),
            [`indeterminate`]: this.isCellIndeterminate(this.selectedValue, cell),
            [`type-active`]: this.isTypeActive(this.selectedValue, cell),
            ['in-hover-range']: cell.isInRange,
            ['out-range']: cell.isOutRange
        };
    }

    isTypeActive(originalValue: AdvancedSelectableCell[], value: AdvancedSelectableCell) {
        return originalValue?.length && originalValue[0].type === value.type;
    }

    isCellIndeterminate(originalValue: AdvancedSelectableCell[], value: AdvancedSelectableCell) {
        if (originalValue[0]?.type === value.type) {
            return false;
        } else {
            if (originalValue[0]?.type === 'year') {
                return !!originalValue.find(item => item.startValue.isSameYear(value.startValue));
            } else {
                return value.type === 'year'
                    ? !!originalValue.find(item => item.startValue.isSameYear(value.startValue))
                    : !!originalValue.find(item => item.startValue.isSameQuarter(value.startValue));
            }
        }
    }

    isSelected(value: AdvancedSelectableCell) {
        return this.selectedValue.find(item => item.startValue.isSameDay(value.startValue)) && this.dateGranularity === value.type;
    }

    isSelectEmpty() {
        return this.selectedValue.length == 0;
    }

    selectSort() {
        this.selectedValue.sort((a, b) => a.startValue.getTime() - b.startValue.getTime());
    }

    select(...value: AdvancedSelectableCell[]) {
        value.forEach(item => {
            if (!this.isSelected(item)) {
                this.selectedValue.push(...value);
            }
        });
        this.selectSort();
        this.selectedValueChange$.next(undefined);
    }

    deselect(...value: AdvancedSelectableCell[]) {
        value.forEach(item => {
            this.selectedValue = this.selectedValue.filter(selected => !selected.startValue.isSameDay(item.startValue));
        });
        this.selectSort();
        this.selectedValueChange$.next(undefined);
    }

    clearSelect(hidden?: boolean) {
        this.selectedValue = [];
        if (!hidden) {
            this.selectedValueChange$.next(undefined);
        }
    }

    getShouldBeToggleValue(begin: TinyDate, end: TinyDate) {
        let selectedValue: AdvancedSelectableCell[] = [];
        switch (this.dateGranularity) {
            case 'year':
                this.dateGranularity = 'year';
                if (begin.isSameYear(end)) {
                    selectedValue.push(this.getSelectableYear(begin));
                } else {
                    selectedValue.push(this.getSelectableYear(begin));
                    while (!begin.isSameYear(end)) {
                        begin = begin.addYears(1);
                        selectedValue.push(this.getSelectableYear(begin));
                    }
                }
                break;
            case 'month':
                this.dateGranularity = 'month';
                if (begin.isSameMonth(end)) {
                    selectedValue.push(this.getSelectableMonth(begin));
                } else {
                    selectedValue.push(this.getSelectableMonth(begin));
                    while (!begin.isSameMonth(end)) {
                        begin = begin.addMonths(1);
                        selectedValue.push(this.getSelectableMonth(begin));
                    }
                }
                break;
            case 'quarter':
                this.dateGranularity = 'quarter';
                if (begin.isSameQuarter(end)) {
                    selectedValue.push(this.getSelectableQuarter(begin));
                } else {
                    selectedValue.push(this.getSelectableQuarter(begin));
                    while (!begin.isSameQuarter(end)) {
                        begin = begin.addQuarters(1);
                        selectedValue.push(this.getSelectableQuarter(begin));
                    }
                }
        }
        return selectedValue;
    }

    buildSelectableData(startDate: TinyDate, excludeGranularity?: ThyDateGranularity) {
        const buildGranularity = ['year', 'month', 'quarter'].filter(item => item !== excludeGranularity);
        buildGranularity.forEach(granularity => {
            switch (granularity) {
                case 'year':
                    this.selectableData.year = [...Array(3).keys()].map((item, index) => {
                        return this.getSelectableYear(startDate, index);
                    });
                    break;
                case 'quarter':
                    this.selectableData.quarter = [...Array(4).keys()].map((item, index) => {
                        return this.getSelectableQuarter(startDate, index);
                    });
                    break;
                case 'month':
                    this.selectableData.month = [...Array(4).keys()].map((item, index) => {
                        return this.getSelectableMonth(startDate, index);
                    });
                    break;
            }
        });
        this.cdr.markForCheck();
    }

    getSelectableYear(currentDate: TinyDate, preOrNextcount: number = 0): AdvancedSelectableCell {
        currentDate = currentDate || this.activeDate || new TinyDate().startOfYear();
        return {
            type: 'year',
            content: `${currentDate.addYears(preOrNextcount).getYear()}`,
            startValue: currentDate.addYears(preOrNextcount).startOfYear(),
            endValue: currentDate.addYears(preOrNextcount).endOfYear(),
            classMap: {}
        };
    }

    getSelectableQuarter(currentDate: TinyDate, preOrNextcount: number = 0): AdvancedSelectableCell {
        currentDate = currentDate || this.activeDate || new TinyDate().startOfQuarter();
        return {
            type: 'quarter',
            content: `${currentDate.addQuarters(preOrNextcount).format('qqq')}`,
            startValue: currentDate.addQuarters(preOrNextcount).startOfQuarter(),
            endValue: currentDate.addQuarters(preOrNextcount).endOfQuarter(),
            classMap: {}
        };
    }

    getSelectableMonth(currentDate: TinyDate, preOrNextcount: number = 0): AdvancedSelectableCell {
        currentDate = currentDate || this.activeDate || new TinyDate().startOfMonth();
        // Selectable months for advanced range selector
        const cell: AdvancedSelectableCell = {
            type: 'month',
            content: this.dateHelper.format(currentDate.addMonths(preOrNextcount).nativeDate, this.locale().monthFormat),
            startValue: currentDate.addMonths(preOrNextcount).startOfMonth(),
            endValue: currentDate.addMonths(preOrNextcount).endOfMonth(),
            classMap: {}
        };
        return cell;
    }

    prevClick(type: ThyDateGranularity) {
        switch (type) {
            case 'year':
                this.selectableData.year = this.selectableData.year.map(item => this.getSelectableYear(item.startValue, -1));
                break;
            case 'quarter':
                this.selectableData.quarter = this.selectableData.quarter.map(item => this.getSelectableQuarter(item.startValue, -2));
                break;
            case 'month':
                this.selectableData.month = this.selectableData.month.map(item => this.getSelectableMonth(item.startValue, -2));
        }
        this.selectableData[type].forEach(item => (item.classMap = this.getClassMap(item)));
    }

    nextClick(type: ThyDateGranularity) {
        switch (type) {
            case 'year':
                this.selectableData.year = this.selectableData.year.map(item => this.getSelectableYear(item.startValue, 1));
                break;
            case 'quarter':
                this.selectableData.quarter = this.selectableData.quarter.map(item => this.getSelectableQuarter(item.startValue, 2));
                break;
            case 'month':
                this.selectableData.month = this.selectableData.month.map(item => this.getSelectableMonth(item.startValue, 2));
        }
        this.selectableData[type].forEach(item => (item.classMap = this.getClassMap(item)));
    }

    selectDate(type: ThyDateGranularity, value: AdvancedSelectableCell) {
        console.log(type, value)
        this.selectableData[type].forEach(item => {
            item.isInRange = false;
            item.isOutRange = false;
        });

        if (this.isSelectEmpty()) {
            this.dateGranularity = type;
            this.select(value);
            // this.selectedValueChange$.next();
            return;
        }
        if (this.isSelected(value)) {
            this.toggleSelect(value);
            if (this.isSelectEmpty()) {
                this.dateGranularity = null;
            }
            return;
        }

        if (this.dateGranularity === value.type) {
            const { rangeStart, rangeEnd } = this.getActualStartAndEnd(value);
            const shouldBeSelectValue = this.getShouldBeToggleValue(rangeStart, rangeEnd);
            this.select(...shouldBeSelectValue);
            // this.selectedValueChange$.next();
        } else {
            this.dateGranularity = type;
            this.clearSelect(true);
            this.select(value);
            // this.selectedValueChange$.next();
        }
    }
    toggleSelect(value: AdvancedSelectableCell) {
        if (value.startValue.isSameDay(this.selectedValue[0].startValue)) {
            // only deselect first one
            this.deselect(value);
        } else {
            // deselect current and all after current
            const rangeStart = value.startValue;
            const rangeEnd = this.selectedValue[this.selectedValue.length - 1].endValue;
            const shouldBeDeselectValue = this.getShouldBeToggleValue(rangeStart, rangeEnd);
            this.deselect(...shouldBeDeselectValue);
        }
    }

    onMouseenter(event: Event, type: ThyDateGranularity, value: AdvancedSelectableCell) {
        if (this.isSelectEmpty() || this.dateGranularity !== type) {
            return;
        }
        if (this.isSelected(value)) {
            value.isInRange = true;
            if (value.startValue.isSameDay(this.selectedValue[0].startValue)) {
                value.isOutRange = true;
            } else {
                const rangeStart = value.startValue;
                const rangeEnd = this.selectedValue[this.selectedValue.length - 1].endValue;
                this.selectableData[type].forEach((item: AdvancedSelectableCell) => {
                    if (item.startValue.getTime() >= rangeStart.getTime() && item.startValue.getTime() < rangeEnd.getTime()) {
                        item.isOutRange = true;
                    } else {
                        item.isOutRange = false;
                    }
                });
            }
        } else {
            const { rangeStart, rangeEnd } = this.getActualStartAndEnd(value);
            this.selectableData[type].forEach((item: AdvancedSelectableCell) => {
                if (item.startValue.getTime() >= rangeStart.getTime() && item.startValue.getTime() < rangeEnd.getTime()) {
                    item.isInRange = true;
                } else {
                    item.isInRange = false;
                }
            });
        }
        this.selectableData[type].forEach(item => (item.classMap = this.getClassMap(item)));
    }

    onMouseleave(event: Event, type: ThyDateGranularity, value: AdvancedSelectableCell) {
        if (value.isInRange) {
            this.selectableData[type].forEach(item => (item.isInRange = false));
        }
        if (value.isOutRange) {
            this.selectableData[type].forEach(item => (item.isOutRange = false));
        }
        this.selectableData[type].forEach(item => (item.classMap = this.getClassMap(item)));
    }

    getActualStartAndEnd(value: AdvancedSelectableCell) {
        const selectedStart = this.selectedValue[0].startValue;
        const selectedEnd = this.selectedValue[this.selectedValue.length - 1].endValue;
        let rangeStart: TinyDate, rangeEnd: TinyDate;
        if (value.startValue.isBeforeDay(selectedStart)) {
            rangeStart = value.startValue;
            rangeEnd = selectedStart;
        }
        if (value.startValue.isAfterDay(selectedEnd)) {
            rangeStart = selectedEnd;
            rangeEnd = value.endValue;
        }
        return { rangeStart, rangeEnd };
    }

    ngOnDestroy(): void {
        this.selectedValueChange$.complete();
    }
}
