import { CompatibleDate, DateEntry, RangeEntry, instanceOfDateEntry, instanceOfRangeEntry } from './standard-types';

import { fromUnixTime } from 'date-fns';

export function transformDateValue(
    value: CompatibleDate | DateEntry | RangeEntry
): { value: CompatibleDate; withTime: boolean } {
    if (!value) {
        return { value: null, withTime: false };
    }
    let withTime = false;
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

export function convertDate(date: Date | number) {
    return typeof date === 'number' ? fromUnixTime(date) : date;
}
