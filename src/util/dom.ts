const proto = Element.prototype;
const vendor = proto.matches
    || (proto as any).matchesSelector
    || proto.webkitMatchesSelector
    || (proto as any).mozMatchesSelector
    || proto.msMatchesSelector
    || (proto as any).oMatchesSelector;

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
