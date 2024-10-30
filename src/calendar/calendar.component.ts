import { DateRangeItemInfo } from 'ngx-tethys/date-range';
import { TinyDate } from 'ngx-tethys/util';

import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    EventEmitter,
    forwardRef,
    HostBinding,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    TemplateRef,
    ViewEncapsulation,
    inject
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { ThyCalendarHeaderOperationDirective as HeaderOperation, ThyDateCellDirective as DateCell } from './calendar-cells';
import { DateTable, MonthTable } from 'ngx-tethys/date-picker';

import { ThyCalendarHeader } from './calendar-header.component';

export type CalendarMode = 'month' | 'year';
type CalendarDateTemplate = TemplateRef<{ $implicit: Date }>;

/**
 * 日历组件
 * @name thy-calendar
 * @order 10
 */
@Component({
    selector: 'thy-calendar',
    templateUrl: './calendar.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ThyCalendar), multi: true }],
    standalone: true,
    imports: [ThyCalendarHeader, DateTable, MonthTable]
})
export class ThyCalendar implements OnInit, OnChanges {
    private cdr = inject(ChangeDetectorRef);

    @HostBinding('class.thy-calendar-container') className = true;

    @HostBinding('class.thy-calendar-full') className1 = true;

    /**
     * 展示模式
     * @type month | year
     */
    @Input() thyMode: CalendarMode = 'month';

    /**
     * （可双向绑定）展示日期，默认为当前日期
     */
    @Input() thyValue?: Date;

    /**
     * 不可选择的日期
     */
    @Input() thyDisabledDate?: (date: Date) => boolean;

    /**
     * 日期选择变化的回调
     */
    @Output() thySelectChange: EventEmitter<Date> = new EventEmitter();

    /**
     * 日期选择变化的回调
     */
    @Output() thyValueChange: EventEmitter<Date> = new EventEmitter();

    /**
     * 日期选择范围变化的回调
     */
    @Output() thyDateRangeChange: EventEmitter<DateRangeItemInfo> = new EventEmitter();

    /**
     * （可作为内容）自定义渲染日期单元格，模板内容会被追加到单元格
     */
    @Input() thyDateCell?: CalendarDateTemplate;

    /**
     *  追加到单元格的自定义模板
     */
    @ContentChild(DateCell, { read: TemplateRef }) thyDateCellChild?: CalendarDateTemplate;
    get dateCell(): CalendarDateTemplate {
        return (this.thyDateCell || this.thyDateCellChild)!;
    }

    /**
     * （可作为内容）自定义渲染右上角操作项
     */
    @Input() thyCalendarHeaderOperation?: CalendarDateTemplate;

    /**
     * 右上角操作项的自定义模板
     */
    @ContentChild(HeaderOperation, { read: TemplateRef }) thyCalendarHeaderOperationChild?: CalendarDateTemplate;
    get headerOperation(): CalendarDateTemplate {
        return (this.thyCalendarHeaderOperation || this.thyCalendarHeaderOperationChild)!;
    }

    public currentDate = new TinyDate();

    public prefixCls = 'thy-calendar-full';

    private onChangeFn: (date: Date) => void = () => {};

    private onTouchFn: () => void = () => {};

    ngOnInit(): void {}

    onYearSelect(year: number): void {
        const date = this.currentDate.setYear(year);
        this.updateDate(date);
    }

    onMonthSelect(month: number): void {
        const date = this.currentDate.setMonth(month);
        this.updateDate(date);
    }

    onDateSelect(date: TinyDate): void {
        // Only currentDate is enough in calendar
        // this.value = date;
        this.updateDate(date);
    }

    onDateRangeSelect(date: DateRangeItemInfo) {
        this.thyDateRangeChange.emit(date);
    }

    writeValue(value: Date | null): void {
        this.updateDate(new TinyDate(value as Date), false);
        this.cdr.markForCheck();
    }

    registerOnChange(fn: (date: Date) => void): void {
        this.onChangeFn = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouchFn = fn;
    }

    private updateDate(date: TinyDate, touched: boolean = true): void {
        this.currentDate = date;

        if (touched) {
            this.onChangeFn(date.nativeDate);
            this.onTouchFn();
            this.thySelectChange.emit(date.nativeDate);
            this.thyValueChange.emit(date.nativeDate);
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.thyValue) {
            this.updateDate(new TinyDate(this.thyValue), false);
        }
    }
}
