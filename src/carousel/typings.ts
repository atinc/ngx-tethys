import { Observable } from 'rxjs';
import { ThyCarouselItemDirective } from './carousel-item.directive';

export interface ThyDistanceVector {
    x: number;
    y: number;
}

export interface ThyCarouselSwitchData {
    from: number;
    to: number;
}

export type ThyCarouselEffect = 'slide' | 'fade' | 'noop';

export type ThyCarouselTrigger = 'click' | 'hover';

export type ThyCarouselPause = 'false' | 'hover';

export interface ThyCarouselEngine {
    // Initialize dragging sequences.
    initializeCarouselContents(contents: readonly ThyCarouselItemDirective[] | null): void;
    // switch item
    switch(to: number, from: number): Observable<void>;
    // dragging events
    dragging(pointerVector: ThyDistanceVector, rect: DOMRect): void;
    // when window resize
    correctionOffset(): void;
}
