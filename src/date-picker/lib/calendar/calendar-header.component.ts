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
import { TinyDate } from 'ngx-tethys/util';
import { DateHelperService, DateHelperByDatePipe } from '../../date-helper.service';

export interface PanelSelector {
    className: string;
    title?: string;
    label: string;
    onClick?(): void;
}
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'calendar-header',
    exportAs: 'calendarHeader',
    templateUrl: 'calendar-header.component.html'
})
export abstract class CalendarHeaderComponent implements OnInit, OnChanges {
    @Input() enablePrev = true;
    @Input() enableNext = true;
    @Input() disabledMonth: (date: Date) => boolean;
    @Input() disabledYear: (date: Date) => boolean;
    @Input() value: TinyDate;
    @Output() readonly valueChange = new EventEmitter<TinyDate>();

    @Input() panelMode: PanelMode;
    @Output() readonly panelModeChange = new EventEmitter<PanelMode>();

    @Output() readonly chooseDecade = new EventEmitter<TinyDate>();
    @Output() readonly chooseYear = new EventEmitter<TinyDate>();
    @Output() readonly chooseMonth = new EventEmitter<TinyDate>();

    abstract getSelectors(): PanelSelector[];

    prefixCls = 'thy-calendar';
    selectors: PanelSelector[];

    constructor(protected dateHelper: DateHelperService) {}

    ngOnInit(): void {
        if (!this.value) {
            this.value = new TinyDate();
        }
        this.selectors = this.getSelectors();
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

    changePanel(mode: PanelMode, value?: TinyDate): void {
        this.panelModeChange.emit(mode);
    }

    private render(): void {
        if (this.value) {
            this.selectors = this.getSelectors();
        }
    }

    private gotoMonth(amount: number): void {
        this.changeValue(this.value.addMonths(amount));
    }

    private gotoYear(amount: number): void {
        this.changeValue(this.value.addYears(amount));
    }

    private changeValue(value: TinyDate): void {
        if (this.value !== value) {
            this.value = value;
            this.valueChange.emit(this.value);
            this.render();
        }
    }

    formatDateTime(format: string): string {
        return this.dateHelper.format(this.value.nativeDate, format);
    }
}
