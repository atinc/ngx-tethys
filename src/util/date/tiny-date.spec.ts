import { endOfDay, endOfMonth, endOfQuarter, endOfYear, startOfDay, startOfMonth, startOfWeek, startOfYear } from 'date-fns';
import * as dateFnsLocales from 'date-fns/locale';
import { ThyLocaleType } from 'ngx-tethys/i18n';
import { getDateFnsLocale, sortRangeValue, TinyDate } from 'ngx-tethys/util';

describe('tiny-date', () => {
    const date = new TinyDate('2020-2-2 20:20:20');

    it('support getTime', () => expect(date.getTime()).toBe(date.nativeDate.getTime()));

    it('support getMilliseconds', () => expect(date.getMilliseconds()).toBe(date.nativeDate.getMilliseconds()));

    it('support isSame', () => {
        expect(date.isSame(new TinyDate('2020'), 'year')).toBeTruthy();

        expect(date.isSameMonth(new TinyDate('2020-2-2 2:00:00'))).toBeTruthy();

        expect(date.isSameQuarter(new TinyDate('2020-3-2 2:00:00'))).toBeTruthy();

        expect(date.isSame(new TinyDate('2020-2-2 22:20:20'), 'day')).toBeTruthy();
        expect(date.isSame(new TinyDate('2020-2-2 22:20:20'), null)).toBeTruthy();
        expect(date.isSameDay(new TinyDate('2020-2-2 22:20:20'))).toBeTruthy();
        expect(date.isSameDay(new TinyDate('2021-2-2 20:20:20'))).toBeFalsy();

        expect(date.isSame(new TinyDate('2020-2-2 20:02:02'), 'hour')).toBeTruthy();
        expect(date.isSameHour(new TinyDate('2222-2-2 20:02:02'))).toBeFalsy();

        expect(date.isSame(new TinyDate('2020-2-2 20:20:02'), 'minute')).toBeTruthy();
        expect(date.isSameMinute(new TinyDate('2020-2-2 20:22:02'))).toBeFalsy();

        expect(date.isSame(new TinyDate('2020-2-2 20:20:20'), 'second')).toBeTruthy();
        expect(date.isSameSecond(new TinyDate('2021-2-2 20:20:20'))).toBeFalsy();

        expect(date.isSame(new TinyDate('2020-12-2 20:20:20'), 'year')).toBeTruthy();
        expect(date.isSameYear(new TinyDate('2020-12-2 20:20:20'))).toBeTruthy();
        expect(date.isSameYear(new TinyDate('2021-12-2 20:20:20'))).toBeFalsy();
    });

    it('support isAfter', () => {
        expect(date.isAfterYear(null)).toBeFalsy();

        expect(date.isAfterYear(new TinyDate('2010'))).toBeTruthy();

        expect(date.isAfterMonth(new TinyDate('2019-2-2 20:20:20'))).toBeTruthy();

        expect(date.isAfterWeek(new TinyDate('2020-1-2 20:20:20'))).toBeTruthy();

        expect(date.isAfterDay(new TinyDate('2020-2-1 20:20:20'))).toBeTruthy();

        expect(date.isAfterHour(new TinyDate('2020-2-1 20:20:20'))).toBeTruthy();

        expect(date.isAfterMinute(new TinyDate('2019-2-2 20:20:20'))).toBeTruthy();

        expect(date.isAfterSecond(new TinyDate('2000-2-2 20:20:20'))).toBeTruthy();
    });

    it('support isBefore', () => {
        expect(date.isBeforeYear(null)).toBeFalsy();

        expect(date.isBeforeYear(new TinyDate('2100'))).toBeTruthy();

        expect(date.isBeforeMonth(new TinyDate('2100-2-2 20:20:20'))).toBeTruthy();

        expect(date.isBeforeWeek(new TinyDate('2020-3-2 20:20:20'))).toBeTruthy();

        expect(date.isBeforeDay(new TinyDate('2020-3-2 20:20:20'))).toBeTruthy();

        expect(date.isBeforeHour(new TinyDate('2100-2-2 20:20:20'))).toBeTruthy();

        expect(date.isBeforeMinute(new TinyDate('2100-2-2 20:20:20'))).toBeTruthy();

        expect(date.isBeforeSecond(new TinyDate('2100-2-2 20:20:20'))).toBeTruthy();
    });

    it('support static fromUnixTime', () => {
        const unixTime = date.getUnixTime();
        expect(TinyDate.fromUnixTime(unixTime).getUnixTime()).toBe(date.getUnixTime());
    });

    it('should throw error while putting invalid date input', () => {
        const errorMessage =
            'The input date type is not supported expect Date | string | number | { date: number; with_time: 0 | 1}, actual {}';
        expect(() => new TinyDate({} as any)).toThrowError(errorMessage);
    });

    it('support add', () => {
        let newTinyDate: TinyDate;

        newTinyDate = date.addYears(1);
        expect(newTinyDate.getYear()).toBe(date.getYear() + 1);

        newTinyDate = date.addQuarters(1);
        expect(newTinyDate.getQuarter()).toBe(date.getQuarter() + 1);

        newTinyDate = date.addMonths(1);
        expect(newTinyDate.getMonth()).toBe(date.getMonth() + 1);

        newTinyDate = date.addWeeks(1);
        expect(newTinyDate.getWeek()).toBe(date.getWeek() + 1);

        newTinyDate = date.addDays(1);
        expect(newTinyDate.getDay()).toBe(date.getDay() + 1);

        newTinyDate = date.addHours(1);
        expect(newTinyDate.getHours()).toBe(date.getHours() + 1);

        newTinyDate = date.addMinutes(1);
        expect(newTinyDate.getMinutes()).toBe(date.getMinutes() + 1);

        newTinyDate = date.addSeconds(1);
        expect(newTinyDate.getSeconds()).toBe(date.getSeconds() + 1);
    });

    it('support clone', () => {
        expect(date.getTime()).toBe(date.clone().getTime());
    });

    describe('set', () => {
        it('support setDay', () => {
            expect(date.setDay(1).getDay()).toBe(1);
        });

        it('support setYear', () => {
            expect(date.setYear(2020).getYear()).toBe(2020);
        });

        it('support setMonth', () => {
            expect(date.setMonth(1).getMonth()).toBe(1);
        });

        it('support setDate', () => {
            expect(date.setDate(1).getDate()).toBe(1);
        });

        it('support setHms', () => {
            expect(date.setHms(10, 10, 10).format('HH:mm:ss')).toBe(`10:10:10`);
        });
    });

    describe('is', () => {
        it('isWeekend', () => {
            expect(date.isWeekend()).toBeTruthy();
            expect(new TinyDate('2020-2-5 20:20:20').isWeekend()).toBeFalsy();
        });

        it('isToday', () => {
            expect(new TinyDate().isToday()).toBeTruthy();
            expect(date.isToday()).toBeFalsy();
        });

        it('isTomorrow', () => {
            expect(new TinyDate().isTomorrow()).toBeFalsy();
            expect(new TinyDate().addDays(1).isTomorrow()).toBeTruthy();
        });

        it('isValid', () => {
            expect(new TinyDate().isValid()).toBeTruthy();
            expect(new TinyDate('xxx').isValid()).toBeFalsy();
        });
    });

    describe('start and end', () => {
        it('startOfYear', () => {
            expect(date.startOfYear().getDate()).toEqual(startOfYear(date.nativeDate).getDate());
        });

        it('startOfMonth', () => {
            expect(date.startOfMonth().getDate()).toEqual(startOfMonth(date.nativeDate).getDate());
        });

        it('startOfWeek', () => {
            expect(date.startOfWeek().getDate()).toEqual(startOfWeek(date.nativeDate).getDate());
        });

        it('startOfDay', () => {
            expect(date.startOfDay().getDate()).toEqual(startOfDay(date.nativeDate).getDate());
        });

        it('endOfYear', () => {
            expect(date.endOfYear().getDate()).toEqual(endOfYear(date.nativeDate).getDate());
        });

        it('endOfQuarter', () => {
            expect(date.endOfQuarter().getDate()).toEqual(endOfQuarter(date.nativeDate).getDate());
        });

        it('endOfMonth', () => {
            expect(date.endOfMonth().getDate()).toEqual(endOfMonth(date.nativeDate).getDate());
        });

        it('endOfDay', () => {
            expect(date.endOfDay().getDate()).toEqual(endOfDay(date.nativeDate).getDate());
        });

        it('calendarStart', () => {
            expect(date.calendarStart().getDate()).toEqual(startOfWeek(startOfMonth(date.nativeDate)).getDate());
        });
    });

    it('should get 29 days in month 2 of 2020', () => {
        expect(date.getDaysInMonth()).toEqual(29);
    });

    it('should 29 days in 2020 Q1', () => {
        expect(date.getDaysInQuarter()).toEqual(91);
    });

    it('support timezone', () => {
        const defaultDate = new TinyDate(1739174063000);
        expect(defaultDate?.nativeDate).toEqual(new Date(1739174063000));
        expect(defaultDate.getHours()).toBe(15);
        expect(defaultDate['useTimeZone']).toBe('Asia/Shanghai');

        TinyDate.setDefaultTimeZone('America/Los_Angeles');
        const date = new TinyDate(1739174063000);
        expect(date['useTimeZone']).toBe('America/Los_Angeles');
        expect(defaultDate.getHours()).not.toBe(date.getHours());
        expect(date.getHours()).toBe(23);
    });

    it('should get date-fns locale', () => {
        expect(getDateFnsLocale(ThyLocaleType.enUs)).toEqual(dateFnsLocales[`enUS`]);
    });

    describe('#sortRangeValue', () => {
        it('should sort success', () => {
            const date1 = new TinyDate('2020-1-1');
            const date3 = new TinyDate('2021-2-2');
            expect(sortRangeValue([date, date1])).toEqual([date1, date]);
            expect(sortRangeValue([date1, date3])).toEqual([date1, date3]);
        });

        it('should sort by one date', () => {
            expect(sortRangeValue(date as unknown as TinyDate[])).toEqual(date as unknown as TinyDate[]);
        });
    });
});
