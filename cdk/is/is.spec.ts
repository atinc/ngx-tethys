import { ElementRef, EmbeddedViewRef, TemplateRef } from '@angular/core';
import {
    isBoolean,
    isDate,
    isElementRef,
    isEmpty,
    isFormElement,
    isHTMLElement,
    isMacPlatform,
    isNumber,
    isObject,
    isString,
    isTemplateRef
} from '@tethys/cdk';

const falsey = [, null, undefined, false, 0, NaN, ''];
const empties = [[], {}].concat(falsey.slice(1));

describe('is', () => {
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
            expect(isEmpty({ a: 0 })).toEqual(false);
            expect(isEmpty('a')).toEqual(false);
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

    it('should get correct value for isFormElement', () => {
        const createInputElement = function (type: string) {
            const input = document.createElement('input');
            input.setAttribute('type', type);
            return input;
        };
        const contentEditableElement = document.createElement('div');
        const childContentEditableElement = document.createElement('div');
        contentEditableElement.setAttribute('contenteditable', 'true');
        contentEditableElement.appendChild(childContentEditableElement);
        [
            document.createElement('select'),
            document.createElement('textarea'),
            createInputElement('text'),
            createInputElement('number'),
            new ElementRef(childContentEditableElement)
        ].forEach(value => {
            expect(isFormElement<HTMLElement>(value)).toBeTruthy(`${value} is not form element`);
        });
        [
            document.createElement('div'),
            createInputElement('submit'),
            createInputElement('reset'),
            createInputElement('checkbox'),
            createInputElement('radio'),
            createInputElement('file')
        ].forEach(value => {
            expect(isFormElement<HTMLElement>(value)).toBeFalsy(`${value} is not form element`);
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

    it('should get correct value for isMacPlatform', () => {
        spyOnProperty(window.navigator, 'userAgent').and.returnValue(
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.1.2 Safari/605.1.15'
        );
        expect(isMacPlatform()).toBeTruthy();
    });
});
