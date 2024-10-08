import { ChangeDetectionStrategy, Component, EventEmitter, OnChanges, Output } from '@angular/core';
import { TinyDate } from 'ngx-tethys/util';
import { CalendarTable } from '../calendar/calendar-table.component';
import { DateCell, DateBodyRow, YearCell } from '../date/types';
import { NgClass } from '@angular/common';

/**
 * @private
 */
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'year-table',
    templateUrl: 'year-table.component.html',
    standalone: true,
    imports: [NgClass]
})
export class YearTable extends CalendarTable implements OnChanges {
    MAX_ROW = 4;

    MAX_COL = 3;

    @Output() readonly decadePanelShow = new EventEmitter<void>();

    constructor() {
        super();
    }
    private chooseYear(year: number): void {
        this.value = this.activeDate.setYear(year);
        this.valueChange.emit(this.value);
        this.render();
    }

    makeHeadRow(): DateCell[] {
        return [];
    }

    makeBodyRows(): DateBodyRow[] {
        const years: DateBodyRow[] = [];
        const currentYear = this.activeDate && this.activeDate.getYear();
        const startYear = parseInt(`${currentYear / 10}`, 10) * 10;
        const endYear = startYear + 9;
        const previousYear = startYear - 1;
        let yearValue = 0;
        for (let rowIndex = 0; rowIndex < this.MAX_ROW; rowIndex++) {
            const row: DateBodyRow = {
                dateCells: [],
                trackByIndex: rowIndex
            };
            for (let colIndex = 0; colIndex < this.MAX_COL; colIndex++) {
                const yearNum = previousYear + yearValue;
                const year = this.activeDate.setYear(yearNum);
                const content = String(yearNum);
                const isDisabled = this.disabledDate ? this.disabledDate(year.nativeDate) : false;

                const cell: YearCell = {
                    trackByIndex: colIndex,
                    isDisabled,
                    content,
                    value: year.nativeDate,
                    title: content,
                    isSelected: yearNum === (this.value && this.value.getYear()),
                    isSameDecade: yearNum >= startYear && yearNum <= endYear,
                    classMap: {},
                    onClick: () => this.chooseYear(cell.value?.getFullYear()),
                    onMouseEnter: () => {}
                };
                this.addCellProperty(cell, year);
                row.dateCells.push(cell);
                yearValue++;
            }
            years.push(row);
        }
        return years;
    }

    private addCellProperty(cell: DateCell, year: TinyDate): void {
        if (this.selectedValue?.length > 0) {
            const [startSelected, endSelected] = this.selectedValue;
            if (startSelected?.isSameYear(year)) {
                cell.isSelected = true;
            }

            if (endSelected?.isSameYear(year)) {
                cell.isSelected = true;
            }

            cell.isStartSingle = startSelected && !endSelected;
            cell.isEndSingle = !startSelected && !!endSelected;
            cell.isInRange = startSelected?.isBeforeYear(year) && year?.isBeforeYear(endSelected);
        } else if (year.isSameYear(this.value)) {
            cell.isSelected = true;
        }
        cell.classMap = this.getClassMap(cell);
    }

    yearCellClick(event: Event, yearCell: DateCell) {
        event.stopPropagation();
        return yearCell.isDisabled ? null : yearCell.onClick();
    }

    getClassMap(cell: YearCell): { [key: string]: boolean } {
        return {
            [`${this.prefixCls}-year-panel-cell`]: true,
            [`${this.prefixCls}-year-panel-selected-cell`]: cell.isSelected,
            [`${this.prefixCls}-year-panel-cell-disabled`]: cell.isDisabled,
            [`${this.prefixCls}-year-panel-cell-in-view`]: cell.isSameDecade,
            [`${this.prefixCls}-in-range-cell`]: !!cell.isInRange
        };
    }
}
