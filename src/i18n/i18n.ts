export type ThyModuleType = 'datePicker' | 'timePicker' | 'calendar' | 'transfer' | 'colorPicker' | 'strength' | 'guider' | 'copy';

export type ThyModuleLocaleType<K extends ThyModuleType> = ThyI18nLocale[K];

export interface ThyI18nLocale {
    id: string;
    datePicker: ThyDatePickerLocale;
    timePicker: ThyTimePickerLocale;
    calendar: ThyCalendarLocale;
    transfer: ThyTransferLocale;
    colorPicker: ThyColorPickerLocale;
    strength: ThyStrengthLocale;
    guider: ThyGuiderLocale;
    copy: ThyCopyLocale;
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

export interface ThyTimePickerLocale {
    placeholder: string;
    now: string;
    ok: string;
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

export interface ThyColorPickerLocale {
    defaultColor: string;
    noFillColor: string;
    recentUsedColor: string;
    customColor: string;
    none: string;
}

export interface ThyStrengthLocale {
    highest: string;
    high: string;
    medium: string;
    low: string;
}

export interface ThyGuiderLocale {
    skip: string;
    prev: string;
    next: string;
    finish: string;
}

export interface ThyCopyLocale {
    tips: string;
    success: string;
    error: string;
}
