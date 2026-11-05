import { Directive, input, OnInit, Signal, SimpleChange, SimpleChanges, TemplateRef, model, output, OnChanges } from '@angular/core';
import { injectLocale, ThyDatePickerLocale } from 'ngx-tethys/i18n';
import { SafeAny } from 'ngx-tethys/types';
import { coerceBooleanProperty, FunctionProp, isTemplateRef, TinyDate } from 'ngx-tethys/util';
import { DateBodyRow, DateCell } from '../date/types';
import { DisabledDateFn } from '../../standard-types';

/**
 * @private
 */
@Directive()
export abstract class CalendarTable implements OnInit, OnChanges {
    protected locale: Signal<ThyDatePickerLocale> = injectLocale('datePicker');

    isTemplateRef = isTemplateRef;

    headRow: DateCell[] = [];

    bodyRows: DateBodyRow[] = [];

    MAX_ROW = 6;

    MAX_COL = 7;

    readonly prefixCls = input<string>('thy-calendar');

    readonly value = model<TinyDate>();

    readonly activeDate = model<TinyDate>(new TinyDate());

    readonly showWeek = input(false, { transform: coerceBooleanProperty });

    readonly selectedValue = input<TinyDate[]>([]);

    readonly hoverValue = input<TinyDate[]>([]);

    readonly timeZone = input<string>();

    readonly disabledDate = input<DisabledDateFn>();

    readonly cellRender = input<FunctionProp<TemplateRef<Date> | string>>();

    readonly cellHover = output<TinyDate>(); // Emitted when hover on a day by mouse enter

    protected render(): void {
        if (this.activeDate()) {
            this.headRow = this.makeHeadRow();
            this.bodyRows = this.makeBodyRows();
        }
    }

    trackByBodyRow(_index: number, item: DateBodyRow): SafeAny {
        return item.trackByIndex;
    }

    trackByBodyColumn(_index: number, item: DateCell): SafeAny {
        return item.trackByIndex;
    }

    hasRangeValue(): boolean {
        return this.selectedValue()?.length > 0 || this.hoverValue()?.length > 0;
    }

    /**
     * 判断 [start, end] 区间内是否所有日期都被禁用
     * 区间内存在任意一天可选时，视为未禁用
     */
    protected isAllDaysDisabled(start: TinyDate, end: TinyDate): boolean {
        const disabledDate = this.disabledDate();
        if (!disabledDate) {
            return false;
        }
        const head = start.clone().startOfDay().nativeDate;
        const tail = end.clone().startOfDay().nativeDate;
        // 首尾任一天可选即未禁用，min/max 裁剪等常见场景 O(1) 得出结论
        if (!disabledDate(head) || !disabledDate(tail)) {
            return false;
        }
        // 首尾均禁用时从两端向中间逐日扫描，找到任意可选日期即返回
        while (head.getTime() < tail.getTime()) {
            head.setDate(head.getDate() + 1);
            if (head.getTime() > tail.getTime()) {
                break;
            }
            if (!disabledDate(head)) {
                return false;
            }
            tail.setDate(tail.getDate() - 1);
            if (head.getTime() > tail.getTime()) {
                break;
            }
            if (!disabledDate(tail)) {
                return false;
            }
        }
        return true;
    }

    /**
     * 在 [start, end] 区间内查找离 preferred 最近的可选日期
     * preferred 本身可选时直接返回，否则先后向、再前向查找
     */
    protected findEnabledDateInRange(start: TinyDate, end: TinyDate, preferred: TinyDate): TinyDate {
        const disabledDate = this.disabledDate();
        if (!disabledDate) {
            return preferred;
        }
        if (!disabledDate(preferred.nativeDate)) {
            return preferred;
        }
        const startDay = start.startOfDay();
        const endDay = end.startOfDay();
        const preferredDay = preferred.startOfDay();
        let cursor = preferredDay.addDays(1);
        while (!cursor.isAfterDay(endDay)) {
            if (!disabledDate(cursor.nativeDate)) {
                return cursor;
            }
            cursor = cursor.addDays(1);
        }
        cursor = preferredDay.subDays(1);
        while (!cursor.isBeforeDay(startDay)) {
            if (!disabledDate(cursor.nativeDate)) {
                return cursor;
            }
            cursor = cursor.subDays(1);
        }
        return preferred;
    }

    abstract makeHeadRow(): DateCell[];

    abstract makeBodyRows(): DateBodyRow[];

    ngOnInit(): void {
        this.render();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.activeDate && !changes.activeDate.currentValue) {
            this.activeDate.set(new TinyDate(undefined, this.timeZone()));
        }

        if (
            changes.disabledDate ||
            changes.locale ||
            changes.showWeek ||
            this.isDateRealChange(changes.activeDate) ||
            this.isDateRealChange(changes.value) ||
            this.isDateRealChange(changes.selectedValue) ||
            this.isDateRealChange(changes.hoverValue)
        ) {
            this.render();
        }
    }

    private isDateRealChange(change: SimpleChange): boolean {
        if (change) {
            const previousValue: TinyDate | TinyDate[] = change.previousValue;
            const currentValue: TinyDate | TinyDate[] = change.currentValue;
            if (Array.isArray(currentValue)) {
                return (
                    !Array.isArray(previousValue) ||
                    currentValue.length !== previousValue.length ||
                    currentValue.some((value, index) => {
                        const previousCandyDate = previousValue[index];
                        return previousCandyDate instanceof TinyDate ? previousCandyDate.isSameDay(value) : previousCandyDate !== value;
                    })
                );
            } else {
                return !this.isSameDate(previousValue as TinyDate, currentValue);
            }
        }
        return false;
    }

    private isSameDate(left: TinyDate, right: TinyDate): boolean {
        return (!left && !right) || (left && right && right.isSameDay(left));
    }
}
