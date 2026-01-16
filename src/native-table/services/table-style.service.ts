import { Injectable, TemplateRef, signal, computed, InputSignal, QueryList } from '@angular/core';

import { ThyNativeTableFixedInfo, ThyNativeTableSize, ThyNativeTableTheme } from '../table.interface';
import { ThyTableEmptyOptions } from 'ngx-tethys/table';
import { ThyNativeTableThDirective } from '../cell/th.directive';
import { ThyNativeTableThFixedDirective } from '../cell/th-fixed.directive';

export interface ThyNativeTableThInfo {
    thyWidth?: InputSignal<string | number | null>;
    colspan?: number | string | null;
    colSpan?: number | string | null;
}

@Injectable()
export class ThyNativeTableStyleService {
    theadTemplate = signal<TemplateRef<any> | null>(null);
    columnCount = signal<number>(0);
    tableSize = signal<ThyNativeTableSize>('default');
    tableTheme = signal<ThyNativeTableTheme>('default');
    showEmpty = signal<boolean>(false);
    emptyOptions = signal<ThyTableEmptyOptions | null>(null);

    listOfConfigColumnWidthPx = signal<ReadonlyArray<string | null>>([]);

    enableAutoMeasureColumnWidth = signal<boolean>(false);

    listOfAutoMeasureColumnKeys = signal<readonly string[]>([]);

    listOfAutoMeasureColumnWidthPx = signal<string[]>([]);

    listOfColumnWidthPx = computed(() => {
        const measureColumnWidthPx = this.listOfAutoMeasureColumnWidthPx();
        const configColumnWidthPx = this.listOfConfigColumnWidthPx();
        if (measureColumnWidthPx.length === configColumnWidthPx.length) {
            return measureColumnWidthPx.map((width, index) => {
                if (width === '0px') {
                    return configColumnWidthPx[index] || null;
                } else {
                    return configColumnWidthPx[index] || width;
                }
            });
        } else {
            return configColumnWidthPx;
        }
    });

    listOfFixedInfo = signal<readonly ThyNativeTableFixedInfo[]>([]);

    setTheadTemplate(template: TemplateRef<any>): void {
        this.theadTemplate.set(template);
    }

    setTableSize(size: ThyNativeTableSize): void {
        this.tableSize.set(size);
    }

    setTableTheme(theme: ThyNativeTableTheme): void {
        this.tableTheme.set(theme);
    }

    setShowEmpty(showEmpty: boolean): void {
        this.showEmpty.set(showEmpty);
    }

    setEmptyOptions(emptyOptions: ThyTableEmptyOptions): void {
        this.emptyOptions.set(emptyOptions);
    }

    setListOfFixedInfo(
        headerColumns: readonly ThyNativeTableThDirective[],
        fixedHeaderColumns: readonly ThyNativeTableThFixedDirective[]
    ): void {
        if (headerColumns.length > 0 && fixedHeaderColumns.length > 0) {
            const allHeaderColumns = headerColumns;

            const fixedThElementMap = new Map<HTMLElement, ThyNativeTableThFixedDirective>();
            for (const fixed of fixedHeaderColumns) {
                fixedThElementMap.set(fixed.element, fixed);
            }
            const fixedInfo: ThyNativeTableFixedInfo[] = new Array(allHeaderColumns.length).fill(null).map(() => ({ fixed: null }));
            let currentLogicalIndex = 0;
            for (const th of allHeaderColumns) {
                const thElement = th.el;
                const fixedTh = thElement ? fixedThElementMap.get(thElement) : undefined;
                if (fixedTh) {
                    const isLastLeft = fixedTh.isLastLeft();
                    const isFirstRight = fixedTh.isFirstRight();
                    if (fixedTh.thyFixedLeft()) {
                        fixedInfo[currentLogicalIndex] = {
                            fixed: 'left',
                            isLastLeft: isLastLeft,
                            leftPx: fixedTh.fixedLeftWidth()
                        };
                    } else if (fixedTh.thyFixedRight()) {
                        fixedInfo[currentLogicalIndex] = {
                            fixed: 'right',
                            isFirstRight: isFirstRight,
                            rightPx: fixedTh.fixedRightWidth()
                        };
                    }
                }
                currentLogicalIndex += 1;
            }
            this.listOfFixedInfo.set(fixedInfo);
        } else {
            this.listOfFixedInfo.set([]);
        }
    }

    setListOfTh(listOfTh: readonly ThyNativeTableThDirective[]): void {
        const listOfThPx = listOfTh.map(item => {
            const width = item.thyWidth();
            if (width === null || width === undefined) {
                return null;
            }
            if (typeof width === 'number') {
                return `${width}px`;
            }
            return width.toString();
        });
        this.listOfConfigColumnWidthPx.set(listOfThPx);
    }

    setListOfMeasureColumnKeys(listOfTh: readonly ThyNativeTableThDirective[]): void {
        const listOfKeys: string[] = [];
        listOfTh.forEach(th => {
            const length = (th.colspan && +th.colspan) || (th.colSpan && +th.colSpan) || 1;
            for (let i = 0; i < length; i++) {
                listOfKeys.push(`measure_key_${i}`);
            }
        });
        this.listOfAutoMeasureColumnKeys.set(listOfKeys);
    }

    setListOfMeasureWidth(columnsWidth: number[]): void {
        this.listOfAutoMeasureColumnWidthPx.set(columnsWidth.map(width => `${width}px`));
    }

    setEnableAutoMeasureColumnWidth(enable: boolean): void {
        this.enableAutoMeasureColumnWidth.set(enable);
    }
}
