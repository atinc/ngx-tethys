import { isTouchEvent } from 'ngx-tethys/util';

export function getEventWithPoint(event: MouseEvent | TouchEvent): MouseEvent | Touch {
    return isTouchEvent(event) ? event.touches[0] || event.changedTouches[0] : (event as MouseEvent);
}

export function ensureInBounds(value: number, boundValue: number): number {
    return value ? (value < boundValue ? value : boundValue) : boundValue;
}
