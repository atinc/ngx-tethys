import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewEncapsulation
} from '@angular/core';

import { PanelMode } from '../../standard-types';
import { CandyDate } from '../../../core';
import { DateHelperService, DateHelperByDatePipe } from '../../date-helper.service';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'calendar-header',
    exportAs: 'calendarHeader',
    templateUrl: 'calendar-header.component.html'
})
export class CalendarHeaderComponent implements OnInit, OnChanges {
    @Input() enablePrev = true;
    @Input() enableNext = true;
    @Input() disabledMonth: (date: Date) => boolean;
    @Input() disabledYear: (date: Date) => boolean;
    @Input() value: CandyDate;
    @Output() readonly valueChange = new EventEmitter<CandyDate>();

    @Input() panelMode: PanelMode;
    @Output() readonly panelModeChange = new EventEmitter<PanelMode>();

    @Output() readonly chooseDecade = new EventEmitter<CandyDate>();
    @Output() readonly chooseYear = new EventEmitter<CandyDate>();
    @Output() readonly chooseMonth = new EventEmitter<CandyDate>();

    prefixCls = 'thy-calendar';
    yearMonthDaySelectors: YearMonthDaySelector[];

    // tslint:disable-next-line: max-line-length
    private yearToMonth = false; // Indicate whether should change to month panel when current is year panel (if referer=month, it should show month panel when choosed a year)

    constructor(private dateHelper: DateHelperService) {}

    ngOnInit(): void {
        if (!this.value) {
            this.value = new CandyDate();
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.value) {
            this.render();
        }
    }

    previousYear(): void {
        this.gotoYear(-1);
    }

    nextYear(): void {
        this.gotoYear(1);
    }

    previousMonth(): void {
        this.gotoMonth(-1);
    }

    nextMonth(): void {
        this.gotoMonth(1);
    }

    changePanel(mode: PanelMode, value?: CandyDate): void {
        this.panelModeChange.emit(mode);
        if (value) {
            this.changeValueFromInside(value);
        }
    }

    onChooseDecade(value: CandyDate): void {
        this.changePanel('year', value);
        this.chooseDecade.emit(value);
    }

    onChooseYear(value: CandyDate): void {
        this.changePanel(this.yearToMonth ? 'month' : 'date', value);
        this.yearToMonth = false; // Clear
        this.chooseYear.emit(value);
    }

    onChooseMonth(value: CandyDate): void {
        this.changePanel('date', value);
        this.yearToMonth = false; // Clear
        this.chooseMonth.emit(value);
    }

    changeToMonthPanel(): void {
        this.changePanel('month');
        this.yearToMonth = true;
    }

    private render(): void {
        if (this.value) {
            this.yearMonthDaySelectors = this.createYearMonthDaySelectors();
        }
    }

    private gotoMonth(amount: number): void {
        this.changeValueFromInside(this.value.addMonths(amount));
    }

    private gotoYear(amount: number): void {
        this.changeValueFromInside(this.value.addYears(amount));
    }

    private changeValueFromInside(value: CandyDate): void {
        if (this.value !== value) {
            this.value = value;
            this.valueChange.emit(this.value);
            this.render();
        }
    }

    private formatDateTime(format: string): string {
        return this.dateHelper.format(this.value.nativeDate, format);
    }

    private createYearMonthDaySelectors(): YearMonthDaySelector[] {
        let year: YearMonthDaySelector;
        let month: YearMonthDaySelector;

        // NOTE: Compat for DatePipe formatting rules
        let yearFormat = 'yyyy年';
        if (this.dateHelper.relyOnDatePipe) {
            yearFormat = (this.dateHelper as DateHelperByDatePipe).transCompatFormat(yearFormat);
        }
        year = {
            className: `${this.prefixCls}-year-select`,
            onClick: () => this.changePanel('year'),
            label: this.formatDateTime(yearFormat)
        };

        month = {
            className: `${this.prefixCls}-month-select`,
            onClick: () => this.changeToMonthPanel(),
            label: this.formatDateTime('MMM')
        };

        // NOTE: Compat for DatePipe formatting rules
        let dayFormat = 'd日';
        if (this.dateHelper.relyOnDatePipe) {
            dayFormat = (this.dateHelper as DateHelperByDatePipe).transCompatFormat(dayFormat);
        }

        let result: YearMonthDaySelector[];

        result = [year, month];

        return result.filter(selector => !!selector);
    }
}

export interface YearMonthDaySelector {
    className: string;
    title?: string;
    label: string;
    onClick?(): void;
}
