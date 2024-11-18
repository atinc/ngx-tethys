export type ThyModuleType = 'datePicker' | 'calendar' | 'transfer' | 'guider';

export interface ThyI18nLocale {
    id: string;
    datePicker: ThyDatePickerLocale;
    calendar: ThyCalendarLocale;
    transfer: ThyTransferLocale;
    guider: ThyGuiderLocale;
}

export interface ThyDatePickerLocale {
    yearFormat: string;
    monthFormat: string;
    zhMonthFormat: string;
    weekFormat: string;
    fullWeekFormat: string;
    weekThFormat: string;
    dateFormat: string;
}

export interface ThyCalendarLocale {
    today: string;
    yearMonthFormat: string;
}

export interface ThyTransferLocale {
    maxLimit: string;
    maxLockLimit: string;
    unlocked: string;
}

export interface ThyGuiderLocale {
    skip: string;
    prev: string;
    next: string;
    finish: string;
}
