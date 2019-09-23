import { ThyUpperOverlayConfig, ThyUpperOverlayOptions } from '../core/overlay';
import { InjectionToken, ElementRef } from '@angular/core';

export type ThySlideFromTypes =
    | 'left'
    | 'right'
    | 'top'
    | 'bottom'
    | 'void'
    | 'exit'
    | 'offsetLeft'
    | 'offsetRight'
    | 'offsetTop'
    | 'offsetBottom';

export class ThySlideConfig extends ThyUpperOverlayConfig {
    /**
     * Origin Element, for overlay flexible connected to
     */
    origin?: ElementRef<any> | HTMLElement | any;
    /**
     * set the direction when slide enter
     */
    from?: ThySlideFromTypes;
    /**
     * 从距离屏幕边缘 offset 出滑入滑出, 单位 px
     */
    offset?: number;
    /**
     * 加在出发 slide 弹出框弹出的元素上的样式，
     */
    originActiveClass?: string | string[];
    /**
     * please use id
     * @deprecated
     */
    key?: string;
    /**
     * please use panelClass
     * @deprecated
     */
    class?: string;
}

export class ThySlideOption extends ThySlideConfig {}

export const THY_SLIDE_DEFAULT_OPTIONS = new InjectionToken<ThySlideConfig>('thy-slide-default-options');

export const slideUpperOverlayOptions: ThyUpperOverlayOptions = {
    name: 'slide',
    animationEnabled: true,
    disposeWhenClose: true
};

export const THY_SLIDE_DEFAULT_OPTIONS_PROVIDER = {
    provide: THY_SLIDE_DEFAULT_OPTIONS,
    useValue: {
        hasBackdrop: true,
        backdropClass: 'thy-slide-backdrop',
        backdropClosable: true,
        closeOnNavigation: true,
        autoFocus: true,
        restoreFocus: true,
        from: 'right',
        panelClass: 'thy-slide',
        containerClass: '',
        role: 'slide',
        offset: 0,
        originActiveClass: 'thy-slide-origin-active'
    }
};
