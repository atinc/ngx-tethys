import { Observable, Subject } from 'rxjs';
import { ThyCarouselComponent } from 'ngx-tethys/carousel';
import { ChangeDetectorRef, QueryList, Renderer2 } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { CarouselBasic, DistanceVector } from 'ngx-tethys/carousel/typings';
import { ThyCarouselItemDirective } from 'ngx-tethys/carousel/carousel-item.directive';

export class ThyCarouselTransformEngine implements CarouselBasic {
    private readonly carouselComponent: ThyCarouselComponent;
    private contents: ThyCarouselItemDirective[];
    private length: number;
    private wrapperEl: HTMLElement;
    private playTime: number;
    private contentWidth: number;
    private contentHeight: number;

    protected get maxIndex(): number {
        return this.length - 1;
    }

    protected get firstEl(): HTMLElement {
        return this.contents[0].el;
    }

    protected get lastEl(): HTMLElement {
        return this.contents[this.maxIndex].el;
    }

    constructor(
        thyCarouselComponent: ThyCarouselComponent,
        protected cdr: ChangeDetectorRef,
        protected renderer: Renderer2,
        protected platform: Platform
    ) {
        this.carouselComponent = thyCarouselComponent;
    }

    private prepareHorizontalContext(activeIndex: number): void {
        if (activeIndex >= this.maxIndex) {
            this.renderer.setStyle(this.firstEl, 'left', `${this.length * this.contentWidth}px`);
            this.renderer.setStyle(this.lastEl, 'left', null);
        } else if (activeIndex <= 0) {
            this.renderer.setStyle(this.firstEl, 'left', null);
            this.renderer.setStyle(this.lastEl, 'left', `${-this.length * this.contentWidth}px`);
        } else {
            this.resetContext();
        }
    }

    private resetContext() {
        this.renderer.setStyle(this.lastEl, 'left', null);
        this.renderer.setStyle(this.firstEl, 'left', null);
    }

    private initializeContents(contents: QueryList<ThyCarouselItemDirective> | null) {
        const carousel = this.carouselComponent!;
        const { wrapperEl, playTime } = carousel;
        this.wrapperEl = wrapperEl;
        this.playTime = playTime;
        const { width, height } = wrapperEl.getBoundingClientRect();
        this.contentHeight = height;
        this.contentWidth = width;

        this.contents = contents?.toArray();
        this.length = this.contents.length;
        if (this.platform.isBrowser && this.contents.length) {
            this.renderer.setStyle(this.wrapperEl, `height`, `${this.contentHeight}px`);
        }
    }

    initializeCarouselContents(contents: QueryList<ThyCarouselItemDirective> | null): Observable<ThyCarouselItemDirective[]> {
        const initialize$ = new Subject<ThyCarouselItemDirective[]>();
        this.initializeContents(contents);
        initialize$.next(this.contents);
        setTimeout(() => {
            initialize$.next(this.contents);
            initialize$.complete();
        }, 0);
        return initialize$.asObservable();
    }

    dragging(pointerVector: DistanceVector, rect: DOMRect): void {
        const { x } = pointerVector;
        const { width, height } = rect;
        this.contentWidth = width;
        this.contentHeight = height;
        const activeIndex = this.carouselComponent!.activeIndex;
        if (this.length > 1) {
            this.prepareHorizontalContext(activeIndex);
        }
        this.renderer.setStyle(this.wrapperEl, 'transform', `translate3d(${-activeIndex * this.contentWidth + x}px,0 , 0)`);
    }

    switch(from: number, to: number): Observable<void> {
        const switch$ = new Subject<void>();
        this.prepareHorizontalContext(to);
        this.renderer.setStyle(this.wrapperEl, `transition-duration`, `${this.playTime}ms`);
        this.renderer.setStyle(this.wrapperEl, `transform`, `translate3d(${-to * this.contentWidth}px,0 , 0)`);
        setTimeout(() => {
            switch$.next();
        }, 0);
        setTimeout(() => {
            this.resetContext();
            this.renderer.setStyle(this.wrapperEl, `transition-duration`, `0s`);
            this.renderer.setStyle(
                this.wrapperEl,
                `transform`,
                `translate3d(${-((to + this.length) % this.length) * this.contentWidth}px,0 , 0)`
            );
            switch$.complete();
        }, this.playTime);
        return switch$.asObservable();
    }

    stagnating(): void {
        throw new Error('not implements stagnating');
    }
}
