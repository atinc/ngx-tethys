import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { TinyDate } from 'ngx-tethys/util';
import { CalendarTable } from '../calendar/calendar-table.component';
import { DateCell, DecadeCell, DateBodyRow } from '../date/types';
import { NgClass } from '@angular/common';

/**
 * @private
 */
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
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
        const newValue = (this.value() || new TinyDate()).setYear(startYear);
        this.value.set(newValue);
        this.valueChange.emit(newValue);
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
            [`${prefixCls}-decade-panel-selected-cell`]: !!cell.isSelected,
            [`${prefixCls}-decade-panel-last-century-cell`]: !!cell.isLowerThanStart,
            [`${prefixCls}-decade-panel-next-century-cell`]: !!cell.isBiggerThanEnd
        };
    }

    cellClick(event: Event, cell: DecadeCell) {
        event.stopPropagation();
        cell.onClick();
    }
}
