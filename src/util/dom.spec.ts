import { fallbackMatches, getElementOffset, getWindow, isDocument, isElement, match } from './dom';

describe('#dom', () => {
    describe('#match', () => {
        it('should match element', () => {
            const element = createElement('<span id="title"></span>');
            const result = match(element.childNodes[0], '#title');
            expect(result).toEqual(true);
        });

        it('should match element for fallbackMatches', () => {
            const element = createElement('<span id="title"></span>');
            const result = fallbackMatches(element.childNodes[0], '#title');
            expect(result).toEqual(true);
            expect(fallbackMatches(element.childNodes[0], '#title1')).toEqual(false);
        });
    });

    it('isDocument', () => {
        expect(isDocument(document)).toEqual(true);
        expect(isDocument(createElement('<span id="title"></span>'))).toEqual(false);
    });

    it('should get correct value for isElement', () => {
        [document.createElement('div')].forEach(value => {
            expect(isElement(value)).toBeTruthy(`${value} is not element`);
        });

        [1, 'xxx', undefined, null, NaN, {}].forEach(value => {
            expect(isElement(value)).toBeFalsy(`${value} is element`);
        });
    });

    it('getWindow', () => {
        expect(getWindow(document)).toEqual(window);
    });

    describe('getElementOffset', () => {
        it('should get correct offset', () => {
            const element = createElement('<span>text</span>');
            document.body.append(element);
            const offset = getElementOffset(element);
            expect(offset).toBeTruthy();
            const elementRect = element.getBoundingClientRect();
            expect(offset.top).toEqual(elementRect.top);
            expect(offset.left).toEqual(elementRect.left);
            expect(offset.width).toEqual(elementRect.width);
            expect(offset.height).toEqual(elementRect.height);
        });

        it('should get {top: 0, left: 0} with empty client rects', () => {
            const element = createElement('<span>text</span>');
            const offset = getElementOffset(element);
            expect(offset).toEqual({ top: 0, left: 0 });
        });
    });
});

function createElement(innerHTML: string) {
    const element = document.createElement('div');
    element.innerHTML = innerHTML;
    return element;
}
