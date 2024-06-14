import { Platform } from '@angular/cdk/platform';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Inject,
    Input,
    NgZone,
    OnChanges,
    OnDestroy,
    Output,
    Renderer2,
    SimpleChanges,
    ViewChild,
    ViewEncapsulation,
    numberAttribute
} from '@angular/core';
import { Subject, fromEvent } from 'rxjs';
import { takeUntil, throttleTime } from 'rxjs/operators';

import { DOCUMENT, NgClass, NgIf, NgStyle, NgTemplateOutlet } from '@angular/common';
import { ThyAffix } from 'ngx-tethys/affix';
import { ThyScrollService } from 'ngx-tethys/core';
import { coerceBooleanProperty, getOffset } from 'ngx-tethys/util';
import { ThyAnchorLink } from './anchor-link.component';

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
        <thy-affix *ngIf="thyAffix; else content" [thyOffsetTop]="thyOffsetTop" [thyContainer]="container">
            <ng-template [ngTemplateOutlet]="content"></ng-template>
        </thy-affix>
        <ng-template #content>
            <div
                class="thy-anchor-wrapper"
                [ngClass]="{ 'thy-anchor-wrapper-horizontal': thyDirection === 'horizontal' }"
                [ngStyle]="wrapperStyle">
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
    standalone: true,
    imports: [NgIf, ThyAffix, NgTemplateOutlet, NgStyle, NgClass]
})
export class ThyAnchor implements OnDestroy, AfterViewInit, OnChanges {
    @ViewChild('ink') private ink!: ElementRef;

    /**
     * 固定模式
     */
    @Input({ transform: coerceBooleanProperty }) thyAffix = true;

    /**
     * 锚点区域边界，单位：px
     */
    @Input({ transform: numberAttribute })
    thyBounds = 5;

    /**
     * 缓冲的偏移量阈值
     */
    @Input({ transform: numberAttribute })
    thyOffsetTop?: number = undefined;

    /**
     * 指定滚动的容器
     * @type string | HTMLElement
     */
    @Input() thyContainer?: string | HTMLElement;

    /**
     * 设置导航方向
     * @type 'vertical' | 'horizontal'
     */
    @Input() thyDirection: 'vertical' | 'horizontal' = 'vertical';

    /**
     * 点击项触发
     */
    @Output() readonly thyClick = new EventEmitter<ThyAnchorLink>();

    /**
     * 滚动到某锚点时触发
     */
    @Output() readonly thyScroll = new EventEmitter<ThyAnchorLink>();

    visible = false;

    wrapperStyle = { 'max-height': '100vh' };

    container?: HTMLElement | Window;

    private links: ThyAnchorLink[] = [];

    private animating = false;

    private destroy$ = new Subject<void>();

    private handleScrollTimeoutID = -1;

    constructor(
        @Inject(DOCUMENT) private document: any,
        private cdr: ChangeDetectorRef,
        private platform: Platform,
        private zone: NgZone,
        private renderer: Renderer2,
        private scrollService: ThyScrollService,
        private elementRef: ElementRef
    ) {}

    registerLink(link: ThyAnchorLink): void {
        this.links.push(link);
    }

    unregisterLink(link: ThyAnchorLink): void {
        this.links.splice(this.links.indexOf(link), 1);
    }

    private getContainer(): HTMLElement | Window {
        return this.container || window;
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
        if (this.thyDirection === 'horizontal') {
            const hasChildren = this.links.some(link =>
                Array.from(link?.elementRef?.nativeElement?.childNodes)?.some((item: HTMLElement) =>
                    item?.className.includes('thy-anchor-link')
                )
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
        this.zone.runOutsideAngular(() => {
            fromEvent(this.getContainer(), 'scroll', { passive: true })
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
        const container: HTMLElement = this.container instanceof HTMLElement ? this.container : this.document;

        const sections: Section[] = [];
        const scope = (this.thyOffsetTop || 0) + this.thyBounds;
        this.links.forEach(linkComponent => {
            const sharpLinkMatch = sharpMatcherRegx.exec(linkComponent.thyHref.toString());
            if (!sharpLinkMatch) {
                return;
            }
            const target = container.querySelector(`#${sharpLinkMatch[1]}`) as HTMLElement;
            if (target) {
                const top = getOffset(target, this.getContainer()).top;
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

    private handleActive(linkComponent: ThyAnchorLink): void {
        this.clearActive();
        linkComponent.setActive();
        const linkNode = linkComponent.getLinkTitleElement();
        const horizontalAnchor = this.thyDirection === 'horizontal';

        this.ink.nativeElement.style.top = horizontalAnchor ? '' : `${linkNode.offsetTop}px`;
        this.ink.nativeElement.style.height = horizontalAnchor ? '' : `${linkNode.clientHeight}px`;
        this.ink.nativeElement.style.left = horizontalAnchor ? `${linkNode.offsetLeft}px` : '';
        this.ink.nativeElement.style.width = horizontalAnchor ? `${linkNode.clientWidth}px` : '';
        this.visible = true;
        this.setVisible();
        this.thyScroll.emit(linkComponent);
    }

    private setVisible(): void {
        const visible = this.visible;
        const visibleClassname = 'visible';
        if (this.ink) {
            if (visible) {
                this.renderer.addClass(this.ink.nativeElement, visibleClassname);
            } else {
                this.renderer.removeClass(this.ink.nativeElement, visibleClassname);
            }
        }
    }

    handleScrollTo(linkComponent: ThyAnchorLink): void {
        const container: HTMLElement = this.container instanceof HTMLElement ? this.container : this.document;
        const linkElement: HTMLElement = container.querySelector(linkComponent.thyHref);
        if (!linkElement) {
            return;
        }

        this.animating = true;
        const containerScrollTop = this.scrollService.getScroll(this.getContainer());
        const elementOffsetTop = getOffset(linkElement, this.getContainer()).top;
        const targetScrollTop = containerScrollTop + elementOffsetTop - (this.thyOffsetTop || 0);
        this.scrollService.scrollTo(this.getContainer(), targetScrollTop, undefined, () => {
            this.animating = false;
        });
        this.handleActive(linkComponent);
        this.thyClick.emit(linkComponent);
    }

    ngOnChanges(changes: SimpleChanges): void {
        const { thyOffsetTop, thyContainer } = changes;
        if (thyOffsetTop) {
            this.wrapperStyle = {
                'max-height': `calc(100vh - ${this.thyOffsetTop}px)`
            };
        }
        if (thyContainer && this.thyContainer) {
            const container = this.thyContainer;
            this.container = typeof container === 'string' ? this.document.querySelector(container) : container;
            this.registerScrollEvent();
        }
    }
}
