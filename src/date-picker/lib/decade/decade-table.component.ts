import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { TinyDate } from 'ngx-tethys/util';
import { CalendarTable } from '../calendar/calendar-table.component';
import { DateCell, DecadeCell, DateBodyRow } from '../date/types';
import { NgClass } from '@angular/common';

/**
 * @private
 */
@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'decade-table',
    exportAs: 'decadeTable',
    templateUrl: 'decade-table.component.html',
    imports: [NgClass]
})
export class DecadeTable extends CalendarTable {
    MAX_ROW = 4;

    MAX_COL = 3;

    readonly startYear = computed<number>(() => parseInt(`${this.activeDate().getYear() / 100}`, 10) * 100);

    readonly endYear = computed<number>(() => this.startYear() + 99);

    private chooseDecade(startYear: number): void {
        const decadeDate = this.activeDate().setYear(startYear);
        // 该十年只有部分年份可选时，选取区间内最接近的可选日期，避免产生越界的值
        const newValue = this.findEnabledDateInRange(
            decadeDate.startOfYear(),
            decadeDate.setYear(startYear + 9).endOfYear(),
            decadeDate
        );
        this.value.set(newValue);
    }

    private isDecadeDisabled(startYear: number, endYear: number): boolean {
        const activeDate = this.activeDate();
        return this.isAllDaysDisabled(activeDate.setYear(startYear).startOfYear(), activeDate.setYear(endYear).endOfYear());
    }

    makeHeadRow(): DateCell[] {
        return [];
    }

    makeBodyRows(): DateBodyRow[] {
        const decades: DateBodyRow[] = [];
        const currentYear = this.value() && this.value()!.getYear();
        const startYear = this.startYear();
        const endYear = this.endYear();
        const previousYear = startYear - 10;

        let index = 0;
        for (let rowIndex = 0; rowIndex < this.MAX_ROW; rowIndex++) {
            const row: DateBodyRow = {
                dateCells: [],
                trackByIndex: rowIndex
            };
            for (let colIndex = 0; colIndex < this.MAX_COL; colIndex++) {
                const start = previousYear + index * 10;
                const end = previousYear + index * 10 + 9;
                const content = `${start}-${end}`;

                const cell: DecadeCell = {
                    content,
                    title: content,
                    // 十年内存在任意一天可选时，该十年即可选
                    isDisabled: this.isDecadeDisabled(start, end),
                    isSelected: currentYear! >= start && currentYear! <= end,
                    isLowerThanStart: end < startYear,
                    isBiggerThanEnd: start > endYear,
                    classMap: null,
                    onClick: () => this.chooseDecade(start),
                    onMouseEnter(): void {}
                };
                cell.classMap = this.getClassMap(cell);

                index++;
                row.dateCells.push(cell);
            }
            decades.push(row);
        }
        return decades;
    }

    getClassMap(cell: DecadeCell): { [key: string]: boolean } {
        const prefixCls = this.prefixCls();
        return {
            [`${prefixCls}-decade-panel-cell`]: true,
            [`${prefixCls}-decade-panel-cell-disabled`]: !!cell.isDisabled,
            [`${prefixCls}-decade-panel-selected-cell`]: !!cell.isSelected,
            [`${prefixCls}-decade-panel-last-century-cell`]: !!cell.isLowerThanStart,
            [`${prefixCls}-decade-panel-next-century-cell`]: !!cell.isBiggerThanEnd
        };
    }

    cellClick(event: Event, cell: DecadeCell) {
        event.stopPropagation();
        if (cell.isDisabled) {
            return;
        }
        cell.onClick();
    }
}
