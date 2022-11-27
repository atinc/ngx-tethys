import { ScrollStrategy } from '@angular/cdk/overlay';
import { ElementRef, InjectionToken } from '@angular/core';
import { ThyAbstractOverlayConfig, ThyAbstractOverlayPosition } from 'ngx-tethys/core';
import { ThyMessageConfig } from 'ngx-tethys/message';

export type NotifyPlacement = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

export interface ThyNotifyDetail {
    link?: string;
    content?: string;
    action?: (event?: Event) => void;
}

export class ThyNotifyConfig extends ThyMessageConfig {
    /** Position overrides. */
    position?: ThyAbstractOverlayPosition;

    /** Placement be relative to global, topLeft, topRight, bottomLeft, bottomRight ...*/
    placement?: NotifyPlacement;

    type?: 'blank' | 'success' | 'error' | 'warning' | 'info';

    title?: string;

    content?: string;

    detail?: string | ThyNotifyDetail;

    html?: ElementRef;

    /** Scroll strategy to be used for the dialog. */
    scrollStrategy?: ScrollStrategy;
}

/**
 * @deprecated please use ThyNotifyConfig
 */
export type ThyNotifyOptions = ThyNotifyConfig;

export const THY_NOTIFY_DEFAULT_CONFIG = new InjectionToken<ThyNotifyConfig>('thy-notify-default-config');

/**
 * @deprecated please use THY_NOTIFY_DEFAULT_CONFIG
 */
export const THY_NOTIFY_DEFAULT_OPTIONS = THY_NOTIFY_DEFAULT_CONFIG;

export const THY_NOTIFY_DEFAULT_CONFIG_VALUE: ThyNotifyConfig = {
    hasBackdrop: false,
    panelClass: '',
    offset: '20',
    closeOnNavigation: true,
    type: 'blank',
    placement: 'topRight' as NotifyPlacement,
    backdropClosable: false,
    duration: 4500,
    pauseOnHover: true,
    maxStack: 8
};

export const THY_NOTIFY_DEFAULT_CONFIG_PROVIDER = {
    provide: THY_NOTIFY_DEFAULT_CONFIG,
    useValue: THY_NOTIFY_DEFAULT_CONFIG_VALUE
};
