import { ChangeDetectionStrategy, Component, OnChanges, inject } from '@angular/core';
import { TinyDate } from 'ngx-tethys/util';
import { DateHelperService } from '../../date-helper.service';
import { CalendarTable } from '../calendar/calendar-table.component';
import { DateCell, DateBodyRow } from '../date/types';
import { NgClass } from '@angular/common';

/**
 * @private
 */
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'month-table',
    exportAs: 'monthTable',
    templateUrl: 'month-table.component.html',
    standalone: true,
    imports: [NgClass]
})
export class MonthTable extends CalendarTable implements OnChanges {
    private dateHelper = inject(DateHelperService);

    MAX_ROW = 4;

    MAX_COL = 3;

    constructor() {
        super();
    }

    private chooseMonth(month: number): void {
        this.value = this.activeDate.setMonth(month);
        this.valueChange.emit(this.value);
        this.render();
    }

    makeHeadRow(): DateCell[] {
        return [];
    }

    makeBodyRows(): DateBodyRow[] {
        const months: DateBodyRow[] = [];
        let monthValue = 0;
        for (let rowIndex = 0; rowIndex < this.MAX_ROW; rowIndex++) {
            const row: DateBodyRow = {
                dateCells: [],
                trackByIndex: rowIndex
            };
            for (let colIndex = 0; colIndex < this.MAX_COL; colIndex++) {
                const month = this.activeDate.setMonth(monthValue);
                const monthFormat = this.locale.zhMonthFormat;
                const isDisabled = this.disabledDate ? this.disabledDate(this.activeDate.setMonth(monthValue).nativeDate) : false;
                const content = this.dateHelper.format(month.nativeDate, monthFormat);
                const cell: DateCell = {
                    trackByIndex: colIndex,
                    value: month.nativeDate,
                    isDisabled,
                    content,
                    title: content,
                    classMap: null,
                    isSelected: month.isSameMonth(this.value),
                    onClick: () => this.chooseMonth(cell.value.getMonth()),
                    onMouseEnter: () => {}
                };
                this.addCellProperty(cell, month);
                row.dateCells.push(cell);
                monthValue++;
            }
            months.push(row);
        }
        return months;
    }

    private addCellProperty(cell: DateCell, month: TinyDate): void {
        if (this.selectedValue?.length > 0) {
            const [startSelected, endSelected] = this.selectedValue;
            if (startSelected?.isSameMonth(month)) {
                cell.isSelectedStartDate = true;
                cell.isSelected = true;
            }

            if (endSelected?.isSameMonth(month)) {
                cell.isSelectedEndDate = true;
                cell.isSelected = true;
            }

            cell.isStartSingle = startSelected && !endSelected;
            cell.isEndSingle = !startSelected && !!endSelected;
            cell.isInRange = startSelected?.isBeforeMonth(month) && month?.isBeforeMonth(endSelected);
        } else if (month.isSameMonth(this.value)) {
            cell.isSelected = true;
        }
        cell.classMap = this.getClassMap(cell);
    }

    monthCellClick(event: Event, monthCell: DateCell) {
        event.stopPropagation();
        return monthCell.isDisabled ? null : monthCell.onClick();
    }

    getClassMap(cell: DateCell): { [key: string]: boolean } {
        return {
            [`${this.prefixCls}-month-panel-cell`]: true,
            [`${this.prefixCls}-month-panel-cell-disabled`]: cell.isDisabled,
            [`${this.prefixCls}-month-panel-selected-cell`]: cell.isSelected,
            [`${this.prefixCls}-in-range-cell`]: !!cell.isInRange,
            [`${this.prefixCls}-month-panel-current-cell`]:
                new TinyDate().getYear() === this.activeDate.getYear() && cell.value.getMonth() === new TinyDate().getMonth()
        };
    }
}
