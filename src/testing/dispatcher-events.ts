import { createFakeEvent, createKeyboardEvent, createMouseEvent, createTouchEvent } from './events';

/** Utility to dispatch any event on a Node. */
export function dispatchEvent(node: Node | Window, event: Event): Event {
    node.dispatchEvent(event);
    return event;
}

/** Shorthand to dispatch a fake event on a specified node. */
export function dispatchFakeEvent(node: Node | Window, type: string, canBubble?: boolean): Event {
    return dispatchEvent(node, createFakeEvent(type, canBubble));
}

/** Shorthand to dispatch a keyboard event with a specified key code. */
export function dispatchKeyboardEvent(node: Node, type: string, keyCode: number, target?: Element): KeyboardEvent {
    return dispatchEvent(node, createKeyboardEvent(type, keyCode, target)) as KeyboardEvent;
}

/** Shorthand to dispatch a mouse event on the specified coordinates. */
export function dispatchMouseEvent(
    node: Node,
    type: string,
    x = 0,
    y = 0,
    button = 0,
    relatedTarget: HTMLElement = null,
    event = createMouseEvent(type, x, y, button, relatedTarget)
): MouseEvent {
    return dispatchEvent(node, event) as MouseEvent;
}

/** Shorthand to dispatch a touch event on the specified coordinates. */
export function dispatchTouchEvent(node: Node, type: string, x = 0, y = 0) {
    return dispatchEvent(node, createTouchEvent(type, x, y));
}
