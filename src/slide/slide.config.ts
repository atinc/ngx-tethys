import { ThyUpperOverlayConfig, ThyUpperOverlayOptions } from '../core/overlay';
import { InjectionToken } from '@angular/core';

export type ThySlideFromTypes = 'left' | 'right' | 'top' | 'bottom' | 'void' | 'exit';

export class ThySlideConfig extends ThyUpperOverlayConfig {
    key?: string; // 尽量不要使用key,使用id,将要废弃

    from?: ThySlideFromTypes;

    class?: string;

    hasBackdrop?: boolean;

    initialState?: Object;

    containerClass?: string;
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
        backdropClass: '',
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
