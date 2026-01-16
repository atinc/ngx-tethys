import { Directive, computed, contentChildren, effect, inject } from '@angular/core';

import { ThyNativeTableThDirective } from '../cell/th.directive';
import { ThyNativeTableStyleService } from '../services/table-style.service';
import { ThyNativeTableThFixedDirective } from '../cell/th-fixed.directive';
import { ThyNativeTableTdDirective } from '../cell/td.directive';

/* eslint-disable @angular-eslint/directive-selector */
@Directive({
    selector: 'tr:not([thyNativeTableMeasureRow]):not([thyNativeTableFixedRow])',
    host: {
        '[class.thy-native-table-row]': 'isInsideNativeTable'
    }
})
export class ThyNativeTableTrDirective {
    private styleService = inject(ThyNativeTableStyleService, { optional: true });

    readonly listOfThColumns = contentChildren<ThyNativeTableThDirective>(ThyNativeTableThDirective);
    readonly listOfThFixedColumns = contentChildren<ThyNativeTableThFixedDirective>(ThyNativeTableThFixedDirective);
    readonly listOfTdColumns = contentChildren<ThyNativeTableTdDirective>(ThyNativeTableTdDirective);

    public listOfThColumnsChanges = computed(() => {
        const columns = this.listOfThColumns();
        columns.forEach(c => c.changes());
        return columns;
    });

    public listOfThFixedColumnsChanges = computed(() => {
        const fixedColumns = this.listOfThFixedColumns();
        fixedColumns.forEach(c => c.changes());
        return fixedColumns;
    });

    listOfThFixedLeftColumns = computed(() => this.listOfThFixedColumnsChanges().filter(item => item.thyFixedLeft()));

    listOfThFixedRightColumns = computed(() => this.listOfThFixedColumnsChanges().filter(item => item.thyFixedRight()));

    isInsideNativeTable = !!this.styleService;

    constructor() {
        effect(() => {
            const listOfWidth = this.styleService?.listOfColumnWidthPx();
            const listOfThFixedLeftColumns = this.listOfThFixedLeftColumns();
            if (listOfThFixedLeftColumns.length && listOfWidth && listOfWidth.length > 0) {
                listOfThFixedLeftColumns.forEach((cell, index) => {
                    if (cell.thyFixedLeft()) {
                        const currentArray = listOfThFixedLeftColumns.slice(0, index);
                        const count = currentArray.length;
                        const width = listOfWidth.slice(0, count).reduce((pre, cur) => pre + parseInt(cur ?? '0', 10), 0);
                        cell.setAutoLeftWidth(`${width}px`);
                    }
                });
            }
        });

        effect(() => {
            const listOfWidth = this.styleService?.listOfColumnWidthPx();
            const listOfThFixedRightColumns = this.listOfThFixedRightColumns();
            if (listOfThFixedRightColumns.length && listOfWidth && listOfWidth.length > 0) {
                listOfThFixedRightColumns.forEach((_, index) => {
                    const cell = listOfThFixedRightColumns[listOfThFixedRightColumns.length - index - 1];
                    if (cell.thyFixedRight()) {
                        const currentArray = listOfThFixedRightColumns.slice(
                            listOfThFixedRightColumns.length - index,
                            listOfThFixedRightColumns.length
                        );
                        const count = currentArray.length;
                        const width = listOfWidth
                            .slice(listOfWidth.length - count, listOfWidth.length)
                            .reduce((pre, cur) => pre + parseInt(cur ?? '0', 10), 0);
                        cell.setAutoRightWidth(`${width}px`);
                    }
                });
            }
        });

        effect(() => {
            const listOfFixedLeft = this.listOfThFixedLeftColumns();
            listOfFixedLeft.forEach(cell => cell.setIsLastLeft(cell === listOfFixedLeft[listOfFixedLeft.length - 1]));

            const listOfFixedRight = this.listOfThFixedRightColumns();
            listOfFixedRight.forEach(cell => cell.setIsFirstRight(cell === listOfFixedRight[0]));
        });

        effect(() => {
            const listOfTd = this.listOfTdColumns();
            if (listOfTd.length === 0) {
                return;
            }

            for (let i = 0; i < listOfTd.length; i++) {
                const td = listOfTd[i];
                td.setLogicalColumnIndex(i);
            }
        });
    }
}
