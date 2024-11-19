export type ThyModuleType =
    | 'datePicker'
    | 'dateRange'
    | 'timePicker'
    | 'calendar'
    | 'transfer'
    | 'colorPicker'
    | 'strength'
    | 'guider'
    | 'copy'
    | 'select'
    | 'treeSelect'
    | 'cascader'
    | 'pagination'
    | 'form';

export type ThyModuleLocaleType<K extends ThyModuleType> = ThyI18nLocale[K];

export interface ThyI18nLocale {
    id: string;
    datePicker: ThyDatePickerLocale;
    dateRange: ThyDateRangeLocale;
    timePicker: ThyTimePickerLocale;
    calendar: ThyCalendarLocale;
    transfer: ThyTransferLocale;
    colorPicker: ThyColorPickerLocale;
    strength: ThyStrengthLocale;
    guider: ThyGuiderLocale;
    copy: ThyCopyLocale;
    select: ThySelectLocale;
    treeSelect: ThyTreeSelectLocale;
    cascader: ThyCascaderLocale;
    pagination: ThyPaginationLocale;
    form: ThyFormLocale;
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

export interface ThyDateRangeLocale {
    custom: string;
    currentWeek: string;
    currentMonth: string;
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

export interface ThySelectLocale {
    placeholder: string;
    empty: string;
}

export interface ThyTreeSelectLocale {
    placeholder: string;
    empty: string;
}

export interface ThyCascaderLocale {
    placeholder: string;
    empty: string;
}

export interface ThyPaginationLocale {
    page: string;
    total: string;
    totalCount: string;
    jumpTo: string;
    firstPage: string;
    lastPage: string;
    defaultUnit: string;
}

export interface ThyFormLocale {
    required: string;
    maxlength: string;
    minlength: string;
    uniqueCheck: string;
    email: string;
    confirm: string;
    pattern: string;
    number: string;
    url: string;
    max: string;
    min: string;
}
