import { Observable } from 'rxjs';
import { ThyCarouselItemDirective } from './carousel-item.directive';
import { QueryList } from '@angular/core';

export interface DistanceVector {
    x: number;
    y: number;
}

export interface FromTo {
    from: number;
    to: number;
}

export type thyEffectType = 'slide' | 'fade' | 'noop';

export interface ThyCarouselEngine {
    // Initialize dragging sequences.
    initializeCarouselContents(contents: QueryList<ThyCarouselItemDirective> | null): void;
    // switch item
    switch(to: number, from: number): Observable<void>;
    // dragging events
    dragging(pointerVector: DistanceVector, rect: DOMRect): void;
    // when stagnant
    stagnating(): void;
}

export interface CarouselMethod {
    pre: () => void;
    next: () => void;
}
