import { ChangeDetectorRef, QueryList, Renderer2 } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { Observable, Subject } from 'rxjs';
import { ThyCarouselComponent } from '../carousel.component';
import { DistanceVector } from '../typings';
import { ThyCarouselItemDirective } from '../carousel-item.directive';
import { ThyCarouselBasicEngine } from '../engine/carousel-basic';

export class ThyCarouselNoopEngine extends ThyCarouselBasicEngine {
    constructor(
        thyCarouselComponent: ThyCarouselComponent,
        protected cdr: ChangeDetectorRef,
        protected renderer: Renderer2,
        protected platform: Platform
    ) {
        super(thyCarouselComponent, cdr, renderer, platform);
    }

    dragging(pointerVector: DistanceVector, rect: DOMRect): void {}

    initializeCarouselContents(contents: QueryList<ThyCarouselItemDirective> | null): void {
        this.initializeContents(contents);
    }

    stagnating(): void {}

    switch(to: number, from: number): Observable<void> {
        const switch$ = new Subject<void>();
        console.log(to, this.length);
        console.log(((to + this.length) % this.length) * this.contentWidth);
        this.renderer.setStyle(
            this.wrapperEl,
            `transform`,
            `translate3d(${(-(to + this.length) % this.length) * this.contentWidth}px,0 , 0)`
        );
        setTimeout(() => {
            switch$.next();
        }, 0);
        setTimeout(() => {
            switch$.complete();
        }, 0);
        return switch$.asObservable();
    }
}
