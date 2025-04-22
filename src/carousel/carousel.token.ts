import { InjectionToken } from '@angular/core';

export interface IThyCarouselComponent {
    wrapperEl: HTMLElement;
    playTime: number;
    activeIndex: number;
}

export const THY_CAROUSEL_COMPONENT = new InjectionToken<IThyCarouselComponent>('THY_CAROUSEL_COMPONENT');
