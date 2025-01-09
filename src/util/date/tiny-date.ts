import { TZDate } from '@date-fns/tz';
import { FirstWeekContainsDate, Locale } from 'date-fns';
import { SafeAny } from 'ngx-tethys/types';
import {
    addDays,
    addHours,
    addMinutes,
    addMonths,
    addQuarters,
    addSeconds,
    addWeeks,
    addYears,
    differenceInCalendarDays,
    differenceInCalendarMonths,
    differenceInCalendarQuarters,
    differenceInCalendarYears,
    differenceInDays,
    differenceInHours,
    differenceInMinutes,
    differenceInSeconds,
    differenceInWeeks,
    endOfDay,
    endOfISOWeek,
    endOfMonth,
    endOfQuarter,
    endOfWeek,
    endOfYear,
    format,
    fromUnixTime,
    getDaysInMonth,
    getQuarter,
    getUnixTime,
    getWeek,
    isSameDay,
    isSameHour,
    isSameMinute,
    isSameMonth,
    isSameQuarter,
    isSameSecond,
    isSameYear,
    isToday,
    isTomorrow,
    isValid,
    isWeekend,
    setDay,
    setMonth,
    setQuarter,
    setYear,
    startOfDay,
    startOfISOWeek,
    startOfMonth,
    startOfQuarter,
    startOfWeek,
    startOfYear,
    subWeeks
} from './functions';
import { getGlobalTimezone } from './time-zone';

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

    protected timezone: string;

    constructor(date?: Date | string | number, timezone?: string) {
        this.timezone = timezone || getGlobalTimezone();
        if (date) {
            if (date instanceof Date || typeof date === 'string' || typeof date === 'number') {
                this.nativeDate = new TZDate(date as SafeAny, this.timezone);
            } else if (typeof ngDevMode === 'undefined' || ngDevMode) {
                throw new Error(
                    `The input date type is not supported expect Date | string | number | { date: number; with_time: 0 | 1}, actual ${JSON.stringify(
                        date
                    )}`
                );
            }
        } else {
            this.nativeDate = new TZDate(new Date(), this.timezone);
        }
    }

    fromUnixTime(unixTime: number): TinyDate {
        return new TinyDate(fromUnixTime(unixTime), this.timezone);
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

    getFullYear(): number {
        return this.nativeDate.getFullYear();
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
        return new TinyDate(date, this.timezone);
    }

    setHms(hour: number, minute: number, second: number): TinyDate {
        const date = new Date(this.nativeDate);
        date.setHours(hour, minute, second);
        return new TinyDate(date, this.timezone);
    }

    setYear(year: number): TinyDate {
        return new TinyDate(setYear(this.nativeDate, year), this.timezone);
    }

    setMonth(month: number): TinyDate {
        return new TinyDate(setMonth(this.nativeDate, month), this.timezone);
    }

    setQuarter(quarter: number) {
        return new TinyDate(setQuarter(this.nativeDate, quarter), this.timezone);
    }

    setDay(day: number, options?: { weekStartsOn: WeekDayIndex }): TinyDate {
        return new TinyDate(setDay(this.nativeDate, day, options), this.timezone);
    }

    // add
    addYears(amount: number): TinyDate {
        return new TinyDate(addYears(this.nativeDate, amount), this.timezone);
    }

    addQuarters(amount: number): TinyDate {
        return new TinyDate(addQuarters(this.nativeDate, amount), this.timezone);
    }

    addMonths(amount: number): TinyDate {
        return new TinyDate(addMonths(this.nativeDate, amount), this.timezone);
    }

    addWeeks(amount: number): TinyDate {
        return new TinyDate(addWeeks(this.nativeDate, amount), this.timezone);
    }

    addDays(amount: number): TinyDate {
        return new TinyDate(addDays(this.nativeDate, amount), this.timezone);
    }
    addHours(amount: number): TinyDate {
        return new TinyDate(addHours(this.nativeDate, amount), this.timezone);
    }

    addSeconds(amount: number): TinyDate {
        return new TinyDate(addSeconds(this.nativeDate, amount), this.timezone);
    }

    addMinutes(amount: number): TinyDate {
        return new TinyDate(addMinutes(this.nativeDate, amount), this.timezone);
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
        return new TinyDate(startOfYear(this.nativeDate), this.timezone);
    }

    startOfQuarter(): TinyDate {
        return new TinyDate(startOfQuarter(this.nativeDate), this.timezone);
    }

    startOfMonth(): TinyDate {
        return new TinyDate(startOfMonth(this.nativeDate), this.timezone);
    }

    startOfWeek(options?: { locale?: Locale; weekStartsOn?: WeekDayIndex }): TinyDate {
        return new TinyDate(startOfWeek(this.nativeDate, options), this.timezone);
    }

    startOfDay(): TinyDate {
        return new TinyDate(startOfDay(this.nativeDate), this.timezone);
    }

    endOfYear(): TinyDate {
        return new TinyDate(endOfYear(this.nativeDate), this.timezone);
    }

    endOfQuarter(): TinyDate {
        return new TinyDate(endOfQuarter(this.nativeDate), this.timezone);
    }

    endOfMonth(): TinyDate {
        return new TinyDate(endOfMonth(this.nativeDate), this.timezone);
    }

    endOfWeek(options?: { locale?: Locale; weekStartsOn?: WeekDayIndex }): TinyDate {
        return new TinyDate(endOfWeek(this.nativeDate, options), this.timezone);
    }

    endOfDay(): TinyDate {
        return new TinyDate(endOfDay(this.nativeDate), this.timezone);
    }

    // other
    format(
        mat: string,
        options?: {
            locale?: Locale;
            weekStartsOn?: WeekDayIndex;
            firstWeekContainsDate?: FirstWeekContainsDate;
            useAdditionalWeekYearTokens?: boolean;
            useAdditionalDayOfYearTokens?: boolean;
        }
    ) {
        return format(this.nativeDate, mat, options);
    }

    calendarStart(options?: { weekStartsOn: WeekDayIndex | undefined }): TinyDate {
        return new TinyDate(startOfWeek(startOfMonth(this.nativeDate), options), this.timezone);
    }

    clone(): TinyDate {
        return new TinyDate(new Date(this.nativeDate), this.timezone);
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

    startOfISOWeek() {
        return new TinyDate(startOfISOWeek(this.nativeDate), this.timezone);
    }

    endOfISOWeek() {
        return new TinyDate(endOfISOWeek(this.nativeDate), this.timezone);
    }

    differenceInDays(date: Date) {
        return new TinyDate(differenceInDays(this.nativeDate, date), this.timezone);
    }

    differenceInHours(date: Date) {
        return new TinyDate(differenceInHours(this.nativeDate, date), this.timezone);
    }

    subWeeks(amount: number) {
        return new TinyDate(subWeeks(this.nativeDate, amount), this.timezone);
    }
}
