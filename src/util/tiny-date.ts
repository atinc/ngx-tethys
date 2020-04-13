import {
    differenceInCalendarDays,
    differenceInCalendarMonths,
    differenceInCalendarYears,
    differenceInCalendarWeeks,
    differenceInDays,
    differenceInMonths,
    differenceInYears,
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
    getUnixTime,
    startOfDay,
    endOfDay,
    fromUnixTime
} from 'date-fns';

export interface IndexableObject {
    [key: string]: any;
}

export type TinyDateCompareGrain = 'year' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'second';

export type WeekDayIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type TinyDateType = TinyDate | Date | null;

export function sortRangeValue(rangeValue: TinyDate[]): TinyDate[] {
    if (Array.isArray(rangeValue)) {
        const [start, end] = rangeValue;
        return start && end && start.isAfterSecond(end) ? [end, start] : [start, end];
    }
    return rangeValue;
}

export class TinyDate implements IndexableObject {
    nativeDate: Date;

    constructor(date?: Date | string | number) {
        if (date) {
            if (date instanceof Date) {
                this.nativeDate = date;
            } else if (typeof date === 'string' || typeof date === 'number') {
                this.nativeDate = new Date(date);
            } else {
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

    calendarStart(options?: { weekStartsOn: WeekDayIndex | undefined }): TinyDate {
        return new TinyDate(startOfWeek(startOfMonth(this.nativeDate), options));
    }

    getYear(): number {
        return this.nativeDate.getFullYear();
    }

    getMonth(): number {
        return this.nativeDate.getMonth();
    }

    getDay(): number {
        return this.nativeDate.getDay();
    }

    getTime(): number {
        return this.nativeDate.getTime();
    }

    getDate(): number {
        return this.nativeDate.getDate();
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

    clone(): TinyDate {
        return new TinyDate(new Date(this.nativeDate));
    }

    setHms(hour: number, minute: number, second: number): TinyDate {
        const date = new Date(this.nativeDate);
        date.setHours(hour, minute, second);
        return new TinyDate(date);
    }

    setYear(year: number): TinyDate {
        return new TinyDate(setYear(this.nativeDate, year));
    }

    addYears(amount: number): TinyDate {
        return new TinyDate(addYears(this.nativeDate, amount));
    }

    setMonth(month: number): TinyDate {
        return new TinyDate(setMonth(this.nativeDate, month));
    }

    addMonths(amount: number): TinyDate {
        return new TinyDate(addMonths(this.nativeDate, amount));
    }

    setDay(day: number, options?: { weekStartsOn: WeekDayIndex }): TinyDate {
        return new TinyDate(setDay(this.nativeDate, day, options));
    }

    setDate(amount: number): TinyDate {
        const date = new Date(this.nativeDate);
        date.setDate(amount);
        return new TinyDate(date);
    }

    addDays(amount: number): TinyDate {
        return this.setDate(this.getDate() + amount);
    }

    isSame(date: TinyDateType, grain: TinyDateCompareGrain = 'day'): boolean {
        let fn;
        switch (grain) {
            case 'year':
                fn = isSameYear;
                break;
            case 'month':
                fn = isSameMonth;
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

    compare(date: TinyDateType, grain: TinyDateCompareGrain = 'day'): number {
        if (date === null) {
            return NaN;
        }
        let fn;
        switch (grain) {
            case 'year':
                fn = differenceInYears;
                break;
            case 'month':
                fn = differenceInMonths;
                break;
            case 'day':
                fn = differenceInDays;
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
                fn = differenceInDays;
                break;
        }
        return fn(this.nativeDate, this.toNativeDate(date));
    }

    private isBeforeOrAfter(
        date: TinyDateType,
        grain: TinyDateCompareGrain = 'day',
        isBefore: boolean = true
    ): boolean {
        const number = this.compare(date, grain);
        return isBefore ? number < 0 : number > 0;
    }

    compareInCalendar(date: TinyDateType, grain: TinyDateCompareGrain = 'day'): number {
        if (date === null) {
            return NaN;
        }
        let fn;
        switch (grain) {
            case 'year':
                fn = differenceInCalendarYears;
                break;
            case 'month':
                fn = differenceInCalendarMonths;
                break;
            case 'week':
                fn = differenceInCalendarWeeks;
                break;
            case 'day':
                fn = differenceInCalendarDays;
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

        return fn(this.nativeDate, this.toNativeDate(date));
    }

    private isBeforeOrAfterInCalendar(
        date: TinyDateType,
        grain: TinyDateCompareGrain = 'day',
        isBefore: boolean = true
    ): boolean {
        const number = this.compareInCalendar(date, grain);
        return isBefore ? number < 0 : number > 0;
    }

    isBeforeYearInCalendar(date: TinyDateType): boolean {
        return this.isBeforeOrAfterInCalendar(date, 'year');
    }

    isBeforeMonthInCalendar(date: TinyDateType): boolean {
        return this.isBeforeOrAfterInCalendar(date, 'month');
    }

    isBeforeWeekInCalendar(date: TinyDateType): boolean {
        return this.isBeforeOrAfterInCalendar(date, 'week');
    }

    isBeforeDayInCalendar(date: TinyDateType): boolean {
        return this.isBeforeOrAfterInCalendar(date, 'day');
    }

    isBeforeYear(date: TinyDateType): boolean {
        return this.isBeforeOrAfter(date, 'year');
    }

    isBeforeMonth(date: TinyDateType): boolean {
        return this.isBeforeOrAfter(date, 'month');
    }

    isBeforeWeek(date: TinyDateType): boolean {
        return this.isBeforeOrAfter(date, 'week');
    }

    isBeforeDay(date: TinyDateType): boolean {
        return this.isBeforeOrAfter(date, 'day');
    }

    isBeforeHour(date: TinyDateType): boolean {
        return this.isBeforeOrAfter(date, 'hour');
    }

    isBeforeMinute(date: TinyDateType): boolean {
        return this.isBeforeOrAfter(date, 'minute');
    }

    isBeforeSecond(date: TinyDateType): boolean {
        return this.isBeforeOrAfter(date, 'second');
    }

    isAfterYearInCalendar(date: TinyDateType): boolean {
        return this.isBeforeOrAfterInCalendar(date, 'year', false);
    }

    isAfterMonthInCalendar(date: TinyDateType): boolean {
        return this.isBeforeOrAfterInCalendar(date, 'month', false);
    }

    isAfterWeekInCalendar(date: TinyDateType): boolean {
        return this.isBeforeOrAfterInCalendar(date, 'week', false);
    }

    isAfterDayInCalendar(date: TinyDateType): boolean {
        return this.isBeforeOrAfterInCalendar(date, 'day', false);
    }

    isAfterYear(date: TinyDateType): boolean {
        return this.isBeforeOrAfter(date, 'year', false);
    }

    isAfterMonth(date: TinyDateType): boolean {
        return this.isBeforeOrAfter(date, 'month', false);
    }

    isAfterWeek(date: TinyDateType): boolean {
        return this.isBeforeOrAfter(date, 'week', false);
    }

    isAfterDay(date: TinyDateType): boolean {
        return this.isBeforeOrAfter(date, 'day', false);
    }

    isAfterHour(date: TinyDateType): boolean {
        return this.isBeforeOrAfter(date, 'hour', false);
    }

    isAfterMinute(date: TinyDateType): boolean {
        return this.isBeforeOrAfter(date, 'minute', false);
    }

    isAfterSecond(date: TinyDateType): boolean {
        return this.isBeforeOrAfter(date, 'second', false);
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

    getUnixTime(): number {
        return getUnixTime(this.nativeDate);
    }

    startOfDay(): TinyDate {
        return new TinyDate(startOfDay(this.nativeDate));
    }

    endOfDay(): TinyDate {
        return new TinyDate(endOfDay(this.nativeDate));
    }

    private toNativeDate(date: any): Date {
        return date instanceof TinyDate ? date.nativeDate : date;
    }
}
