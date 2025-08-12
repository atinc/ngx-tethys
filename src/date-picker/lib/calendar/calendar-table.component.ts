import { Directive, input, OnInit, Signal, SimpleChange, SimpleChanges, TemplateRef, model, output, OnChanges } from '@angular/core';
import { injectLocale, ThyDatePickerLocale } from 'ngx-tethys/i18n';
import { SafeAny } from 'ngx-tethys/types';
import { coerceBooleanProperty, FunctionProp, isTemplateRef, TinyDate } from 'ngx-tethys/util';
import { DateBodyRow, DateCell } from '../date/types';
import { DisabledDateFn } from 'ngx-tethys/date-picker';

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

    readonly valueChange = output<TinyDate>();

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
