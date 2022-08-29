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

    abstract initializeCarouselContents(contents: QueryList<ThyCarouselItemDirective> | null): Observable<ThyCarouselItemDirective[]>;

    abstract switch(to: number, from: number): Observable<void>;

    abstract dragging(pointerVector: DistanceVector, rect: DOMRect): void;

    abstract stagnating(): void;
    // initializeCarouselContents() {
    //     const carousel = this.carouselComponent;
    // }

    initializeContents(contents: QueryList<ThyCarouselItemDirective> | null) {
        const carousel = this.carouselComponent!;
        const { wrapperEl, playTime } = carousel;
        this.wrapperEl = wrapperEl;
        this.playTime = playTime;
        const { height } = wrapperEl.getBoundingClientRect();
        this.contentHeight = height;

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
