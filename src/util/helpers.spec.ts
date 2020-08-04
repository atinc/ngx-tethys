import { clamp, keyBy, indexKeyBy, coerceBooleanProperty } from './helpers';

describe('#helper', () => {
    describe('#clamp', () => {
        it(`should be 0 when clamp -1`, () => {
            expect(clamp(-1)).toBe(0);
        });

        it(`should be 0 when clamp 0`, () => {
            expect(clamp(0)).toBe(0);
        });

        it(`should be 1 when clamp 1`, () => {
            expect(clamp(1)).toBe(1);
        });

        it(`should be 50 when clamp 50`, () => {
            expect(clamp(50)).toBe(50);
        });

        it(`should be 100 when clamp 100`, () => {
            expect(clamp(100)).toBe(100);
        });

        it(`should be 100 when clamp 101`, () => {
            expect(clamp(101)).toBe(100);
        });

        it(`should be 2 when clamp 1 with min=2`, () => {
            expect(clamp(1, 2)).toBe(2);
        });

        it(`should be 10 when clamp 11 with max=10`, () => {
            expect(clamp(11, undefined, 10)).toBe(10);
        });
    });

    describe('#hexToRgb', () => {
        it('should be', () => {
            // hexToRgb('')
        });
    });

    describe('#keyBy', () => {
        it('should be get correct result keyBy id', () => {
            const result = keyBy([{ id: 1, name: 'name 1' }], 'id');
            expect(result).toEqual({
                '1': { id: 1, name: 'name 1' }
            });
        });
    });

    describe('#indexKeyBy', () => {
        it('should be get correct index dictionary keyBy id', () => {
            const result = indexKeyBy(
                [
                    { id: 1, name: 'name 1' },
                    { id: 2, name: 'name 2' }
                ],
                'id'
            );
            expect(result).toEqual({
                '1': 0,
                '2': 1
            });
        });
    });

    fdescribe('#coerceBooleanProperty', () => {
        it('should return false when assign 0', () => {
            const result = coerceBooleanProperty(0);
            expect(result).toEqual(false);
        });
        it(`should return false when assign '0'`, () => {
            const result = coerceBooleanProperty('0');
            expect(result).toEqual(false);
        });
        it(`should return false when assign undefined`, () => {
            const result = coerceBooleanProperty(undefined);
            expect(result).toEqual(false);
        });
        it(`should return false when assign null`, () => {
            const result = coerceBooleanProperty(null);
            expect(result).toEqual(false);
        });
        it(`should return false when assign false`, () => {
            const result = coerceBooleanProperty(false);
            expect(result).toEqual(false);
        });
        it(`should return false when assign 'false'`, () => {
            const result = coerceBooleanProperty('false');
            expect(result).toEqual(false);
        });
        it(`should return false when assign ''`, () => {
            const result = coerceBooleanProperty('');
            expect(result).toEqual(false);
        });
        it(`should return true when assign true`, () => {
            const result = coerceBooleanProperty(true);
            expect(result).toEqual(true);
        });
        it(`should return true when assign 1`, () => {
            const result = coerceBooleanProperty(1);
            expect(result).toEqual(true);
        });
        it(`should return true when assign 'xx'`, () => {
            const result = coerceBooleanProperty('xx');
            expect(result).toEqual(true);
        });
    });
});
