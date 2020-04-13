import { TinyDate } from './tiny-date';

describe('tiny-date', () => {
    const date = new TinyDate('2020-2-2 20:20:20');

    it('support getTime', () => expect(date.getTime()).toBe(date.nativeDate.getTime()));

    it('support getMilliseconds', () => expect(date.getMilliseconds()).toBe(date.nativeDate.getMilliseconds()));

    it('support isSame', () => {
        expect(date.isSame(new TinyDate('2020'), 'year')).toBeTruthy();

        expect(date.isSameMonth(new TinyDate('2020-2-2 2:00:00'))).toBeTruthy();

        expect(date.isSame(new TinyDate('2020-2-2 20:02:02'), 'hour')).toBeTruthy();
        expect(date.isSameHour(new TinyDate('2222-2-2 20:02:02'))).toBeFalsy();

        expect(date.isSame(new TinyDate('2020-2-2 20:20:02'), 'minute')).toBeTruthy();
        expect(date.isSameMinute(new TinyDate('2020-2-2 20:22:02'))).toBeFalsy();

        expect(date.isSame(new TinyDate('2020-2-2 20:20:20'), 'second')).toBeTruthy();
        expect(date.isSameSecond(new TinyDate('2021-2-2 20:20:20'))).toBeFalsy();
    });

    it('support isAfter', () => {
        expect(date.isAfterYear(null)).toBeFalsy();

        expect(date.isAfterYear(new TinyDate('2010'))).toBeTruthy();

        expect(date.isAfterMonth(new TinyDate('2019-2-2 20:20:20'))).toBeTruthy();

        expect(date.isAfterDay(new TinyDate('2020-2-1 20:20:20'))).toBeTruthy();

        expect(date.isAfterHour(new TinyDate('2020-2-1 20:20:20'))).toBeTruthy();
        expect(date.isAfterHour(new TinyDate('2020-2-2 19:20:20'))).toBeTruthy();

        expect(date.isAfterMinute(new TinyDate('2019-2-2 20:20:20'))).toBeTruthy();
        expect(date.isAfterMinute(new TinyDate('2020-1-2 20:20:20'))).toBeTruthy();
        expect(date.isAfterMinute(new TinyDate('2020-2-1 20:20:20'))).toBeTruthy();
        expect(date.isAfterMinute(new TinyDate('2020-2-2 19:20:20'))).toBeTruthy();
        expect(date.isAfterMinute(new TinyDate('2020-2-2 20:19:20'))).toBeTruthy();

        expect(date.isAfterSecond(new TinyDate('2000-2-2 20:20:20'))).toBeTruthy();
        expect(date.isAfterSecond(new TinyDate('2020-1-2 20:20:20'))).toBeTruthy();
        expect(date.isAfterSecond(new TinyDate('2020-2-1 20:20:20'))).toBeTruthy();
        expect(date.isAfterSecond(new TinyDate('2020-2-2 19:20:20'))).toBeTruthy();
        expect(date.isAfterSecond(new TinyDate('2020-2-2 20:19:20'))).toBeTruthy();
        expect(date.isAfterSecond(new TinyDate('2020-2-2 20:20:19'))).toBeTruthy();
    });

    it('support isBefore', () => {
        expect(date.isBeforeYear(null)).toBeFalsy();

        expect(date.isBeforeYear(new TinyDate('2100'))).toBeTruthy();

        expect(date.isBeforeMonth(new TinyDate('2100-2-2 20:20:20'))).toBeTruthy();
        expect(date.isBeforeMonth(new TinyDate('2020-3-2 20:20:20'))).toBeTruthy();

        expect(date.isBeforeDay(new TinyDate('2020-3-2 20:20:20'))).toBeTruthy();

        expect(date.isBeforeHour(new TinyDate('2100-2-2 20:20:20'))).toBeTruthy();
        expect(date.isBeforeHour(new TinyDate('2020-3-2 20:20:20'))).toBeTruthy();
        expect(date.isBeforeHour(new TinyDate('2020-2-3 20:20:20'))).toBeTruthy();
        expect(date.isBeforeHour(new TinyDate('2020-2-2 21:20:20'))).toBeTruthy();

        expect(date.isBeforeMinute(new TinyDate('2100-2-2 20:20:20'))).toBeTruthy();
        expect(date.isBeforeMinute(new TinyDate('2020-3-2 20:20:20'))).toBeTruthy();
        expect(date.isBeforeMinute(new TinyDate('2020-2-3 20:20:20'))).toBeTruthy();
        expect(date.isBeforeMinute(new TinyDate('2020-2-2 21:20:20'))).toBeTruthy();
        expect(date.isBeforeMinute(new TinyDate('2020-2-2 20:21:20'))).toBeTruthy();

        expect(date.isBeforeSecond(new TinyDate('2100-2-2 20:20:20'))).toBeTruthy();
        expect(date.isBeforeSecond(new TinyDate('2020-3-2 20:20:20'))).toBeTruthy();
        expect(date.isBeforeSecond(new TinyDate('2020-2-3 20:20:20'))).toBeTruthy();
        expect(date.isBeforeSecond(new TinyDate('2020-2-2 21:20:20'))).toBeTruthy();
        expect(date.isBeforeSecond(new TinyDate('2020-2-2 20:20:21'))).toBeTruthy();
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
});
