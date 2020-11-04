import { ChangeDetectorRef, Component, EventEmitter, HostBinding, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { DateRangeItemInfo } from '../date-range/date-range.class';
import { FunctionProp } from '../util/helpers';
import { endOfMonth, getUnixTime, startOfMonth, TinyDate } from '../util/tiny-date';
import { fromUnixTime, getMonth, getYear } from 'date-fns';

@Component({
    selector: 'thy-calendar-header',
    templateUrl: './calendar-header.component.html'
})
export class ThyCalendarHeaderComponent implements OnInit {
    @HostBinding('class.thy-calendar-full-header-container') className = true;

    // @Input() mode: 'month' | 'year' = 'month';

    // @Input() fullscreen = true;

    @Input()
    set currentDate(value: TinyDate) {
        this.setDate(value);
    }

    @Input() operationRender: FunctionProp<TemplateRef<any>>;

    // @Output() readonly modeChange: EventEmitter<'month' | 'year'> = new EventEmitter();

    @Output() readonly yearChange: EventEmitter<number> = new EventEmitter();

    @Output() readonly monthChange: EventEmitter<number> = new EventEmitter();

    @Output() readonly dateRangeChange: EventEmitter<DateRangeItemInfo> = new EventEmitter();

    public dateRanges: DateRangeItemInfo[] = [
        {
            key: 'month',
            text: getYear(new Date()) + '年' + (getMonth(new Date()) + 1) + '月',
            begin: getUnixTime(startOfMonth(new Date())),
            end: getUnixTime(endOfMonth(new Date())),
            timestamp: {
                interval: 1,
                unit: 'month'
            }
        }
    ];

    public date: DateRangeItemInfo;

    private _currentDate: TinyDate;

    public isCurrent: boolean;

    constructor(private cdr: ChangeDetectorRef) {}

    ngOnInit(): void {}

    onChangeMonth(month: DateRangeItemInfo) {
        const currentMonth = fromUnixTime(month.begin).getMonth();
        this.monthChange.emit(currentMonth);
    }

    onChangeYear(year: DateRangeItemInfo) {
        const currentYear = fromUnixTime(year.begin).getFullYear();
        this.yearChange.emit(currentYear);
    }

    onChangeRange(dateRange: DateRangeItemInfo) {
        this.isCurrentDate(this._currentDate);
        this.onChangeYear(dateRange);
        this.onChangeMonth(dateRange);
        this.dateRangeChange.emit(dateRange);
    }

    backToday() {
        this._currentDate = new TinyDate();
        this.date = { ...this.dateRanges[0] };
        this.onChangeRange(this.date);
        this.cdr.detectChanges();
    }

    setDate(value: TinyDate) {
        this.isCurrentDate(value);
        if (this.isCurrent) {
            this._currentDate = value;
            const dateRange = {
                ...this.dateRanges[0],
                key: 'exception',
                begin: getUnixTime(startOfMonth(this._currentDate.nativeDate)),
                end: getUnixTime(endOfMonth(this._currentDate.nativeDate))
            };
            this.date = dateRange;
            this.onChangeRange(dateRange);
        } else {
            this.backToday();
        }
    }

    isCurrentDate(currentDate: TinyDate) {
        this.isCurrent = currentDate.getMonth() !== getMonth(new Date()) || currentDate.getYear() !== getYear(new Date());
    }
}
