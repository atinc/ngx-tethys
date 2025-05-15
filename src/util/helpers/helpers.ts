import { _isNumberValue, coerceCssPixelValue as coerceCssPixel } from '@angular/cdk/coercion';
import { ElementRef, TemplateRef } from '@angular/core';

export type ThyBoolean = boolean | string | number;

export function isUndefined(value: any): value is undefined {
    return value === undefined;
}

export function isNull(value: any): value is null {
    return value === null;
}

export function isUndefinedOrNull(value: any): value is undefined | null {
    return isUndefined(value) || isNull(value);
}

export function isArray<T = any>(value: any): value is Array<T> {
    return value && baseGetTag(value) === '[object Array]';
}

export function isEmpty(value?: any): boolean {
    return !(isArray(value) && value.length > 0);
}

export function isString(value?: any): value is string {
    return typeof value == 'string' || (!isArray(value) && isObjectLike(value) && baseGetTag(value) === '[object String]');
}

function isObjectLike(value: any): value is object {
    return value !== null && typeof value === 'object';
}

function baseGetTag(value: any) {
    const objectProto = Object.prototype;
    const hasOwnProperty = objectProto.hasOwnProperty;
    const toString = objectProto.toString;
    const symToStringTag = typeof Symbol !== 'undefined' ? Symbol.toStringTag : undefined;

    if (value == null) {
        return value === undefined ? '[object Undefined]' : '[object Null]';
    }
    if (!(symToStringTag && symToStringTag in Object(value))) {
        return toString.call(value);
    }
    const isOwn = hasOwnProperty.call(value, symToStringTag);
    const tag = value[symToStringTag];
    let unmasked = false;
    try {
        value[symToStringTag] = undefined;
        unmasked = true;
    } catch (e) {}

    const result = toString.call(value);
    if (unmasked) {
        if (isOwn) {
            value[symToStringTag] = tag;
        } else {
            delete value[symToStringTag];
        }
    }
    return result;
}

export function isNumber(value: any): value is number {
    return typeof value === 'number' || (isObjectLike(value) && baseGetTag(value) === '[object Number]');
}

export function isObject(value: any): value is object {
    // Avoid a V8 JIT bug in Chrome 19-20.
    // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
    const type = typeof value;
    return !!value && (type === 'object' || type === 'function');
}

export function isFunction(value: any): value is Function {
    const type = typeof value;
    return !!value && type === 'function';
}

export function isDate(value: any): value is Date {
    const type = typeof value;
    return !!value && type === 'object' && !!value.getTime;
}

export function coerceArray<T>(value: T | T[]): T[] {
    return Array.isArray(value) ? value : [value];
}

export function get(object: any, path: string, defaultValue?: any): any {
    const paths = path.split('.');
    let result = object[paths.shift()];
    while (result && paths.length) {
        result = result[paths.shift()];
    }
    return result === undefined ? defaultValue : result;
}

export function set(object: any, path: string, value: any): void {
    if (object == null) {
        return object;
    }
    const paths = path.split('.');
    let index = -1;
    const length = paths.length;
    const lastIndex = length - 1;
    let nested = object;
    while (nested !== null && ++index < length) {
        const key = paths[index];
        if (isObject(nested)) {
            if (index === lastIndex) {
                nested[key] = value;
                nested = nested[key];
                break;
            } else {
                if (nested[key] == null) {
                    nested[key] = {};
                }
            }
        }
        nested = nested[key];
    }
    return object;
}

export function isBoolean(value: any): value is boolean {
    return value === true || value === false || (isObjectLike(value) && baseGetTag(value) === '[object Boolean]');
}

export function isClass(value: any): value is Function {
    return isFunction(value) && /^\s*class\s+/.test(value.toString());
}

export function htmlElementIsEmpty(element: HTMLElement) {
    if (element && element.childNodes) {
        const nodes = element.childNodes;
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            if (node.nodeType === Node.ELEMENT_NODE && (node as HTMLElement).outerHTML.toString().trim().length !== 0) {
                return false;
            } else if (node.nodeType === Node.TEXT_NODE && node.textContent.toString().trim().length !== 0) {
                return false;
            } else if (node.nodeType !== Node.COMMENT_NODE) {
                return false;
            }
        }
    }
    return true;
}

export function hexToRgb(hexValue: string, alpha?: number): string {
    const rgx = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    const hex = hexValue.replace(rgx, (m: any, r: any, g: any, b: any) => r + r + g + g + b + b);
    const rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!rgb) return;
    const resultR = parseInt(rgb[1], 16);
    const resultG = parseInt(rgb[2], 16);
    const resultB = parseInt(rgb[3], 16);
    if (!isUndefinedOrNull(alpha)) {
        return `rgba(${resultR}, ${resultG}, ${resultB}, ${alpha})`;
    } else {
        return `rgb(${resultR}, ${resultG}, ${resultB})`;
    }
}

export function dateToUnixTimestamp(date: Date | number): number {
    if (isNumber(date)) {
        if (date.toString().length === 10) {
            return date as number;
        } else {
            return parseInt(((date as number) / 1000).toFixed(0), 10);
        }
    } else {
        return parseInt(((date as Date).getTime() / 1000).toFixed(0), 10);
    }
}

export function clamp(value: number, min = 0, max = 100) {
    return Math.max(min, Math.min(max, value));
}

export function keyBy<T>(array: T[], key: T extends object ? keyof T : never): { [key: string]: T } {
    const result: { [key: string]: T } = {};
    array.forEach(item => {
        const keyValue = item[key];
        (result as any)[keyValue] = item;
    });
    return result;
}

export function indexKeyBy<T>(array: T[], key: T extends object ? keyof T : never): { [key: string]: number } {
    const result: { [key: string]: number } = {};
    array.forEach((item, index) => {
        const keyValue = item[key];
        (result as any)[keyValue] = index;
    });
    return result;
}

function upperFirst(string: string): string {
    return string.slice(0, 1).toUpperCase() + string.slice(1);
}

export function camelCase(values: string[]): string {
    if (isArray(values)) {
        return values.reduce((result, word, index) => {
            word = word.toLowerCase();
            return result + (index ? upperFirst(word) : word);
        }, '');
    } else {
        return;
    }
}

export function generateRandomStr() {
    return Math.random().toString(36).substring(2);
}

export function isTemplateRef<C = any>(value: any): value is TemplateRef<C> {
    return value instanceof TemplateRef;
}

export function isHTMLElement(value: any): value is HTMLElement {
    return value instanceof HTMLElement;
}

export function isElementRef(value: any): value is ElementRef {
    return value instanceof ElementRef;
}

/**
 * fix angular cdk's coerceBooleanProperty will transform 0 to true
 */
export function coerceBooleanProperty(value: ThyBoolean): boolean {
    if (value === '' || (value && value !== 'false')) {
        return true;
    } else {
        return false;
    }
}

export type FunctionProp<T> = (...args: any[]) => T;

/**
 * @deprecated Please use Angular cdk's coerceNumberProperty instead
 */
export function coerceNumberValue(value: number | string): number;
/**
 * @deprecated Please use Angular cdk's coerceNumberProperty instead
 */
export function coerceNumberValue<D>(value: number | string, fallback: D): number | D;
/**
 * @deprecated Please use Angular cdk's coerceNumberProperty instead
 */
export function coerceNumberValue(value: number | string, fallbackValue: number = 0): number {
    return _isNumberValue(value) ? Number(value) : fallbackValue;
}

/**
 * @deprecated Please use Angular cdk's coerceCssPixelValue instead
 */
export function coerceCssPixelValue(value: number | string): string {
    value = _isNumberValue(value) ? Number(value) : value;
    return coerceCssPixel(value);
}

export function valueFunctionProp<T>(prop: FunctionProp<T>, ...args: any[]): T {
    return typeof prop === 'function' ? prop(...args) : prop;
}

export function shallowEqual(objA?: Record<string, any>, objB?: Record<string, any>): boolean {
    if (objA === objB) {
        return true;
    }

    if (typeof objA !== 'object' || !objA || typeof objB !== 'object' || !objB) {
        return false;
    }

    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) {
        return false;
    }

    const bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);

    for (let idx = 0; idx < keysA.length; idx++) {
        const key = keysA[idx];
        if (!bHasOwnProperty(key)) {
            return false;
        }
        if (objA[key] !== objB[key]) {
            return false;
        }
    }

    return true;
}

export function concatArray<TItem>(items: TItem | TItem[], originalItems: TItem | TItem[] = []): TItem[] {
    let _originalItems: TItem[] = [];
    if (!originalItems) {
        _originalItems = [];
    } else {
        _originalItems = coerceArray(originalItems);
    }
    if (items) {
        if (isArray(items)) {
            return [..._originalItems, ...items];
        } else {
            return [..._originalItems, items];
        }
    } else {
        return _originalItems;
    }
}

export function humanizeBytes(bytes: number, noSpace = false, fractionDigits = 1): string {
    if (bytes === 0) {
        return '0 Byte';
    }

    const k = 1024;
    const sizes: string[] = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
    const i: number = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(fractionDigits)) + (noSpace ? '' : ' ') + sizes[i];
}

export function isFloat(value: string): boolean {
    if (!value) {
        return false;
    }

    return /^[-+]?([0-9]+([.][0-9]*)?|[.][0-9]+)([Ee][-+]?[0-9]+)?$/.test(value);
}

export function hasTimeInStringDate(dateString: string): boolean {
    const standardFormat = /\d{4}[-/]\d{1,2}[-/]\d{1,2}\s+\d{1,2}:\d{1,2}/;
    const chineseFormat = /\d{4}年\d{1,2}月\d{1,2}日?\s+\d{1,2}[时:]\d{1,2}[分]?/;
    const reverseEnglishFormat = /\d{1,2}\s+[A-Za-z]{3,}\s+\d{4}\s+\d{1,2}:\d{1,2}/;
    const englishFormat = /[A-Za-z]{3,}\s+\d{1,2},?\s+\d{4}\s+\d{1,2}:\d{1,2}/;
    const isoFormat = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/;

    return (
        standardFormat.test(dateString) ||
        chineseFormat.test(dateString) ||
        reverseEnglishFormat.test(dateString) ||
        englishFormat.test(dateString) ||
        isoFormat.test(dateString)
    );
}
