import { Injectable, TemplateRef, signal, computed, InputSignal } from '@angular/core';
import { BehaviorSubject, combineLatest, merge, ReplaySubject } from 'rxjs';

import { ThyNativeTableSize, ThyNativeTableTheme } from '../table.interface';

export interface ThyNativeTableThInfo {
    thyWidth?: InputSignal<string | number | null>;
    colspan?: number | string;
    colSpan?: number | string;
}

@Injectable()
export class ThyNativeTableStyleService {
    theadTemplate$ = new ReplaySubject<TemplateRef<any>>(1);
    tfootTemplate$ = new ReplaySubject<TemplateRef<any>>(1);
    columnCount = signal<number>(0);
    tableSize = signal<ThyNativeTableSize>('default');
    tableTheme = signal<ThyNativeTableTheme>('default');

    listOfThWidthConfigPx$ = new BehaviorSubject<ReadonlyArray<string | null>>([]);

    setTheadTemplate(template: TemplateRef<any>): void {
        this.theadTemplate$.next(template);
    }

    setTfootTemplate(template: TemplateRef<any>): void {
        this.tfootTemplate$.next(template);
    }

    setTableSize(size: ThyNativeTableSize): void {
        this.tableSize.set(size);
    }

    setTableTheme(theme: ThyNativeTableTheme): void {
        this.tableTheme.set(theme);
    }

    setListOfTh(listOfTh: readonly ThyNativeTableThInfo[]): void {
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
        this.listOfThWidthConfigPx$.next(listOfThPx);
    }
}
