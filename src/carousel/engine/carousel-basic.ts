import { Observable } from 'rxjs';
import { ThyCarouselItemDirective } from 'ngx-tethys/carousel/carousel-item.directive';
import { CarouselBasic, CarouselComponentAsSource, DistanceVector } from 'ngx-tethys/carousel/typings';
import { ChangeDetectorRef, QueryList, Renderer2 } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { ThyCarouselComponent } from 'ngx-tethys/carousel';

export abstract class ThyCarouselBasic implements CarouselBasic {
    carouselComponent: ThyCarouselComponent;
    contents: ThyCarouselItemDirective[];
    length: number;
    wrapperEl: HTMLElement;
    playTime: number;
    contentWidth: number;
    contentHeight: number;
    currentDistance: DistanceVector = { x: 0, y: 0 };

    protected unitWidth!: number;
    protected unitHeight!: number;

    protected get maxIndex(): number {
        return this.length - 1;
    }

    protected get firstEl(): HTMLElement {
        return this.contents[0].el;
    }

    protected get lastEl(): HTMLElement {
        return this.contents[this.maxIndex].el;
    }

    protected constructor(
        thyCarouselComponent: ThyCarouselComponent,
        protected cdr: ChangeDetectorRef,
        protected renderer: Renderer2,
        protected platform: Platform
    ) {
        this.carouselComponent = thyCarouselComponent;
    }

    initializeCarouselContents(contents: QueryList<ThyCarouselItemDirective> | null): Observable<ThyCarouselItemDirective[]> {
        throw new Error('Method not implemented.');
    }
    switch(to: number, from: number): Observable<void> {
        throw new Error('Method not implemented.');
    }
    dragging(pointerVector: DistanceVector, rect: DOMRect): void {
        throw new Error('Method not implemented.');
    }
    stagnating(): void {
        throw new Error('Method not implemented.');
    }
    // initializeCarouselContents() {
    //     const carousel = this.carouselComponent;
    // }

    initializeContents(contents: QueryList<ThyCarouselItemDirective> | null) {
        const carousel = this.carouselComponent!;
        const { wrapperEl, playTime } = carousel;
        this.wrapperEl = wrapperEl;
        this.playTime = playTime;

        this.contents = contents?.toArray();
        this.length = this.contents.length;

        if (!this.platform.isBrowser) {
            contents?.forEach((content, index) => {
                if (index === 0) {
                    this.renderer.setStyle(content.el, 'width', '100%');
                } else {
                    this.renderer.setStyle(content.el, 'display', 'none');
                }
            });
        }
    }
}
