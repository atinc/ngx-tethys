import { TZDate, tzOffset } from '@date-fns/tz';
import { FirstWeekContainsDate, Locale, setHours, setMinutes, setSeconds } from 'date-fns';
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
    subDays,
    subWeeks
} from './functions';
import { getDefaultTimeZone } from './time-zone';

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

    protected timeZone: string;

    private static defaultTimeZone: string;

    constructor(date?: Date | string | number, zone?: string) {
        this.timeZone = zone || getDefaultTimeZone();
        TinyDate.defaultTimeZone = this.timeZone;
        if (date) {
            if (date instanceof Date) {
                this.nativeDate = TinyDate.utcToZonedTime(date);
            } else if (typeof date === 'string' || typeof date === 'number') {
                this.nativeDate = new TZDate(new Date(date).getTime(), this.timeZone);
            } else if (typeof ngDevMode === 'undefined' || ngDevMode) {
                throw new Error(
                    `The input date type is not supported expect Date | string | number | { date: number; with_time: 0 | 1}, actual ${JSON.stringify(
                        date
                    )}`
                );
            }
        } else {
            this.nativeDate = new TZDate(new Date().getTime(), this.timeZone);
        }
    }

    static utcToZonedTime(value: Date): Date {
        return TZDate.tz(TinyDate.defaultTimeZone, value);
    }

    static createDateInTimeZone(year: number, month: number, day: number, hours: number, minutes: number, seconds: number): Date {
        const date = new Date(Date.UTC(year, month, day, hours, minutes, seconds));
        return date.setMinutes(date.getMinutes() - tzOffset(TinyDate.defaultTimeZone, date)) && date;
    }

    static fromUnixTime(unixTime: number): TinyDate {
        return new TinyDate(fromUnixTime(unixTime), TinyDate.defaultTimeZone);
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
        return new TinyDate(date, this.timeZone);
    }

    setHms(hour: number, minute: number, second: number): TinyDate {
        const date = new Date(this.nativeDate);
        date.setHours(hour, minute, second);
        return new TinyDate(date, this.timeZone);
    }

    setYear(year: number): TinyDate {
        return new TinyDate(setYear(this.nativeDate, year), this.timeZone);
    }

    setMonth(month: number): TinyDate {
        return new TinyDate(setMonth(this.nativeDate, month), this.timeZone);
    }

    setQuarter(quarter: number): TinyDate {
        return new TinyDate(setQuarter(this.nativeDate, quarter), this.timeZone);
    }

    setDay(day: number, options?: { weekStartsOn: WeekDayIndex }): TinyDate {
        return new TinyDate(setDay(this.nativeDate, day, options), this.timeZone);
    }

    setHours(hours: number): TinyDate {
        return new TinyDate(setHours(this.nativeDate, hours), this.timeZone);
    }

    setMinutes(minutes: number): TinyDate {
        return new TinyDate(setMinutes(this.nativeDate, minutes), this.timeZone);
    }

    setSeconds(seconds: number): TinyDate {
        return new TinyDate(setSeconds(this.nativeDate, seconds), this.timeZone);
    }

    // add
    addYears(amount: number): TinyDate {
        return new TinyDate(addYears(this.nativeDate, amount), this.timeZone);
    }

    addQuarters(amount: number): TinyDate {
        return new TinyDate(addQuarters(this.nativeDate, amount), this.timeZone);
    }

    addMonths(amount: number): TinyDate {
        return new TinyDate(addMonths(this.nativeDate, amount), this.timeZone);
    }

    addWeeks(amount: number): TinyDate {
        return new TinyDate(addWeeks(this.nativeDate, amount), this.timeZone);
    }

    addDays(amount: number): TinyDate {
        return new TinyDate(addDays(this.nativeDate, amount), this.timeZone);
    }
    addHours(amount: number): TinyDate {
        return new TinyDate(addHours(this.nativeDate, amount), this.timeZone);
    }

    addSeconds(amount: number): TinyDate {
        return new TinyDate(addSeconds(this.nativeDate, amount), this.timeZone);
    }

    addMinutes(amount: number): TinyDate {
        return new TinyDate(addMinutes(this.nativeDate, amount), this.timeZone);
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
    isWeekend(): boolean {
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
        return new TinyDate(startOfYear(this.nativeDate), this.timeZone);
    }

    startOfQuarter(): TinyDate {
        return new TinyDate(startOfQuarter(this.nativeDate), this.timeZone);
    }

    startOfMonth(): TinyDate {
        return new TinyDate(startOfMonth(this.nativeDate), this.timeZone);
    }

    startOfWeek(options?: { locale?: Locale; weekStartsOn?: WeekDayIndex }): TinyDate {
        return new TinyDate(startOfWeek(this.nativeDate, options), this.timeZone);
    }

    startOfDay(): TinyDate {
        return new TinyDate(startOfDay(this.nativeDate), this.timeZone);
    }

    endOfYear(): TinyDate {
        return new TinyDate(endOfYear(this.nativeDate), this.timeZone);
    }

    endOfQuarter(): TinyDate {
        return new TinyDate(endOfQuarter(this.nativeDate), this.timeZone);
    }

    endOfMonth(): TinyDate {
        return new TinyDate(endOfMonth(this.nativeDate), this.timeZone);
    }

    endOfWeek(options?: { locale?: Locale; weekStartsOn?: WeekDayIndex }): TinyDate {
        return new TinyDate(endOfWeek(this.nativeDate, options), this.timeZone);
    }

    endOfDay(): TinyDate {
        return new TinyDate(endOfDay(this.nativeDate), this.timeZone);
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
        return new TinyDate(startOfWeek(startOfMonth(this.nativeDate), options), this.timeZone);
    }

    clone(): TinyDate {
        return new TinyDate(new Date(this.nativeDate), this.timeZone);
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

    startOfISOWeek(): TinyDate {
        return new TinyDate(startOfISOWeek(this.nativeDate), this.timeZone);
    }

    endOfISOWeek(): TinyDate {
        return new TinyDate(endOfISOWeek(this.nativeDate), this.timeZone);
    }

    differenceInDays(date: Date): number {
        return differenceInDays(this.nativeDate, date);
    }

    differenceInHours(date: Date): number {
        return differenceInHours(this.nativeDate, date);
    }

    subWeeks(amount: number): TinyDate {
        return new TinyDate(subWeeks(this.nativeDate, amount), this.timeZone);
    }

    subDays(amount: number): TinyDate {
        return new TinyDate(subDays(this.nativeDate, amount), this.timeZone);
    }
}
