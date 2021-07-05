import { isString } from './index';

const falsey = [, null, undefined, false, 0, NaN, ''];

describe('is', () => {
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
});
