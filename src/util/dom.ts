import { ElementRef } from '@angular/core';
import * as helpers from './helpers';

const proto = Element.prototype;
const vendor =
    proto.matches ||
    (proto as any).matchesSelector ||
    proto.webkitMatchesSelector ||
    (proto as any).mozMatchesSelector ||
    (proto as any).msMatchesSelector ||
    (proto as any).oMatchesSelector;

/**
 * Match `el` to `selector`.
 */
export function match(el: any, selector: string) {
    if (vendor) {
        return vendor.call(el, selector);
    }
    const nodes = el.parentNode.querySelectorAll(selector);
    for (let i = 0; i < nodes.length; i++) {
        if (nodes[i] === el) {
            return true;
        }
    }
    return false;
}

export function isDocument(element: any) {
    return (
        (typeof HTMLDocument !== 'undefined' && element instanceof HTMLDocument) ||
        (element.nodeType && element.nodeType === element.DOCUMENT_NODE)
    );
}

export function isElement(element: any) {
    return (
        (typeof HTMLElement !== 'undefined' && element instanceof HTMLElement) ||
        (element.nodeType && element.nodeType === element.ELEMENT_NODE)
    );
}

export function getWindow(elem: any) {
    return elem != null && elem === elem.window ? elem : elem.nodeType === 9 && elem.defaultView;
}

export function getElementOffset(elem: HTMLElement) {
    let docElem, win, rect, doc;

    if (!elem) {
        return;
    }
    // Support: IE<=11+
    // Running getBoundingClientRect on a
    // disconnected node in IE throws an error
    if (!elem.getClientRects().length) {
        return { top: 0, left: 0 };
    }
    rect = elem.getBoundingClientRect();

    // Make sure element is not hidden (display: none)
    if (rect.width || rect.height) {
        doc = elem.ownerDocument;
        win = getWindow(doc);
        docElem = doc.documentElement;

        return {
            top: rect.top + win.pageYOffset - docElem.clientTop,
            left: rect.left + win.pageXOffset - docElem.clientLeft,
            height: rect.height,
            width: rect.width
        };
    }
    return rect;
}

export function getOffset(element: HTMLElement, container: HTMLElement | Window): { left: number; top: number } | null {
    if (!element || !element.getClientRects().length) {
        return null;
    }
    const rect = element.getBoundingClientRect();

    if (rect.width || rect.height) {
        if (container === window) {
            const documentElement = element.ownerDocument!.documentElement!;
            return {
                top: rect.top - documentElement.clientTop,
                left: rect.left - documentElement.clientLeft
            };
        }
        const containerRect = (container as HTMLElement).getBoundingClientRect();
        return {
            top: rect.top - containerRect.top,
            left: rect.left - containerRect.left
        };
    }

    return rect;
}

export function getElementOuterHeight(element: any) {
    const _element = element.documentElement ? element.documentElement : element;
    let height = _element.clientHeight;
    const computedStyle = window.getComputedStyle(_element);
    height += parseInt(computedStyle.marginTop, 10);
    height += parseInt(computedStyle.marginBottom, 10);
    return height;
}

export type ElementSelector = HTMLElement | ElementRef | string;

export function getHTMLElementBySelector(selector: ElementSelector, defaultElementRef: ElementRef): HTMLElement {
    if (!selector) {
        return defaultElementRef.nativeElement;
    } else if (selector === 'body') {
        return document.body;
    } else if (helpers.isString(selector)) {
        return document.querySelector(selector as string);
    } else if (selector instanceof ElementRef) {
        return selector.nativeElement;
    } else {
        return selector as HTMLElement;
    }
}

export function isInputOrTextarea(element: HTMLElement) {
    return ['INPUT', 'TEXTAREA'].indexOf(element.nodeName) >= 0;
}

export function isWindow(container: Element | Window): container is Window {
    return typeof window !== 'undefined' && container === window;
}

export interface SimpleRect {
    top: number;
    left: number;
    width?: number;
    height?: number;
    bottom?: number;
}

export function getContainerRect(container: Element | Window): SimpleRect {
    return !isWindow(container)
        ? container.getBoundingClientRect()
        : {
              top: 0,
              left: 0,
              bottom: 0
          };
}

export function getStyleAsText(styles?: any): string {
    if (!styles) {
        return '';
    }

    return Object.keys(styles)
        .map(key => {
            const val = styles[key];
            return `${key}:${typeof val === 'string' ? val : val + 'px'}`;
        })
        .join(';');
}
