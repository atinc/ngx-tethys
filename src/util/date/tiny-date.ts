import {
    differenceInCalendarDays,
    differenceInCalendarMonths,
    differenceInCalendarYears,
    differenceInCalendarQuarters,
    differenceInWeeks,
    differenceInHours,
    differenceInMinutes,
    differenceInSeconds,
    isSameDay,
    isSameHour,
    isSameMinute,
    isSameMonth,
    isSameSecond,
    isSameYear,
    isSameQuarter,
    isToday,
    isTomorrow,
    isValid,
    setYear,
    startOfMonth,
    startOfWeek,
    addMonths,
    addYears,
    setDay,
    setMonth,
    setQuarter,
    getUnixTime,
    startOfDay,
    endOfDay,
    fromUnixTime,
    isWeekend,
    getWeek,
    getDaysInMonth,
    addSeconds,
    addMinutes,
    addHours,
    addWeeks,
    addQuarters,
    startOfQuarter,
    startOfYear,
    endOfWeek,
    endOfMonth,
    endOfQuarter,
    endOfYear,
    format,
    getQuarter,
    addDays
} from './functions';

import { Locale } from 'date-fns';

export type TinyDateCompareGrain = 'decade' | 'year' | 'quarter' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'second';

export type WeekDayIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type TinyDateType = TinyDate | Date | null;

export function sortRangeValue(rangeValue: TinyDate[]): TinyDate[] {
    if (Array.isArray(rangeValue)) {
        const [start, end] = rangeValue;
        return start && end && start.isAfterSecond(end) ? [end, start] : [start, end];
    }
    return rangeValue;
}

export class TinyDate implements Record<string, any> {
    nativeDate: Date;

    constructor(date?: Date | string | number) {
        if (date) {
            if (date instanceof Date) {
                this.nativeDate = date;
            } else if (typeof date === 'string' || typeof date === 'number') {
                this.nativeDate = new Date(date);
            } else if (typeof ngDevMode === 'undefined' || ngDevMode) {
                throw new Error(
                    `The input date type is not supported expect Date | string | number | { date: number; with_time: 0 | 1}, actual ${JSON.stringify(
                        date
                    )}`
                );
            }
        } else {
            this.nativeDate = new Date();
        }
    }

    static fromUnixTime(unixTime: number): TinyDate {
        return new TinyDate(fromUnixTime(unixTime));
    }

    // get
    getTime(): number {
        return this.nativeDate.getTime();
    }

    getDate(): number {
        return this.nativeDate.getDate();
    }

    getYear(): number {
        return this.nativeDate.getFullYear();
    }

    getQuarter(): number {
        return getQuarter(this.nativeDate);
    }

    getMonth(): number {
        return this.nativeDate.getMonth();
    }

    getWeek(options: { locale?: Locale; weekStartsOn?: WeekDayIndex } = { weekStartsOn: 1 }): number {
        return getWeek(this.nativeDate, options);
    }

    getDay(): number {
        return this.nativeDate.getDay();
    }

    getHours(): number {
        return this.nativeDate.getHours();
    }

    getMinutes(): number {
        return this.nativeDate.getMinutes();
    }

    getSeconds(): number {
        return this.nativeDate.getSeconds();
    }

    getMilliseconds(): number {
        return this.nativeDate.getMilliseconds();
    }

    getDaysInMonth() {
        return getDaysInMonth(this.nativeDate);
    }

    getDaysInQuarter() {
        return differenceInCalendarDays(this.endOfQuarter().addSeconds(1).nativeDate, this.startOfQuarter().nativeDate);
    }

    // set
    setDate(amount: number): TinyDate {
        const date = new Date(this.nativeDate);
        date.setDate(amount);
        return new TinyDate(date);
    }

    setHms(hour: number, minute: number, second: number): TinyDate {
        const date = new Date(this.nativeDate);
        date.setHours(hour, minute, second);
        return new TinyDate(date);
    }

    setYear(year: number): TinyDate {
        return new TinyDate(setYear(this.nativeDate, year));
    }

    setMonth(month: number): TinyDate {
        return new TinyDate(setMonth(this.nativeDate, month));
    }

    setQuarter(quarter: number) {
        return new TinyDate(setQuarter(this.nativeDate, quarter));
    }

    setDay(day: number, options?: { weekStartsOn: WeekDayIndex }): TinyDate {
        return new TinyDate(setDay(this.nativeDate, day, options));
    }

    // add
    addYears(amount: number): TinyDate {
        return new TinyDate(addYears(this.nativeDate, amount));
    }

    addQuarters(amount: number): TinyDate {
        return new TinyDate(addQuarters(this.nativeDate, amount));
    }

    addMonths(amount: number): TinyDate {
        return new TinyDate(addMonths(this.nativeDate, amount));
    }

    addWeeks(amount: number): TinyDate {
        return new TinyDate(addWeeks(this.nativeDate, amount));
    }

    addDays(amount: number): TinyDate {
        return new TinyDate(addDays(this.nativeDate, amount));
    }
    addHours(amount: number): TinyDate {
        return new TinyDate(addHours(this.nativeDate, amount));
    }

    addSeconds(amount: number): TinyDate {
        return new TinyDate(addSeconds(this.nativeDate, amount));
    }

    addMinutes(amount: number): TinyDate {
        return new TinyDate(addMinutes(this.nativeDate, amount));
    }

    // isSame

    isSame(date: TinyDateType, grain: TinyDateCompareGrain = 'day'): boolean {
        let fn;
        switch (grain) {
            case 'decade':
                fn = (pre: Date, next: Date) => Math.abs(pre.getFullYear() - next.getFullYear()) < 11;
                break;
            case 'year':
                fn = isSameYear;
                break;
            case 'month':
                fn = isSameMonth;
                break;
            case 'quarter':
                fn = isSameQuarter;
                break;
            case 'day':
                fn = isSameDay;
                break;
            case 'hour':
                fn = isSameHour;
                break;
            case 'minute':
                fn = isSameMinute;
                break;
            case 'second':
                fn = isSameSecond;
                break;
            default:
                fn = isSameDay;
                break;
        }
        return fn(this.nativeDate, this.toNativeDate(date));
    }

    isSameYear(date: TinyDateType): boolean {
        return this.isSame(date, 'year');
    }

    isSameMonth(date: TinyDateType): boolean {
        return this.isSame(date, 'month');
    }

    isSameQuarter(date: TinyDateType): boolean {
        return this.isSame(date, 'quarter');
    }

    isSameDay(date: TinyDateType): boolean {
        return this.isSame(date, 'day');
    }

    isSameHour(date: TinyDateType): boolean {
        return this.isSame(date, 'hour');
    }

    isSameMinute(date: TinyDateType): boolean {
        return this.isSame(date, 'minute');
    }

    isSameSecond(date: TinyDateType): boolean {
        return this.isSame(date, 'second');
    }

    // isBefore and isAfter
    isBeforeYear(date: TinyDateType): boolean {
        return this.compare(date, 'year');
    }

    isBeforeQuarter(date: TinyDate): boolean {
        return this.compare(date, 'quarter');
    }

    isBeforeMonth(date: TinyDateType): boolean {
        return this.compare(date, 'month');
    }

    isBeforeWeek(date: TinyDateType): boolean {
        return this.compare(date, 'week');
    }

    isBeforeDay(date: TinyDateType): boolean {
        return this.compare(date, 'day');
    }

    isBeforeHour(date: TinyDateType): boolean {
        return this.compare(date, 'hour');
    }

    isBeforeMinute(date: TinyDateType): boolean {
        return this.compare(date, 'minute');
    }

    isBeforeSecond(date: TinyDateType): boolean {
        return this.compare(date, 'second');
    }

    isAfterYear(date: TinyDateType): boolean {
        return this.compare(date, 'year', false);
    }

    isAfterQuarter(date: TinyDate): boolean {
        return this.compare(date, 'quarter', false);
    }

    isAfterMonth(date: TinyDateType): boolean {
        return this.compare(date, 'month', false);
    }

    isAfterWeek(date: TinyDateType): boolean {
        return this.compare(date, 'week', false);
    }

    isAfterDay(date: TinyDateType): boolean {
        return this.compare(date, 'day', false);
    }

    isAfterHour(date: TinyDateType): boolean {
        return this.compare(date, 'hour', false);
    }

    isAfterMinute(date: TinyDateType): boolean {
        return this.compare(date, 'minute', false);
    }

    isAfterSecond(date: TinyDateType): boolean {
        return this.compare(date, 'second', false);
    }

    // is
    isWeekend() {
        return isWeekend(this.nativeDate);
    }

    isToday(): boolean {
        return isToday(this.nativeDate);
    }

    isTomorrow(): boolean {
        return isTomorrow(this.nativeDate);
    }

    isValid(): boolean {
        return isValid(this.nativeDate);
    }

    // startOf and endOf
    startOfYear(): TinyDate {
        return new TinyDate(startOfYear(this.nativeDate));
    }

    startOfQuarter(): TinyDate {
        return new TinyDate(startOfQuarter(this.nativeDate));
    }

    startOfMonth(): TinyDate {
        return new TinyDate(startOfMonth(this.nativeDate));
    }

    startOfWeek(options?: { locale?: Locale; weekStartsOn?: WeekDayIndex }): TinyDate {
        return new TinyDate(startOfWeek(this.nativeDate, options));
    }

    startOfDay(): TinyDate {
        return new TinyDate(startOfDay(this.nativeDate));
    }

    endOfYear(): TinyDate {
        return new TinyDate(endOfYear(this.nativeDate));
    }

    endOfQuarter(): TinyDate {
        return new TinyDate(endOfQuarter(this.nativeDate));
    }

    endOfMonth(): TinyDate {
        return new TinyDate(endOfMonth(this.nativeDate));
    }

    endOfWeek(options?: { locale?: Locale; weekStartsOn?: WeekDayIndex }): TinyDate {
        return new TinyDate(endOfWeek(this.nativeDate, options));
    }

    endOfDay(): TinyDate {
        return new TinyDate(endOfDay(this.nativeDate));
    }

    // other
    format(
        mat: string,
        options?: {
            locale?: Locale;
            weekStartsOn?: WeekDayIndex;
            firstWeekContainsDate?: number;
            useAdditionalWeekYearTokens?: boolean;
            useAdditionalDayOfYearTokens?: boolean;
        }
    ) {
        return format(this.nativeDate, mat, options);
    }

    calendarStart(options?: { weekStartsOn: WeekDayIndex | undefined }): TinyDate {
        return new TinyDate(startOfWeek(startOfMonth(this.nativeDate), options));
    }

    clone(): TinyDate {
        return new TinyDate(new Date(this.nativeDate));
    }

    getUnixTime(): number {
        return getUnixTime(this.nativeDate);
    }

    compare(date: TinyDateType, grain: TinyDateCompareGrain = 'day', isBefore: boolean = true): boolean {
        if (date === null) {
            return false;
        }
        let fn;
        switch (grain) {
            case 'year':
                fn = differenceInCalendarYears;
                break;
            case 'quarter':
                fn = differenceInCalendarQuarters;
                break;
            case 'month':
                fn = differenceInCalendarMonths;
                break;
            case 'day':
                fn = differenceInCalendarDays;
                break;
            case 'week':
                fn = differenceInWeeks;
                break;
            case 'hour':
                fn = differenceInHours;
                break;
            case 'minute':
                fn = differenceInMinutes;
                break;
            case 'second':
                fn = differenceInSeconds;
                break;
            default:
                fn = differenceInCalendarDays;
                break;
        }
        return isBefore ? fn(this.nativeDate, this.toNativeDate(date)) < 0 : fn(this.nativeDate, this.toNativeDate(date)) > 0;
    }

    private toNativeDate(date: any): Date {
        return date instanceof TinyDate ? date.nativeDate : date;
    }
}
