import { fromUnixTime, getMonth, getYear } from 'date-fns';
import { DateRangeItemInfo, ThyDateRange } from 'ngx-tethys/date-range';
import { endOfMonth, FunctionProp, getUnixTime, startOfMonth, TinyDate } from 'ngx-tethys/util';

import { ChangeDetectorRef, Component, EventEmitter, HostBinding, Input, OnInit, Output, TemplateRef, inject } from '@angular/core';
import { ThyButton } from 'ngx-tethys/button';
import { NgTemplateOutlet, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { injectLocale, ThyCalendarLocale } from 'ngx-tethys/i18n';
import { DateHelperService } from 'ngx-tethys/date-picker';

/**
 * 日历头部操作栏组件
 * @name thy-calendar-header
 * @order 20
 */
@Component({
    selector: 'thy-calendar-header',
    templateUrl: './calendar-header.component.html',
    standalone: true,
    imports: [ThyDateRange, FormsModule, ThyButton, NgTemplateOutlet, JsonPipe]
})
export class ThyCalendarHeader implements OnInit {
    private cdr = inject(ChangeDetectorRef);
    private dateHelper = inject(DateHelperService);
    private locale: ThyCalendarLocale = injectLocale('calendar')();

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

    public pickerFormat = this.locale.yearMonthFormat;

    public dateRanges: DateRangeItemInfo[] = [
        {
            key: 'month',
            text: this.dateHelper.format(new TinyDate().nativeDate, this.pickerFormat),
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
                text: this._currentDate.format(this.pickerFormat),
                begin: getUnixTime(startOfMonth(this._currentDate.nativeDate)),
                end: getUnixTime(endOfMonth(this._currentDate.nativeDate))
            };
            this.date = dateRange;
        } else {
            this._currentDate = new TinyDate();
            this.date = { ...this.dateRanges[0] };
        }
    }

    isCurrentDate(currentDate: TinyDate) {
        this.isCurrent = currentDate.getMonth() !== getMonth(new Date()) || currentDate.getYear() !== getYear(new Date());
    }
}
