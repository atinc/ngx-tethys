import { CompatibleDate, DateEntry, ThyDateRangeEntry, ThyPanelMode, ThyDateGranularity, ThyShortcutValue } from './standard-types';

import { fromUnixTime } from 'date-fns';
import { helpers, TinyDate } from 'ngx-tethys/util';
import { CompatibleValue, RangeAdvancedValue } from './inner-types';

export function transformDateValue(value: CompatibleDate | CompatibleValue | number | DateEntry | ThyDateRangeEntry | RangeAdvancedValue): {
    value: CompatibleDate;
    withTime?: boolean;
    flexibleDateGranularity?: ThyDateGranularity;
} {
    if (!value) {
        return { value: null };
    }
    let withTime, flexibleDateGranularity: ThyDateGranularity;
    if (value && typeof value === 'number') {
        value = convertDate(value);
    }
    if (value && instanceOfCompatibleValue(value as CompatibleValue)) {
        if (value instanceof TinyDate) {
            value = convertDate(value.nativeDate);
        } else {
            value[0] = convertDate(value[0].nativeDate);
            value[1] = convertDate(value[1].nativeDate);
        }
    }
    if (value && instanceOfDateEntry(value as DateEntry)) {
        const { date, with_time } = value as DateEntry;
        value = date ? convertDate(date) : null;
        withTime = !!with_time;
    }
    if (value && instanceOfRangeEntry(value as ThyDateRangeEntry)) {
        const rangeValue = value as ThyDateRangeEntry;
        value = [];
        if (rangeValue.begin && rangeValue.end) {
            value[0] = convertDate(rangeValue.begin);
            value[1] = convertDate(rangeValue.end);
        }
        if (rangeValue.granularity) {
            flexibleDateGranularity = rangeValue.granularity;
        }
    }

    if (value && instanceOfRangeAdvancedValue(value as RangeAdvancedValue)) {
        const rangeValue = value as RangeAdvancedValue;
        if (rangeValue.dateGranularity) {
            flexibleDateGranularity = rangeValue.dateGranularity;
        }
        value = [];
        if (rangeValue.begin && rangeValue.end) {
            value[0] = convertDate(rangeValue.begin.nativeDate);
            value[1] = convertDate(rangeValue.end.nativeDate);
        }
    }
    return { value: value as CompatibleDate, withTime, flexibleDateGranularity };
}

export function getFlexibleAdvancedReadableValue(tinyDates: TinyDate[], flexibleDateGranularity: ThyDateGranularity) {
    let value = '';
    if (!tinyDates[0] || !tinyDates[1]) {
        return value;
    }
    switch (flexibleDateGranularity) {
        case 'year':
            if (tinyDates[0].isSameYear(tinyDates[1])) {
                value = `${tinyDates[0].getYear()}年`;
            } else {
                value = `${tinyDates[0].getYear()}年 ～ ${tinyDates[1].getYear()}年`;
            }
            break;
        case 'quarter':
            if (tinyDates[0].isSameQuarter(tinyDates[1])) {
                value = `${tinyDates[0].getYear()}年 Q${tinyDates[0].getQuarter()}`;
            } else {
                value = `${tinyDates[0].getYear()}年 Q${tinyDates[0].getQuarter()} ~ ${tinyDates[1].getYear()}年 Q${tinyDates[1].getQuarter()}`;
            }
            break;
        case 'month':
            if (tinyDates[0].isSameMonth(tinyDates[1])) {
                value = `${tinyDates[0].getYear()}年 ${tinyDates[0].getMonth() + 1}月`;
            } else {
                value = `${tinyDates[0].getYear()}年 ${tinyDates[0].getMonth() + 1}月 ~ ${tinyDates[1].getYear()}年 ${
                    tinyDates[1].getMonth() + 1
                }月`;
            }
            break;
    }
    return value;
}

export function convertDate(date: Date | number): Date {
    if (typeof date === 'number') {
        if (date.toString().length < 13) {
            return fromUnixTime(date);
        } else {
            return new Date(date);
        }
    } else {
        return date;
    }
}

export function hasValue(value: CompatibleValue): boolean {
    if (Array.isArray(value)) {
        return !!value[0] && !!value[1];
    } else {
        return !!value;
    }
}

export function makeValue(value: CompatibleDate | null, isRange: boolean = false): CompatibleValue {
    if (isRange) {
        return value ? (value as Date[]).map(val => new TinyDate(val)) : [];
    } else {
        return value ? new TinyDate(value as Date) : null;
    }
}

export function dateAddAmount(value: TinyDate, amount: number, mode: ThyPanelMode): TinyDate {
    let date: TinyDate;
    switch (mode) {
        case 'decade':
            date = value.addYears(amount * 10);
            break;
        case 'year':
            date = value.addYears(amount);
            break;
        case 'month':
            date = value.addMonths(amount);
            break;
        default:
            date = value.addMonths(amount);
            break;
    }
    return date;
}

// rightDate 超过 leftDate 一个月
export function isAfterMoreThanOneMonth(rightDate: TinyDate, leftDate: TinyDate) {
    rightDate = rightDate ? rightDate : leftDate ? leftDate : new TinyDate();
    leftDate = leftDate ? leftDate : rightDate;
    if (rightDate.getYear() < leftDate.getYear()) {
        return false;
    }

    if (rightDate.getYear() === leftDate.getYear() && leftDate.getMonth() + 1 >= rightDate.getMonth()) {
        return false;
    }

    // 处理rightDate(2020,1,1) 为leftDate(2020,12,1)后一年1月,同时leftDate日期为12月的特殊情况
    return !(rightDate.getYear() - leftDate.getYear() === 1 && rightDate.getMonth() === 0 && leftDate.getMonth() === 11);
}

// rightDate 超过 leftDate 不到一年
export function isAfterMoreThanLessOneYear(rightDate: TinyDate, leftDate: TinyDate) {
    rightDate = rightDate ? rightDate : leftDate ? leftDate : new TinyDate();
    leftDate = leftDate ? leftDate : rightDate;
    if (rightDate.getYear() <= leftDate.getYear()) {
        return false;
    }
    // 处理rightDate(2021,1,1)日期比leftDate(2020,12,1)日期大1年,同时rightDate日期月份小于leftDate日期月份的情况
    return !(rightDate.getYear() - leftDate.getYear() === 1 && rightDate.getMonth() <= leftDate.getMonth());
}

// rightDate 超过 leftDate 一年
export function isAfterMoreThanOneYear(rightDate: TinyDate, leftDate: TinyDate) {
    rightDate = rightDate ? rightDate : leftDate ? leftDate : new TinyDate();
    leftDate = leftDate ? leftDate : rightDate;
    if (leftDate.getYear() + 1 >= rightDate.getYear()) {
        return false;
    } else {
        return true;
    }
}

export function isAfterMoreThanOneDecade(rightDate: TinyDate, leftDate: TinyDate) {
    rightDate = rightDate ? rightDate : leftDate ? leftDate : new TinyDate();
    leftDate = leftDate ? leftDate : rightDate;
    return rightDate.getYear() - leftDate.getYear() >= 20;
}

export function instanceOfDateEntry(object: DateEntry): object is DateEntry {
    return isSupportDateType(object, 'date') && typeof object.with_time === 'number';
}

export function instanceOfRangeEntry(object: ThyDateRangeEntry): object is ThyDateRangeEntry {
    return isSupportDateType(object, 'begin') && isSupportDateType(object, 'end');
}

export function instanceOfCompatibleValue(object: CompatibleValue): object is CompatibleValue {
    return object instanceof TinyDate || object[0] instanceof TinyDate;
}

export function instanceOfRangeAdvancedValue(object: RangeAdvancedValue): object is RangeAdvancedValue {
    return object['begin'] instanceof TinyDate && object['end'] instanceof TinyDate;
}

export function isSupportDateType(object: DateEntry | ThyDateRangeEntry, key: string) {
    return typeof object[key] === 'number' || object[key] === null || object[key] instanceof Date;
}

export function getShortCutValue(value: ThyShortcutValue): number | Date {
    return helpers.isFunction(value) ? value() : value;
}
