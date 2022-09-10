import { Observable } from 'rxjs';
import { ThyCarouselItemDirective } from 'ngx-tethys/carousel/carousel-item.directive';
import { InjectionToken, QueryList } from '@angular/core';

export interface DistanceVector {
    x: number;
    y: number;
}

export interface FromTo {
    from: number;
    to: number;
}

export type thyEffectType = 'slide' | 'fade' | 'noop';

export interface CarouselBasic {
    // Initialize dragging sequences.
    initializeCarouselContents(contents: QueryList<ThyCarouselItemDirective> | null): void;
    // switch item
    switch(to: number, from: number): Observable<void>;
    // dragging events
    dragging(pointerVector: DistanceVector, rect: DOMRect): void;
    // when stagnant
    stagnating(): void;
}

export interface CarouselComponentAsSource {
    carouselContents: QueryList<ThyCarouselItemDirective>;
    wrapperEl: HTMLElement;
    playTime: number;
}

export interface ThyCarouselEngineRegistry {
    name: string;
    engine: CarouselBasic;
}

export const THY_CUSTOM_ENGINE = new InjectionToken<ThyCarouselEngineRegistry[]>('thy-custom-engine');
