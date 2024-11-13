export interface ThyI18nLocale {
    key: string;
    timePicker: ThyI18nTimePicker;
    datePicker: ThyI18nDatePicker;
    dateRange: ThyI18nDateRange;
    calendar: ThyI18nCalendar;
    select: ThyI18nSelect;
    treeSelect: ThyI18nTreeSelect;
    cascader: ThyI18nCascader;
    copy: ThyI18nCopy;
    guider: ThyI18nGuider;
    colorPicker: ThyI18nColorPicker;
    transfer: ThyI18nTransfer;
}

export interface ThyI18nTimePicker {
    placeholder: string;
    now: string;
    ok: string;
}

export interface ThyI18nDatePicker {
    yearText: string;
    yearFormat: string;
    previousYear: string;
    nextYear: string;

    quarterText: string;

    monthText: string;
    previousMonth: string;
    nextMonth: string;

    week: string;
    prefixWeek: string;
    weekFormat: string;

    advance: string;
    custom: string;

    setTime: string;
    selectDate: string;
    startDate: string;
    endDate: string;

    ok: string;
    clear: string;
}

export interface ThyI18nDateRange {
    thisQuarter: string;
    thisMonth: string;
    thisWeek: string;
    custom: string;
    lastTwoMonths: string;
    lastThreeMonths: string;
}

export interface ThyI18nCalendar {
    today: string;
}

export interface ThyI18nSelect {
    placeholder: string;
    empty: string;
}

export interface ThyI18nTreeSelect {
    placeholder: string;
    empty: string;
}

export interface ThyI18nCascader {
    placeholder: string;
    empty: string;
}

export interface ThyI18nCopy {
    tips: string;
    success: string;
    error: string;
}

export interface ThyI18nGuider {
    skip: string;
    prev: string;
    next: string;
    finish: string;
}

export interface ThyI18nColorPicker {
    defaultColor: string;
    noFillColor: string;
    recentUsedColor: string;
    customColor: string;
    none: string;
}

export interface ThyI18nTransfer {
    maxLimit: string;
    maxLockLimit: string;
    unlocked: string;
}
