import { ChangeDetectorRef, QueryList, Renderer2 } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { Observable, Subject } from 'rxjs';
import { ThyCarouselComponent } from '../carousel.component';
import { DistanceVector } from '../typings';
import { ThyCarouselItemDirective } from '../carousel-item.directive';
import { ThyCarouselBasicEngine } from '../engine/carousel-basic';

export class ThyCarouselSlideEngine extends ThyCarouselBasicEngine {
    constructor(thyCarouselComponent: ThyCarouselComponent, cdr: ChangeDetectorRef, renderer: Renderer2, platform: Platform) {
        super(thyCarouselComponent, cdr, renderer, platform);
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

    initializeCarouselContents(contents: QueryList<ThyCarouselItemDirective> | null): void {
        this.initializeContents(contents);
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

    switch(to: number, from: number): Observable<void> {
        const switch$ = new Subject<void>();
        if (Math.abs(from - to) === 1) {
            this.prepareHorizontalContext(to);
        }
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

    stagnating(): void {}

    correctionOffset(): void {
        super.correctionOffset();
        const { activeIndex } = this.carouselComponent!;
        this.renderer.setStyle(this.wrapperEl, `transform`, `translate3d(${-activeIndex * this.contentWidth}px,0 , 0)`);
    }
}
