import { Directive, EventEmitter, Input, OnChanges, OnInit, Output, Signal, SimpleChange, SimpleChanges, TemplateRef } from '@angular/core';
import { injectLocale, ThyDatePickerLocale } from 'ngx-tethys/i18n';
import { SafeAny } from 'ngx-tethys/types';
import { FunctionProp, isTemplateRef, TinyDate } from 'ngx-tethys/util';
import { DateBodyRow, DateCell } from '../date/types';

/**
 * @private
 */
@Directive()
export abstract class CalendarTable implements OnInit, OnChanges {
    locale: Signal<ThyDatePickerLocale> = injectLocale('datePicker');
    isTemplateRef = isTemplateRef;
    headRow: DateCell[] = [];
    bodyRows: DateBodyRow[] = [];
    MAX_ROW = 6;
    MAX_COL = 7;

    @Input() prefixCls: string = 'thy-calendar';
    @Input() value: TinyDate;
    @Input() activeDate: TinyDate = new TinyDate();
    @Input() showWeek: boolean = false;
    @Input() selectedValue: TinyDate[] = []; // Range ONLY
    @Input() hoverValue: TinyDate[] = []; // Range ONLY
    @Input() timeZone: string;
    @Input() disabledDate?: (d: Date) => boolean;
    @Input() cellRender?: FunctionProp<TemplateRef<Date> | string>;
    @Input() fullCellRender?: FunctionProp<TemplateRef<Date> | string>;
    @Output() readonly valueChange = new EventEmitter<TinyDate>();

    @Output() readonly cellHover = new EventEmitter<TinyDate>(); // Emitted when hover on a day by mouse enter

    constructor() {}

    protected render(): void {
        if (this.activeDate) {
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
        return this.selectedValue?.length > 0 || this.hoverValue?.length > 0;
    }

    abstract makeHeadRow(): DateCell[];
    abstract makeBodyRows(): DateBodyRow[];

    ngOnInit(): void {
        this.render();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.activeDate && !changes.activeDate.currentValue) {
            this.activeDate = new TinyDate();
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
