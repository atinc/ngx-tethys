import {
    ThyDatepickerNextCalendarDate, DatepickerValueTypeEnum,
    DatepickerNextValueType,
    ExploreValueTypePipeInterface,
    CombineToTypeDPValueInterface,
    DatepickerNextValueInfo,
    ThyDatepickerNextInfo
} from './datepicker-next.interface';
import { isDate, isObject, isNumber } from '../util/helpers';

export function getCountMonthDays(date: Date) {
    const curDate = date || new Date();
    curDate.setMonth(curDate.getMonth() + 1);
    curDate.setDate(0);
    return curDate.getDate();
}

export function sliceArray(array: any, size: number) {
    const result = [];
    for (let x = 0; x < Math.ceil(array.length / size); x++) {
        const start = x * size;
        const end = start + size;
        result.push(array.slice(start, end));
    }
    return result;
}

export function calendarDateConvert(year: number, month: number, day?: number): ThyDatepickerNextCalendarDate {
    if (month < 0 || month >= 12 || day < 0 || day >= 28) {
        const date = new Date(year, month, day || 1);
        return { year: date.getFullYear(), month: date.getMonth(), day: date.getDate() };
    } else {
        return { year, month, day };
    }
}

export function getFullTimeText(value: number): string {
    if (value < 10) {
        return `0${value}`;
    }
    return value + '';
}

export function exploreValueTypePipe(value: DatepickerNextValueType): ExploreValueTypePipeInterface {
    return {
        type: exploreValueType(value),
        value: value
    };
}

export function exploreValueType(value: DatepickerNextValueType): DatepickerValueTypeEnum {
    let res;
    if (isDate(value)) {
        res = DatepickerValueTypeEnum.date;
    } else if (isObject(value)) {
        if (value.hasOwnProperty('date')) {
            const result = exploreValueType((value as any).date);
            switch (result) {
                case DatepickerValueTypeEnum.timestamp:
                    res = DatepickerValueTypeEnum.objectTimestamp;
                    break;
                case DatepickerValueTypeEnum.timestampLong:
                    res = DatepickerValueTypeEnum.objectTimestampLong;
                    break;
                case DatepickerValueTypeEnum.date:
                    res = DatepickerValueTypeEnum.objectDate;
                    break;
                case DatepickerValueTypeEnum.empty:
                    res = DatepickerValueTypeEnum.objectEmpty;
                    break;
            }
        } else {
            res = DatepickerValueTypeEnum.objectEmpty;
        }
    } else if (isNumber(value)) {
        if (value.toString().length === 10) {
            res = DatepickerValueTypeEnum.timestamp;
        } else if (value.toString().length === 13) {
            res = DatepickerValueTypeEnum.timestampLong;
        } else {
            res = DatepickerValueTypeEnum.empty;
        }
    } else {
        res = DatepickerValueTypeEnum.empty;
    }
    return res;
}

export function combineToTypeDPValue(data: ExploreValueTypePipeInterface): CombineToTypeDPValueInterface {
    const _value: ThyDatepickerNextInfo = {};
    let _date;
    let _withTime: any = false;
    switch (data.type) {
        case DatepickerValueTypeEnum.objectTimestamp:
            _date = new Date(data.value.date as number * 1000);
            _withTime = data.value.with_time;
            break;
        case DatepickerValueTypeEnum.objectTimestampLong:
            _date = new Date((data.value as any).date);
            _withTime = data.value.with_time;
            break;
        case DatepickerValueTypeEnum.objectDate:
            _date = (data.value as any).date;
            _withTime = data.value.with_time;
            break;
        case DatepickerValueTypeEnum.timestamp:
            _date = new Date((data as any).date * 1000);
            break;
        case DatepickerValueTypeEnum.timestampLong:
            _date = new Date((data as any).date);
            break;
        case DatepickerValueTypeEnum.date:
            _date = (data as any).date;
            break;
        default:
            _date = new Date();
            break;
    }
    _value.year = _date.getFullYear();
    _value.month = _date.getMonth();
    _value.day = _date.getDate();
    if (_withTime) {
        _value.hour = _date.getHours();
        _value.minute = _date.getMinutes();
    }
    return {
        type: data.type,
        value: _value,
    };
}
