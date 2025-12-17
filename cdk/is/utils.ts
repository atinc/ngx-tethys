import { coerceElement } from '@angular/cdk/coercion';
import { ElementRef, TemplateRef } from '@angular/core';

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
    if (isUndefinedOrNull(value)) {
        return true;
    }
    if (isArray(value)) {
        return !value.length;
    }
    const tag = baseGetTag(value);
    if (tag == '[object Map]' || tag == '[object Set]') {
        return !value.size;
    }
    for (const key in value) {
        if (Object.hasOwnProperty.call(value, key)) {
            return false;
        }
    }
    return true;
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
    // eslint-disable-next-line no-empty
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

export function isBoolean(value: any): value is boolean {
    return value === true || value === false || (isObjectLike(value) && baseGetTag(value) === '[object Boolean]');
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

export function isFormElement<T = Element>(elementOrRef: ElementRef<T> | T): boolean {
    const element = coerceElement(elementOrRef);
    if (!(element instanceof HTMLElement)) {
        return false;
    }
    const name = element.nodeName.toLowerCase();
    const type = (element.getAttribute('type') || '').toLowerCase();
    return (
        name === 'select' ||
        name === 'textarea' ||
        (name === 'input' && type !== 'submit' && type !== 'reset' && type !== 'checkbox' && type !== 'radio' && type !== 'file') ||
        element.isContentEditable
    );
}

export function isMacPlatform(userAgent = navigator.userAgent) {
    return /macintosh|mac os x/i.test(userAgent);
}
