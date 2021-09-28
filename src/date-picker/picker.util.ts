import {
    CompatibleDate,
    DateEntry,
    RangeEntry,
    instanceOfDateEntry,
    instanceOfRangeEntry,
    CompatibleValue,
    PanelMode
} from './standard-types';

import { fromUnixTime } from 'date-fns';
import { helpers, TinyDate } from 'ngx-tethys/util';

export function transformDateValue(value: CompatibleDate | number | DateEntry | RangeEntry): { value: CompatibleDate; withTime?: boolean } {
    if (!value) {
        return { value: null };
    }
    let withTime;
    if (value && typeof value === 'number') {
        value = convertDate(value);
    }
    if (value && instanceOfDateEntry(value as DateEntry)) {
        const { date, with_time } = value as DateEntry;
        value = date ? convertDate(date) : null;
        withTime = !!with_time;
    }
    if (value && instanceOfRangeEntry(value as RangeEntry)) {
        const rangeValue = value as RangeEntry;
        value = [];
        if (rangeValue.begin && rangeValue.end) {
            value[0] = convertDate(rangeValue.begin);
            value[1] = convertDate(rangeValue.end);
        }
    }
    return { value: value as CompatibleDate, withTime };
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

export function dateAddAmount(value: TinyDate, amount: number, mode: PanelMode): TinyDate {
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
