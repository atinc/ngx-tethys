import { Platform } from '@angular/cdk/platform';
import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    TemplateRef,
    ViewEncapsulation,
    inject,
    input,
    contentChild,
    viewChild,
    Signal,
    computed
} from '@angular/core';
import { useHostRenderer } from '@tethys/cdk/dom';

import { IThyAnchorLinkComponent, THY_ANCHOR_COMPONENT } from './anchor.token';
import { NgTemplateOutlet } from '@angular/common';

/**
 * 锚点链接组件，可供锚点跳转
 * @name thy-anchor-link,thyAnchorLink
 */
@Component({
    selector: 'thy-link,thy-anchor-link',
    exportAs: 'thyLink,thyAnchorLink',
    preserveWhitespaces: false,
    template: `
        <a #linkTitle (click)="goToClick($event)" href="{{ thyHref() }}" class="thy-anchor-link-title" title="{{ title() }}">
            @if (title()) {
                <span>{{ title() }}</span>
            } @else {
                <ng-template [ngTemplateOutlet]="titleTemplate() || thyTemplate()"></ng-template>
            }
        </a>
        <ng-content></ng-content>
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgTemplateOutlet]
})
export class ThyAnchorLink implements IThyAnchorLinkComponent, OnInit, OnDestroy {
    elementRef = inject(ElementRef);
    private anchorComponent = inject(THY_ANCHOR_COMPONENT, { optional: true })!;
    private platform = inject(Platform);

    title: Signal<string | null> = computed(() => {
        return this.thyTitle() instanceof TemplateRef ? null : (this.thyTitle() as string);
    });

    titleTemplate: Signal<TemplateRef<any>> = computed(() => {
        return this.thyTitle() instanceof TemplateRef ? (this.thyTitle() as TemplateRef<any>) : null;
    });

    private hostRenderer = useHostRenderer();

    /**
     * 锚点链接
     */
    readonly thyHref = input('#');

    /**
     * 文字内容
     */
    readonly thyTitle = input<string | TemplateRef<void>>('');

    readonly thyTemplate = contentChild.required<TemplateRef<void>>('thyTemplate');

    readonly linkTitle = viewChild.required<ElementRef<HTMLAnchorElement>>('linkTitle');

    constructor() {
        const elementRef = this.elementRef;

        this.hostRenderer.addClass('thy-anchor-link');
        if (elementRef.nativeElement.tagName.toLowerCase() === 'thy-link') {
            console.warn(`'thy-link' and 'thyLink' are deprecated, please use 'thy-anchor-link' and 'thyAnchorLink' instead.`);
        }
    }

    ngOnInit(): void {
        this.anchorComponent.registerLink(this);
    }

    getLinkTitleElement(): HTMLAnchorElement {
        return this.linkTitle().nativeElement;
    }

    setActive(): void {
        this.hostRenderer.addClass('thy-anchor-link-active');
    }

    unsetActive(): void {
        this.hostRenderer.removeClass('thy-anchor-link-active');
    }

    goToClick(e: Event): void {
        e.preventDefault();
        e.stopPropagation();
        if (this.platform.isBrowser) {
            this.anchorComponent.handleScrollTo(this);
        }
    }

    ngOnDestroy(): void {
        this.anchorComponent.unregisterLink(this);
    }
}
