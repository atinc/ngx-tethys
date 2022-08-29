import { ThyCarouselBasic } from 'ngx-tethys/carousel/engine/carousel-basic';
import { Observable, Subject } from 'rxjs';
import { ThyCarouselComponent } from 'ngx-tethys/carousel';
import { ChangeDetectorRef, QueryList, Renderer2 } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { DistanceVector } from 'ngx-tethys/carousel/typings';
import { ThyCarouselItemDirective } from 'ngx-tethys/carousel/carousel-item.directive';

export class ThyCarouselTransformEngine extends ThyCarouselBasic {
    constructor(
        thyCarouselComponent: ThyCarouselComponent,
        protected cdr: ChangeDetectorRef,
        protected renderer: Renderer2,
        protected platform: Platform
    ) {
        super(thyCarouselComponent, cdr, renderer, platform);

        console.log(thyCarouselComponent);
        console.log(thyCarouselComponent.speed);
    }

    private prepareHorizontalContext(lastToFirst: boolean): void {
        if (lastToFirst) {
            this.renderer.setStyle(this.firstEl, 'left', `${this.length * this.contentWidth}px`);
            this.renderer.setStyle(this.lastEl, 'left', null);
        } else {
            this.renderer.setStyle(this.firstEl, 'left', null);
            this.renderer.setStyle(this.lastEl, 'left', `${-this.length * this.contentWidth}px`);
        }
    }

    initializeCarouselContents(contents: QueryList<ThyCarouselItemDirective> | null): Observable<ThyCarouselItemDirective[]> {
        const initialize$ = new Subject<ThyCarouselItemDirective[]>();
        super.initializeContents(contents);
        if (this.platform.isBrowser && this.contents.length) {
            this.renderer.setStyle(this.wrapperEl, `height`, `${this.contentHeight}px`);
        }
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
        console.log(`dragging`, activeIndex);
        if (this.length > 0) {
            if (activeIndex === this.maxIndex) {
                this.prepareHorizontalContext(true);
            } else if (activeIndex === 0) {
                this.prepareHorizontalContext(false);
            } else {
                this.renderer.setStyle(this.lastEl, 'left', null);
                this.renderer.setStyle(this.firstEl, 'left', null);
            }
        }
        this.renderer.setStyle(this.wrapperEl, 'transform', `translate3d(${-activeIndex * this.contentWidth + x}px,0 , 0)`);
    }

    switch(from: number, to: number): Observable<void> {
        const switch$ = new Subject<void>();
        this.renderer.setStyle(this.wrapperEl, `transition-duration`, `${this.playTime}ms`);
        this.renderer.setStyle(this.wrapperEl, `transform`, `translate3d(${-to * this.contentWidth}px,0 , 0)`);
        setTimeout(() => {
            switch$.next();
            switch$.complete();
        }, 0);
        return switch$.asObservable();
    }

    stagnating(): void {
        throw new Error('not implements stagnating');
    }
}
