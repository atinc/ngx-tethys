import { TinyDate, valueFunctionProp } from 'ngx-tethys/util';
import { ChangeDetectionStrategy, Component, EventEmitter, OnChanges, Output } from '@angular/core';
import { DateHelperService } from '../../date-helper.service';
import { DateCell, DateBodyRow } from './types';
import { CalendarTable } from '../calendar/calendar-table.component';
import { DateTableCell } from './date-table-cell.component';
import { NgIf, NgFor, NgClass } from '@angular/common';
import { ThyDatePickerConfigService } from '../../date-picker.service';

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
    imports: [NgIf, NgFor, NgClass, DateTableCell]
})
export class DateTable extends CalendarTable implements OnChanges {
    @Output() readonly dayHover = new EventEmitter<TinyDate>(); // Emitted when hover on a day by mouse enter

    constructor(
        private dateHelper: DateHelperService,
        private datePickerConfigService: ThyDatePickerConfigService
    ) {
        super();
    }

    private chooseDate(value: TinyDate): void {
        // Only change date not change time
        const newValue = this.activeDate.setYear(value.getYear()).setMonth(value.getMonth()).setDate(value.getDate());
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
            return 'EEEEE'; // eg. 二
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
