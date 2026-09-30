import { ThyAbstractOverlayContainer, ThyPortalOutlet } from 'ngx-tethys/core';
import { helpers } from 'ngx-tethys/util';
import { Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';

import { ViewportRuler } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';

import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    NgZone,
    OnDestroy,
    Renderer2,
    ViewChild,
    inject,
    DOCUMENT,
    ChangeDetectionStrategy
} from '@angular/core';
import { useHostRenderer } from '@tethys/cdk/dom';

import { slideAbstractOverlayOptions, ThySlideConfig, ThySlideFromTypes } from './slide.config';

/**
 * @private
 */
@Component({
    selector: 'thy-slide-container',
    template: ` <ng-template thyPortalOutlet></ng-template> `,
    host: {
        class: 'thy-slide-container',
        '[class.thy-slide-push]': 'isPush',
        '[class.thy-slide-side]': 'isSide',
        '[class.thy-slide-over]': '!isPush && !isSide',
        tabindex: '-1',
        '[attr.role]': `'slide'`,
        '[style.width.px]': 'slideContainerStyles.width',
        '[style.height.px]': 'slideContainerStyles.height',
        '[style.max-height.px]': 'slideContainerStyles.height'
    },
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [PortalModule, ThyPortalOutlet]
})
export class ThySlideContainer extends ThyAbstractOverlayContainer implements OnDestroy {
    private elementRef = inject(ElementRef);
    private document = inject(DOCUMENT);
    config = inject(ThySlideConfig);
    private renderer = inject(Renderer2);
    private viewportRuler = inject(ViewportRuler);
    private readonly ngZone = inject(NgZone);

    @ViewChild(ThyPortalOutlet, { static: true })
    portalOutlet!: ThyPortalOutlet;

    slideContainerStyles: { width?: number; height?: number } = {};

    private drawerContainerElement!: HTMLElement | null;

    private ngUnsubscribe$ = new Subject<void>();

    private hostRenderer = useHostRenderer();

    private slideMotionClass = '';

    get isPush() {
        return this.config.mode === 'push' && !!this.drawerContainerElement;
    }

    get isSide() {
        return this.config.mode === 'side' && !!this.drawerContainerElement;
    }

    private get isLeftOrRight(): boolean {
        return this.config.from === 'left' || this.config.from === 'right';
    }

    private get hostOffset() {
        let offset = 0;
        if (this.isLeftOrRight) {
            offset = this.elementRef.nativeElement.clientWidth + this.config.offset || 0;
        } else {
            offset = this.elementRef.nativeElement.clientHeight + this.config.offset || 0;
        }
        return offset;
    }

    private get transform() {
        switch (this.config.from) {
            case 'left':
                return `translateX(${this.hostOffset}px)`;
            case 'right':
                return `translateX(-${this.hostOffset}px)`;
            case 'top':
                return `translateY(${this.hostOffset}px)`;
            case 'bottom':
                return `translateY(${this.hostOffset}px)`;
        }
    }

    private get drawerContainerElementClass() {
        return `thy-slide-${this.config.mode}-drawer-container`;
    }

    constructor() {
        const changeDetectorRef = inject(ChangeDetectorRef);

        super(slideAbstractOverlayOptions, changeDetectorRef);
        this.animationHost = this.elementRef.nativeElement;
        this.setDrawerContainerElement();
        this.checkContainerWithinViewport();
        this.addDrawerContainerElementClass();
    }

    private setDrawerContainerElement() {
        if (typeof this.config.drawerContainer === 'string') {
            this.drawerContainerElement =
                (this.config.drawerContainer && (document.querySelector(this.config.drawerContainer) as HTMLElement)) || null;
        }
        if (this.config.drawerContainer instanceof ElementRef) {
            this.drawerContainerElement = this.config.drawerContainer.nativeElement;
        }
        if (this.config.drawerContainer instanceof HTMLElement) {
            this.drawerContainerElement = this.config.drawerContainer as HTMLElement;
        }
    }

    private setSlideContainerStyles() {
        let width, height, top, left;
        const drawerContainerElementRect = (this.drawerContainerElement || document.body).getBoundingClientRect();
        if (this.isLeftOrRight) {
            height = drawerContainerElementRect.height;
            top = drawerContainerElementRect.top;
            this.hostRenderer.setStyle('top', `${top}px`);
        } else {
            width = drawerContainerElementRect.width;
            left = drawerContainerElementRect.left;
            this.hostRenderer.setStyle('left', `${left}px`);
        }
        this.slideContainerStyles = {
            width: width,
            height: height
        };
    }

    private checkContainerWithinViewport() {
        this.viewportRuler
            .change(100)
            .pipe(startWith(null), takeUntil(this.ngUnsubscribe$))
            .subscribe(() => {
                this.ngZone.run(() => this.setSlideContainerStyles());
            });
    }

    private addDrawerContainerElementClass() {
        if (this.drawerContainerElement) {
            this.renderer.addClass(this.drawerContainerElement, this.drawerContainerElementClass);
        }
    }

    private removeDrawerContainerElementClass() {
        if (this.drawerContainerElement) {
            this.renderer.removeClass(this.drawerContainerElement, this.drawerContainerElementClass);
        }
    }

    private setDrawerContainerElementStyle() {
        if (this.isSide) {
            this.renderer.setStyle(this.drawerContainerElement, `margin-${this.config.from}`, `${this.hostOffset}px`);
        } else if (this.isPush) {
            this.renderer.setStyle(this.drawerContainerElement, `transform`, this.transform);
        }
    }

    private removeDrawerContainerElementStyle() {
        if (this.isSide) {
            this.renderer.removeStyle(this.drawerContainerElement, `margin-${this.config.from}`);
        } else if (this.isPush) {
            this.renderer.removeStyle(this.drawerContainerElement, `transform`);
        }
    }

    private applySlideMotionClass(fromState: ThySlideFromTypes) {
        const host = this.elementRef.nativeElement;
        if (this.slideMotionClass) {
            this.renderer.removeClass(host, this.slideMotionClass);
        }
        this.slideMotionClass = `thy-slide-from-${fromState}`;
        this.renderer.addClass(host, this.slideMotionClass);
    }

    beforeAttachPortal(): void {
        let fromState: ThySlideFromTypes;
        if (this.config.offset) {
            this.hostRenderer.setStyle(this.config.from!, `${this.config.offset}px`);
            fromState = helpers.camelCase(['offset', this.config.from!]) as ThySlideFromTypes;
        } else {
            fromState = this.config.from!;
        }
        this.applySlideMotionClass(fromState);
        this.setDrawerContainerElementStyle();
    }

    beforeDetachPortal(): void {
        this.removeDrawerContainerElementStyle();
    }

    ngOnDestroy() {
        super.destroy();
        this.removeDrawerContainerElementClass();
        this.ngUnsubscribe$.next();
        this.ngUnsubscribe$.complete();
    }
}
