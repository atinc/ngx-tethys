import { AfterContentInit, ContentChildren, DestroyRef, Directive, QueryList, computed, effect, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map, startWith } from 'rxjs/operators';

import { ThyNativeTableThDirective } from '../cell/th.directive';
import { ThyNativeTableStyleService } from '../services/table-style.service';
import { ThyNativeTableCellFixedDirective } from '../cell/cell-fixed.directive';

/* eslint-disable @angular-eslint/directive-selector */
@Directive({
    selector: 'tr:not([thyNativeTableMeasureRow]):not([thyNativeTableFixedRow])',
    host: {
        '[class.thy-native-table-row]': 'isInsideNativeTable'
    }
})
export class ThyNativeTableTrDirective implements AfterContentInit {
    private destroyRef = inject(DestroyRef);
    private styleService = inject(ThyNativeTableStyleService, { optional: true });

    @ContentChildren(ThyNativeTableThDirective) listOfThDirective!: QueryList<ThyNativeTableThDirective>;
    @ContentChildren(ThyNativeTableCellFixedDirective) listOfCellFixedDirective!: QueryList<ThyNativeTableCellFixedDirective>;

    private listOfColumns = signal<ThyNativeTableThDirective[]>([]);
    private listOfFixedColumns = signal<ThyNativeTableCellFixedDirective[]>([]);

    public listOfColumnsChanges = computed(() => {
        const columns = this.listOfColumns();
        columns.forEach(c => c.changes());
        return columns;
    });

    private listOfFixedColumnsChanges = computed(() => {
        const fixedColumns = this.listOfFixedColumns();
        fixedColumns.forEach(c => c.changes());
        return fixedColumns;
    });

    listOfFixedLeftColumnChanges = computed(() => this.listOfFixedColumnsChanges().filter(item => item.thyFixedLeft()));

    listOfFixedRightColumnChanges = computed(() => this.listOfFixedColumnsChanges().filter(item => item.thyFixedRight()));

    isInsideNativeTable = !!this.styleService;

    constructor() {
        effect(() => {
            const listOfWidth = this.styleService?.listOfColumnWidthPx();
            const listOfLeftCell = this.listOfFixedLeftColumnChanges();
            if (listOfLeftCell.length && listOfWidth && listOfWidth.length > 0) {
                listOfLeftCell.forEach((cell, index) => {
                    if (cell.thyFixedLeft()) {
                        const currentArray = listOfLeftCell.slice(0, index);
                        const count = currentArray.length;
                        const width = listOfWidth.slice(0, count).reduce((pre, cur) => pre + parseInt(cur ?? '0', 10), 0);
                        cell.setAutoLeftWidth(`${width}px`);
                    }
                });
            }
        });

        effect(() => {
            const listOfWidth = this.styleService?.listOfColumnWidthPx();
            const listOfRightCell = this.listOfFixedRightColumnChanges();
            if (listOfRightCell.length && listOfWidth && listOfWidth.length > 0) {
                listOfRightCell.forEach((_, index) => {
                    const cell = listOfRightCell[listOfRightCell.length - index - 1];
                    if (cell.thyFixedRight()) {
                        const currentArray = listOfRightCell.slice(listOfRightCell.length - index, listOfRightCell.length);
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
            const listOfFixedLeft = this.listOfFixedLeftColumnChanges();
            listOfFixedLeft.forEach(cell => cell.setIsLastLeft(cell === listOfFixedLeft[listOfFixedLeft.length - 1]));

            const listOfFixedRight = this.listOfFixedRightColumnChanges();
            listOfFixedRight.forEach(cell => cell.setIsFirstRight(cell === listOfFixedRight[0]));
        });
    }

    ngAfterContentInit(): void {
        if (this.styleService) {
            this.listOfThDirective.changes.pipe(startWith(this.listOfThDirective), takeUntilDestroyed(this.destroyRef)).subscribe(() => {
                if (this.listOfThDirective.length > 0) {
                    this.listOfColumns.set(this.listOfThDirective.toArray());
                }
            });

            this.listOfCellFixedDirective.changes
                .pipe(startWith(this.listOfCellFixedDirective), takeUntilDestroyed(this.destroyRef))
                .subscribe(() => {
                    if (this.listOfCellFixedDirective.length > 0) {
                        this.listOfFixedColumns.set(this.listOfCellFixedDirective.toArray());
                    }
                });
        }
    }
}
