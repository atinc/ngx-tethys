import { AbstractElementRenderer } from './abstract-element-renderer';

export class ElementRenderer extends AbstractElementRenderer {
    protected element: Element;

    setElement(element: Element) {
        this.element = element;
    }

    constructor(element: Element) {
        super();
        this.element = element;
    }
}

export function useElementRenderer(element?: Element): ElementRenderer {
    return new ElementRenderer(element as Element);
}
