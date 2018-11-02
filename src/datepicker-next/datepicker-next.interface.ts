
export enum DatepickerNextValueChangeTypeEnum {
    ok = 'ok',
    clear = 'clear',
}

export enum DatepickerNextCalendarViewModeEnum {
    day = 'day',
    month = 'month',
    year = 'year',
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
    clean = 'clean',
}

type ThyDatepickerNextValueType = '';
