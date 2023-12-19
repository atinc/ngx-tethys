import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    HostBinding,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
    TemplateRef
} from '@angular/core';

import { coerceBooleanProperty, FunctionProp, TinyDate } from 'ngx-tethys/util';
import { DateHelperService } from '../../date-helper.service';
import { RangePartType } from '../../inner-types';
import { isAfterMoreThanLessOneYear, isAfterMoreThanOneDecade, isAfterMoreThanOneMonth, isAfterMoreThanOneYear } from '../../picker.util';
import { DisabledDateFn, ThyPanelMode } from '../../standard-types';
import { DateHeaderComponent } from '../date/date-header.component';
import { DateTableComponent } from '../date/date-table.component';

import { NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { ThyInputDirective } from 'ngx-tethys/input';
import { DecadeHeaderComponent } from '../decade/decade-header.component';
import { DecadeTableComponent } from '../decade/decade-table.component';
import { MonthHeaderComponent } from '../month/month-header.component';
import { MonthTableComponent } from '../month/month-table.component';
import { YearHeaderComponent } from '../year/year-header.component';
import { YearTableComponent } from '../year/year-table.component';
import { QuarterTableComponent } from '../quarter/quarter-table.component';

/**
 * @private
 */
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'inner-popup',
    exportAs: 'innerPopup',
    templateUrl: 'inner-popup.component.html',
    standalone: true,
    imports: [
        NgIf,
        ThyInputDirective,
        NgSwitch,
        NgSwitchCase,
        DecadeHeaderComponent,
        DecadeTableComponent,
        YearHeaderComponent,
        YearTableComponent,
        MonthHeaderComponent,
        MonthTableComponent,
        QuarterTableComponent,
        NgSwitchDefault,
        DateHeaderComponent,
        DateTableComponent
    ]
})
export class InnerPopupComponent implements OnChanges {
    @HostBinding('class.thy-calendar-picker-inner-popup') className = true;
    @HostBinding('class.thy-calendar-picker-inner-popup-with-range-input') _showDateRangeInput = false;

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

    @Input() panelMode: ThyPanelMode;

    @Input() set showDateRangeInput(value: boolean) {
        this._showDateRangeInput = coerceBooleanProperty(value);
    }

    get showDateRangeInput() {
        return this._showDateRangeInput;
    }

    @Input() partType: RangePartType;

    @Input() endPanelMode: ThyPanelMode;

    @Output() readonly panelModeChange = new EventEmitter<ThyPanelMode>();

    @Input() value: TinyDate;

    @Output() readonly headerChange = new EventEmitter<TinyDate>();
    @Output() readonly selectDate = new EventEmitter<TinyDate>();
    @Output() readonly dayHover = new EventEmitter<TinyDate>();

    prefixCls = 'thy-calendar';

    constructor(private dateHelper: DateHelperService) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.activeDate && !changes.activeDate.currentValue) {
            this.activeDate = new TinyDate();
        }
        if (changes.panelMode && changes.panelMode.currentValue === 'time') {
            this.panelMode = 'date';
        }
    }

    getReadableValue(value: TinyDate) {
        return value ? this.dateHelper.format(value.nativeDate, 'yyyy-MM-dd') : '';
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

    onChooseQuarter(value: TinyDate): void {
        this.activeDate = this.activeDate.setQuarter(value.getQuarter());
        if (this.endPanelMode === 'quarter') {
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

    enablePrevNext(direction: 'prev' | 'next', mode: ThyPanelMode): boolean {
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

    enableSuperPrevNext(direction: 'prev' | 'next', panelMode: ThyPanelMode) {
        if (this.isRange) {
            if ((this.partType === 'left' && direction === 'next') || (this.partType === 'right' && direction === 'prev')) {
                const [headerLeftDate, headerRightDate] = this.rangeActiveDate;
                if (panelMode === 'date') {
                    return isAfterMoreThanLessOneYear(headerRightDate, headerLeftDate);
                } else if (panelMode === 'month' || panelMode === 'quarter') {
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
