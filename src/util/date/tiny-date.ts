import { TZDate } from '@date-fns/tz';
import { FirstWeekContainsDate, Locale, setHours, setMinutes, setSeconds } from 'date-fns';
import { fromZonedTime } from 'date-fns-tz';
import { getDefaultLocaleId } from 'ngx-tethys/i18n';
import { hasTimeInStringDate } from '../helpers';
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
    getDateFnsLocale,
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
    setDefaultOptions,
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

export const DEFAULT_TIMEZONE = 'Asia/Shanghai';

export class TinyDate implements Record<string, any> {
    nativeDate: Date;

    private useTimeZone: string;

    private static locale: string = getDefaultLocaleId();

    protected static dateFnsLocale: Locale = getDateFnsLocale(TinyDate.locale);

    protected static defaultTimeZone: string = DEFAULT_TIMEZONE;

    constructor(date?: Date | string | number, zone?: string) {
        setDefaultOptions({ locale: TinyDate.dateFnsLocale });
        this.useTimeZone = zone || TinyDate.defaultTimeZone;
        if (date) {
            if (date instanceof Date) {
                this.nativeDate = TinyDate.utcToZonedTime(date, this.useTimeZone);
            } else if (typeof date === 'string') {
                if (hasTimeInStringDate(date)) {
                    // 如果字符串中包含时间，则需要将时间转换为UTC时间再传递给TZDate
                    const originTime = new Date(date);
                    const zoneTime = TZDate.tz(this.useTimeZone, originTime);
                    const utcDate = fromZonedTime(zoneTime, this.useTimeZone).toISOString();
                    this.nativeDate = new TZDate(utcDate, this.useTimeZone);
                } else {
                    this.nativeDate = new TZDate(date, this.useTimeZone);
                }
            } else if (typeof date === 'number') {
                this.nativeDate = new TZDate(date, this.useTimeZone);
            } else if (typeof ngDevMode === 'undefined' || ngDevMode) {
                throw new Error(
                    `The input date type is not supported expect Date | string | number | { date: number; with_time: 0 | 1}, actual ${JSON.stringify(
                        date
                    )}`
                );
            }
        } else {
            this.nativeDate = new TZDate(Date.now(), this.useTimeZone);
        }
    }

    static setDefaultLocale(locale: string) {
        TinyDate.locale = locale;
        TinyDate.dateFnsLocale = getDateFnsLocale(locale);
        return setDefaultOptions({ locale: TinyDate.dateFnsLocale });
    }

    static getDefaultLocale(): { locale: string; dateFnsLocale: Locale } {
        return { locale: TinyDate.locale, dateFnsLocale: TinyDate.dateFnsLocale };
    }

    static setDefaultTimeZone(zone: string) {
        TinyDate.defaultTimeZone = zone ?? DEFAULT_TIMEZONE;
    }

    static getDefaultTimeZone(): string {
        return TinyDate.defaultTimeZone;
    }

    static utcToZonedTime(value: Date | number, timeZone?: string): Date {
        return TZDate.tz(timeZone || TinyDate.defaultTimeZone, value as any);
    }

    static createDateInTimeZone(
        year: number,
        month: number,
        day: number,
        hours: number,
        minutes: number,
        seconds: number,
        timeZone?: string
    ): Date {
        return new TZDate(year, month, day, hours, minutes, seconds, timeZone || TinyDate.defaultTimeZone);
    }

    static fromUnixTime(unixTime: number, timeZone?: string): TinyDate {
        return new TinyDate(fromUnixTime(unixTime), timeZone || TinyDate.defaultTimeZone);
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
        return new TinyDate(date, this.useTimeZone);
    }

    setHms(hour: number, minute: number, second: number): TinyDate {
        const date = new Date(this.nativeDate);
        date.setHours(hour, minute, second);
        return new TinyDate(date, this.useTimeZone);
    }

    setYear(year: number): TinyDate {
        return new TinyDate(setYear(this.nativeDate, year), this.useTimeZone);
    }

    setMonth(month: number): TinyDate {
        return new TinyDate(setMonth(this.nativeDate, month), this.useTimeZone);
    }

    setQuarter(quarter: number): TinyDate {
        return new TinyDate(setQuarter(this.nativeDate, quarter), this.useTimeZone);
    }

    setDay(day: number, options?: { weekStartsOn: WeekDayIndex }): TinyDate {
        return new TinyDate(setDay(this.nativeDate, day, options), this.useTimeZone);
    }

    setHours(hours: number): TinyDate {
        return new TinyDate(setHours(this.nativeDate, hours), this.useTimeZone);
    }

    setMinutes(minutes: number): TinyDate {
        return new TinyDate(setMinutes(this.nativeDate, minutes), this.useTimeZone);
    }

    setSeconds(seconds: number): TinyDate {
        return new TinyDate(setSeconds(this.nativeDate, seconds), this.useTimeZone);
    }

    // add
    addYears(amount: number): TinyDate {
        return new TinyDate(addYears(this.nativeDate, amount), this.useTimeZone);
    }

    addQuarters(amount: number): TinyDate {
        return new TinyDate(addQuarters(this.nativeDate, amount), this.useTimeZone);
    }

    addMonths(amount: number): TinyDate {
        return new TinyDate(addMonths(this.nativeDate, amount), this.useTimeZone);
    }

    addWeeks(amount: number): TinyDate {
        return new TinyDate(addWeeks(this.nativeDate, amount), this.useTimeZone);
    }

    addDays(amount: number): TinyDate {
        return new TinyDate(addDays(this.nativeDate, amount), this.useTimeZone);
    }
    addHours(amount: number): TinyDate {
        return new TinyDate(addHours(this.nativeDate, amount), this.useTimeZone);
    }

    addSeconds(amount: number): TinyDate {
        return new TinyDate(addSeconds(this.nativeDate, amount), this.useTimeZone);
    }

    addMinutes(amount: number): TinyDate {
        return new TinyDate(addMinutes(this.nativeDate, amount), this.useTimeZone);
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
        return new TinyDate(startOfYear(this.nativeDate), this.useTimeZone);
    }

    startOfQuarter(): TinyDate {
        return new TinyDate(startOfQuarter(this.nativeDate), this.useTimeZone);
    }

    startOfMonth(): TinyDate {
        return new TinyDate(startOfMonth(this.nativeDate), this.useTimeZone);
    }

    startOfWeek(options?: { locale?: Locale; weekStartsOn?: WeekDayIndex }): TinyDate {
        return new TinyDate(startOfWeek(this.nativeDate, options), this.useTimeZone);
    }

    startOfDay(): TinyDate {
        return new TinyDate(startOfDay(this.nativeDate), this.useTimeZone);
    }

    endOfYear(): TinyDate {
        return new TinyDate(endOfYear(this.nativeDate), this.useTimeZone);
    }

    endOfQuarter(): TinyDate {
        return new TinyDate(endOfQuarter(this.nativeDate), this.useTimeZone);
    }

    endOfMonth(): TinyDate {
        return new TinyDate(endOfMonth(this.nativeDate), this.useTimeZone);
    }

    endOfWeek(options?: { locale?: Locale; weekStartsOn?: WeekDayIndex }): TinyDate {
        return new TinyDate(endOfWeek(this.nativeDate, options), this.useTimeZone);
    }

    endOfDay(): TinyDate {
        return new TinyDate(endOfDay(this.nativeDate), this.useTimeZone);
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
        return new TinyDate(startOfWeek(startOfMonth(this.nativeDate), options), this.useTimeZone);
    }

    clone(): TinyDate {
        return new TinyDate(new Date(this.nativeDate), this.useTimeZone);
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
        return new TinyDate(startOfISOWeek(this.nativeDate), this.useTimeZone);
    }

    endOfISOWeek(): TinyDate {
        return new TinyDate(endOfISOWeek(this.nativeDate), this.useTimeZone);
    }

    differenceInDays(date: Date): number {
        return differenceInDays(this.nativeDate, date);
    }

    differenceInHours(date: Date): number {
        return differenceInHours(this.nativeDate, date);
    }

    subWeeks(amount: number): TinyDate {
        return new TinyDate(subWeeks(this.nativeDate, amount), this.useTimeZone);
    }

    subDays(amount: number): TinyDate {
        return new TinyDate(subDays(this.nativeDate, amount), this.useTimeZone);
    }
}
