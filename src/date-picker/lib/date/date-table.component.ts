import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, OnChanges, Output, inject } from '@angular/core';
import { TinyDate, getDate, getMonth, getYear, valueFunctionProp } from 'ngx-tethys/util';
import { DateHelperService } from '../../date-helper.service';
import { ThyDatePickerConfigService } from '../../date-picker.service';
import { CalendarTable } from '../calendar/calendar-table.component';
import { DateTableCell } from './date-table-cell.component';
import { DateBodyRow, DateCell } from './types';

/**
 * @private
 */
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'date-table',
    exportAs: 'dateTable',
    templateUrl: 'date-table.component.html',
    standalone: true,
    imports: [NgClass, DateTableCell]
})
export class DateTable extends CalendarTable implements OnChanges {
    private dateHelper = inject(DateHelperService);
    private datePickerConfigService = inject(ThyDatePickerConfigService);

    @Output() readonly dayHover = new EventEmitter<TinyDate>(); // Emitted when hover on a day by mouse enter

    constructor() {
        super();
    }

    private chooseDate(value: TinyDate): void {
        // Only change date not change time
        const dateArr = value.nativeDate.toISOString().split('T')[0].split('-');
        // 创建根据时区的固定日期，点击和展示一致
        const [year, month, day] = dateArr;
        const date = TinyDate.createDateInUTC(
            Number(year),
            Number(month) - 1,
            Number(day),
            this.activeDate?.getHours(),
            this.activeDate?.getMinutes(),
            this.activeDate?.getSeconds()
        );
        const newValue = this.activeDate.setYear(getYear(date)).setMonth(getMonth(date)).setDate(getDate(date));
        this.valueChange.emit(newValue);
    }

    makeHeadRow(): DateCell[] {
        const weekDays: DateCell[] = [];
        const start = this.activeDate.calendarStart({ weekStartsOn: this.datePickerConfigService.config.weekStartsOn });
        for (let colIndex = 0; colIndex < this.MAX_COL; colIndex++) {
            const day = start.addDays(colIndex);
            weekDays[colIndex] = {
                title: this.dateHelper.format(day.nativeDate, this.dateHelper.relyOnDatePipe ? 'E' : 'ddd'),
                content: this.dateHelper.format(day.nativeDate, this.getVeryShortWeekFormat()),
                isSelected: false,
                isDisabled: false,
                onClick(): void {},
                onMouseEnter(): void {}
            };
        }
        return weekDays;
    }

    private getVeryShortWeekFormat(): string {
        if (this.dateHelper.relyOnDatePipe) {
            return this.prefixCls === 'thy-calendar-full' ? this.locale().fullWeekFormat : this.locale().weekFormat;
        }
        return 'dd';
    }

    makeBodyRows(): DateBodyRow[] {
        const dateRows: DateBodyRow[] = [];
        const firstDayOfMonth = this.activeDate.calendarStart({ weekStartsOn: this.datePickerConfigService.config.weekStartsOn });
        for (let week = 0; week < this.MAX_ROW; week++) {
            const weekStart = firstDayOfMonth.addDays(week * 7);
            const row: DateBodyRow = {
                isActive: false,
                isCurrent: false,
                dateCells: [],
                year: weekStart.getYear()
            };

            for (let day = 0; day < 7; day++) {
                const date = weekStart.addDays(day);
                const dateFormat = this.dateHelper.relyOnDatePipe ? 'longDate' : 'YYYY-MM-DD';
                const title = this.dateHelper.format(date.nativeDate, dateFormat);
                const label = this.dateHelper.format(date.nativeDate, this.dateHelper.relyOnDatePipe ? 'dd' : 'DD');

                const cell: DateCell = {
                    value: date.nativeDate,
                    label: label,
                    isSelected: false,
                    isDisabled: false,
                    isToday: false,
                    title: title,
                    dateCellRender: valueFunctionProp(this.cellRender, date),
                    content: `${date.getDate()}`,
                    onClick: () => this.chooseDate(date),
                    onMouseEnter: () => this.dayHover.emit(date)
                };
                this.addCellProperty(cell, date);

                if (this.showWeek && !row.weekNum) {
                    row.weekNum = this.dateHelper.getISOWeek(date.nativeDate);
                }

                if (date.isToday()) {
                    cell.isToday = true;
                    row.isCurrent = true;
                }

                if (this.selectedValue?.length > 0) {
                    const [startSelected, endSelected] = this.selectedValue;
                    if (date.isSameDay(startSelected)) {
                        row.isActive = true;
                    }
                    if (date.isSameDay(endSelected)) {
                        row.isActive = true;
                    }
                } else if (date.isSameDay(this.value)) {
                    row.isActive = true;
                }

                row.dateCells.push(cell);
            }

            row.classMap = {
                [`${this.prefixCls}-current-week`]: row.isCurrent,
                [`${this.prefixCls}-active-week`]: row.isActive
            };

            dateRows.push(row);
        }

        return dateRows;
    }

    addCellProperty(cell: DateCell, date: TinyDate): void {
        if (this.selectedValue?.length > 0) {
            const [startSelected, endSelected] = this.selectedValue;
            if (startSelected?.isSameDay(date)) {
                cell.isSelected = true;
            }
            if (endSelected?.isSameDay(date)) {
                cell.isSelected = true;
            }
            cell.isStartSingle = startSelected && !endSelected;
            cell.isEndSingle = !startSelected && !!endSelected;
            cell.isInRange = startSelected?.isBeforeDay(date) && date.isBeforeDay(endSelected);
        } else {
            cell.isSelected = date.isSameDay(this.value);
        }
        cell.isLastMonthCell = date.isBeforeMonth(this.activeDate);
        cell.isNextMonthCell = date.isAfterMonth(this.activeDate);
        cell.isToday = date.isToday();
        cell.isDisabled = !!this.disabledDate?.(date.nativeDate);
        cell.classMap = this.getClassMap(cell);
    }

    getClassMap(cell: DateCell): { [key: string]: boolean } {
        return {
            [`${this.prefixCls}-cell`]: true,
            [`${this.prefixCls}-today`]: cell.isToday,
            [`${this.prefixCls}-last-month-cell`]: cell.isLastMonthCell,
            [`${this.prefixCls}-next-month-btn-day`]: cell.isNextMonthCell,
            [`${this.prefixCls}-selected-day`]: cell.isSelected,
            [`${this.prefixCls}-disabled-cell`]: cell.isDisabled,
            [`${this.prefixCls}-selected-start-date`]: !!cell.isSelectedStartDate,
            [`${this.prefixCls}-selected-end-date`]: !!cell.isSelectedEndDate,
            [`${this.prefixCls}-in-range-cell`]: !!cell.isInRange
        };
    }
}
