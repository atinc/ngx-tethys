import { CandyDate } from './candy-date';

describe('candy-date', () => {
    const date = new CandyDate('2020-2-2 20:20:20');

    it('support getTime', () => expect(date.getTime()).toBe(date.nativeDate.getTime()));

    it('support getMilliseconds', () => expect(date.getMilliseconds()).toBe(date.nativeDate.getMilliseconds()));

    it('support isSame', () => {
        expect(date.isSame(new CandyDate('2020'), 'year')).toBeTruthy();

        expect(date.isSameMonth(new CandyDate('2020-2-2 2:00:00'))).toBeTruthy();

        expect(date.isSame(new CandyDate('2020-2-2 20:02:02'), 'hour')).toBeTruthy();
        expect(date.isSameHour(new CandyDate('2222-2-2 20:02:02'))).toBeFalsy();

        expect(date.isSame(new CandyDate('2020-2-2 20:20:02'), 'minute')).toBeTruthy();
        expect(date.isSameMinute(new CandyDate('2020-2-2 20:22:02'))).toBeFalsy();

        expect(date.isSame(new CandyDate('2020-2-2 20:20:20'), 'second')).toBeTruthy();
        expect(date.isSameSecond(new CandyDate('2021-2-2 20:20:20'))).toBeFalsy();
    });

    it('support isAfter', () => {
        expect(date.isAfterYear(null)).toBeFalsy();

        expect(date.isAfterYear(new CandyDate('2010'))).toBeTruthy();

        expect(date.isAfterMonth(new CandyDate('2019-2-2 20:20:20'))).toBeTruthy();

        expect(date.isAfterDay(new CandyDate('2020-2-1 20:20:20'))).toBeTruthy();

        expect(date.isAfterHour(new CandyDate('2020-2-1 20:20:20'))).toBeTruthy();
        expect(date.isAfterHour(new CandyDate('2020-2-2 19:20:20'))).toBeTruthy();

        expect(date.isAfterMinute(new CandyDate('2019-2-2 20:20:20'))).toBeTruthy();
        expect(date.isAfterMinute(new CandyDate('2020-1-2 20:20:20'))).toBeTruthy();
        expect(date.isAfterMinute(new CandyDate('2020-2-1 20:20:20'))).toBeTruthy();
        expect(date.isAfterMinute(new CandyDate('2020-2-2 19:20:20'))).toBeTruthy();
        expect(date.isAfterMinute(new CandyDate('2020-2-2 20:19:20'))).toBeTruthy();

        expect(date.isAfterSecond(new CandyDate('2000-2-2 20:20:20'))).toBeTruthy();
        expect(date.isAfterSecond(new CandyDate('2020-1-2 20:20:20'))).toBeTruthy();
        expect(date.isAfterSecond(new CandyDate('2020-2-1 20:20:20'))).toBeTruthy();
        expect(date.isAfterSecond(new CandyDate('2020-2-2 19:20:20'))).toBeTruthy();
        expect(date.isAfterSecond(new CandyDate('2020-2-2 20:19:20'))).toBeTruthy();
        expect(date.isAfterSecond(new CandyDate('2020-2-2 20:20:19'))).toBeTruthy();
    });

    it('support isBefore', () => {
        expect(date.isBeforeYear(null)).toBeFalsy();

        expect(date.isBeforeYear(new CandyDate('2100'))).toBeTruthy();

        expect(date.isBeforeMonth(new CandyDate('2100-2-2 20:20:20'))).toBeTruthy();
        expect(date.isBeforeMonth(new CandyDate('2020-3-2 20:20:20'))).toBeTruthy();

        expect(date.isBeforeDay(new CandyDate('2020-3-2 20:20:20'))).toBeTruthy();

        expect(date.isBeforeHour(new CandyDate('2100-2-2 20:20:20'))).toBeTruthy();
        expect(date.isBeforeHour(new CandyDate('2020-3-2 20:20:20'))).toBeTruthy();
        expect(date.isBeforeHour(new CandyDate('2020-2-3 20:20:20'))).toBeTruthy();
        expect(date.isBeforeHour(new CandyDate('2020-2-2 21:20:20'))).toBeTruthy();

        expect(date.isBeforeMinute(new CandyDate('2100-2-2 20:20:20'))).toBeTruthy();
        expect(date.isBeforeMinute(new CandyDate('2020-3-2 20:20:20'))).toBeTruthy();
        expect(date.isBeforeMinute(new CandyDate('2020-2-3 20:20:20'))).toBeTruthy();
        expect(date.isBeforeMinute(new CandyDate('2020-2-2 21:20:20'))).toBeTruthy();
        expect(date.isBeforeMinute(new CandyDate('2020-2-2 20:21:20'))).toBeTruthy();

        expect(date.isBeforeSecond(new CandyDate('2100-2-2 20:20:20'))).toBeTruthy();
        expect(date.isBeforeSecond(new CandyDate('2020-3-2 20:20:20'))).toBeTruthy();
        expect(date.isBeforeSecond(new CandyDate('2020-2-3 20:20:20'))).toBeTruthy();
        expect(date.isBeforeSecond(new CandyDate('2020-2-2 21:20:20'))).toBeTruthy();
        expect(date.isBeforeSecond(new CandyDate('2020-2-2 20:20:21'))).toBeTruthy();
    });

    it('support static fromUnixTime', () => {
        const unixTime = date.getUnixTime();
        expect(CandyDate.fromUnixTime(unixTime).getUnixTime()).toBe(date.getUnixTime());
    });

    it('should throw error while putting invalid date input', () => {
        const errorMessage =
            'The input date type is not supported expect Date | string | number | { date: number; with_time: 0 | 1}, actual {}';
        expect(() => new CandyDate({} as any)).toThrowError(errorMessage);
    });
});
