import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges
} from '@angular/core';
import { TinyDate } from '../../../util';

const MAX_ROW = 4;
const MAX_COL = 3;

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'year-panel',
    exportAs: 'yearPanel',
    templateUrl: 'year-panel.component.html'
})
export class YearPanelComponent implements OnChanges {
    @Input() value: TinyDate;
    @Output() readonly valueChange = new EventEmitter<TinyDate>();

    @Input() disabledDate: (date: Date) => boolean;

    @Output() readonly decadePanelShow = new EventEmitter<void>();

    get currentYear(): number {
        return this.value.getYear();
    }
    get startYear(): number {
        return parseInt(`${this.currentYear / 10}`, 10) * 10;
    }
    get endYear(): number {
        return this.startYear + 9;
    }

    prefixCls = 'thy-calendar-year-panel';
    panelYears: PanelYearData[][];

    constructor() {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.value || changes.disabledDate) {
            this.render();
        }
    }

    previousDecade(): void {
        this.gotoYear(-10);
    }

    nextDecade(): void {
        this.gotoYear(10);
    }

    trackPanelYear(_index: number, yearData: PanelYearData): string {
        return yearData.content;
    }

    private render(): void {
        if (this.value) {
            this.panelYears = this.makePanelYears();
        }
    }

    // Re-render panel content by the header's buttons (NOTE: Do not try to trigger final value change)
    private gotoYear(amount: number): void {
        this.value = this.value.addYears(amount);
        // this.valueChange.emit(this.value); // Do not trigger final value change
        this.render();
    }

    private chooseYear(year: number): void {
        this.value = this.value.setYear(year);
        this.valueChange.emit(this.value);
        this.render();
    }

    private makePanelYears(): PanelYearData[][] {
        const years: PanelYearData[][] = [];
        const currentYear = this.currentYear;
        const startYear = this.startYear;
        const endYear = this.endYear;
        const previousYear = startYear - 1;
        let index = 0;
        for (let rowIndex = 0; rowIndex < MAX_ROW; rowIndex++) {
            years[rowIndex] = [];
            for (let colIndex = 0; colIndex < MAX_COL; colIndex++) {
                const year = previousYear + index;
                const content = String(year);
                const disabled = this.disabledDate ? this.disabledDate(this.value.setYear(year).nativeDate) : false;

                const cell: PanelYearData = (years[rowIndex][colIndex] = {
                    disabled,
                    content,
                    year,
                    title: content,
                    isCurrent: year === currentYear,
                    isLowerThanStart: year < startYear,
                    isBiggerThanEnd: year > endYear,
                    classMap: null,
                    onClick: () => this.chooseYear(cell.year)
                });

                cell.classMap = {
                    [`${this.prefixCls}-cell`]: true,
                    [`${this.prefixCls}-selected-cell`]: cell.isCurrent,
                    [`${this.prefixCls}-cell-disabled`]: disabled,
                    [`${this.prefixCls}-last-decade-cell`]: cell.isLowerThanStart,
                    [`${this.prefixCls}-next-decade-cell`]: cell.isBiggerThanEnd
                };
                index++;
            }
        }
        return years;
    }
}

export interface PanelYearData {
    disabled: boolean;
    content: string;
    year: number;
    title: string;
    isCurrent: boolean;
    isLowerThanStart: boolean;
    isBiggerThanEnd: boolean;
    classMap: object | null;
    onClick: VoidFunction | null;
}
