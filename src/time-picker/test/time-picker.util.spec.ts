import { isValidLimit, parseCustomizeTimeInput, setTime } from 'ngx-tethys/time-picker';
import { startOfDay, TinyDate } from 'ngx-tethys/util';
import { Time, TimePickerComponentState } from '../inner/inner-time-picker.class';

describe('ThyTimePickerUtil', () => {
    describe('utils function test', () => {
        describe('parseCustomizeTimeInput', () => {
            it('should parse HH:mm:ss', () => {
                expect(parseCustomizeTimeInput('10:20:30', 'HH:mm:ss')).toEqual({ h: 10, m: 20, s: 30 });
                expect(parseCustomizeTimeInput('00:00:00', 'HH:mm:ss')).toEqual({ h: 0, m: 0, s: 0 });
                expect(parseCustomizeTimeInput('23:59:59', 'HH:mm:ss')).toEqual({ h: 23, m: 59, s: 59 });
                expect(parseCustomizeTimeInput('1:2:3', 'HH:mm:ss')).toEqual({ h: 1, m: 2, s: 3 });
            });

            it('should parse HH:mm and default seconds to 0', () => {
                expect(parseCustomizeTimeInput('08:20', 'HH:mm')).toEqual({ h: 8, m: 20, s: 0 });
                expect(parseCustomizeTimeInput('23:59', 'HH:mm')).toEqual({ h: 23, m: 59, s: 0 });
            });

            it('should parse mm:ss and default hours to 0', () => {
                expect(parseCustomizeTimeInput('45:30', 'mm:ss')).toEqual({ h: 0, m: 45, s: 30 });
                expect(parseCustomizeTimeInput('00:00', 'mm:ss')).toEqual({ h: 0, m: 0, s: 0 });
                expect(parseCustomizeTimeInput('59:59', 'mm:ss')).toEqual({ h: 0, m: 59, s: 59 });
            });

            it('should reject out-of-range and invalid input', () => {
                expect(parseCustomizeTimeInput('24:00:00', 'HH:mm:ss')).toBeNull();
                expect(parseCustomizeTimeInput('12:60:00', 'HH:mm:ss')).toBeNull();
                expect(parseCustomizeTimeInput('12:30:60', 'HH:mm:ss')).toBeNull();
                expect(parseCustomizeTimeInput('12:ab:00', 'HH:mm:ss')).toBeNull();
                expect(parseCustomizeTimeInput('10:20', 'HH:mm:ss')).toBeNull();
                expect(parseCustomizeTimeInput('10:20:30:00', 'HH:mm:ss')).toBeNull();
                expect(parseCustomizeTimeInput('100:20:30', 'HH:mm:ss')).toBeNull();
                expect(parseCustomizeTimeInput('45:30', 'HH:mm')).toBeNull();
                expect(parseCustomizeTimeInput('', 'HH:mm:ss')).toBeNull();
                expect(parseCustomizeTimeInput('10:20:30', 'xx:yy:zz')).toBeNull();
            });
        });

        describe('isValidLimit', () => {
            it('min false', () => {
                const testDate = new Date('2013-11-05');
                const controls = { min: new Date() } as unknown as TimePickerComponentState;
                expect(isValidLimit(controls, testDate)).toBeFalsy();
            });
            it('max false', () => {
                const testDate = new Date('2013-11-05');
                const controls = { max: new Date('2013-11-04') } as unknown as TimePickerComponentState;
                expect(isValidLimit(controls, testDate)).toBeFalsy();
            });
            it('true', () => {
                const testDate = new Date('2013-11-05');
                const controls = {} as unknown as TimePickerComponentState;
                expect(isValidLimit(controls, testDate)).toEqual(true);
            });
        });

        describe('setTime', () => {
            it('return value', () => {
                const opts = {} as Time;
                expect(setTime(null, opts).toString()).toEqual(new TinyDate(startOfDay(new Date())).nativeDate.toString());
            });

            it('return date with 2013-11-05 11:05:02', () => {
                const date = new Date('2013-11-05');
                const opts = {
                    hour: 11,
                    minute: 5,
                    seconds: 2,
                    isPM: false
                } as Time;
                expect(setTime(date, opts)).toEqual(new Date(2013, 10, 5, 11, 5, 2, date.getMilliseconds()));
            });

            it('return date with 2013-11-05 23:05:02', () => {
                const date = new Date('2013-11-05');
                const opts = {
                    hour: 11,
                    minute: 5,
                    seconds: 2,
                    isPM: true
                } as Time;
                expect(setTime(date, opts)).toEqual(new Date(2013, 10, 5, 23, 5, 2, date.getMilliseconds()));
            });
        });
    });
});
