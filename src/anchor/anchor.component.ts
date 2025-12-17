import { Platform } from '@angular/cdk/platform';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    NgZone,
    OnDestroy,
    Renderer2,
    ViewEncapsulation,
    numberAttribute,
    inject,
    input,
    viewChild,
    output,
    effect,
    computed,
    Signal,
    DOCUMENT
} from '@angular/core';
import { Subject, fromEvent } from 'rxjs';
import { takeUntil, throttleTime } from 'rxjs/operators';

import { NgClass, NgStyle, NgTemplateOutlet } from '@angular/common';
import { ThyAffix } from 'ngx-tethys/affix';
import { ThyScrollService } from 'ngx-tethys/core';
import { coerceBooleanProperty, getOffset } from 'ngx-tethys/util';
import { ThyAnchorLink } from './anchor-link.component';
import { IThyAnchorComponent, THY_ANCHOR_COMPONENT } from './anchor.token';

interface Section {
    linkComponent: ThyAnchorLink;
    top: number;
}

const sharpMatcherRegx = /#([^#]+)$/;

/**
 * 锚点组件
 * @name thy-anchor
 */
@Component({
    selector: 'thy-anchor',
    exportAs: 'thyAnchor',
    preserveWhitespaces: false,
    template: `
        @if (thyAffix()) {
            <thy-affix [thyOffsetTop]="thyOffsetTop()" [thyContainer]="container()">
                <ng-template [ngTemplateOutlet]="content"></ng-template>
            </thy-affix>
        } @else {
            <ng-template [ngTemplateOutlet]="content"></ng-template>
        }
        <ng-template #content>
            <div
                #wrapper
                class="thy-anchor-wrapper"
                [ngClass]="{ 'thy-anchor-wrapper-horizontal': thyDirection() === 'horizontal' }"
                [ngStyle]="wrapperStyle()">
                <div class="thy-anchor">
                    <div class="thy-anchor-ink">
                        <div class="thy-anchor-ink-full" #ink></div>
                    </div>
                    <ng-content></ng-content>
                </div>
            </div>
        </ng-template>
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ThyAffix, NgTemplateOutlet, NgStyle, NgClass],
    providers: [
        {
            provide: THY_ANCHOR_COMPONENT,
            useExisting: ThyAnchor
        }
    ]
})
export class ThyAnchor implements IThyAnchorComponent, OnDestroy, AfterViewInit {
    private document = inject(DOCUMENT);
    private cdr = inject(ChangeDetectorRef);
    private platform = inject(Platform);
    private zone = inject(NgZone);
    private renderer = inject(Renderer2);
    private scrollService = inject(ThyScrollService);

    readonly ink = viewChild.required<ElementRef>('ink');

    /**
     * 固定模式
     */
    readonly thyAffix = input(true, { transform: coerceBooleanProperty });

    /**
     * 锚点区域边界，单位：px
     */
    readonly thyBounds = input(5, { transform: numberAttribute });

    /**
     * 缓冲的偏移量阈值
     */
    readonly thyOffsetTop = input<number, unknown>(undefined, { transform: numberAttribute });

    /**
     * 指定滚动的容器
     */
    readonly thyContainer = input<string | HTMLElement>(undefined);

    /**
     * 设置导航方向
     */
    readonly thyDirection = input<'vertical' | 'horizontal'>('vertical');

    /**
     * 是否禁用容器滚动
     */
    readonly thyDisabledContainerScroll = input(false, { transform: coerceBooleanProperty });

    /**
     * 点击项触发
     */
    readonly thyClick = output<ThyAnchorLink>();

    /**
     * 滚动到某锚点时触发
     */
    readonly thyScroll = output<ThyAnchorLink>();

    visible = false;

    readonly wrapperStyle = computed(() => {
        return {
            'max-height': this.thyOffsetTop() ? `calc(100vh - ${this.thyOffsetTop()}px)` : '100vh'
        };
    });

    readonly container: Signal<HTMLElement | Window> = computed(() => {
        return (
            (typeof this.thyContainer() === 'string'
                ? (this.document.querySelector(this.thyContainer() as string) as HTMLElement)
                : (this.thyContainer() as HTMLElement)) || window
        );
    });

    public links: ThyAnchorLink[] = [];

    private animating = false;

    private destroy$ = new Subject<void>();

    private handleScrollTimeoutID: any = -1;

    private wrapper = viewChild.required<ElementRef<HTMLDivElement>>('wrapper');

    registerLink(link: ThyAnchorLink): void {
        this.links.push(link);
    }

    unregisterLink(link: ThyAnchorLink): void {
        this.links.splice(this.links.indexOf(link), 1);
    }

    constructor() {
        effect(() => {
            if (this.thyContainer()) {
                this.registerScrollEvent();
            }
        });
    }

    ngAfterViewInit(): void {
        this.warningPrompt();
        this.registerScrollEvent();
    }

    ngOnDestroy(): void {
        clearTimeout(this.handleScrollTimeoutID);
        this.destroy$.next();
        this.destroy$.complete();
    }

    private warningPrompt() {
        if (this.thyDirection() === 'horizontal') {
            const hasChildren = this.links.some(link =>
                Array.from(link?.elementRef?.nativeElement?.childNodes)?.some((item: HTMLElement) => item?.nodeName === 'THY-ANCHOR-LINK')
            );
            if (hasChildren) {
                console.warn("Anchor link nesting is not supported when 'Anchor' direction is horizontal.");
            }
        }
    }

    private registerScrollEvent(): void {
        if (!this.platform.isBrowser) {
            return;
        }
        this.destroy$.next();
        if (this.thyDisabledContainerScroll()) {
            return;
        }
        this.zone.runOutsideAngular(() => {
            fromEvent(this.container(), 'scroll', { passive: true })
                .pipe(throttleTime(50), takeUntil(this.destroy$))
                .subscribe(() => this.handleScroll());
        });
        // Browser would maintain the scrolling position when refreshing.
        // So we have to delay calculation in avoid of getting a incorrect result.
        this.handleScrollTimeoutID = setTimeout(() => this.handleScroll());
    }

    handleScroll(): void {
        if (typeof document === 'undefined' || this.animating) {
            return;
        }
        const container: HTMLElement =
            this.container() instanceof HTMLElement ? (this.container() as HTMLElement) : (this.document as unknown as HTMLElement);

        const sections: Section[] = [];
        const scope = (this.thyOffsetTop() || 0) + this.thyBounds();
        this.links.forEach(linkComponent => {
            const sharpLinkMatch = sharpMatcherRegx.exec(linkComponent.thyHref().toString());
            if (!sharpLinkMatch) {
                return;
            }
            const target = container.querySelector(`#${sharpLinkMatch[1]}`) as HTMLElement;
            if (target) {
                const top = getOffset(target, this.container()).top;
                if (top < scope) {
                    sections.push({
                        top,
                        linkComponent
                    });
                }
            }
        });

        this.visible = !!sections.length;
        if (!this.visible) {
            this.clearActive();
            this.cdr.detectChanges();
        } else {
            const maxSection = sections.reduce((prev, curr) => (curr.top > prev.top ? curr : prev));
            this.handleActive(maxSection.linkComponent);
        }
        this.setVisible();
    }

    private clearActive(): void {
        this.links.forEach(i => {
            i.unsetActive();
        });
    }

    public handleActive(linkComponent: ThyAnchorLink): void {
        this.clearActive();
        linkComponent.setActive();
        const linkNode = linkComponent.getLinkTitleElement();
        const horizontalAnchor = this.thyDirection() === 'horizontal';

        const ink = this.ink();
        ink.nativeElement.style.top = horizontalAnchor ? '' : `${linkNode.offsetTop}px`;
        ink.nativeElement.style.height = horizontalAnchor ? '' : `${linkNode.clientHeight}px`;
        ink.nativeElement.style.left = horizontalAnchor ? `${linkNode.offsetLeft}px` : '';
        ink.nativeElement.style.width = horizontalAnchor ? `${linkNode.clientWidth}px` : '';
        this.visible = true;
        this.setVisible();
        this.linkVisible(linkNode);
        this.thyScroll.emit(linkComponent);
    }

    private linkVisible(linkNode: HTMLElement): void {
        const wrapper = this.wrapper().nativeElement;
        const horizontalAnchor = this.thyDirection() === 'horizontal';
        if (horizontalAnchor) {
            if (linkNode.offsetLeft > wrapper.scrollLeft + wrapper.offsetWidth) {
                wrapper.scrollLeft = linkNode.offsetLeft;
            }
            if (linkNode.offsetLeft < wrapper.scrollLeft) {
                wrapper.scrollLeft = linkNode.offsetLeft;
            }
        } else {
            if (linkNode.offsetTop > wrapper.scrollTop + wrapper.offsetHeight) {
                wrapper.scrollTop = linkNode.offsetTop;
            }
            if (linkNode.offsetTop < wrapper.scrollTop) {
                wrapper.scrollTop = linkNode.offsetTop;
            }
        }
    }

    private setVisible(): void {
        const visible = this.visible;
        const visibleClassname = 'visible';
        const ink = this.ink();
        if (ink) {
            if (visible) {
                this.renderer.addClass(ink.nativeElement, visibleClassname);
            } else {
                this.renderer.removeClass(ink.nativeElement, visibleClassname);
            }
        }
    }

    handleScrollTo(linkComponent: ThyAnchorLink): void {
        if (!this.thyDisabledContainerScroll()) {
            const container: HTMLElement =
                this.container() instanceof HTMLElement ? (this.container() as HTMLElement) : (this.document as unknown as HTMLElement);
            const linkElement: HTMLElement = container.querySelector(linkComponent.thyHref());
            if (!linkElement) {
                return;
            }

            this.animating = true;
            const containerScrollTop = this.scrollService.getScroll(this.container());
            const elementOffsetTop = getOffset(linkElement, this.container()).top;
            const targetScrollTop = containerScrollTop + elementOffsetTop - (this.thyOffsetTop() || 0);
            this.scrollService.scrollTo(this.container(), targetScrollTop, undefined, () => {
                this.animating = false;
            });
        }
        this.handleActive(linkComponent);
        this.thyClick.emit(linkComponent);
    }
}
