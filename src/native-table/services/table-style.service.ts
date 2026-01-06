import { Injectable, TemplateRef, signal, computed, InputSignal } from '@angular/core';
import { BehaviorSubject, combineLatest, merge, ReplaySubject } from 'rxjs';

import { ThyNativeTableSize, ThyNativeTableTheme } from '../table.interface';
import { ThyTableEmptyOptions } from 'ngx-tethys/table';
import { ThyNativeTableThDirective } from '../cell/th.directive';

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
