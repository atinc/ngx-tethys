import { Platform } from '@angular/cdk/platform';
import {
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    ElementRef,
    Input,
    OnDestroy,
    OnInit,
    Renderer2,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';

import { ThyAnchorComponent } from './anchor.component';

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
            <span *ngIf="title; else titleTemplate || thyTemplate">{{ title }}</span>
        </a>
        <ng-content></ng-content>
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThyAnchorLinkComponent implements OnInit, OnDestroy {
    title: string | null = '';

    titleTemplate?: TemplateRef<any>;

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

    constructor(
        public elementRef: ElementRef,
        private anchorComponent: ThyAnchorComponent,
        private platform: Platform,
        private renderer: Renderer2
    ) {
        this.renderer.addClass(elementRef.nativeElement, 'thy-anchor-link');
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
        this.renderer.addClass(this.elementRef.nativeElement, 'thy-anchor-link-active');
    }

    unsetActive(): void {
        this.renderer.removeClass(this.elementRef.nativeElement, 'thy-anchor-link-active');
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
