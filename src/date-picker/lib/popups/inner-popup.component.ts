import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, TemplateRef } from '@angular/core';

import { DisabledDateFn, PanelMode, RangePartType } from '../../standard-types';
import { TinyDate } from 'ngx-tethys/util';
import { FunctionProp } from 'ngx-tethys/util';
import { isAfterMoreThanLessOneYear, isAfterMoreThanOneDecade, isAfterMoreThanOneMonth, isAfterMoreThanOneYear } from '../../picker.util';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'inner-popup',
    exportAs: 'innerPopup',
    templateUrl: 'inner-popup.component.html'
})
export class InnerPopupComponent implements OnChanges {
    @Input() showWeek: boolean;
    @Input() isRange: boolean;
    @Input() activeDate: TinyDate;
    @Input() rangeActiveDate: TinyDate[]; // Range ONLY
    @Input() enablePrev: boolean;
    @Input() enableNext: boolean;
    @Input() disabledDate: DisabledDateFn;
    @Input() dateRender: FunctionProp<TemplateRef<Date> | string>;
    @Input() selectedValue: TinyDate[]; // Range ONLY
    @Input() hoverValue: TinyDate[]; // Range ONLY

    @Input() panelMode: PanelMode;

    @Input() partType: RangePartType;

    @Input() endPanelMode: PanelMode;

    @Output() readonly panelModeChange = new EventEmitter<PanelMode>();

    @Input() value: TinyDate;

    @Output() readonly headerChange = new EventEmitter<TinyDate>();
    @Output() readonly selectDate = new EventEmitter<TinyDate>();
    @Output() readonly dayHover = new EventEmitter<TinyDate>();

    prefixCls = 'thy-calendar';

    constructor() {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.activeDate && !changes.activeDate.currentValue) {
            this.activeDate = new TinyDate();
        }
        if (changes.panelMode && changes.panelMode.currentValue === 'time') {
            this.panelMode = 'date';
        }
    }

    onSelectDate(date: TinyDate | Date): void {
        const value = date instanceof TinyDate ? date : new TinyDate(date);

        this.selectDate.emit(value);
    }

    onChooseMonth(value: TinyDate): void {
        this.activeDate = this.activeDate.setMonth(value.getMonth());
        if (this.endPanelMode === 'month') {
            this.value = value;
            this.selectDate.emit(value);
        } else {
            this.headerChange.emit(value);
            this.panelModeChange.emit(this.endPanelMode);
        }
    }
    onChooseYear(value: TinyDate): void {
        this.activeDate = this.activeDate.setYear(value.getYear());
        if (this.endPanelMode === 'year') {
            this.value = value;
            this.selectDate.emit(value);
        } else {
            this.headerChange.emit(value);
            this.panelModeChange.emit(this.endPanelMode);
        }
    }

    onChooseDecade(value: TinyDate): void {
        this.activeDate = this.activeDate.setYear(value.getYear());
        if (this.endPanelMode === 'decade') {
            this.value = value;
            this.selectDate.emit(value);
        } else {
            this.headerChange.emit(value);
            this.panelModeChange.emit('year');
        }
    }

    enablePrevNext(direction: 'prev' | 'next', mode: PanelMode): boolean {
        if (this.isRange) {
            if ((this.partType === 'left' && direction === 'next') || (this.partType === 'right' && direction === 'prev')) {
                const [headerLeftDate, headerRightDate] = this.rangeActiveDate;
                return isAfterMoreThanOneMonth(headerRightDate, headerLeftDate);
            } else {
                return true;
            }
        } else {
            return true;
        }
    }

    enableSuperPrevNext(direction: 'prev' | 'next', panelMode: PanelMode) {
        if (this.isRange) {
            if ((this.partType === 'left' && direction === 'next') || (this.partType === 'right' && direction === 'prev')) {
                const [headerLeftDate, headerRightDate] = this.rangeActiveDate;
                if (panelMode === 'date') {
                    return isAfterMoreThanLessOneYear(headerRightDate, headerLeftDate);
                } else if (panelMode === 'month') {
                    return isAfterMoreThanOneYear(headerRightDate, headerLeftDate);
                } else if (panelMode === 'year') {
                    return isAfterMoreThanOneDecade(headerRightDate, headerLeftDate);
                }
            } else {
                return true;
            }
        } else {
            return true;
        }
    }
}
