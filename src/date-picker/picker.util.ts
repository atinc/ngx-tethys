import { Signal } from '@angular/core';
import { ThyI18nLocale, ThyLocaleType } from 'ngx-tethys/i18n';
import { SafeAny } from 'ngx-tethys/types';
import { coerceArray, helpers, TinyDate } from 'ngx-tethys/util';
import { CompatibleValue, RangeAdvancedValue } from './inner-types';
import { CompatibleDate, DateEntry, ThyDateGranularity, ThyDateRangeEntry, ThyPanelMode, ThyShortcutValue } from './standard-types';

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

export function getFlexibleAdvancedReadableValue(
    tinyDates: TinyDate[],
    flexibleDateGranularity: ThyDateGranularity,
    separator: string,
    locale: Signal<ThyI18nLocale>
) {
    let value = '';
    if (!tinyDates[0] || !tinyDates[1]) {
        return value;
    }
    switch (flexibleDateGranularity) {
        case 'year':
            const yearFormatStr = locale()?.id === ThyLocaleType.zhHans ? `yyyy年` : `yyyy`;
            if (tinyDates[0].isSameYear(tinyDates[1])) {
                value = `${tinyDates[0].format(yearFormatStr)}`;
            } else {
                value = `${tinyDates[0].format(yearFormatStr)}${separator}${tinyDates[1].format(yearFormatStr)}`;
            }
            break;
        case 'quarter':
            const quarterFormatStr = locale()?.id === ThyLocaleType.zhHans ? `yyyy年 qqq` : `yyyy-qqq`;
            if (tinyDates[0].isSameQuarter(tinyDates[1])) {
                value = `${tinyDates[0].format(quarterFormatStr)}`;
            } else {
                value = `${tinyDates[0].format(quarterFormatStr)}${separator}${tinyDates[1].format(quarterFormatStr)}`;
            }
            break;
        case 'month':
            const monthFormatStr = locale()?.id === ThyLocaleType.zhHans ? `yyyy年 MM月` : `yyyy-MM`;
            if (tinyDates[0].isSameMonth(tinyDates[1])) {
                value = `${tinyDates[0].format(monthFormatStr)}`;
            } else {
                value = `${tinyDates[0].format(monthFormatStr)}${separator}${tinyDates[1].format(monthFormatStr)}`;
            }
            break;
    }
    return value;
}

export function convertDate(date: Date | number | TinyDate): Date {
    if (typeof date === 'number') {
        if (date.toString().length < 13) {
            return TinyDate.fromUnixTime(date)?.nativeDate;
        } else {
            return new TinyDate(date)?.nativeDate;
        }
    } else if (date instanceof TinyDate) {
        return date?.nativeDate;
    } else {
        return new TinyDate(date)?.nativeDate;
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
        return Array.isArray(value) ? (value as Date[]).map(val => new TinyDate(val)) : [];
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

export function getShortcutValue(value: ThyShortcutValue): number | Date {
    return helpers.isFunction(value) ? value() : value;
}

export function isValidStringDate(dateStr: string): boolean {
    const parseDate = parseStringDate(dateStr).nativeDate.getTime();
    return !(parseDate < 0 || isNaN(parseDate));
}

export function parseStringDate(dateStr: string): TinyDate {
    return hasTimeInStringDate(dateStr) ? new TinyDate(fixStringDate(dateStr)) : new TinyDate(fixStringDate(dateStr)).startOfDay();
}

export function hasTimeInStringDate(dateStr: string): boolean {
    const formatDate = fixStringDate(dateStr);
    const timeRegex = /(\d{1,2}:\d{1,2}(:\d{1,2})?)|(^\d{1,2}时\d{1,2}分(\d{1,2}秒)?)$/;
    return timeRegex.test(formatDate);
}

function fixStringDate(dateStr: string) {
    let replacedStr = dateStr.replace(/[^0-9\s.,:]/g, '-').replace('- ', ' ');
    const hasYear = /\d{4}/.test(replacedStr);
    if (!hasYear || replacedStr.length < 'yyyy.M.d'.length) {
        replacedStr = `${new TinyDate().getYear()}-${replacedStr}`;
    }
    return replacedStr;
}

export function setValueByTimestampPrecision(
    date: CompatibleDate | number | Date | DateEntry | ThyDateRangeEntry | SafeAny,
    isRange: boolean,
    timestampPrecision: 'seconds' | 'milliseconds'
): number | number[] {
    const { value } = transformDateValue(date);
    if (!value || (helpers.isArray(value) && !value?.length)) {
        return helpers.isArray(value) ? [null, null] : null;
    }
    if (timestampPrecision === 'milliseconds') {
        return isRange ? coerceArray(value).map(val => new TinyDate(val).getTime()) : new TinyDate(value as Date).getTime();
    } else {
        return isRange ? coerceArray(value).map(val => new TinyDate(val).getUnixTime()) : new TinyDate(value as Date)?.getUnixTime();
    }
}
