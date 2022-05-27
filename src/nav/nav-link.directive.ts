import { Constructor, InputBoolean, MixinBase, mixinUnsubscribe, ThyUnsubscribe } from 'ngx-tethys/core';
import { takeUntil } from 'rxjs/operators';

import {
    AfterViewInit,
    ContentChildren,
    Directive,
    ElementRef,
    HostBinding,
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

@Directive({
    selector: '[thyNavLink],[thyNavItem]',
    host: {
        class: 'thy-nav-item'
    }
})
export class ThyNavLinkDirective extends _MixinBase implements AfterViewInit, OnDestroy {
    /**
     * @deprecated please use thyNavItemActive
     */
    @HostBinding('class.active')
    @Input()
    @InputBoolean()
    thyNavLinkActive: boolean;

    @HostBinding('class.active')
    @Input()
    @InputBoolean()
    thyNavItemActive: boolean;

    @ContentChildren(ThyNavLinkDirective, { descendants: true }) links: QueryList<ThyNavLinkDirective>;

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
            this.thyNavLinkActive ||
            (this.routerLinkActive && this.routerLinkActive.isActive) ||
            this.routers.some(router => router.isActive) ||
            this.links.some(item => item.thyNavLinkActive)
        );
    }

    setNavLinkHidden(value: boolean) {
        if (value) {
            this.renderer.addClass(this.elementRef.nativeElement, 'thy-nav-item-hidden');
        } else {
            this.renderer.removeClass(this.elementRef.nativeElement, 'thy--nav-item-hidden');
        }
    }

    ngOnDestroy() {
        this.ngUnsubscribe$.next();
        this.ngUnsubscribe$.complete();
    }
}
