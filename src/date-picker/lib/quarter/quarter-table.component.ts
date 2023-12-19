import { ChangeDetectionStrategy, Component, OnChanges } from '@angular/core';
import { TinyDate } from 'ngx-tethys/util';
import { DateHelperService } from '../../date-helper.service';
import { CalendarTable } from '../calendar/calendar-table.component';
import { DateCell, DateBodyRow } from '../date/types';
import { NgFor, NgClass, NgSwitch, NgSwitchCase } from '@angular/common';

/**
 * @private
 */
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'quarter-table',
    exportAs: 'quarterTable',
    templateUrl: 'quarter-table.component.html',
    standalone: true,
    imports: [NgFor, NgClass]
})
export class QuarterTableComponent extends CalendarTable implements OnChanges {
    MAX_ROW = 1;

    MAX_COL = 4;

    constructor(private dateHelper: DateHelperService) {
        super();
    }

    private chooseQuarter(quarter: number): void {
        this.value = this.activeDate.setQuarter(quarter);
        this.valueChange.emit(this.value);
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
                const quarter = this.activeDate.setQuarter(quarterValue + 1);
                const isDisabled = this.disabledDate ? this.disabledDate(quarter.nativeDate) : false;
                const content = `${quarter.format('qqq')}`;
                const cell: DateCell = {
                    trackByIndex: colIndex,
                    value: quarter.nativeDate,
                    isDisabled,
                    content,
                    title: content,
                    classMap: null,
                    isSelected: quarter.isSameQuarter(this.value),
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
        if (this.selectedValue?.length > 0) {
            const [startSelected, endSelected] = this.selectedValue;
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
        } else if (quarter.isSameQuarter(this.value)) {
            cell.isSelected = true;
        }
        cell.classMap = this.getClassMap(cell, quarter);
    }

    quarterCellClick(event: Event, quarterCell: DateCell) {
        event.stopPropagation();
        return quarterCell.isDisabled ? null : quarterCell.onClick();
    }

    getClassMap(cell: DateCell, quarter: TinyDate): { [key: string]: boolean } {
        return {
            [`${this.prefixCls}-quarter-panel-cell`]: true,
            [`${this.prefixCls}-quarter-panel-cell-disabled`]: cell.isDisabled,
            [`${this.prefixCls}-quarter-panel-selected-cell`]: cell.isSelected,
            [`${this.prefixCls}-in-range-cell`]: !!cell.isInRange,
            [`${this.prefixCls}-quarter-panel-current-cell`]:
                new TinyDate().getYear() === this.activeDate.getYear() && quarter.getQuarter() === new TinyDate().getQuarter()
        };
    }
}
