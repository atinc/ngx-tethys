export interface DatepickerValueEntry {
    date: Date | '' | number | any;
    with_time: boolean;
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
    noType
}

