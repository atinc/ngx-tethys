export type DatepickerNextValueType =
    | DatepickerNextValueInfo
    | Date
    | number
    | any;

export class DatepickerNextViewFeatureConfig {
    shortcut?: boolean;
    time?: boolean;
    timeComponentType?: DatepickerNextTimeModeType;
    operation?: boolean;
}

export enum DatepickerNextTimeModeType {
    simply = 'simply',
    accurate = 'accurate'
}

export enum DatepickerNextValueChangeTypeEnum {
    ok = 'ok',
    clear = 'clear'
}

export enum DatepickerNextCalendarViewModeEnum {
    day = 'day',
    month = 'month',
    year = 'year'
}

export interface ThyDatepickerNextCalendarDate {
    year?: number;
    month?: number;
    day?: number;
}

export interface ThyDatepickerNextTimeInfo {
    hour?: number;
    minute?: number;
}

export interface ThyDatepickerNextInfo {
    year?: number;
    month?: number;
    day?: number;
    hour?: number;
    minute?: number;
}

export enum ThyDatepickerNextEventsEnum {
    done = 'done',
    calendarDone = 'calendarDone',
    shortcutDone = 'shortcutDone',
    clean = 'clean'
}

export interface DatepickerNextValueInfo {
    date: number | Date;
    with_time: boolean | 1 | 0;
}

export interface DatepickerNextRangeNextValueInfo {
    begin: DatepickerNextValueType;
    end: DatepickerNextValueType;
}

export enum DatepickerValueTypeEnum {
    objectTimestamp,
    objectTimestampLong,
    objectDate,
    objectEmpty,
    timestamp,
    timestampLong,
    date,
    empty
}

export enum DatepickerFormatRules {
    default = 'yyyy-MM-dd',
    short = 'yyyy-MM-dd',
    full = 'yyyy-MM-dd HH:mm'
}

export interface ValueInRxPipeInterface {
    value: DatepickerNextValueType;
    type?: DatepickerValueTypeEnum;
}

export interface ValueOutRxPipeInterface {
    value: ThyDatepickerNextInfo;
    originType?: DatepickerValueTypeEnum;
}

export interface DatepickerNextDisableRules {
    '<'?: number;
    '='?: number | number[];
    '>'?: number;
    fn?: Function;
}
