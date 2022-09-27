import { Observable } from 'rxjs';
import { ThyCarouselItemDirective } from './carousel-item.directive';
import { QueryList } from '@angular/core';

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

export interface ThyCarouselEngine {
    // Initialize dragging sequences.
    initializeCarouselContents(contents: QueryList<ThyCarouselItemDirective> | null): void;
    // switch item
    switch(to: number, from: number): Observable<void>;
    // dragging events
    dragging(pointerVector: ThyDistanceVector, rect: DOMRect): void;
    // when window resize
    correctionOffset(): void;
}

export interface ThyCarouselMethod {
    pre: () => void;
    next: () => void;
}
