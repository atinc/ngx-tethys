import { isEmpty, isString } from './index';

const falsey = [, null, undefined, false, 0, NaN, ''];
const empties = [[], {}].concat(falsey.slice(1));

describe('is', () => {
    describe('#isEmpty', () => {
        it('should return `true` for empty values', function() {
            const expected = empties.map(value => {
                return true;
            });
            const actual = empties.map(isEmpty);

            expect(actual).toEqual(expected);

            expect(isEmpty(true)).toEqual(true);
            expect(isEmpty(Array.prototype.slice)).toEqual(true);

            expect(isEmpty(1)).toEqual(true);
            expect(isEmpty(NaN)).toEqual(true);
            expect(isEmpty(/x/)).toEqual(true);
            expect(isEmpty()).toEqual(true);

            // if (Buffer) {
            //     expect(isEmpty(new Buffer(0))).toEqual(true);
            //     expect(isEmpty(new Buffer(1))).toEqual(false);
            // }
        });

        it('should return `false` for non-empty values', function() {
            expect(isEmpty([0])).toEqual(false);
            expect(isEmpty({ a: 0 })).toEqual(false);
            expect(isEmpty('a')).toEqual(false);
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
});
