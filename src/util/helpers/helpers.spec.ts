import { clamp, keyBy, indexKeyBy, coerceBooleanProperty, isString, hexToRgb, concatArray } from './helpers';

const falsey = [, null, undefined, false, 0, NaN, ''];

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
        it('should return rgb(0, 0, 0) for #000', () => {
            expect(hexToRgb('#000')).toEqual('rgb(0, 0, 0)');
        });

        it('should return rgb(255, 255, 255) for #fff', () => {
            expect(hexToRgb('#fff')).toEqual('rgb(255, 255, 255)');
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

    describe('#coerceBooleanProperty', () => {
        it('should return false when assign 0', () => {
            const result = coerceBooleanProperty(0);
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
        it(`should return true when assign ''`, () => {
            const result = coerceBooleanProperty('');
            expect(result).toEqual(true);
        });
        it(`should return true when assign '0'`, () => {
            const result = coerceBooleanProperty('0');
            expect(result).toEqual(true);
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

    describe('#isString', () => {
        it('should return `true` for strings', function() {
            expect(isString('a')).toEqual(true);
            expect(isString(Object('a'))).toEqual(true);
            expect(isString(new String('a'))).toEqual(true);
        });

        it('should return `false` for non-strings', function() {
            const expected = falsey.map(function(value) {
                return value === '';
            });

            const actual = falsey.map(function(value, index) {
                return isString(value);
            });

            //  [undefined, false, false, false, false, false, true]
            expect(actual).toEqual(expected);

            expect(isString(Object.create({}))).toEqual(false);
            expect(isString([1, 2, 3])).toEqual(false);
            expect(isString(true)).toEqual(false);
            expect(isString(new Date())).toEqual(false);
            expect(isString(new Error())).toEqual(false);
            expect(isString(function() {})).toEqual(false);
            expect(isString({ '0': 1, length: 1 })).toEqual(false);
            expect(isString(1)).toEqual(false);
            expect(isString(/x/)).toEqual(false);
            expect(isString(Symbol('xxx'))).toEqual(false);
        });
    });

    describe('#concatArray', () => {
        it('should get [1, 2, 3] when concat [2, 3] to [1]', function() {
            expect(concatArray([2, 3], [1])).toEqual([1, 2, 3]);
        });

        it('should get ["1", "2", "3"] when concat ["2", "3"] to ["1"]', function() {
            expect(concatArray(['2', '3'], ['1'])).toEqual(['1', '2', '3']);
        });

        it('should get [1, 2, 3] when concat [2, 3] to 1', function() {
            expect(concatArray([2, 3], 1)).toEqual([1, 2, 3]);
        });

        it('should get [2, 3] when concat [2, 3] to undefined or null or empty', function() {
            expect(concatArray([2, 3], undefined)).toEqual([2, 3]);
            expect(concatArray([2, 3], null)).toEqual([2, 3]);
            expect(concatArray([2, 3], '' as any)).toEqual([2, 3]);
        });

        it('should get [1 2] when concat 2 to [1]', function() {
            expect(concatArray(2, [1])).toEqual([1, 2]);
        });

        it('should get ["1"] when concat undefined or null or empty to ["1"]', function() {
            expect(concatArray(undefined, ['1'])).toEqual(['1']);
            expect(concatArray(null, ['1'])).toEqual(['1']);
            expect(concatArray('', ['1'])).toEqual(['1']);
        });
    });
});
