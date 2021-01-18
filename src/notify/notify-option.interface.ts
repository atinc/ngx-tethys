import { ElementRef, InjectionToken } from '@angular/core';

export const CONTAINER_PLACEMENT = new InjectionToken<{}>('CONTAINER_PLACEMENT');

export type NotifyPlacement = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

export interface ThyNotifyOptions {
    id?: number;

    type?: 'blank' | 'success' | 'error' | 'warning' | 'info';

    title?: string;

    content?: string;

    detail?: string;

    html?: ElementRef;

    pauseOnHover?: boolean;

    duration?: number;

    maxStack?: number;

    placement?: NotifyPlacement;
}

/**
 * @deprecated please use ThyNotifyOptions
 */
export type ThyNotifyOption = ThyNotifyOptions;

export const THY_NOTIFY_DEFAULT_OPTIONS = new InjectionToken<ThyNotifyOptions>('thy-notify-default-options');

export const THY_NOTIFY_DEFAULT_OPTIONS_PROVIDER = {
    provide: THY_NOTIFY_DEFAULT_OPTIONS,
    useValue: {}
};
