import { ThyUpperOverlayConfig, ThyUpperOverlayOptions } from 'ngx-tethys/core';
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

export type ThySlideMode = 'over' | 'push' | 'side';

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
     * set class to trigger element.
     */
    originActiveClass?: string | string[];
    /**
     * set the drawerContainer by id、HTMLElement or ElementRef<HTMLElement>. e.g. drawerContainer = '#offset-host'
     */
    drawerContainer?: string | HTMLElement | ElementRef<HTMLElement>;
    /**
     * set the render way. one of 'over' or 'push'. Default is 'over'
     */
    mode?: ThySlideMode;
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

export const THY_SLIDE_DEFAULT_CONFIG = new InjectionToken<ThySlideConfig>('thy-slide-default-options');

export const slideUpperOverlayOptions: ThyUpperOverlayOptions = {
    name: 'slide',
    animationEnabled: true,
    disposeWhenClose: true
};

export const slideDefaultConfigValue = {
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
    originActiveClass: 'thy-slide-origin-active',
    mode: 'over',
    drawerContainer: ''
};

export const THY_SLIDE_DEFAULT_CONFIG_PROVIDER = {
    provide: THY_SLIDE_DEFAULT_CONFIG,
    useValue: {}
};
