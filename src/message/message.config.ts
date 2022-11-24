import { InjectionToken } from '@angular/core';
import { ThyAbstractOverlayConfig, ThyAbstractOverlayPosition } from 'ngx-tethys/core';

export class ThyMessageConfig<TData = unknown> extends ThyAbstractOverlayConfig<TData> {
    type?: 'success' | 'error' | 'warning' | 'info' | 'loading';

    content?: string;

    pauseOnHover?: boolean;

    duration?: number;

    maxStack?: number;

    /** Offset be relative to global top, default is '20' */
    offset?: string;
}

/**
 * @deprecated please use ThyMessageConfig
 */
export type ThyMessageOptions = ThyMessageConfig;

export const THY_NOTIFY_DEFAULT_CONFIG = new InjectionToken<ThyMessageConfig>('thy-message-default-config');

/**
 * @deprecated please use THY_NOTIFY_DEFAULT_CONFIG
 */
export const THY_NOTIFY_DEFAULT_OPTIONS = THY_NOTIFY_DEFAULT_CONFIG;

export const THY_NOTIFY_DEFAULT_CONFIG_VALUE: ThyMessageConfig = {
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

export const THY_NOTIFY_DEFAULT_CONFIG_PROVIDER = {
    provide: THY_NOTIFY_DEFAULT_CONFIG,
    useValue: THY_NOTIFY_DEFAULT_CONFIG_VALUE
};
