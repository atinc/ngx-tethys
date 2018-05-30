export interface DatepickerValueEntry {
    date: Date | '' | number | any;
    with_time: boolean | number;
}

export interface DatepickerInitialState {
    value: DatepickerValueEntry;
    changeValue: Function;
}

export enum DatepickerValueShowTypesEnum {
    dateTime,
    dateTimeLong,
    dateObject,
    datepickerObject,
    datepickerTimeObject,
    datepickerTimeLongObject,
    datepickerNullValue,
    nullValue
}

