import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { TinyDate, valueFunctionProp } from 'ngx-tethys/util';
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
    imports: [NgClass, DateTableCell]
})
export class DateTable extends CalendarTable {
    private dateHelper = inject(DateHelperService);

    private datePickerConfigService = inject(ThyDatePickerConfigService);

    readonly dayHover = output<TinyDate>(); // Emitted when hover on a day by mouse enter

    constructor() {
        super();
    }

    private chooseDate(value: TinyDate): void {
        // Only change date not change time
        const activeDate = this.activeDate();
        const timeZone = this.timeZone();
        const date = new TinyDate(
            TinyDate.createDateInTimeZone(
                value.getFullYear(),
                value.getMonth(),
                value.getDate(),
                activeDate?.getHours(),
                activeDate?.getMinutes(),
                activeDate?.getSeconds(),
                timeZone
            ),
            timeZone
        );
        this.activeDate.set(date.clone());
        this.valueChange.emit(date);
    }

    makeHeadRow(): DateCell[] {
        const weekDays: DateCell[] = [];
        const start = this.activeDate().calendarStart({ weekStartsOn: this.datePickerConfigService.config.weekStartsOn });
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
            const locale = this.locale();
            const prefixCls = this.prefixCls();
            return prefixCls === 'thy-calendar-full' ? locale.fullWeekFormat : locale.weekFormat;
        }
        return 'dd';
    }

    makeBodyRows(): DateBodyRow[] {
        const dateRows: DateBodyRow[] = [];
        const firstDayOfMonth = this.activeDate().calendarStart({ weekStartsOn: this.datePickerConfigService.config.weekStartsOn });
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
                    dateCellRender: valueFunctionProp(this.cellRender()!, date),
                    content: `${date.getDate()}`,
                    onClick: () => this.chooseDate(date),
                    onMouseEnter: () => this.dayHover.emit(date)
                };
                this.addCellProperty(cell, date);

                if (this.showWeek() && !row.weekNum) {
                    row.weekNum = this.dateHelper.getISOWeek(date.nativeDate);
                }

                if (date.isToday()) {
                    cell.isToday = true;
                    row.isCurrent = true;
                }

                const selectedValue = this.selectedValue();
                if (selectedValue?.length > 0) {
                    const [startSelected, endSelected] = selectedValue;
                    if (date.isSameDay(startSelected)) {
                        row.isActive = true;
                    }
                    if (date.isSameDay(endSelected)) {
                        row.isActive = true;
                    }
                } else if (date.isSameDay(this.value()!)) {
                    row.isActive = true;
                }

                row.dateCells.push(cell);
            }

            const prefixCls = this.prefixCls();
            row.classMap = {
                [`${prefixCls}-current-week`]: row.isCurrent,
                [`${prefixCls}-active-week`]: row.isActive
            };

            dateRows.push(row);
        }

        return dateRows;
    }

    addCellProperty(cell: DateCell, date: TinyDate): void {
        const selectedValue = this.selectedValue();
        if (selectedValue?.length > 0) {
            const [startSelected, endSelected] = selectedValue;
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
            cell.isSelected = date.isSameDay(this.value()!);
        }

        const activeDate = this.activeDate();
        cell.isLastMonthCell = date.isBeforeMonth(activeDate);
        cell.isNextMonthCell = date.isAfterMonth(activeDate);
        cell.isToday = date.isToday();
        cell.isDisabled = !!this.disabledDate()?.(date.nativeDate);
        cell.classMap = this.getClassMap(cell);
    }

    getClassMap(cell: DateCell): { [key: string]: boolean } {
        const prefixCls = this.prefixCls();
        return {
            [`${prefixCls}-cell`]: true,
            [`${prefixCls}-today`]: !!cell.isToday,
            [`${prefixCls}-last-month-cell`]: !!cell.isLastMonthCell,
            [`${prefixCls}-next-month-btn-day`]: !!cell.isNextMonthCell,
            [`${prefixCls}-selected-day`]: !!cell.isSelected,
            [`${prefixCls}-disabled-cell`]: !!cell.isDisabled,
            [`${prefixCls}-selected-start-date`]: !!cell.isSelectedStartDate,
            [`${prefixCls}-selected-end-date`]: !!cell.isSelectedEndDate,
            [`${prefixCls}-in-range-cell`]: !!cell.isInRange
        };
    }
}
