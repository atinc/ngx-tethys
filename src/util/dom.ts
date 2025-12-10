import { ElementRef } from '@angular/core';
import * as helpers from './helpers';
import { SafeAny } from 'ngx-tethys/types';

const proto: SafeAny = Element.prototype;
const vendor =
    proto.matches ||
    proto['matchesSelector'] ||
    proto['webkitMatchesSelector'] ||
    proto['mozMatchesSelector'] ||
    proto['msMatchesSelector'] ||
    proto['oMatchesSelector'];

export function fallbackMatches(el: Element | Node, selector: string) {
    const nodes = el.parentNode?.querySelectorAll(selector) || [];
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < nodes.length; i++) {
        if (nodes[i] === el) {
            return true;
        }
    }
    return false;
}
/**
 * Match `el` to `selector`.
 */
export function match(el: Element | Node, selector: string) {
    if (vendor) {
        return vendor.call(el, selector);
    }
    return fallbackMatches(el, selector);
}

export function isDocument(element: any): element is Document {
    return (
        (typeof element !== 'undefined' && element instanceof Document) || (element.nodeType && element.nodeType === element.DOCUMENT_NODE)
    );
}

export function isElement(element: any) {
    return (
        (typeof HTMLElement !== 'undefined' && element instanceof HTMLElement) ||
        (element && element.nodeType && element.nodeType === element.ELEMENT_NODE)
    );
}

export function getWindow(elem: any) {
    return elem != null && elem === elem.window ? elem : elem.nodeType === 9 && elem.defaultView;
}

export function getElementOffset(elem: HTMLElement) {
    let docElem, win, doc;

    if (!elem) {
        return;
    }
    // Support: IE<=11+
    // Running getBoundingClientRect on a
    // disconnected node in IE throws an error
    if (!elem.getClientRects().length) {
        return { top: 0, left: 0 };
    }
    const rect = elem.getBoundingClientRect();

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

export function getClientSize(): { width: number; height: number } {
    const width = document.documentElement.clientWidth;
    const height = window.innerHeight || document.documentElement.clientHeight;
    return {
        width,
        height
    };
}

export type ElementSelector = HTMLElement | ElementRef | string;

export function getHTMLElementBySelector(selector: ElementSelector, defaultElementRef: ElementRef): HTMLElement | null {
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
            return `${key}:${typeof val === 'string' ? val : `${val}px`}`;
        })
        .join(';');
}

export function isTouchEvent(event: MouseEvent | TouchEvent): event is TouchEvent {
    return event.type.startsWith('touch');
}

/**
 * Assert wrapper element whether only contains icon.
 */
export function assertIconOnly(wrapperElement: Element): boolean {
    const listOfNode = Array.from(wrapperElement.childNodes);
    const iconCount = listOfNode.filter(node => ['THY-ICON', 'I'].includes(node.nodeName)).length;
    const noText = listOfNode.every(node => node.nodeName !== '#text');
    const noSpan = listOfNode.every(node => node.nodeName !== 'SPAN');
    const isIconOnly = noSpan && noText && iconCount >= 1;
    return isIconOnly;
}

/**
 *
 * calc position x,y point
 *
 * CASE (width <= clientWidth && height <= clientHeight):
 *
 * ------------- clientWidth -------------
 * |                                     |
 * |        ------ width ------          |
 * |        |                 |          |
 * |        |                 |          |
 * client   height            |          |
 * Height   |                 |          |
 * |        |                 |          |
 * |        -------------------          |
 * |                                     |
 * |                                     |
 * ---------------------------------------
 * fixedPosition = { x: 0, y: 0 }
 *
 *
 *
 * CASE (width > clientWidth || height > clientHeight):
 *
 * ------------- clientWidth -------------
 * |        |                            |
 * |        top                          |
 * |        |                            |
 * |--left--|--------------- width -----------------
 * |        |                                      |
 * client   |                                      |
 * Height   |                                      |
 * |        |                                      |
 * |        |                                      |
 * |        height                                 |
 * |        |                                      |
 * ---------|                                      |
 *          |                                      |
 *          |                                      |
 *          |                                      |
 *          ----------------------------------------
 *
 *
 * - left || top > 0
 *   left -> 0 || top -> 0
 *
 * - (left + width) < clientWidth || (top + height) < clientHeight
 * - left | top + width | height < clientWidth | clientHeight -> Back left | top + width | height === clientWidth | clientHeight
 *
 * DEFAULT:
 * - hold position
 *
 */
export function getFitContentPosition(params: {
    width: number;
    height: number;
    left: number;
    top: number;
    clientWidth: number;
    clientHeight: number;
}): { x?: number; y?: number } {
    let fixPos = {};

    if (params.width <= params.clientWidth && params.height <= params.clientHeight) {
        fixPos = {
            x: 0,
            y: 0
        };
    }

    if (params.width > params.clientWidth || params.height > params.clientHeight) {
        fixPos = {
            x: fitPoint(params.left, params.width, params.clientWidth),
            y: fitPoint(params.top, params.height, params.clientHeight)
        };
    }

    return fixPos;
}

function fitPoint(start: number, size: number, clientSize: number): number | null {
    const startAddSize = start + size;
    const offsetStart = (size - clientSize) / 2;
    let distance: number | null = null;

    if (size > clientSize) {
        if (start > 0) {
            distance = offsetStart;
        }
        if (start < 0 && startAddSize < clientSize) {
            distance = -offsetStart;
        }
    } else {
        if (start < 0 || startAddSize > clientSize) {
            distance = start < 0 ? offsetStart : -offsetStart;
        }
    }

    return distance;
}

export function elementMatchClosest(element: HTMLElement, selectors: string | string[]) {
    let matched = false;
    if (element && element.closest) {
        matched = !!helpers.coerceArray(selectors).find(selector => {
            return element.closest(selector);
        });
    }
    return matched;
}
