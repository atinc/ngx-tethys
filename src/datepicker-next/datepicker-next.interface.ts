
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
