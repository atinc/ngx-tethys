import { startOfDay, TinyDate } from 'ngx-tethys/util';
import { isValidLimit, setTime } from 'ngx-tethys/time-picker';
import { Time, TimePickerComponentState } from '../inner/inner-time-picker.class';

describe('ThyTimePickerUtil', () => {
    describe('utils function test', () => {
        describe('isValidLimit', () => {
            it('min false', () => {
                const testDate = new Date('2013-11-05');
                const controls = { min: new Date() } as TimePickerComponentState;
                expect(isValidLimit(controls, testDate)).toBeFalsy();
            });
            it('max false', () => {
                const testDate = new Date('2013-11-05');
                const controls = { max: new Date('2013-11-04') } as TimePickerComponentState;
                expect(isValidLimit(controls, testDate)).toBeFalsy();
            });
            it('true', () => {
                const testDate = new Date('2013-11-05');
                const controls = {} as TimePickerComponentState;
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
