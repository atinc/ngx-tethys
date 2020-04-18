import {
    CompatibleDate,
    DateEntry,
    RangeEntry,
    instanceOfDateEntry,
    instanceOfRangeEntry,
    CompatibleValue
} from './standard-types';

import { fromUnixTime } from 'date-fns';
import { TinyDate } from '../util/tiny-date';

export function transformDateValue(
    value: CompatibleDate | number | DateEntry | RangeEntry
): { value: CompatibleDate; withTime: boolean } {
    if (!value) {
        return { value: null, withTime: false };
    }
    let withTime = false;
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
