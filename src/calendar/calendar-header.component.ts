import { Component, ContentChild, EventEmitter, HostBinding, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { DateRangeItemInfo } from '../date-range/date-range.class';
import { FunctionProp } from '../util/helpers';
import { endOfMonth, getUnixTime, startOfMonth, TinyDate } from '../util/tiny-date';
import { getMonth, setMonth, getTime, fromUnixTime } from 'date-fns';

@Component({
    selector: 'thy-calendar-header',
    templateUrl: './calendar-header.component.html'
})
export class ThyCalendarHeaderComponent implements OnInit {
    @HostBinding('class.thy-calendar-full-header-container') className = true;

    // @Input() mode: 'month' | 'year' = 'month';

    // @Input() fullscreen = true;

    // @Input() currentDate = new TinyDate();

    @Input() operationRender: FunctionProp<TemplateRef<any>>;

    // @Output() readonly modeChange: EventEmitter<'month' | 'year'> = new EventEmitter();

    @Output() readonly yearChange: EventEmitter<number> = new EventEmitter();

    @Output() readonly monthChange: EventEmitter<number> = new EventEmitter();

    public dateRanges: DateRangeItemInfo[] = [
        {
            key: 'month',
            text: '本月',
            begin: getUnixTime(startOfMonth(new Date())),
            end: getUnixTime(endOfMonth(new Date())),
            timestamp: {
                interval: 1,
                unit: 'month'
            }
        }
    ];

    public date: DateRangeItemInfo;

    public markMonth: number;

    public currentMonth: number;

    constructor() {}

    ngOnInit(): void {
        this.initialMarkMonth();
    }

    initialMarkMonth() {
        this.markMonth = fromUnixTime(getUnixTime(startOfMonth(new Date()))).getMonth();
    }

    onChangeMonth(month: DateRangeItemInfo) {
        const currentMonth = fromUnixTime(month.begin).getMonth();
        this.currentMonth = currentMonth;
        this.monthChange.emit(this.currentMonth);
    }

    onChangeYear(year: DateRangeItemInfo) {
        const currentYear = fromUnixTime(year.begin).getFullYear();
        this.yearChange.emit(currentYear);
    }

    onChangeRange(dateRange: DateRangeItemInfo) {
        this.onChangeYear(dateRange);
        this.onChangeMonth(dateRange);
    }

    backToday() {
        this.currentMonth = this.markMonth;
        this.date = this.dateRanges[0];
        this.onChangeRange(this.date);
    }
}
