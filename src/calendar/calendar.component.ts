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
    ViewEncapsulation
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputBoolean } from '../core';
import { DateRangeItemInfo } from '../date-range';
import { TinyDate } from '../util';
import {
    ThyDateCellDirective as DateCell,
    ThyDateFullCellDirective as DateFullCell,
    ThyMonthCellDirective as MonthCell,
    ThyMonthFullCellDirective as MonthFullCell,
    ThyCalendarHeaderOperationDirective as HeaderOperation
} from './calendar-cells';

export type CalendarMode = 'month' | 'year';
type CalendarDateTemplate = TemplateRef<{ $implicit: Date }>;

@Component({
    selector: 'thy-calendar',
    templateUrl: './calendar.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ThyCalendarComponent), multi: true }]
})
export class ThyCalendarComponent implements OnInit, OnChanges {
    @HostBinding('class.thy-calendar-container') className = true;

    @HostBinding('class.thy-calendar-full') className1 = true;

    // @HostBinding('class.thy-pick-calendar-mini') className2 = !thyFullscreen;

    @Input() thyMode: CalendarMode = 'month';

    @Input() thyValue?: Date;

    @Input() thyDisabledDate?: (date: Date) => boolean;

    @Output() thyModeChange: EventEmitter<CalendarMode> = new EventEmitter();

    @Output() thyPanelChange: EventEmitter<{ date: Date; mode: CalendarMode }> = new EventEmitter();

    @Output() thySelectChange: EventEmitter<Date> = new EventEmitter();

    @Output() thyValueChange: EventEmitter<Date> = new EventEmitter();

    @Output() thyDateRangeChange: EventEmitter<DateRangeItemInfo> = new EventEmitter();

    @Input() thyDateCell?: CalendarDateTemplate;
    @ContentChild(DateCell, { static: false, read: TemplateRef }) thyDateCellChild?: CalendarDateTemplate;
    get dateCell(): CalendarDateTemplate {
        return (this.thyDateCell || this.thyDateCellChild)!;
    }

    @Input() thyDateFullCell?: CalendarDateTemplate;
    @ContentChild(DateFullCell, { static: false, read: TemplateRef }) thyDateFullCellChild?: CalendarDateTemplate;
    get dateFullCell(): CalendarDateTemplate {
        return (this.thyDateFullCell || this.thyDateFullCellChild)!;
    }

    @Input() thyMonthCell?: CalendarDateTemplate;
    @ContentChild(MonthCell, { static: false, read: TemplateRef }) thyMonthCellChild?: CalendarDateTemplate;
    get monthCell(): CalendarDateTemplate {
        return (this.thyMonthCell || this.thyMonthCellChild)!;
    }

    @Input() thyMonthFullCell?: CalendarDateTemplate;
    @ContentChild(MonthFullCell, { static: false, read: TemplateRef }) thyMonthFullCellChild?: CalendarDateTemplate;
    get monthFullCell(): CalendarDateTemplate {
        return (this.thyMonthFullCell || this.thyMonthFullCellChild)!;
    }

    @Input() thyCalendarHeaderOperation?: CalendarDateTemplate;
    @ContentChild(HeaderOperation, { static: false, read: TemplateRef }) thyCalendarHeaderOperationChild?: CalendarDateTemplate;
    get headerOperation(): CalendarDateTemplate {
        return (this.thyCalendarHeaderOperation || this.thyCalendarHeaderOperationChild)!;
    }

    @Input() @InputBoolean() thyFullscreen = true;

    public currentDate = new TinyDate();

    public prefixCls = 'thy-calendar-full';

    private onChangeFn: (date: Date) => void = () => {};

    private onTouchFn: () => void = () => {};

    constructor(private cdr: ChangeDetectorRef) {}

    ngOnInit(): void {}

    onModeChange(mode: CalendarMode): void {
        this.thyModeChange.emit(mode);
        this.thyPanelChange.emit({ date: this.currentDate.nativeDate, mode });
    }

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
