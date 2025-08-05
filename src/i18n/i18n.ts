export type ThyModuleType =
    | 'datePicker'
    | 'layout'
    | 'dateRange'
    | 'timePicker'
    | 'calendar'
    | 'autocomplete'
    | 'transfer'
    | 'colorPicker'
    | 'strength'
    | 'guider'
    | 'copy'
    | 'nav'
    | 'dialog'
    | 'select'
    | 'treeSelect'
    | 'cascader'
    | 'pagination'
    | 'form'
    | 'empty'
    | 'image';

export type ThyModuleLocaleType<K extends ThyModuleType> = ThyI18nLocale[K];

export enum ThyLocaleType {
    zhHans = 'zh-hans',
    zhHant = 'zh-hant',
    enUs = 'en-us',
    jaJp = 'ja-jp',
    deDe = 'de-de'
}

export interface ThyI18nLocale {
    id: ThyLocaleType;
    layout: ThyLayoutLocale;
    datePicker: ThyDatePickerLocale;
    dateRange: ThyDateRangeLocale;
    timePicker: ThyTimePickerLocale;
    calendar: ThyCalendarLocale;
    autocomplete: ThyAutoCompleteLocale;
    transfer: ThyTransferLocale;
    colorPicker: ThyColorPickerLocale;
    strength: ThyStrengthLocale;
    guider: ThyGuiderLocale;
    copy: ThyCopyLocale;
    nav: ThyNavLocale;
    dialog: ThyDialogLocale;
    select: ThySelectLocale;
    treeSelect: ThyTreeSelectLocale;
    cascader: ThyCascaderLocale;
    pagination: ThyPaginationLocale;
    form: ThyFormLocale;
    empty: ThyEmptyLocale;
    image: ThyImageLocale;
}

export interface ThyLayoutLocale {
    collapse: string;
    expand: string;
}

export interface ThyDatePickerLocale {
    yearFormat: string;
    monthFormat: string;
    weekFormat: string;
    fullWeekFormat: string;
    weekThFormat: string;
    dateFormat: string;

    yearText: string;
    quarterText: string;
    monthText: string;
    week: string;
    prefixWeek: string;

    previousYear: string;
    nextYear: string;
    previousMonth: string;
    nextMonth: string;

    today: string;
    tomorrow: string;
    nextWeek: string;
    lastSevenDays: string;
    lastThirtyDays: string;
    currentMonth: string;
    currentWeek: string;

    advance: string;
    custom: string;

    startDate: string;
    endDate: string;

    setTime: string;
    placeholder: string;

    ok: string;
    clear: string;
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

export interface ThyAutoCompleteLocale {
    empty: string;
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

export interface ThyNavLocale {
    more: string;
}

export interface ThyDialogLocale {
    title: string;
    ok: string;
    cancel: string;
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
    order: string;
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

export interface ThyEmptyLocale {
    noDataText: string;
}

export interface ThyImageLocale {
    zoomOut: string;
    zoomIn: string;
    originalSize: string;
    fitToScreen: string;
    fullScreen: string;
    spin: string;
    download: string;
    viewOriginal: string;
    copyLink: string;
    exitPreview: string;
    exitFullScreen: string;
    copySuccess: string;
    copyError: string;
    prev: string;
    next: string;
}
