import {
    Directive, Input, OnInit, ElementRef, Injectable,
    Inject, ChangeDetectorRef, Renderer2, NgZone, OnDestroy
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { helpers, dom } from '../util';
import { KeySelectConfig, defaultConfig } from './key-select.config';

function getWindow(elem: any) {
    return (elem != null && elem === elem.window) ? elem : elem.nodeType === 9 && elem.defaultView;
}


@Injectable()
export class ThyKeySelectService {

    _options: KeySelectConfig;

    // directive element
    _element: HTMLElement;

    _eventElement: HTMLElement;

    _scrollContainer: HTMLElement;

    _unsubscribe: () => void;

    keyHover: any;

    constructor(
        @Inject(DOCUMENT) private _document: Document,
        private changeDetectorRef: ChangeDetectorRef,
        private renderer: Renderer2,
        private ngZone: NgZone
    ) {
    }

    setOptions(options: KeySelectConfig) {
        const _options = Object.assign({}, defaultConfig, options);
        if (options && options.callbacks) {
            _options.callbacks = Object.assign({}, defaultConfig.callbacks, options.callbacks);
        }
        this._options = _options;
    }

    _getSelectorElement(element: HTMLElement | ElementRef | string) {
        if (helpers.isString(element)) {
            return this._document.querySelector(element as string);
        } else if (element instanceof ElementRef) {
            return element.nativeElement;
        } else {
            return element;
        }
    }

    _keydownHandler(event: KeyboardEvent) {
        const isContinue = this._options.callbacks.beforeHover(event);
        if (!isContinue) {
            return;
        }
        let stopPropagation = false;
        const keyCode = event.which || event.keyCode;
        this._options.keyActions.forEach((keyAction) => {
            if (keyAction.keyCode === keyCode) {
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
                this.changeDetectorRef.detectChanges();
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

    _getOffset(elem: HTMLElement) {

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

    _getOuterHeight(element: any) {
        const _element = element.documentElement ? element.documentElement : element;
        let height = _element.clientHeight;
        const computedStyle = window.getComputedStyle(_element);
        height += parseInt(computedStyle.marginTop, 10);
        height += parseInt(computedStyle.marginBottom, 10);
        return height;
    }

    _scrollTo(item: any) {
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

    _addClass(element: any, className: string) {
        this.renderer.addClass(element, className);
    }

    _removeClass(element: any, className: string) {
        this.renderer.removeClass(element, className);
    }

    itemMatch(item: any) {
        if (!this._options.filterSelector || !dom.match(item, this._options.filterSelector)) {
            if (!this._options.itemSelector || dom.match(item, this._options.itemSelector)) {
                return true;
            }
        }
        return false;
    }

    _getAllItems() {
        const items: any[] = [];
        const children = helpers.fromArray(this._element.children);
        children.forEach((item: any) => {
            if (this.itemMatch(item)) {
                items.push(item);
            }
        });
        return items;
    }

    _getFirstItem() {
        let firstItem: any = null;
        const children = helpers.fromArray(this._element.children);
        children.forEach((item: any) => {
            if (firstItem) {
                return firstItem;
            } else if (!this._options.filterSelector || !dom.match(item, this._options.filterSelector)) {
                if (!this._options.itemSelector || dom.match(item, this._options.itemSelector)) {
                    firstItem = item;
                }
            }
        });
        return firstItem;
    }

    _switch(type: string, event: Event) {
        const items = this._getAllItems();
        if (items.length <= 0) {
            return;
        }
        // 如果 keyHover 没有,找到样式为 hoverClass 的元素
        if (!this.keyHover && this._options.hoverClass) {
            this.keyHover = this._element.querySelector('.' + this._options.hoverClass);
        }
        const index = items.indexOf(this.keyHover);
        let newHoverElement = null;
        if (type === 'up') {
            newHoverElement = index > 0 ? items[index - 1] : items[items.length - 1];
        } else {
            newHoverElement = items.length > index + 1 ? items[index + 1] : items[0];
        }
        this.hover(newHoverElement, event);
    }

    up = function (event: Event) {
        this._switch('up', event);
    };

    down = function (event: Event) {
        this._switch('down', event);
    };

    hover(element: HTMLElement | string, event: Event) {
        let _toFirst = false;
        if (element === 'first') {
            _toFirst = true;
            element = this._getFirstItem();
        }
        if (!element) {
            return;
        }
        this.clearKeyHover();
        const keyHoverElement = this.keyHover = element;

        this._addClass(keyHoverElement, this._options.hoverClass);
        // $timeout(function () {
        //     this._options.callbacks.hover(event, this.keyHover);
        // }.bind(this));
        this._options.callbacks.hover(event, this.keyHover);
        if (!_toFirst) {
            this._scrollTo(this.keyHover);
        }
    }

    select(event: Event) {
        setTimeout(function () {
            this._options.callbacks.select(event, this.keyHover);
            if (this._options.autoDeleteHoverAfterSelect) {
                this.clearKeyHover();
            }
        }.bind(this));
        if (this.keyHover) {
            this.keyHover.addClass(this._options.selectedClass);
        }
    }

    clearKeyHover() {
        if (this.keyHover) {
            this._removeClass(this.keyHover, this._options.hoverClass);
            this.keyHover = null;
        }
    }

    resetKeyHover() {
        if (this.keyHover
            && (!this.keyHover.parentNode || !this.itemMatch(this.keyHover))) {
            this.clearKeyHover();
        }
    }

    destroy() {
        if (this._unsubscribe) {
            this._unsubscribe();
            this._unsubscribe = null;
        }
    }

    _initialize() {

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

    initialize(element: any, options: KeySelectConfig) {
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
}

@Directive({
    selector: '[thyKeySelection]',
    providers: [
        ThyKeySelectService
    ]
})
export class ThyKeySelectionDirective implements OnInit, OnDestroy {

    @Input() thyKeySelection: KeySelectConfig;

    get thyKeySelectRef() {
        return this._thyKeySelectRef;
    }

    constructor(
        private elementRef: ElementRef,
        private _thyKeySelectRef: ThyKeySelectService
    ) {
    }

    ngOnInit(): void {
        this._thyKeySelectRef.initialize(this.elementRef.nativeElement, this.thyKeySelection);
    }

    ngOnDestroy() {
        if (this._thyKeySelectRef) {
            this._thyKeySelectRef.destroy();
            delete this._thyKeySelectRef;
        }
    }
}
