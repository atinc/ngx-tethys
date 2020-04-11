import { Component, ElementRef, ViewChild, Inject, ChangeDetectorRef, Renderer2, OnDestroy } from '@angular/core';
import { CdkPortalOutlet } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import { ThyUpperOverlayContainer } from '../core/overlay';
import { Observable } from 'rxjs';
import { AnimationEvent } from '@angular/animations';
import { slideUpperOverlayOptions, ThySlideConfig, ThySlideFromTypes } from './slide.config';
import { filter } from 'rxjs/operators';
import { thySlideAnimations } from './slide-animations';
import { helpers } from '../util';

@Component({
    selector: 'thy-slide-container',
    template: `
        <ng-template cdkPortalOutlet></ng-template>
    `,
    animations: [thySlideAnimations.slideContainer],
    host: {
        class: 'thy-slide-container',
        '[class.thy-slide-push]': 'isPush',
        '[class.thy-slide-side]': 'isSide',
        '[class.thy-slide-over]': '!isPush && !isSide',
        tabindex: '-1',
        '[attr.role]': `'slide'`,
        '[@slideContainer]': 'animationState',
        '(@slideContainer.start)': 'onAnimationStart($event)',
        '(@slideContainer.done)': 'onAnimationDone($event)',
        '[style.width.px]': 'slideContainerStyles.width',
        '[style.height.px]': 'slideContainerStyles.height',
        '[style.max-height.px]': 'slideContainerStyles.height'
    }
})
export class ThySlideContainerComponent extends ThyUpperOverlayContainer implements OnDestroy {
    @ViewChild(CdkPortalOutlet)
    portalOutlet: CdkPortalOutlet;

    animationOpeningDone: Observable<AnimationEvent>;

    animationClosingDone: Observable<AnimationEvent>;

    animationState: ThySlideFromTypes = 'void';

    slideContainerStyles: { width?: number; height?: number } = {};

    private drawerContainerElement: HTMLElement;

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

    constructor(
        private elementRef: ElementRef,
        @Inject(DOCUMENT) private document: any,
        public config: ThySlideConfig,
        changeDetectorRef: ChangeDetectorRef,
        private renderer: Renderer2
    ) {
        super(slideUpperOverlayOptions, changeDetectorRef);
        this.animationOpeningDone = this.animationStateChanged.pipe(
            filter((event: AnimationEvent) => {
                return event.phaseName === 'done' && event.toState === this.animationState;
            })
        );
        this.animationClosingDone = this.animationStateChanged.pipe(
            filter((event: AnimationEvent) => {
                return event.phaseName === 'done' && event.toState === 'exit';
            })
        );
        this.setDrawerContainerElement();
        this.getSlideContainerStyles();
        this.addDrawerContainerElementClass();
    }

    private setDrawerContainerElement() {
        if (typeof this.config.drawerContainer === 'string') {
            this.drawerContainerElement =
                this.config.drawerContainer && document.querySelector(this.config.drawerContainer);
        }
        if (this.config.drawerContainer instanceof ElementRef) {
            this.drawerContainerElement = this.config.drawerContainer.nativeElement;
        }
        if (this.config.drawerContainer instanceof HTMLElement) {
            this.drawerContainerElement = this.config.drawerContainer as HTMLElement;
        }
    }

    private getSlideContainerStyles() {
        let width, height, top, left;
        const drawerContainerElementRect = (this.drawerContainerElement || document.body).getBoundingClientRect();
        if (this.isLeftOrRight) {
            height = drawerContainerElementRect.height;
            top = drawerContainerElementRect.top;
            this.renderer.setStyle(this.elementRef.nativeElement, 'top', top);
        } else {
            width = drawerContainerElementRect.width;
            left = drawerContainerElementRect.left;
            this.renderer.setStyle(this.elementRef.nativeElement, 'left', left);
        }
        this.slideContainerStyles = {
            width: width,
            height: height
        };
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

    beforeAttachPortal(): void {
        if (this.config.offset) {
            this.renderer.setStyle(this.elementRef.nativeElement, this.config.from, `${this.config.offset}px`);
            this.animationState = helpers.camelCase(['offset', this.config.from]) as ThySlideFromTypes;
        } else {
            this.animationState = this.config.from;
        }
        this.setDrawerContainerElementStyle();
    }

    beforeDetachPortal(): void {
        this.removeDrawerContainerElementStyle();
    }

    onAnimationDone(event: AnimationEvent) {
        this.animationStateChanged.emit(event);
    }

    onAnimationStart(event: AnimationEvent) {
        this.animationStateChanged.emit(event);
    }

    ngOnDestroy() {
        this.removeDrawerContainerElementClass();
    }
}
