import { ThyUpperOverlayConfig, ThyUpperOverlayOptions } from '../core/overlay';
import { InjectionToken } from '@angular/core';

export type ThySlideFromTypes = 'left' | 'right' | 'top' | 'bottom' | 'void' | 'exit';

export class ThySlideConfig extends ThyUpperOverlayConfig {
    /**
     * please use id
     * @deprecated
     */
    key?: string;

    /**
     * set the direction when slide enter
     */
    from?: ThySlideFromTypes;

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
        role: 'slide'
    }
};
