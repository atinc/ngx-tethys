import { DateRangeItemInfo, ThyDateRange } from 'ngx-tethys/date-range';
import { endOfMonth, FunctionProp, getMonth, getUnixTime, getYear, startOfMonth, TinyDate } from 'ngx-tethys/util';

import { JsonPipe, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, HostBinding, inject, Input, OnInit, Output, Signal, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyButton } from 'ngx-tethys/button';
import { DateHelperService } from 'ngx-tethys/date-picker';
import { injectLocale, ThyCalendarLocale } from 'ngx-tethys/i18n';

/**
 * 日历头部操作栏组件
 * @name thy-calendar-header
 * @order 20
 */
@Component({
    selector: 'thy-calendar-header',
    templateUrl: './calendar-header.component.html',
    imports: [ThyDateRange, FormsModule, ThyButton, NgTemplateOutlet, JsonPipe]
})
export class ThyCalendarHeader implements OnInit {
    private cdr = inject(ChangeDetectorRef);
    private dateHelper = inject(DateHelperService);
    public locale: Signal<ThyCalendarLocale> = injectLocale('calendar');

    @HostBinding('class.thy-calendar-full-header-container') className = true;

    /**
     * 当前选中日期
     */
    @Input()
    set currentDate(value: TinyDate) {
        this.setDate(value);
    }

    /**
     * 	自定义渲染右侧操作项
     */
    @Input() operationRender: FunctionProp<TemplateRef<any>>;

    /**
     * 日期选择范围（年）发生变化的回调
     */
    @Output() readonly yearChange: EventEmitter<number> = new EventEmitter();

    /**
     * 日期选择范围（月）发生变化的回调
     */
    @Output() readonly monthChange: EventEmitter<number> = new EventEmitter();

    /**
     * 日期选择范围（日期）发生变化的回调
     */
    @Output() readonly dateRangeChange: EventEmitter<DateRangeItemInfo> = new EventEmitter();

    public pickerFormat = this.locale().yearMonthFormat;

    public dateRanges: DateRangeItemInfo[] = [
        {
            key: 'month',
            text: this.dateHelper.format(new TinyDate().nativeDate, this.pickerFormat),
            begin: getUnixTime(startOfMonth(new TinyDate().getTime())),
            end: getUnixTime(endOfMonth(new TinyDate().getTime())),
            timestamp: {
                interval: 1,
                unit: 'month'
            }
        }
    ];

    public date: DateRangeItemInfo;

    private _currentDate: TinyDate;

    public isCurrent: boolean;

    ngOnInit(): void {}

    onChangeMonth(month: DateRangeItemInfo) {
        const currentMonth = TinyDate.fromUnixTime(month.end).getMonth();
        this.monthChange.emit(currentMonth);
    }

    onChangeYear(year: DateRangeItemInfo) {
        const currentYear = TinyDate.fromUnixTime(year.begin).getFullYear();
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
                text: this._currentDate.format(this.pickerFormat),
                begin: getUnixTime(startOfMonth(this._currentDate.getTime())),
                end: getUnixTime(endOfMonth(this._currentDate.getTime()))
            };
            this.date = dateRange;
        } else {
            this._currentDate = new TinyDate();
            this.date = { ...this.dateRanges[0] };
        }
    }

    isCurrentDate(currentDate: TinyDate) {
        this.isCurrent =
            currentDate.getMonth() !== getMonth(new TinyDate().getTime()) || currentDate.getYear() !== getYear(new TinyDate().getTime());
    }
}
