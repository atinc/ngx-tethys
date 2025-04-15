import { ElementRef, EmbeddedViewRef, TemplateRef } from '@angular/core';
import {
    clamp,
    coerceBooleanProperty,
    coerceCssPixelValue,
    concatArray,
    dateToUnixTimestamp,
    hasTimeInStringDate,
    hexToRgb,
    htmlElementIsEmpty,
    indexKeyBy,
    isBoolean,
    isElementRef,
    isEmpty,
    isFloat,
    isHTMLElement,
    isNumber,
    isObject,
    isString,
    isTemplateRef,
    keyBy,
    shallowEqual,
    isDate
} from 'ngx-tethys/util';

const falsey = [, null, undefined, false, 0, NaN, ''];
const empties = [[], {}].concat(falsey.slice(1));

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
        it('should return `true` for strings', function () {
            expect(isString('a')).toEqual(true);
            expect(isString(Object('a'))).toEqual(true);
            expect(isString(new String('a'))).toEqual(true);
        });

        it('should return `false` for non-strings', function () {
            const expected = falsey.map(function (value) {
                return value === '';
            });

            const actual = falsey.map(function (value, index) {
                return isString(value);
            });

            //  [undefined, false, false, false, false, false, true]
            expect(actual).toEqual(expected);

            expect(isString(Object.create({}))).toEqual(false);
            expect(isString([1, 2, 3])).toEqual(false);
            expect(isString(true)).toEqual(false);
            expect(isString(new Date())).toEqual(false);
            expect(isString(new Error())).toEqual(false);
            expect(isString(function () {})).toEqual(false);
            expect(isString({ '0': 1, length: 1 })).toEqual(false);
            expect(isString(1)).toEqual(false);
            expect(isString(/x/)).toEqual(false);
            expect(isString(Symbol('xxx'))).toEqual(false);
        });
    });

    describe('#concatArray', () => {
        it('should get [1, 2, 3] when concat [2, 3] to [1]', function () {
            expect(concatArray([2, 3], [1])).toEqual([1, 2, 3]);
        });

        it('should get ["1", "2", "3"] when concat ["2", "3"] to ["1"]', function () {
            expect(concatArray(['2', '3'], ['1'])).toEqual(['1', '2', '3']);
        });

        it('should get [1, 2, 3] when concat [2, 3] to 1', function () {
            expect(concatArray([2, 3], 1)).toEqual([1, 2, 3]);
        });

        it('should get [2, 3] when concat [2, 3] to undefined or null or empty', function () {
            expect(concatArray([2, 3], undefined)).toEqual([2, 3]);
            expect(concatArray([2, 3], null)).toEqual([2, 3]);
            expect(concatArray([2, 3], '' as any)).toEqual([2, 3]);
        });

        it('should get [1 2] when concat 2 to [1]', function () {
            expect(concatArray(2, [1])).toEqual([1, 2]);
        });

        it('should get ["1"] when concat undefined or null or empty to ["1"]', function () {
            expect(concatArray(undefined, ['1'])).toEqual(['1']);
            expect(concatArray(null, ['1'])).toEqual(['1']);
            expect(concatArray('', ['1'])).toEqual(['1']);
        });
    });

    describe('#isEmpty', () => {
        it('should return `true` for empty values', function () {
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

        it('should return `false` for non-empty values', function () {
            expect(isEmpty([0])).toEqual(false);
            // expect(isEmpty({ a: 0 })).toEqual(false);
            // expect(isEmpty('a')).toEqual(false);
        });
    });

    describe('#isString', () => {
        it('should return `true` for strings', function () {
            expect(isString('a')).toEqual(true);
            expect(isString(Object('a'))).toEqual(true);
            expect(isString(new String('a'))).toEqual(true);
        });

        it('should return `false` for non-strings', function () {
            const expected = falsey.map(function (value) {
                return value === '';
            });

            const actual = falsey.map(function (value, index) {
                return isString(value);
            });

            //  [undefined, false, false, false, false, false, true]
            expect(actual).toEqual(expected);

            expect(isString(Object.create({}))).toEqual(false);
            expect(isString([1, 2, 3])).toEqual(false);
            expect(isString(true)).toEqual(false);
            expect(isString(new Date())).toEqual(false);
            expect(isString(new Error())).toEqual(false);
            expect(isString(function () {})).toEqual(false);
            expect(isString({ '0': 1, length: 1 })).toEqual(false);
            expect(isString(1)).toEqual(false);
            expect(isString(/x/)).toEqual(false);
            expect(isString(Symbol('xxx'))).toEqual(false);
        });
    });

    it('should get correct value for isNumber', () => {
        [1, -10, 0, NaN].forEach(value => {
            expect(isNumber(value)).toBeTruthy(`${value} is not number`);
        });

        ['0', '', undefined, null].forEach(value => {
            expect(isNumber(value)).toBeFalsy(`${value} is number`);
        });
    });

    it('should get correct value for isObject', () => {
        [{}, { name: 1 }, new Object()].forEach(value => {
            expect(isObject(value)).toBeTruthy(`${value} is not object`);
        });

        [1, 'xxx', false, true, undefined, null, NaN].forEach(value => {
            expect(isObject(value)).toBeFalsy(`${value} is object`);
        });
    });

    it('should get correct value for isDate', () => {
        [new Date(), new Date('2020-10-24')].forEach(value => {
            expect(isDate(value)).toBeTruthy(`${value} is not date`);
        });

        [1, 'xxx', false, true, undefined, null, NaN].forEach(value => {
            expect(isDate(value)).toBeFalsy(`${value} is date`);
        });
    });

    it('should get correct value for isBoolean', () => {
        [true, false].forEach(value => {
            expect(isBoolean(value)).toBeTruthy(`${value} is not boolean`);
        });

        [1, 'xxx', undefined, null, NaN, {}].forEach(value => {
            expect(isBoolean(value)).toBeFalsy(`${value} is boolean`);
        });
    });

    it('should get correct value for isHTMLElement', () => {
        [document.createElement('div')].forEach(value => {
            expect(isHTMLElement(value)).toBeTruthy(`${value} is not element`);
        });

        [1, 'xxx', undefined, null, NaN, {}].forEach(value => {
            expect(isHTMLElement(value)).toBeFalsy(`${value} is element`);
        });
    });

    it('should get correct value for isTemplateRef', () => {
        class MyTemplateRef extends TemplateRef<unknown> {
            get elementRef(): ElementRef<any> {
                throw new Error('Method not implemented.');
            }
            createEmbeddedView(context: unknown): EmbeddedViewRef<unknown> {
                throw new Error('Method not implemented.');
            }
        }

        [new MyTemplateRef()].forEach(value => {
            expect(isTemplateRef(value)).toBeTruthy(`${value} is not TemplateRef`);
        });

        [1, 'xxx', undefined, null, NaN, {}].forEach(value => {
            expect(isTemplateRef(value)).toBeFalsy(`${value} is TemplateRef`);
        });
    });

    it('should get correct value for isElementRef', () => {
        [new ElementRef(null)].forEach(value => {
            expect(isElementRef(value)).toBeTruthy(`${value} is not ElementRef`);
        });

        [1, 'xxx', undefined, null, NaN, {}].forEach(value => {
            expect(isElementRef(value)).toBeFalsy(`${value} is ElementRef`);
        });
    });

    describe('#coerceCssPixelValue', () => {
        it('should add pixel units to a number value', () => {
            expect(coerceCssPixelValue(1337)).toBe('1337px');
        });

        it('should add pixel units to a string number value', () => {
            expect(coerceCssPixelValue('1337')).toBe('1337px');
        });

        it('should ignore string values', () => {
            expect(coerceCssPixelValue('1337rem')).toBe('1337rem');
        });

        it('should return an empty string for null', () => {
            expect(coerceCssPixelValue(null)).toBe('');
        });

        it('should return an empty string for undefined', () => {
            expect(coerceCssPixelValue(undefined)).toBe('');
        });
    });

    describe('#shallowEqual', () => {
        it('should get true with same reference', () => {
            const obj1 = new Object();
            expect(shallowEqual(obj1, obj1)).toBeTruthy();
        });

        it('should get true for same value', () => {
            expect(shallowEqual({ id: 1, name: 'hello' }, { id: 1, name: 'hello' })).toBeTruthy();
        });

        it('should get false for different value', () => {
            expect(shallowEqual({ id: 1, name: 'hello' }, { id: 1, name: 'hello1' })).toBeFalsy();
        });

        it('should get false with different keys', () => {
            expect(shallowEqual({ id: 1, name: 'hello' }, { id: 1 })).toBeFalsy();
        });

        it('should get false with not own property', () => {
            const obj: any = new Object({ id: 1 });
            expect(shallowEqual({ id: 1, toString: obj.toString }, obj)).toBeFalsy();
        });

        it('should get false for values', () => {
            [
                [null, undefined],
                [undefined, null],
                [100, null],
                [true, null]
            ].forEach(([obj1, obj2]) => {
                expect(shallowEqual(obj1 as unknown, obj2 as unknown)).toBeFalsy();
            });
        });
    });

    describe('#dateToUnixTimestamp', () => {
        it('should convert unix timestamp for 1632730169000', () => {
            expect(dateToUnixTimestamp(1632730169000)).toEqual(1632730169);
        });

        it('should convert unix timestamp for 1632730169', () => {
            expect(dateToUnixTimestamp(1632730169)).toEqual(1632730169);
        });

        it('should convert unix timestamp for 2021-09-27 16:09:24', () => {
            expect([1632758964, 1632730164].includes(dateToUnixTimestamp(new Date('2021-09-27 16:09:24')))).toEqual(true);
        });
    });

    describe('#htmlElementIsEmpty', () => {
        it('should get true for empty element', () => {
            expect(htmlElementIsEmpty(document.createElement('div'))).toEqual(true);
        });

        it('should get false when has ELEMENT_NODE', () => {
            const element = document.createElement('div');
            element.innerHTML = '<span>hello</span>';
            expect(htmlElementIsEmpty(element)).toEqual(false);
        });

        it('should get false when has TEXT_NODE', () => {
            const element = document.createElement('div');
            element.textContent = 'hello';
            expect(htmlElementIsEmpty(element)).toEqual(false);
        });

        it('should get true when has COMMENT_NODE', () => {
            const element = document.createElement('div');
            element.appendChild(document.createComment('comment'));
            expect(htmlElementIsEmpty(element)).toEqual(true);
        });
    });

    describe('#isFloat', () => {
        it('should return `true` for float values', () => {
            ['123', '123.456', '.456', '5e6', '5e-6', '5E+6', '7.e8', '9.0E-10', '.11e12'].forEach(value => {
                expect(isFloat(value)).toEqual(true);
            });
        });

        it('should return `false` for float values', () => {
            ['123a', '', undefined, null].forEach(value => {
                expect(isFloat(value)).toEqual(false);
            });
        });
    });

    describe('#hasTimeInStringDate', () => {
        it('should return `true` for date strings with time information', () => {
            const dateStringsWithTime = [
                '2025-04-10 21:26',
                '2025/04/10 21:26',
                '2025年04月10日 21时26分',
                '2025年04月10日 21:26',
                'Apr 10, 2025 21:26',
                '10 Apr 2025 21:26',
                '2025-04-10T21:26:00'
            ];

            dateStringsWithTime.forEach(value => {
                expect(hasTimeInStringDate(value)).toEqual(true, `${value} should be recognized as containing time`);
            });
        });

        it('should return `false` for date strings without time information', () => {
            const dateStringsWithoutTime = [
                '2025-04-10',
                '2025/04/10',
                '2025年04月10日',
                'Apr 10, 2025',
                '10 Apr 2025',
                '',
                null,
                undefined
            ];

            dateStringsWithoutTime.forEach(value => {
                expect(hasTimeInStringDate(value)).toEqual(false, `${value} should be recognized as not containing time`);
            });
        });
    });
});
