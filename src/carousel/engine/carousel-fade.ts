import { ChangeDetectorRef, QueryList, Renderer2 } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { Observable, Subject } from 'rxjs';
import { ThyCarousel } from '../carousel.component';
import { ThyDistanceVector } from '../typings';
import { ThyCarouselItemDirective } from '../carousel-item.directive';
import { ThyCarouselBaseEngine } from '../engine/carousel-base';

export class ThyCarouselFadeEngine extends ThyCarouselBaseEngine {
    contentsEl: HTMLElement[];
    constructor(thyCarouselComponent: ThyCarousel, cdr: ChangeDetectorRef, renderer: Renderer2, platform: Platform) {
        super(thyCarouselComponent, cdr, renderer, platform);
    }

    dragging(pointerVector: ThyDistanceVector, rect: DOMRect): void {
        const { x } = pointerVector;
        const { width } = rect;
        const activeIndex = this.carouselComponent!.activeIndex;
        const currentContent = this.contentsEl[activeIndex];
        this.renderer.setStyle(currentContent, 'opacity', `${1 - Math.abs(x) / width}`);
    }

    initializeCarouselContents(contents: QueryList<ThyCarouselItemDirective> | null): void {
        this.initializeContents(contents);
        this.contentsEl = [];
        contents.forEach((content, index) => {
            this.contentsEl.push(content.el);
            this.renderer.setStyle(content.el, 'opacity', this.carouselComponent!.activeIndex === index ? '1' : '0');
            this.renderer.setStyle(content.el, 'position', 'absolute');
            this.renderer.setStyle(content.el, 'left', '0');
            this.renderer.setStyle(content.el, `transition-property`, 'opacity');
            this.renderer.setStyle(content.el, `transition-timing-function`, 'ease');
        });
    }

    switch(to: number, from: number): Observable<void> {
        const switch$ = new Subject<void>();
        const currentEl = this.contentsEl[from];
        const nextEl = this.contentsEl[(to + this.length) % this.length];
        this.renderer.setStyle(currentEl, `transition-duration`, `${this.playTime}ms`);
        this.renderer.setStyle(nextEl, `transition-duration`, `${this.playTime}ms`);
        this.renderer.setStyle(currentEl, 'opacity', '0');
        this.renderer.setStyle(nextEl, 'opacity', '1');
        setTimeout(() => {
            switch$.next();
        }, 0);
        setTimeout(() => {
            this.renderer.setStyle(currentEl, `transition-duration`, `0s`);
            this.renderer.setStyle(nextEl, `transition-duration`, `0s`);
            switch$.complete();
        }, this.playTime);
        return switch$.asObservable();
    }

    correctionOffset(): void {}
}
