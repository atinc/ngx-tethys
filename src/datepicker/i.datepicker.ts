export interface DatepickerValueEntry {
    date: Date | '' | number | any;
    with_time: boolean | number;
}

export interface DaterangepickerValueEntry {
    begin: {
        date: Date | '' | number | any;
        with_time: boolean | number;
    };
    end: {
        date: Date | '' | number | any;
        with_time: boolean | number;
    };
}

export interface DatepickerInitialState {
    value: DatepickerValueEntry;
    changeValue: Function;
}
// #region DatepickerValueShowTypesEnum
// dateRangTime
// {
//     begin: 1234567890,
//     end: 1234567890
// }
// daterangepickerObject
// {
//     begin: {
//          date: new Date(),
//          with_time: false,
//     },
//     end: {
//          date: new Date(),
//          with_time: false,
//     }
// }
// daterangepickerTimeObject
// {
//     begin: {
//          date: 1234567890,
//          with_time: false,
//     },
//     end: {
//          date: 1234567890,
//          with_time: false,
//     }
// }
// #endregion

export enum DatepickerValueShowTypesEnum {
    dateTime,
    dateTimeLong,
    dateObject,
    datepickerObject,
    datepickerTimeObject,
    datepickerTimeLongObject,
    datepickerNullValue,
    nullValue,
    daterangepickerObject,
    daterangepickerTimeObject,
    daterangepickerNullValue,
}


export enum DatepickerFormatRules {
    default = 'yyyy-MM-dd',
    short = 'yyyy-MM-dd',
    full = 'yyyy-MM-dd HH:mm',
}

