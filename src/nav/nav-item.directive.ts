import {
    afterNextRender,
    AfterViewInit,
    contentChildren,
    DestroyRef,
    Directive,
    effect,
    ElementRef,
    forwardRef,
    inject,
    input,
    NgZone
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLinkActive } from '@angular/router';
import { useHostRenderer } from '@tethys/cdk/dom';
import { coerceBooleanProperty } from 'ngx-tethys/util';
import { from } from 'rxjs';

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
        '[class.active]': 'thyNavItemActive() || thyNavLinkActive()',
        '[class.disabled]': 'thyNavItemDisabled()'
    }
})
export class ThyNavItemDirective implements AfterViewInit {
    elementRef = inject(ElementRef);
    private routerLinkActive = inject(RouterLinkActive, { optional: true })!;
    private ngZone = inject(NgZone);

    /**
     * 唯一标识
     */
    id = input<string>();

    /**
     * 是否激活状态
     * @default false
     */
    readonly thyNavItemActive = input(false, { transform: coerceBooleanProperty });

    /**
     * 已经废弃，请使用 thyNavItemActive
     * @deprecated please use thyNavItemActive
     * @default false
     */
    readonly thyNavLinkActive = input(false, { transform: coerceBooleanProperty });

    /**
     * 是否禁用
     * @default false
     */
    readonly thyNavItemDisabled = input(false, { transform: coerceBooleanProperty });

    /**
     * @private
     */
    readonly links = contentChildren(
        forwardRef(() => ThyNavItemDirective),
        { descendants: true }
    );

    /**
     * @private
     */
    readonly routers = contentChildren(RouterLinkActive, { descendants: true });

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

    public content!: HTMLElement;

    public isActive!: boolean;

    private hostRenderer = useHostRenderer();

    private readonly destroyRef = inject(DestroyRef);

    constructor() {
        effect(() => {
            this.isActive = this.linkIsActive();
        });

        afterNextRender(() => {
            this.setOffset();

            this.content = this.elementRef.nativeElement.outerHTML;

            from(Promise.resolve()).subscribe(() => {
                this.isActive = this.linkIsActive();
            });
        });
    }

    ngAfterViewInit() {}

    setOffset() {
        this.offset = {
            width: this.elementRef.nativeElement.offsetWidth || this.offset.width,
            height: this.elementRef.nativeElement.offsetHeight || this.offset.height,
            left: this.elementRef.nativeElement.offsetLeft || this.offset.left,
            top: this.elementRef.nativeElement.offsetTop || this.offset.top
        };
    }

    linkIsActive() {
        const links = this.links();
        return (
            this.thyNavItemActive() ||
            this.thyNavLinkActive() ||
            (this.routerLinkActive && this.routerLinkActive.isActive) ||
            this.routers().some(router => router.isActive) ||
            links.some(item => item.thyNavItemActive()) ||
            links.some(item => item.thyNavLinkActive())
        );
    }

    setNavLinkHidden(value: boolean) {
        if (value) {
            this.hostRenderer.addClass('thy-nav-item-hidden');
        } else {
            this.hostRenderer.removeClass('thy-nav-item-hidden');
        }
    }

    addClass(className: string) {
        this.hostRenderer.addClass(className);
    }

    removeClass(className: string) {
        this.hostRenderer.removeClass(className);
    }
}
