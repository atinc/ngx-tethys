import { Platform } from '@angular/cdk/platform';
import {
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    ElementRef,
    Input,
    OnDestroy,
    OnInit,
    TemplateRef,
    ViewChild,
    ViewEncapsulation,
    inject
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
        <a #linkTitle (click)="goToClick($event)" href="{{ thyHref }}" class="thy-anchor-link-title" title="{{ title }}">
            @if (title) {
                <span>{{ title }}</span>
            } @else {
                <ng-template [ngTemplateOutlet]="titleTemplate || thyTemplate"></ng-template>
            }
        </a>
        <ng-content></ng-content>
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgTemplateOutlet]
})
export class ThyAnchorLink implements IThyAnchorLinkComponent, OnInit, OnDestroy {
    elementRef = inject(ElementRef);
    private anchorComponent = inject(THY_ANCHOR_COMPONENT);
    private platform = inject(Platform);

    title: string | null = '';

    titleTemplate?: TemplateRef<any>;

    private hostRenderer = useHostRenderer();

    /**
     * 锚点链接
     */
    @Input() thyHref = '#';

    /**
     * 文字内容
     */
    @Input()
    set thyTitle(value: string | TemplateRef<void>) {
        if (value instanceof TemplateRef) {
            this.title = null;
            this.titleTemplate = value;
        } else {
            this.title = value;
        }
    }

    @ContentChild('thyTemplate') thyTemplate!: TemplateRef<void>;

    @ViewChild('linkTitle', { static: true }) linkTitle!: ElementRef<HTMLAnchorElement>;

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
        return this.linkTitle.nativeElement;
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
