import {
    afterNextRender,
    computed,
    contentChildren,
    Directive,
    ElementRef,
    forwardRef,
    inject,
    input,
    signal,
    WritableSignal
} from '@angular/core';
import { RouterLinkActive } from '@angular/router';
import { useHostRenderer } from '@tethys/cdk/dom';
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
        '[class.active]': 'thyNavItemActive() || thyNavLinkActive()',
        '[class.disabled]': 'thyNavItemDisabled()'
    }
})
export class ThyNavItemDirective {
    public elementRef = inject(ElementRef);

    private routerLinkActive = inject(RouterLinkActive, { optional: true })!;

    private hostRenderer = useHostRenderer();

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

    public offset: WritableSignal<{
        width: number;
        height: number;
        left: number;
        top: number;
    }> = signal({
        width: 0,
        height: 0,
        left: 0,
        top: 0
    });

    // @deprecated please use template()
    public content!: HTMLElement;

    public template!: WritableSignal<HTMLElement>;

    public readonly isActive = computed(() => {
        return this.linkIsActive();
    });

    constructor() {
        afterNextRender(() => {
            this.setOffset();

            this.content = this.elementRef.nativeElement.outerHTML;
            this.template.set(this.elementRef.nativeElement.outerHTML);
        });
    }

    setOffset() {
        this.offset.set({
            width: this.elementRef.nativeElement.offsetWidth || this.offset().width,
            height: this.elementRef.nativeElement.offsetHeight || this.offset().height,
            left: this.elementRef.nativeElement.offsetLeft || this.offset().left,
            top: this.elementRef.nativeElement.offsetTop || this.offset().top
        });
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
