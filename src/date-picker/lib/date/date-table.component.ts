import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChange,
    SimpleChanges,
    TemplateRef
} from '@angular/core';
import { TinyDate } from '../../../util';
import { valueFunctionProp, FunctionProp } from '../../../util/helpers';
import { DateHelperService } from '../../date-helper.service';

const DATE_ROW_NUM = 6;
const DATE_COL_NUM = 7;

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'date-table',
    exportAs: 'dateTable',
    templateUrl: 'date-table.component.html'
})
export class DateTableComponent implements OnChanges {
    _value: TinyDate;
    headWeekDays: WeekDayLabel[];
    weekRows: WeekRow[];

    @Input() prefixCls = 'thy-calendar';
    @Input() selectedValue: TinyDate[]; // Range ONLY
    @Input() hoverValue: TinyDate[]; // Range ONLY

    @Input()
    set value(date: TinyDate) {
        this._value = date;
    }

    get value(): TinyDate {
        return this._value;
    }

    @Input() showWeek = false;
    @Input() disabledDate: (d: Date) => boolean;
    @Input() dateCellRender: FunctionProp<TemplateRef<Date> | string>;
    @Output() readonly dayHover = new EventEmitter<TinyDate>(); // Emitted when hover on a day by mouse enter
    @Output() readonly valueChange = new EventEmitter<TinyDate>();

    constructor(private dateHelper: DateHelperService) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (
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
                        const previousTinyDate = previousValue[index];
                        return previousTinyDate instanceof TinyDate ? previousTinyDate.isSameDay(value) : previousTinyDate !== value;
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

    private render(): void {
        if (this.value) {
            this.headWeekDays = this.makeHeadWeekDays();
            this.weekRows = this.makeWeekRows();
        }
    }

    private changeValueFromInside(value: TinyDate): void {
        // Only change date not change time
        const newValue = this.value
            .setYear(value.getYear())
            .setMonth(value.getMonth())
            .setDate(value.getDate());
        this.valueChange.emit(newValue);
    }

    private makeHeadWeekDays(): WeekDayLabel[] {
        const weekDays: WeekDayLabel[] = [];
        const start = this.value.calendarStart({ weekStartsOn: this.dateHelper.getFirstDayOfWeek() });
        for (let colIndex = 0; colIndex < DATE_COL_NUM; colIndex++) {
            const day = start.addDays(colIndex);
            weekDays[colIndex] = {
                short: this.dateHelper.format(day.nativeDate, this.dateHelper.relyOnDatePipe ? 'E' : 'ddd'), // eg. 周二
                veryShort: this.dateHelper.format(day.nativeDate, this.getVeryShortWeekFormat()) // eg. 二
            };
        }
        return weekDays;
    }

    private getVeryShortWeekFormat(): string {
        if (this.dateHelper.relyOnDatePipe) {
            return 'EEEEE'; // eg. 二
        }
        return 'dd';
    }

    private makeWeekRows(): WeekRow[] {
        const weekRows: WeekRow[] = [];
        const firstDayOfMonth = this.value.calendarStart({ weekStartsOn: this.dateHelper.getFirstDayOfWeek() });

        for (let week = 0; week < DATE_ROW_NUM; week++) {
            const weekStart = firstDayOfMonth.addDays(week * 7);
            const row: WeekRow = {
                isActive: false,
                isCurrent: false,
                dateCells: [],
                year: weekStart.getYear()
            };

            for (let day = 0; day < 7; day++) {
                const date = weekStart.addDays(day);
                const dateFormat = this.dateHelper.relyOnDatePipe ? 'longDate' : 'YYYY-MM-DD';
                const title = this.dateHelper.format(date.nativeDate, dateFormat);
                const label = this.dateHelper.format(date.nativeDate, this.dateHelper.relyOnDatePipe ? 'dd' : 'DD');

                const cell: DateCell = {
                    value: date.nativeDate,
                    label: label,
                    isSelected: false,
                    isDisabled: false,
                    isToday: false,
                    title: title,
                    dateCellRender: valueFunctionProp(this.dateCellRender, date),
                    content: `${date.getDate()}`,
                    onClick: () => this.changeValueFromInside(date),
                    // 暂时用不到鼠标事件的交互,在html这种删除了
                    onMouseEnter: () => this.dayHover.emit(date)
                };

                if (this.showWeek && !row.weekNum) {
                    row.weekNum = this.dateHelper.getISOWeek(date.nativeDate);
                }

                if (date.isToday()) {
                    cell.isToday = true;
                    row.isCurrent = true;
                }

                if (Array.isArray(this.selectedValue)) {
                    // Range selections
                    const rangeValue = this.hoverValue && this.hoverValue.length ? this.hoverValue : this.selectedValue;
                    const start = rangeValue[0];
                    const end = rangeValue[1];
                    if (start) {
                        if (start.isSameDay(date)) {
                            cell.isSelectedStartDate = true;
                            cell.isSelected = true;
                            row.isActive = true;
                        }
                        if (end) {
                            if (end.isSameDay(date)) {
                                cell.isSelectedEndDate = true;
                                cell.isSelected = true;
                                row.isActive = true;
                            } else if (date.isAfterDay(start) && date.isBeforeDay(end)) {
                                cell.isInRange = true;
                            }
                        }
                    }
                } else if (date.isSameDay(this.value)) {
                    cell.isSelected = true;
                    row.isActive = true;
                }

                if (this.disabledDate && this.disabledDate(date.nativeDate)) {
                    cell.isDisabled = true;
                }

                cell.classMap = {
                    [`${this.prefixCls}-cell`]: true,
                    [`${this.prefixCls}-today`]: cell.isToday,
                    [`${this.prefixCls}-last-month-cell`]: date.isBeforeMonth(this.value),
                    [`${this.prefixCls}-next-month-btn-day`]: date.isAfterMonth(this.value),
                    [`${this.prefixCls}-selected-day`]: cell.isSelected,
                    [`${this.prefixCls}-disabled-cell`]: cell.isDisabled,
                    [`${this.prefixCls}-selected-start-date`]: !!cell.isSelectedStartDate,
                    [`${this.prefixCls}-selected-end-date`]: !!cell.isSelectedEndDate,
                    [`${this.prefixCls}-in-range-cell`]: !!cell.isInRange
                };

                row.dateCells.push(cell);
            }

            row.classMap = {
                [`${this.prefixCls}-current-week`]: row.isCurrent,
                [`${this.prefixCls}-active-week`]: row.isActive
            };

            weekRows.push(row);
        }

        return weekRows;
    }

    trackByDateFn(_index: number, item: DateCell): string {
        return `${item.title}`;
    }

    trackByWeekFn(_index: number, item: WeekRow): string {
        return `${item.year}-${item.weekNum}`;
    }
}

export interface WeekDayLabel {
    short: string;
    veryShort: string;
}

export interface DateCell {
    value: Date;
    label: string;
    title: string;
    dateCellRender: TemplateRef<Date> | string;
    fullCellRender?: TemplateRef<Date> | string;
    content: string;
    isSelected?: boolean;
    isToday?: boolean;
    isDisabled?: boolean;
    isSelectedStartDate?: boolean;
    isSelectedEndDate?: boolean;
    isInRange?: boolean;
    classMap?: object;
    onClick(date: TinyDate): void;
    onMouseEnter(): void;
}

export interface WeekRow {
    isCurrent?: boolean; // Is the week that today stays in
    isActive?: boolean; // Is the week that current setting date stays in
    weekNum?: number;
    year?: number;
    classMap?: object;
    dateCells: DateCell[];
}
