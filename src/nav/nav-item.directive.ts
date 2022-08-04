import { Constructor, InputBoolean, MixinBase, mixinUnsubscribe, ThyUnsubscribe } from 'ngx-tethys/core';
import { takeUntil } from 'rxjs/operators';

import {
    AfterViewInit,
    ContentChildren,
    Directive,
    ElementRef,
    Input,
    NgZone,
    OnDestroy,
    Optional,
    QueryList,
    Renderer2
} from '@angular/core';
import { RouterLinkActive } from '@angular/router';

export type ThyNavLink = '' | 'active';

const _MixinBase: Constructor<ThyUnsubscribe> & typeof MixinBase = mixinUnsubscribe(MixinBase);

/**
 * 导航项
 * @name thyNavItem
 */
@Directive({
    selector: '[thyNavLink],[thyNavItem]',
    host: {
        class: 'thy-nav-item',
        '[class.active]': 'thyNavItemActive || thyNavLinkActive',
        '[class.disabled]': 'thyNavItemDisabled'
    }
})
export class ThyNavItemDirective extends _MixinBase implements AfterViewInit, OnDestroy {
    /**
     * 是否激活状态
     * @default false
     */
    @Input()
    @InputBoolean()
    thyNavItemActive: boolean;

    /**
     * 已经废弃，请使用 thyNavItemActive
     * @deprecated please use thyNavItemActive
     * @default false
     */
    @Input()
    @InputBoolean()
    thyNavLinkActive: boolean;

    /**
     * 是否禁用
     * @default false
     */
    @Input()
    @InputBoolean()
    thyNavItemDisabled: boolean;

    /**
     * @private
     */
    @ContentChildren(ThyNavItemDirective, { descendants: true }) links: QueryList<ThyNavItemDirective>;

    /**
     * @private
     */
    @ContentChildren(RouterLinkActive, { descendants: true }) routers: QueryList<RouterLinkActive>;

    // @HostBinding('attr.href') navLinkHref = 'javascript:;';

    public offset: {
        width: number;
        height: number;
        left: number;
        top: number;
    } = {
        width: 0,
        height: 0,
        left: 0,
        top: 0
    };

    public content: HTMLElement;

    public isActive: boolean;

    constructor(
        public elementRef: ElementRef,
        private renderer: Renderer2,
        @Optional() private routerLinkActive: RouterLinkActive,
        private ngZone: NgZone
    ) {
        super();
    }

    ngAfterViewInit() {
        this.setOffset();

        this.content = this.elementRef.nativeElement.outerHTML;

        this.ngZone.onStable.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(() => {
            this.isActive = this.linkIsActive();
        });
    }

    setOffset() {
        this.offset = {
            width: this.elementRef.nativeElement.offsetWidth,
            height: this.elementRef.nativeElement.offsetHeight,
            left: this.elementRef.nativeElement.offsetLeft,
            top: this.elementRef.nativeElement.offsetTop
        };
    }

    linkIsActive() {
        return (
            this.thyNavItemActive ||
            this.thyNavLinkActive ||
            (this.routerLinkActive && this.routerLinkActive.isActive) ||
            this.routers.some(router => router.isActive) ||
            this.links.some(item => item.thyNavItemActive) ||
            this.links.some(item => item.thyNavLinkActive)
        );
    }

    setNavLinkHidden(value: boolean) {
        if (value) {
            this.renderer.addClass(this.elementRef.nativeElement, 'thy-nav-item-hidden');
        } else {
            this.renderer.removeClass(this.elementRef.nativeElement, 'thy-nav-item-hidden');
        }
    }

    ngOnDestroy() {
        this.ngUnsubscribe$.next();
        this.ngUnsubscribe$.complete();
    }
}
