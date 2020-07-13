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

@Component({
    selector: 'thy-link',
    exportAs: 'thyLink',
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
    @Input() thyHref = '#';

    title: string | null = '';
    titleTemplate?: TemplateRef<any>;

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
