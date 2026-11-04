import { Component } from '@angular/core';
import { TinyDate } from 'ngx-tethys/util';
import { CalendarTable } from '../calendar/calendar-table.component';
import { DateCell, DateBodyRow } from '../date/types';
import { NgClass } from '@angular/common';
import { QUARTER_FORMAT } from '../../date-picker.config';

/**
 * @private
 */
@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'quarter-table',
    exportAs: 'quarterTable',
    templateUrl: 'quarter-table.component.html',
    imports: [NgClass]
})
export class QuarterTable extends CalendarTable {
    MAX_ROW = 1;

    MAX_COL = 4;

    private chooseQuarter(quarter: number): void {
        const quarterDate = this.activeDate().setQuarter(quarter);
        // 该季度只有部分日期可选时，选取季度内最接近的可选日期，避免产生越界的值
        const newValue = this.findEnabledDateInRange(quarterDate.startOfQuarter(), quarterDate.endOfQuarter(), quarterDate);
        this.value.set(newValue);
        this.render();
    }

    makeHeadRow(): DateCell[] {
        return [];
    }

    makeBodyRows(): DateBodyRow[] {
        const quarters: DateBodyRow[] = [];
        let quarterValue = 0;
        for (let rowIndex = 0; rowIndex < this.MAX_ROW; rowIndex++) {
            const row: DateBodyRow = {
                dateCells: [],
                trackByIndex: rowIndex
            };
            for (let colIndex = 0; colIndex < this.MAX_COL; colIndex++) {
                const quarter = this.activeDate().setQuarter(quarterValue + 1);
                // 季度内存在任意一天可选时，该季度即可选
                const isDisabled = this.isAllDaysDisabled(quarter.startOfQuarter(), quarter.endOfQuarter());
                const content = `${quarter.format(QUARTER_FORMAT)}`;
                const cell: DateCell = {
                    trackByIndex: colIndex,
                    value: quarter.nativeDate,
                    isDisabled,
                    content,
                    title: content,
                    classMap: null,
                    isSelected: quarter.isSameQuarter(this.value()!),
                    onClick: () => {
                        this.chooseQuarter(quarter.getQuarter());
                    },
                    onMouseEnter: () => {}
                };
                this.addCellProperty(cell, quarter);
                row.dateCells.push(cell);
                quarterValue++;
            }
            quarters.push(row);
        }
        return quarters;
    }

    private addCellProperty(cell: DateCell, quarter: TinyDate): void {
        const selectedValue = this.selectedValue();
        if (selectedValue?.length > 0) {
            const [startSelected, endSelected] = selectedValue;
            if (startSelected?.isSameQuarter(quarter)) {
                cell.isSelectedStartDate = true;
                cell.isSelected = true;
            }

            if (endSelected?.isSameQuarter(quarter)) {
                cell.isSelectedEndDate = true;
                cell.isSelected = true;
            }

            cell.isStartSingle = startSelected && !endSelected;
            cell.isEndSingle = !startSelected && !!endSelected;
            cell.isInRange = startSelected?.isBeforeQuarter(quarter) && quarter?.isBeforeQuarter(endSelected);
        } else if (quarter.isSameQuarter(this.value()!)) {
            cell.isSelected = true;
        }
        cell.classMap = this.getClassMap(cell, quarter);
    }

    quarterCellClick(event: Event, quarterCell: DateCell) {
        event.stopPropagation();
        return quarterCell.isDisabled ? null : quarterCell.onClick();
    }

    getClassMap(cell: DateCell, quarter: TinyDate): { [key: string]: boolean } {
        const prefixCls = this.prefixCls();
        return {
            [`${prefixCls}-quarter-panel-cell`]: true,
            [`${prefixCls}-quarter-panel-cell-disabled`]: !!cell.isDisabled,
            [`${prefixCls}-quarter-panel-selected-cell`]: !!cell.isSelected,
            [`${prefixCls}-in-range-cell`]: !!cell.isInRange,
            [`${prefixCls}-quarter-panel-current-cell`]:
                new TinyDate().getYear() === this.activeDate().getYear() && quarter.getQuarter() === new TinyDate().getQuarter()
        };
    }
}
