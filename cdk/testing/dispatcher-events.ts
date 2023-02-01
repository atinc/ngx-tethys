import { ModifierKeys } from '@angular/cdk/testing';
import { createFakeEvent, createKeyboardEvent, createMouseEvent, createPointerEvent, createTouchEvent } from './events';

/**
 * Utility to dispatch any event on a Node.
 * @docs-private
 */
export function dispatchEvent<T extends Event>(node: Node | Window, event: T): T {
    node.dispatchEvent(event);
    return event;
}

/**
 * Shorthand to dispatch a fake event on a specified node.
 * @docs-private
 */
export function dispatchFakeEvent(node: Node | Window, type: string, canBubble?: boolean): Event {
    return dispatchEvent(node, createFakeEvent(type, canBubble));
}

/**
 * Shorthand to dispatch a keyboard event with a specified key code and
 * optional modifiers.
 * @docs-private
 */
export function dispatchKeyboardEvent(node: Node, type: string, keyCode?: number, key?: string, modifiers?: ModifierKeys): KeyboardEvent {
    return dispatchEvent(node, createKeyboardEvent(type, keyCode, key, modifiers));
}

/**
 * Shorthand to dispatch a mouse event on the specified coordinates.
 * @docs-private
 */
export function dispatchMouseEvent(
    node: Node,
    type: string,
    clientX = 0,
    clientY = 0,
    button?: number,
    modifiers?: ModifierKeys,
    relatedTarget?: Element
): MouseEvent {
    return dispatchEvent(node, createMouseEvent(type, clientX, clientY, button, modifiers, relatedTarget));
}

/**
 * Shorthand to dispatch a pointer event on the specified coordinates.
 * @docs-private
 */
export function dispatchPointerEvent(node: Node, type: string, clientX = 0, clientY = 0, options?: PointerEventInit): PointerEvent {
    return dispatchEvent(node, createPointerEvent(type, clientX, clientY, options)) as PointerEvent;
}

/**
 * Shorthand to dispatch a touch event on the specified coordinates.
 * @docs-private
 */
export function dispatchTouchEvent(node: Node, type: string, x = 0, y = 0) {
    return dispatchEvent(node, createTouchEvent(type, x, y));
}
