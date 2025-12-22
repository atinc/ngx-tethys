import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TinyDate } from 'ngx-tethys/util';
import { CalendarTable } from '../calendar/calendar-table.component';
import { DateCell, DateBodyRow } from '../date/types';
import { NgClass } from '@angular/common';
import { QUARTER_FORMAT } from '../../date-picker.config';

/**
 * @private
 */
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
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
        const newValue = this.activeDate().setQuarter(quarter);
        this.value.set(newValue);
        this.valueChange.emit(newValue);
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
                const isDisabled = this.disabledDate() ? this.disabledDate()!(quarter.nativeDate) : false;
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
