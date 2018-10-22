import {
    Directive, Input, OnInit, ElementRef, Injectable,
    Inject, ChangeDetectorRef, Renderer2, NgZone, OnDestroy
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { helpers, dom } from '../util';
import { ThyKeySelectConfig, thyKeySelectDefaultConfig } from './key-select.config';
import { ThyKeySelectItemDirective } from './key-select-item.directive';

function getWindow(elem: any) {
    return (elem != null && elem === elem.window) ? elem : elem.nodeType === 9 && elem.defaultView;
}

export interface KeySelectItem {
    data: any;
    element: HTMLElement;
}

@Injectable()
export class ThyKeySelectService {

    private _options: ThyKeySelectConfig;

    public get options() {
        return this._options;
    }
    // directive element
    private _element: HTMLElement;

    private _eventElement: HTMLElement;

    private _scrollContainer: HTMLElement;

    private _unsubscribe: () => void;

    keyHover: KeySelectItem;

    private _allSelectItemDirectives: ThyKeySelectItemDirective[];

    private _getSelectorElement(element: HTMLElement | ElementRef | string) {
        if (helpers.isString(element)) {
            return this._document.querySelector(element as string);
        } else if (element instanceof ElementRef) {
            return element.nativeElement;
        } else {
            return element;
        }
    }

    private _keydownHandler(event: KeyboardEvent) {
        const isContinue = this._options.callbacks.beforeHover(event);
        if (!isContinue) {
            return;
        }
        let stopPropagation = false;
        const keyCode = event.which || event.keyCode;
        this._options.keyActions.forEach((keyAction) => {
            if (keyAction.keyCode === keyCode) {
                this.ngZone.run(() => {
                    switch (keyAction.action) {
                        case 'up':
                            this.up(event);
                            stopPropagation = true;
                            break;
                        case 'down':
                            this.down(event);
                            stopPropagation = true;
                            break;
                        case 'select':
                            this.select(event);
                            stopPropagation = true;
                            break;
                    }
                });
                return false; // break out of each
            }
        });

        if (stopPropagation) {
            event.stopPropagation();
            if (this._options.preventDefault) {
                event.preventDefault();
            }
        }
    }

    private _getOffset(elem: HTMLElement) {

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
                left: rect.left + win.pageXOffset - docElem.clientLeft
            };
        }
        return rect;
    }

    private _getOuterHeight(element: any) {
        const _element = element.documentElement ? element.documentElement : element;
        let height = _element.clientHeight;
        const computedStyle = window.getComputedStyle(_element);
        height += parseInt(computedStyle.marginTop, 10);
        height += parseInt(computedStyle.marginBottom, 10);
        return height;
    }

    private _scrollTo(item: HTMLElement) {
        const scrollContainer = this._scrollContainer;
        const itemOffsetTop = this._getOffset(item).top;
        const itemOuterHeight = this._getOuterHeight(item);
        const containerHeight = this._getOuterHeight(this._scrollContainer);
        const containerTop = this._getOffset(this._scrollContainer).top;
        const containerScrollTop = scrollContainer.scrollTop;

        const topOffset = containerTop - itemOffsetTop;
        const bottomOffset = itemOffsetTop - (containerTop + containerHeight - itemOuterHeight);

        if (topOffset > 0) { // 元素在滚动条的上方遮盖住
            scrollContainer.scrollTop = containerScrollTop - topOffset - this._options.scrollMargin;
        } else if (bottomOffset > 0) { // 元素在滚动条的下方遮盖住
            scrollContainer.scrollTop = containerScrollTop + bottomOffset + this._options.scrollMargin;
        }
    }

    private _addClass(element: HTMLElement, className: string) {
        this.renderer.addClass(element, className);
    }

    private _removeClass(element: HTMLElement, className: string) {
        this.renderer.removeClass(element, className);
    }

    private _itemIsSelected(item: HTMLElement) {
        return item && item.classList.contains(this._options.selectedClass);
    }

    private itemMatch(item: HTMLElement) {
        if (!this._options.filterSelector || !dom.match(item, this._options.filterSelector)) {
            if (!this._options.itemSelector || dom.match(item, this._options.itemSelector)) {
                return true;
            }
        }
        return false;
    }

    private _getAllItems(): KeySelectItem[] {
        const items: KeySelectItem[] = [];
        this._allSelectItemDirectives.forEach((item) => {
            if (this.itemMatch(item.elementRef.nativeElement)) {
                items.push({
                    data: item.thyData,
                    element: item.elementRef.nativeElement
                });
            }
        });
        // const children = helpers.fromArray(this._element.children);
        // children.forEach((item: any) => {
        //     if (this.itemMatch(item)) {
        //         items.push(item);
        //     }
        // });
        return items;
    }

    private _getFirstItem() {
        const allItems = this._getAllItems();
        return allItems.length > 0 ? allItems[0] : null;
    }

    private _switch(type: string, event: Event) {
        const items = this._getAllItems();
        if (items.length <= 0) {
            return;
        }
        // 如果 keyHover 没有,找到样式为 hoverClass 的元素
        // if (!this.keyHover && this._options.hoverClass) {
        //     this.keyHover = this._element.querySelector('.' + this._options.hoverClass);
        // }
        const index = items.indexOf(this.keyHover);
        let newHoverElement: KeySelectItem;
        if (type === 'up') {
            newHoverElement = index > 0 ? items[index - 1] : items[items.length - 1];
        } else {
            newHoverElement = items.length > index + 1 ? items[index + 1] : items[0];
        }
        this.hover(newHoverElement, event);
    }

    private _initialize() {

        const scrollContainer =
            this._options.scrollContainer === 'body'
                ? this._document.body
                : this._getSelectorElement(this._options.scrollContainer);

        let _eventElement = null;
        if (this._options.globalKey) {
            _eventElement = this._document;
        } else if (this._options.eventContainer) {
            _eventElement = this._getSelectorElement(this._options.eventContainer);
        } else {
            _eventElement = this._getSelectorElement(scrollContainer);
        }
        this._eventElement = _eventElement;
        this._scrollContainer = scrollContainer;

        this.ngZone.runOutsideAngular(() => {
            this._unsubscribe = this.renderer.listen(this._eventElement, 'keydown', this._keydownHandler.bind(this));
        });
    }

    constructor(
        @Inject(DOCUMENT) private _document: Document,
        private changeDetectorRef: ChangeDetectorRef,
        private renderer: Renderer2,
        private ngZone: NgZone
    ) {
    }

    setOptions(options: ThyKeySelectConfig) {
        const _options = Object.assign({}, thyKeySelectDefaultConfig, options);
        if (options && options.callbacks) {
            _options.callbacks = Object.assign({}, thyKeySelectDefaultConfig.callbacks, options.callbacks);
        }
        this._options = _options;
    }

    setAllItems(items: ThyKeySelectItemDirective[]) {
        this._allSelectItemDirectives = items || [];
    }

    initialize(element: any, options: ThyKeySelectConfig) {
        this._element = element;
        this.setOptions(options);
        const delay = this._options.delay;
        if (delay && delay > 0) {
            setTimeout(function () {
                this._initialize();
            }.bind(this), delay);
        } else {
            this._initialize();
        }
    }

    up = function (event: Event) {
        this._switch('up', event);
    };

    down = function (event: Event) {
        this._switch('down', event);
    };

    hover(element: KeySelectItem | string, event: Event) {
        let _toFirst = false;
        let keySelectItem: KeySelectItem = null;
        if (element === 'first') {
            _toFirst = true;
            keySelectItem = this._getFirstItem();
        } else {
            keySelectItem = element as KeySelectItem;
        }
        if (!keySelectItem) {
            return;
        }
        this.clearKeyHover();
        const keyHoverElement = this.keyHover = keySelectItem;
        this._addClass(keyHoverElement.element, this._options.hoverClass);
        this._options.callbacks.hover(this.keyHover, event);
        if (!_toFirst) {
            this._scrollTo(this.keyHover.element);
        }
    }

    select(event: Event) {
        if (this.keyHover) {
            const keyHoverItemIsSelected = this._itemIsSelected(this.keyHover.element);
            if (keyHoverItemIsSelected) {
                this._removeClass(this.keyHover.element, this._options.selectedClass);
            } else {
                this._addClass(this.keyHover.element, this._options.selectedClass);
                this._options.callbacks.select(this.keyHover, event);
            }
            if (this._options.autoDeleteHoverAfterSelect) {
                this.clearKeyHover();
            }
        }
    }

    clearKeyHover() {
        if (this.keyHover) {
            this._removeClass(this.keyHover.element, this._options.hoverClass);
            this.keyHover = null;
        }
    }

    resetKeyHover() {
        if (this.keyHover
            && (!this.keyHover.element.parentNode || !this.itemMatch(this.keyHover.element))) {
            this.clearKeyHover();
        }
    }

    destroy() {
        if (this._unsubscribe) {
            this._unsubscribe();
            this._unsubscribe = null;
        }
    }
}
