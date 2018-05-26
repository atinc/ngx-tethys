import { isNumber, isDate, isObject } from '../util/helpers';
import { DatepickerValueShowTypesEnum } from './i.datepicker';

export function datepickerUtilIdentificationValueType(value: any): DatepickerValueShowTypesEnum {
    let res;
    if (isDate(value)) {
        res = DatepickerValueShowTypesEnum.dateObject;
    } else if (isObject(value) && value.hasOwnProperty('date')) {
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
            default:
                res = result;
        }
    } else if (isNumber(value)) {
        if (value.toString().length === 10) {
            res = DatepickerValueShowTypesEnum.dateTime;
        } else if (value.toString().length === 13) {
            res = DatepickerValueShowTypesEnum.dateTimeLong;
        } else {
            res = DatepickerValueShowTypesEnum.noType;
        }
    } else {
        res = DatepickerValueShowTypesEnum.noType;
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
        default:
            _value = {
                date: null,
                with_time: false
            };
            break;
    }
    return _value;
}
