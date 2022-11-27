import { InjectionToken } from '@angular/core';
import { ThyAbstractOverlayConfig, ThyAbstractOverlayPosition } from 'ngx-tethys/core';

export class ThyMessageConfig extends ThyAbstractOverlayConfig {
    type?: 'success' | 'error' | 'warning' | 'info' | 'loading' | string;

    content?: string;

    pauseOnHover?: boolean;

    duration?: number;

    maxStack?: number;

    /** Offset be relative to global top, default is '20' */
    offset?: string;
}

export const THY_MESSAGE_DEFAULT_CONFIG = new InjectionToken<ThyMessageConfig>('thy-message-default-config');

export const THY_MESSAGE_DEFAULT_CONFIG_VALUE: ThyMessageConfig = {
    hasBackdrop: false,
    panelClass: '',
    offset: '20',
    closeOnNavigation: true,
    type: 'info',
    backdropClosable: false,
    duration: 1000,
    pauseOnHover: true,
    maxStack: 8
};

export const THY_MESSAGE_DEFAULT_CONFIG_PROVIDER = {
    provide: THY_MESSAGE_DEFAULT_CONFIG,
    useValue: THY_MESSAGE_DEFAULT_CONFIG_VALUE
};
