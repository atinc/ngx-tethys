import { ChangeDetectorRef, Renderer2, QueryList } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { Observable } from 'rxjs';
import { ThyCarouselItemDirective } from '../carousel-item.directive';
import { IThyCarouselComponent } from '../carousel.token';
import { ThyDistanceVector, ThyCarouselEngine } from '../typings';

export abstract class ThyCarouselBaseEngine implements ThyCarouselEngine {
    protected contentWidth: number;
    protected contentHeight: number;
    protected readonly carouselComponent: IThyCarouselComponent;
    protected wrapperEl: HTMLElement;
    protected playTime: number;
    protected length: number;
    protected contents: ThyCarouselItemDirective[];

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
        thyCarouselComponent: IThyCarouselComponent,
        protected cdr: ChangeDetectorRef,
        protected renderer: Renderer2,
        protected platform: Platform
    ) {
        this.carouselComponent = thyCarouselComponent;
    }

    initializeContents(contents: QueryList<ThyCarouselItemDirective> | null) {
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
            this.renderer.setStyle(this.wrapperEl, 'transform', 'translate3d(0, 0, 0)');
            this.renderer.setStyle(this.wrapperEl, `height`, `${this.contentHeight}px`);
        }
        this.contents.forEach(content => {
            content.el.removeAttribute('style');
        });
    }

    abstract dragging(pointerVector: ThyDistanceVector, rect: DOMRect): void;

    abstract initializeCarouselContents(contents: QueryList<ThyCarouselItemDirective> | null): void;

    abstract switch(to: number, from: number): Observable<void>;

    correctionOffset(): void {
        const carousel = this.carouselComponent!;
        const { wrapperEl } = carousel;
        const { width, height } = wrapperEl.getBoundingClientRect();
        this.contentWidth = width;
        this.contentHeight = height;
    }
}
