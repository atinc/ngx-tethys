import { isNumber, isDate, isObject } from '../util/helpers';
import { DatepickerValueShowTypesEnum } from './i.datepicker';

export function datepickerUtilIdentificationValueType(value: any): DatepickerValueShowTypesEnum {
    let res;
    if (isDate(value)) {
        res = DatepickerValueShowTypesEnum.dateObject;
    } else if (isObject(value)) {
        if (value.hasOwnProperty('date')) {
            const result = datepickerUtilIdentificationValueType(value.date);
            switch (result) {
                case DatepickerValueShowTypesEnum.dateObject:
                    res = DatepickerValueShowTypesEnum.datepickerObject;
                    break;
                case DatepickerValueShowTypesEnum.dateTime:
                    res = DatepickerValueShowTypesEnum.datepickerTimeObject;
                    break;
                case DatepickerValueShowTypesEnum.dateTimeLong:
                    res = DatepickerValueShowTypesEnum.datepickerTimeLongObject;
                    break;
                case DatepickerValueShowTypesEnum.nullValue:
                    res = DatepickerValueShowTypesEnum.datepickerNullValue;
                    break;
                default:
                    res = result;
            }
        } else {
            res = DatepickerValueShowTypesEnum.datepickerNullValue;
        }
    } else if (isNumber(value)) {
        if (value.toString().length <= 10) {
            res = DatepickerValueShowTypesEnum.dateTime;
        } else if (value.toString().length === 13) {
            res = DatepickerValueShowTypesEnum.dateTimeLong;
        } else {
            res = DatepickerValueShowTypesEnum.nullValue;
        }
    } else {
        res = DatepickerValueShowTypesEnum.nullValue;
    }
    return res;
}

export function datepickerUtilConvertToDatepickerObject(value: any, valueType?: DatepickerValueShowTypesEnum) {
    const _valueType = valueType || datepickerUtilIdentificationValueType(value);
    let _value;
    switch (_valueType) {
        case DatepickerValueShowTypesEnum.dateTime:
            _value = {
                date: new Date(value * 1000),
                with_time: value.with_time
            };
            break;
        case DatepickerValueShowTypesEnum.dateTimeLong:
            _value = {
                date: new Date(value),
                with_time: value.with_time
            };
            break;
        case DatepickerValueShowTypesEnum.datepickerTimeObject:
            _value = {
                date: new Date(value.date * 1000),
                with_time: value.with_time
            };
            break;
        case DatepickerValueShowTypesEnum.datepickerObject:
            _value = {
                date: value.date,
                with_time: value.with_time
            };
            break;
        case DatepickerValueShowTypesEnum.datepickerNullValue:
            _value = {
                date: value.date,
                with_time: value.with_time
            };
            break;
        case DatepickerValueShowTypesEnum.nullValue:
            _value = {
                date: value,
                with_time: false
            };
            break;
        default:
            _value = {
                date: null,
                with_time: false
            };
            break;
    }
    return _value;
}

export function daterangepickerUtilIdentificationValueType(value: any): DatepickerValueShowTypesEnum {
    if (value) {
        if (isObject(value.begin) && value.begin.hasOwnProperty('date')) {
            if (value.begin.date) {
                return DatepickerValueShowTypesEnum.daterangepickerTimeObject;
            } else {
                return DatepickerValueShowTypesEnum.daterangepickerNullValueObject;
            }
        } else if (isNumber(value.begin)) {
            return DatepickerValueShowTypesEnum.daterangepickerTime;
        } else {
            return DatepickerValueShowTypesEnum.daterangepickerNullValue;
        }
    } else {
        return DatepickerValueShowTypesEnum.daterangepickerNullValue;
    }
}

export function daterangepickerUtilConvertToDaterangepickerObject(value: any, valueType?: DatepickerValueShowTypesEnum) {
    const _valueType = valueType || daterangepickerUtilIdentificationValueType(value);
    let _value: any;
    switch (_valueType) {
        case DatepickerValueShowTypesEnum.daterangepickerTime:
            _value = [new Date(value.begin * 1000), new Date(value.end * 1000)];
            break;
        case DatepickerValueShowTypesEnum.daterangepickerTimeObject:
            _value = [new Date(value.begin.date * 1000), new Date(value.end.date * 1000)];
            break;
        case DatepickerValueShowTypesEnum.daterangepickerNullValueObject:
            _value = [];
            break;
        case DatepickerValueShowTypesEnum.daterangepickerNullValue:
            _value = [];
            break;
        default:
            console.error('Can not matched value type!');
            break;
    }
    return _value;
}

export class DatepickerUtil {
    constructor() {}
}
