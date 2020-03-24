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

export type CandyDateCompareGrain = 'year' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'second';

export type WeekDayIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type CandyDateType = CandyDate | Date | null;

export function sortRangeValue(rangeValue: CandyDate[]): CandyDate[] {
    if (Array.isArray(rangeValue)) {
        const [start, end] = rangeValue;
        return start && end && start.isAfterSecond(end) ? [end, start] : [start, end];
    }
    return rangeValue;
}

export class CandyDate implements IndexableObject {
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

    static fromUnixTime(unixTime: number): CandyDate {
        return new CandyDate(fromUnixTime(unixTime));
    }

    calendarStart(options?: { weekStartsOn: WeekDayIndex | undefined }): CandyDate {
        return new CandyDate(startOfWeek(startOfMonth(this.nativeDate), options));
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

    clone(): CandyDate {
        return new CandyDate(new Date(this.nativeDate));
    }

    setHms(hour: number, minute: number, second: number): CandyDate {
        const date = new Date(this.nativeDate);
        date.setHours(hour, minute, second);
        return new CandyDate(date);
    }

    setYear(year: number): CandyDate {
        return new CandyDate(setYear(this.nativeDate, year));
    }

    addYears(amount: number): CandyDate {
        return new CandyDate(addYears(this.nativeDate, amount));
    }

    setMonth(month: number): CandyDate {
        return new CandyDate(setMonth(this.nativeDate, month));
    }

    addMonths(amount: number): CandyDate {
        return new CandyDate(addMonths(this.nativeDate, amount));
    }

    setDay(day: number, options?: { weekStartsOn: WeekDayIndex }): CandyDate {
        return new CandyDate(setDay(this.nativeDate, day, options));
    }

    setDate(amount: number): CandyDate {
        const date = new Date(this.nativeDate);
        date.setDate(amount);
        return new CandyDate(date);
    }

    addDays(amount: number): CandyDate {
        return this.setDate(this.getDate() + amount);
    }

    isSame(date: CandyDateType, grain: CandyDateCompareGrain = 'day'): boolean {
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

    isSameYear(date: CandyDateType): boolean {
        return this.isSame(date, 'year');
    }

    isSameMonth(date: CandyDateType): boolean {
        return this.isSame(date, 'month');
    }

    isSameDay(date: CandyDateType): boolean {
        return this.isSame(date, 'day');
    }

    isSameHour(date: CandyDateType): boolean {
        return this.isSame(date, 'hour');
    }

    isSameMinute(date: CandyDateType): boolean {
        return this.isSame(date, 'minute');
    }

    isSameSecond(date: CandyDateType): boolean {
        return this.isSame(date, 'second');
    }

    compare(date: CandyDateType, grain: CandyDateCompareGrain = 'day'): number {
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
        date: CandyDateType,
        grain: CandyDateCompareGrain = 'day',
        isBefore: boolean = true
    ): boolean {
        const number = this.compare(date, grain);
        return isBefore ? number < 0 : number > 0;
    }

    compareInCalendar(date: CandyDateType, grain: CandyDateCompareGrain = 'day'): number {
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
        date: CandyDateType,
        grain: CandyDateCompareGrain = 'day',
        isBefore: boolean = true
    ): boolean {
        const number = this.compareInCalendar(date, grain);
        return isBefore ? number < 0 : number > 0;
    }

    isBeforeYearInCalendar(date: CandyDateType): boolean {
        return this.isBeforeOrAfterInCalendar(date, 'year');
    }

    isBeforeMonthInCalendar(date: CandyDateType): boolean {
        return this.isBeforeOrAfterInCalendar(date, 'month');
    }

    isBeforeWeekInCalendar(date: CandyDateType): boolean {
        return this.isBeforeOrAfterInCalendar(date, 'week');
    }

    isBeforeDayInCalendar(date: CandyDateType): boolean {
        return this.isBeforeOrAfterInCalendar(date, 'day');
    }

    isBeforeYear(date: CandyDateType): boolean {
        return this.isBeforeOrAfter(date, 'year');
    }

    isBeforeMonth(date: CandyDateType): boolean {
        return this.isBeforeOrAfter(date, 'month');
    }

    isBeforeWeek(date: CandyDateType): boolean {
        return this.isBeforeOrAfter(date, 'week');
    }

    isBeforeDay(date: CandyDateType): boolean {
        return this.isBeforeOrAfter(date, 'day');
    }

    isBeforeHour(date: CandyDateType): boolean {
        return this.isBeforeOrAfter(date, 'hour');
    }

    isBeforeMinute(date: CandyDateType): boolean {
        return this.isBeforeOrAfter(date, 'minute');
    }

    isBeforeSecond(date: CandyDateType): boolean {
        return this.isBeforeOrAfter(date, 'second');
    }

    isAfterYearInCalendar(date: CandyDateType): boolean {
        return this.isBeforeOrAfterInCalendar(date, 'year', false);
    }

    isAfterMonthInCalendar(date: CandyDateType): boolean {
        return this.isBeforeOrAfterInCalendar(date, 'month', false);
    }

    isAfterWeekInCalendar(date: CandyDateType): boolean {
        return this.isBeforeOrAfterInCalendar(date, 'week', false);
    }

    isAfterDayInCalendar(date: CandyDateType): boolean {
        return this.isBeforeOrAfterInCalendar(date, 'day', false);
    }

    isAfterYear(date: CandyDateType): boolean {
        return this.isBeforeOrAfter(date, 'year', false);
    }

    isAfterMonth(date: CandyDateType): boolean {
        return this.isBeforeOrAfter(date, 'month', false);
    }

    isAfterWeek(date: CandyDateType): boolean {
        return this.isBeforeOrAfter(date, 'week', false);
    }

    isAfterDay(date: CandyDateType): boolean {
        return this.isBeforeOrAfter(date, 'day', false);
    }

    isAfterHour(date: CandyDateType): boolean {
        return this.isBeforeOrAfter(date, 'hour', false);
    }

    isAfterMinute(date: CandyDateType): boolean {
        return this.isBeforeOrAfter(date, 'minute', false);
    }

    isAfterSecond(date: CandyDateType): boolean {
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

    startOfDay(): CandyDate {
        return new CandyDate(startOfDay(this.nativeDate));
    }

    endOfDay(): CandyDate {
        return new CandyDate(endOfDay(this.nativeDate));
    }

    private toNativeDate(date: any): Date {
        return date instanceof CandyDate ? date.nativeDate : date;
    }
}
