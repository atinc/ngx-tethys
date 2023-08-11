import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    HostBinding,
    Input,
    OnChanges,
    OnInit,
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
        NgSwitchDefault,
        DateHeaderComponent,
        DateTableComponent
    ]
})
export class InnerPopupComponent implements OnInit, OnChanges {
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

    ngOnInit(): void {
        console.log('selected:', this.selectedValue);
        console.log('active:', this.activeDate);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.activeDate && !changes.activeDate.currentValue) {
            this.activeDate = new TinyDate();
        }
        if (changes.panelMode && changes.panelMode.currentValue === 'time') {
            this.panelMode = 'date';
        }
    }

    // 自定义功能中的时间范围输入框值
    getReadableValue(value: TinyDate) {
        return value ? this.dateHelper.format(value.nativeDate, 'yyyy-MM-dd') : '';
    }

    // 时间选择器选择时间方法
    onSelectDate(date: TinyDate | Date): void {
        const value = date instanceof TinyDate ? date : new TinyDate(date);

        this.selectDate.emit(value);
    }

    // 选择月份
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

    // 选择年份
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

    // 选择 decade
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

    // 快捷切换月份
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

    // 快捷切换年份
    enableSuperPrevNext(direction: 'prev' | 'next', panelMode: ThyPanelMode) {
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
