import { Platform } from '@angular/cdk/platform';
import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    TemplateRef,
    ViewEncapsulation,
    effect,
    inject,
    input,
    contentChild,
    viewChild
} from '@angular/core';
import { useHostRenderer } from '@tethys/cdk/dom';

import { ThyAnchor } from './anchor.component';
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
        <a #linkTitle (click)="goToClick($event)" href="{{ thyHref() }}" class="thy-anchor-link-title" title="{{ title }}">
            @if (title) {
                <span>{{ title }}</span>
            } @else {
                <ng-template [ngTemplateOutlet]="titleTemplate || thyTemplate()"></ng-template>
            }
        </a>
        <ng-content></ng-content>
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgTemplateOutlet]
})
export class ThyAnchorLink implements OnInit, OnDestroy {
    elementRef = inject(ElementRef);
    private anchorComponent = inject(ThyAnchor);
    private platform = inject(Platform);

    title: string | null = '';

    titleTemplate?: TemplateRef<any>;

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

        effect(() => {
            const title = this.thyTitle();
            if (title instanceof TemplateRef) {
                this.title = null;
                this.titleTemplate = title;
            } else {
                this.title = title;
            }
        });
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
