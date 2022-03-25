import { isTouchEvent } from 'ngx-tethys/util';

export function getEventWithPoint(event: MouseEvent | TouchEvent): MouseEvent | Touch {
    return isTouchEvent(event) ? event.touches[0] || event.changedTouches[0] : (event as MouseEvent);
}

export function ensureInBounds(value: number, boundValue: number): number {
    return value ? (value < boundValue ? value : boundValue) : boundValue;
}

export function setCompatibleStyle(element: HTMLElement, key: string, value: string) {
    element.style[key] = value;
    element.style[`-webkit-${key}`] = value;
    element.style[`-moz-${key}`] = value;
    element.style[`-ms-${key}`] = value;
}
