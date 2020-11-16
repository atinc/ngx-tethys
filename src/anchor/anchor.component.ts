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
    ViewEncapsulation
} from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil, throttleTime } from 'rxjs/operators';

import { ThyAnchorLinkComponent } from './anchor-link.component';
import { getOffset } from './../util/dom';
import { ThyScrollService } from '../core/scroll';
import { DOCUMENT } from '@angular/common';

interface Section {
    linkComponent: ThyAnchorLinkComponent;
    top: number;
}

const sharpMatcherRegx = /#([^#]+)$/;

@Component({
    selector: 'thy-anchor',
    exportAs: 'thyAnchor',
    preserveWhitespaces: false,
    template: `
        <thy-affix *ngIf="thyAffix; else content" [thyOffsetTop]="thyOffsetTop" [thyContainer]="container">
            <ng-template [ngTemplateOutlet]="content"></ng-template>
        </thy-affix>
        <ng-template #content>
            <div class="thy-anchor-wrapper" [ngStyle]="wrapperStyle">
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
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThyAnchorComponent implements OnDestroy, AfterViewInit, OnChanges {
    @ViewChild('ink', { static: false }) private ink!: ElementRef;

    @Input() thyAffix = true;

    @Input()
    thyBounds = 5;

    @Input()
    thyOffsetTop?: number = undefined;

    @Input() thyContainer?: string | HTMLElement;
    @Input() thyTarget: string | HTMLElement = '';

    @Output() readonly thyClick = new EventEmitter<ThyAnchorLinkComponent>();
    @Output() readonly thyScroll = new EventEmitter<ThyAnchorLinkComponent>();

    visible = false;
    wrapperStyle = { 'max-height': '100vh' };

    container?: HTMLElement | Window;

    private links: ThyAnchorLinkComponent[] = [];
    private animating = false;
    private destroy$ = new Subject();
    private handleScrollTimeoutID = -1;

    constructor(
        @Inject(DOCUMENT) private document: any,
        private cdr: ChangeDetectorRef,
        private platform: Platform,
        private zone: NgZone,
        private renderer: Renderer2,
        private scrollService: ThyScrollService
    ) {}

    registerLink(link: ThyAnchorLinkComponent): void {
        this.links.push(link);
    }

    unregisterLink(link: ThyAnchorLinkComponent): void {
        this.links.splice(this.links.indexOf(link), 1);
    }

    private getContainer(): HTMLElement | Window {
        return this.container || window;
    }

    ngAfterViewInit(): void {
        this.registerScrollEvent();
    }

    ngOnDestroy(): void {
        clearTimeout(this.handleScrollTimeoutID);
        this.destroy$.next();
        this.destroy$.complete();
    }

    private registerScrollEvent(): void {
        if (!this.platform.isBrowser) {
            return;
        }
        this.destroy$.next();
        this.zone.runOutsideAngular(() => {
            fromEvent(this.getContainer(), 'scroll')
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

    private handleActive(linkComponent: ThyAnchorLinkComponent): void {
        this.clearActive();
        linkComponent.setActive();
        const linkNode = linkComponent.getLinkTitleElement();

        this.ink.nativeElement.style.top = `${linkNode.offsetTop}px`;
        this.ink.nativeElement.style.height = `${linkNode.clientHeight}px`;
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

    handleScrollTo(linkComponent: ThyAnchorLinkComponent): void {
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
            const container = this.thyContainer || this.thyTarget;
            this.container = typeof container === 'string' ? this.document.querySelector(container) : container;
            this.registerScrollEvent();
        }
    }
}
