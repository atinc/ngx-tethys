import { ThyAbstractOverlayConfig, ThyAbstractOverlayOptions } from 'ngx-tethys/core';

import { ElementRef, InjectionToken } from '@angular/core';

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

/**
 * @public
 */
export class ThySlideConfig<TData = unknown> extends ThyAbstractOverlayConfig<TData> {
    /**
     * Origin Element, for overlay flexible connected to
     */
    origin?: ElementRef<any> | HTMLElement | any;

    /**
     * slide 进场的方向,可选 left | right | top | bottom
     * @description-en-us set the direction when slide enter
     * @default right
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
     * slide 弹出的容器，可传入id,HTMLElement or ElementRef<HTMLElement>
     * @description-en-us set the drawerContainer by id、HTMLElement or ElementRef<HTMLElement>. e.g. drawerContainer = '#offset-host'
     */
    drawerContainer?: string | HTMLElement | ElementRef<HTMLElement>;

    /**
     * slide 进场的方向,可选  push | over | slide
     * @description-en-us set the render way. one of 'over' or 'push'. Default is 'over'
     * @default over
     */
    mode?: ThySlideMode;

    /**
     * 是否禁用关闭上一个已打开的 slideRef
     * @description-en-us set whether to disable close the latest item. Default is false
     * @default false
     */
    disableCloseLatest?: boolean;
}

export class ThySlideOption extends ThySlideConfig {}

export const THY_SLIDE_DEFAULT_CONFIG = new InjectionToken<ThySlideConfig>('thy-slide-default-options');

export const slideAbstractOverlayOptions: ThyAbstractOverlayOptions = {
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
    drawerContainer: '',
    disableCloseLatest: false
};

export const THY_SLIDE_DEFAULT_CONFIG_PROVIDER = {
    provide: THY_SLIDE_DEFAULT_CONFIG,
    useValue: {}
};
