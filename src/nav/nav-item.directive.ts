import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { useHostRenderer } from '@tethys/cdk/dom';
import {
    AfterViewInit,
    ContentChildren,
    DestroyRef,
    Directive,
    ElementRef,
    forwardRef,
    inject,
    Input,
    NgZone,
    Optional,
    QueryList
} from '@angular/core';
import { RouterLinkActive } from '@angular/router';
import { coerceBooleanProperty } from 'ngx-tethys/util';

export type ThyNavLink = '' | 'active';

/**
 * 导航项
 * @name thyNavItem
 * @order 20
 */
@Directive({
    selector: '[thyNavLink],[thyNavItem]',
    host: {
        class: 'thy-nav-item',
        '[class.active]': 'thyNavItemActive || thyNavLinkActive',
        '[class.disabled]': 'thyNavItemDisabled'
    },
    standalone: true
})
export class ThyNavItemDirective implements AfterViewInit {
    /**
     * 是否激活状态
     * @default false
     */
    @Input({ transform: coerceBooleanProperty })
    thyNavItemActive: boolean;

    /**
     * 已经废弃，请使用 thyNavItemActive
     * @deprecated please use thyNavItemActive
     * @default false
     */
    @Input({ transform: coerceBooleanProperty })
    thyNavLinkActive: boolean;

    /**
     * 是否禁用
     * @default false
     */
    @Input({ transform: coerceBooleanProperty })
    thyNavItemDisabled: boolean;

    /**
     * @private
     */
    @ContentChildren(forwardRef(() => ThyNavItemDirective), { descendants: true })
    links: QueryList<ThyNavItemDirective>;

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

    private hostRenderer = useHostRenderer();

    private readonly destroyRef = inject(DestroyRef);

    constructor(
        public elementRef: ElementRef,
        @Optional() private routerLinkActive: RouterLinkActive,
        private ngZone: NgZone
    ) {}

    ngAfterViewInit() {
        this.setOffset();

        this.content = this.elementRef.nativeElement.outerHTML;

        this.ngZone.onStable.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
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
            this.hostRenderer.addClass('thy-nav-item-hidden');
        } else {
            this.hostRenderer.removeClass('thy-nav-item-hidden');
        }
    }
}
