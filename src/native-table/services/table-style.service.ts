import { Injectable, TemplateRef, signal, computed, InputSignal } from '@angular/core';
import { BehaviorSubject, combineLatest, merge, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { ThyNativeTableSize, ThyNativeTableTheme } from '../table.interface';

export interface ThyNativeTableThMeasureInfo {
    thyWidth?: InputSignal<string | number | null>;
    colspan?: number | string;
    colSpan?: number | string;
}

@Injectable()
export class ThyNativeTableStyleService {
    theadTemplate$ = new ReplaySubject<TemplateRef<any>>(1);
    tfootTemplate$ = new ReplaySubject<TemplateRef<any>>(1);
    hasFixLeft = signal<boolean>(false);
    hasFixRight = signal<boolean>(false);
    columnCount = signal<number>(0);
    tableSize = signal<ThyNativeTableSize>('default');
    tableTheme = signal<ThyNativeTableTheme>('default');

    private listOfThWidthConfigPx$ = new BehaviorSubject<ReadonlyArray<string | null>>([]);

    private tableWidthConfigPx$ = new BehaviorSubject<ReadonlyArray<string | null>>([]);

    manualWidthConfigPx$ = combineLatest([this.tableWidthConfigPx$, this.listOfThWidthConfigPx$]).pipe(
        map(([widthConfig, listOfWidth]) => (widthConfig.length ? widthConfig : listOfWidth))
    );

    private listOfAutoWidthPx$ = new ReplaySubject<readonly string[]>(1);

    listOfListOfThWidthPx$ = merge(
        this.manualWidthConfigPx$,
        combineLatest([this.listOfAutoWidthPx$, this.manualWidthConfigPx$]).pipe(
            map(([autoWidth, manualWidth]) => {
                if (autoWidth.length === manualWidth.length) {
                    return autoWidth.map((width, index) => {
                        if (width === '0px') {
                            return manualWidth[index] || null;
                        } else {
                            return manualWidth[index] || width;
                        }
                    });
                } else {
                    return manualWidth;
                }
            })
        )
    );

    listOfMeasureColumn$ = new ReplaySubject<readonly string[]>(1);
    listOfListOfThWidth$ = this.listOfAutoWidthPx$.pipe(map(list => list.map(width => parseInt(width, 10))));
    enableAutoMeasure$ = new ReplaySubject<boolean>(1);

    setTheadTemplate(template: TemplateRef<any>): void {
        this.theadTemplate$.next(template);
    }

    setTfootTemplate(template: TemplateRef<any>): void {
        this.tfootTemplate$.next(template);
    }

    setHasFixLeft(hasFixLeft: boolean): void {
        this.hasFixLeft.set(hasFixLeft);
    }

    setHasFixRight(hasFixRight: boolean): void {
        this.hasFixRight.set(hasFixRight);
    }

    setTableWidthConfig(widthConfig: ReadonlyArray<string | null>): void {
        this.tableWidthConfigPx$.next(widthConfig);
    }

    setTableSize(size: ThyNativeTableSize): void {
        this.tableSize.set(size);
    }

    setTableTheme(theme: ThyNativeTableTheme): void {
        this.tableTheme.set(theme);
    }

    setListOfTh(listOfTh: readonly ThyNativeTableThMeasureInfo[]): void {
        let columnCount = 0;
        listOfTh.forEach(th => {
            columnCount += (th.colspan && +th.colspan) || (th.colSpan && +th.colSpan) || 1;
        });
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
        this.columnCount.set(columnCount);
        this.listOfThWidthConfigPx$.next(listOfThPx);
    }

    /**
     * 设置测量列列表
     */
    setListOfMeasureColumn(listOfTh: readonly ThyNativeTableThMeasureInfo[]): void {
        const listOfKeys: string[] = [];
        listOfTh.forEach(th => {
            const length = (th.colspan && +th.colspan) || (th.colSpan && +th.colSpan) || 1;
            for (let i = 0; i < length; i++) {
                listOfKeys.push(`measure_key_${i}`);
            }
        });
        this.listOfMeasureColumn$.next(listOfKeys);
    }

    /**
     * 设置自动计算的列宽列表
     */
    setListOfAutoWidth(listOfAutoWidth: number[]): void {
        this.listOfAutoWidthPx$.next(listOfAutoWidth.map(width => `${width}px`));
    }

    /**
     * 设置滚动配置（用于启用/禁用自动测量）
     */
    setScroll(scrollX: string | null, scrollY: string | null): void {
        const enableAutoMeasure = !!(scrollX || scrollY);
        if (!enableAutoMeasure) {
            this.setListOfAutoWidth([]);
        }
        this.enableAutoMeasure$.next(enableAutoMeasure);
    }
}
