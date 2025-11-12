import { ThyScrollService } from 'ngx-tethys/core';
import { dom, shallowEqual, SimpleRect } from 'ngx-tethys/util';
import { fromEvent, merge, ReplaySubject, Subject, Subscription } from 'rxjs';
import { auditTime, map, takeUntil } from 'rxjs/operators';

import { Platform } from '@angular/cdk/platform';

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  NgZone,
  numberAttribute,
  OnDestroy,
  output,
  Renderer2,
  Signal,
  viewChild,
  ViewEncapsulation,
  DOCUMENT
} from '@angular/core';

import { AffixRespondEvents } from './respond-events';

const THY_AFFIX_CLS_PREFIX = 'thy-affix';
const THY_AFFIX_DEFAULT_SCROLL_TIME = 20;

/**
 * 固钉组件
 * @name thy-affix
 * @order 10
 */
@Component({
    selector: 'thy-affix',
    exportAs: 'thyAffix',
    template: `
        <div #fixedElement>
            <ng-content></ng-content>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class ThyAffix implements AfterViewInit, OnDestroy {
    private scrollService = inject(ThyScrollService);
    private ngZone = inject(NgZone);
    private platform = inject(Platform);
    private renderer = inject(Renderer2);

    private readonly fixedElement = viewChild.required<ElementRef<HTMLDivElement>>('fixedElement');

    /**
     * 设置 thy-affix 需要监听其滚动事件的元素，值为一个返回对应 DOM 元素的函数
     * @default window
     * @type string | Element | Window
     */
    readonly thyContainer = input<string | Element | Window>();

    /**
     * 距离窗口顶部缓冲的偏移量阈值
     */
    readonly thyOffsetTop = input<number, unknown>(0, { transform: numberAttribute });

    /**
     * 距离窗口底部缓冲的偏移量阈值
     */
    readonly thyOffsetBottom = input<number, unknown>(0, { transform: numberAttribute });

    /**
     * 固定状态改变时触发的回调函数
     */
    readonly thyChange = output<boolean>();

    private readonly placeholderNode: HTMLElement;

    private affixStyle?: any;
    private placeholderStyle?: any;
    private positionChangeSubscription: Subscription = Subscription.EMPTY;
    private offsetChanged$ = new ReplaySubject(1);
    private destroy$ = new Subject<void>();
    private timeout?: any;
    private document: any;

    private readonly container: Signal<Element | Window> = computed(() => {
        const el = this.thyContainer();
        return (typeof el === 'string' ? this.document.querySelector(el) : el) || window;
    });

    constructor() {
        const el = inject(ElementRef);
        const document = inject(DOCUMENT);

        // The wrapper would stay at the original position as a placeholder.
        this.placeholderNode = el.nativeElement;
        this.document = document;
        effect(() => {
            if (this.thyOffsetBottom() || this.thyOffsetTop()) {
                this.offsetChanged$.next(undefined);
            }
        });
    }

    ngAfterViewInit(): void {
        this.registerListeners();
    }

    ngOnDestroy(): void {
        this.removeListeners();
    }

    private registerListeners(): void {
        this.removeListeners();
        this.positionChangeSubscription = this.ngZone.runOutsideAngular(() => {
            return merge(
                ...Object.keys(AffixRespondEvents).map(evName => fromEvent(this.container(), evName)),
                this.offsetChanged$.pipe(
                    takeUntil(this.destroy$),
                    map(() => ({}))
                )
            )
                .pipe(auditTime(THY_AFFIX_DEFAULT_SCROLL_TIME))
                .subscribe(e => this.updatePosition(e as Event));
        });
        this.timeout = setTimeout(() => this.updatePosition({} as Event));
    }

    private removeListeners(): void {
        clearTimeout(this.timeout);
        this.positionChangeSubscription.unsubscribe();
        this.destroy$.next();
        this.destroy$.complete();
    }

    getOffset(element: Element, target: Element | Window | undefined): SimpleRect {
        const elemRect = element.getBoundingClientRect();
        const containerRect = dom.getContainerRect(target);

        const scrollTop = this.scrollService.getScroll(target, true);
        const scrollLeft = this.scrollService.getScroll(target, false);

        const docElem = this.document.body;
        const clientTop = docElem.clientTop || 0;
        const clientLeft = docElem.clientLeft || 0;

        return {
            top: elemRect.top - containerRect.top + scrollTop - clientTop,
            left: elemRect.left - containerRect.left + scrollLeft - clientLeft,
            width: elemRect.width,
            height: elemRect.height
        };
    }

    private setAffixStyle(e: Event, affixStyle?: any): void {
        const originalAffixStyle = this.affixStyle;
        const isWindow = this.container() === window;
        if (e.type === 'scroll' && originalAffixStyle && affixStyle && isWindow) {
            return;
        }
        if (shallowEqual(originalAffixStyle, affixStyle)) {
            return;
        }

        const fixed = !!affixStyle;
        const wrapElement = this.fixedElement().nativeElement;
        this.renderer.setStyle(wrapElement, 'cssText', dom.getStyleAsText(affixStyle));
        this.affixStyle = affixStyle;
        if (fixed) {
            wrapElement.classList.add(THY_AFFIX_CLS_PREFIX);
        } else {
            wrapElement.classList.remove(THY_AFFIX_CLS_PREFIX);
        }

        if ((affixStyle && !originalAffixStyle) || (!affixStyle && originalAffixStyle)) {
            this.thyChange.emit(fixed);
        }
    }

    private setPlaceholderStyle(placeholderStyle?: any): void {
        const originalPlaceholderStyle = this.placeholderStyle;
        if (shallowEqual(placeholderStyle, originalPlaceholderStyle)) {
            return;
        }
        this.renderer.setStyle(this.placeholderNode, 'cssText', dom.getStyleAsText(placeholderStyle));
        this.placeholderStyle = placeholderStyle;
    }

    private syncPlaceholderStyle(e: Event): void {
        if (!this.affixStyle) {
            return;
        }
        this.renderer.setStyle(this.placeholderNode, 'cssText', '');
        this.placeholderStyle = undefined;
        const styleObj = {
            width: this.placeholderNode.offsetWidth,
            height: this.fixedElement().nativeElement.offsetHeight
        };
        this.setAffixStyle(e, {
            ...this.affixStyle,
            ...styleObj
        });
        this.setPlaceholderStyle(styleObj);
    }

    updatePosition(e: Event): void {
        if (!this.platform.isBrowser) {
            return;
        }

        const containerNode = this.container();
        let offsetTop = this.thyOffsetTop();
        const scrollTop = this.scrollService.getScroll(containerNode, true);
        const elementOffset = this.getOffset(this.placeholderNode, containerNode);
        const fixedNode = this.fixedElement().nativeElement;
        const elemSize = {
            width: fixedNode.offsetWidth,
            height: fixedNode.offsetHeight
        };
        const offsetMode = {
            top: false,
            bottom: false
        };
        // Default to `offsetTop=0`.
        const thyOffsetBottom = this.thyOffsetBottom();
        if (typeof offsetTop !== 'number' && typeof thyOffsetBottom !== 'number') {
            offsetMode.top = true;
            offsetTop = 0;
        } else {
            offsetMode.top = typeof offsetTop === 'number';
            offsetMode.bottom = typeof thyOffsetBottom === 'number';
        }
        const containerRect = dom.getContainerRect(containerNode as Window);
        const targetInnerHeight = (containerNode as Window).innerHeight || (containerNode as HTMLElement).clientHeight;
        if (scrollTop >= elementOffset.top - (offsetTop as number) && offsetMode.top) {
            const width = elementOffset.width;
            const top = containerRect.top + (offsetTop as number);
            this.setAffixStyle(e, {
                position: 'fixed',
                top,
                left: containerRect.left + elementOffset.left,
                width
            });
            this.setPlaceholderStyle({
                width,
                height: elemSize.height
            });
        } else if (
            scrollTop <= elementOffset.top + elemSize.height + (thyOffsetBottom as number) - targetInnerHeight &&
            offsetMode.bottom
        ) {
            const targetBottomOffset = containerNode === window ? 0 : window.innerHeight - containerRect.bottom;
            const width = elementOffset.width;
            this.setAffixStyle(e, {
                position: 'fixed',
                bottom: targetBottomOffset + (thyOffsetBottom as number),
                left: containerRect.left + elementOffset.left,
                width
            });
            this.setPlaceholderStyle({
                width,
                height: elementOffset.height
            });
        } else {
            if (
                e.type === AffixRespondEvents.resize &&
                this.affixStyle &&
                this.affixStyle.position === 'fixed' &&
                this.placeholderNode.offsetWidth
            ) {
                this.setAffixStyle(e, {
                    ...this.affixStyle,
                    width: this.placeholderNode.offsetWidth
                });
            } else {
                this.setAffixStyle(e);
            }
            this.setPlaceholderStyle();
        }

        if (e.type === 'resize') {
            this.syncPlaceholderStyle(e);
        }
    }
}
