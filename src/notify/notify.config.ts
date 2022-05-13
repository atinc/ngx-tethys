import { ScrollStrategy } from '@angular/cdk/overlay';
import { ElementRef, InjectionToken } from '@angular/core';
import { ThyAbstractOverlayConfig, ThyAbstractOverlayPosition } from 'ngx-tethys/core';

export type NotifyPlacement = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

export interface ThyNotifyDetail {
    link?: string;
    content?: string;
    action?: (event?: Event) => void;
}

export class ThyNotifyConfig<TData = unknown> extends ThyAbstractOverlayConfig<TData> {
    /** Position overrides. */
    position?: ThyAbstractOverlayPosition;

    /** Placement be relative to global, topLeft, topRight, bottomLeft, bottomRight ...*/
    placement?: NotifyPlacement;

    type?: 'blank' | 'success' | 'error' | 'warning' | 'info';

    title?: string;

    content?: string;

    detail?: string | ThyNotifyDetail;

    html?: ElementRef;

    pauseOnHover?: boolean;

    duration?: number;

    maxStack?: number;

    /** Offset be relative to global, default is '20' */
    offset?: string;

    /** Scroll strategy to be used for the dialog. */
    scrollStrategy?: ScrollStrategy;
}

export const THY_NOTIFY_DEFAULT_CONFIG = new InjectionToken<ThyNotifyConfig>('thy-notify-default-config');

export const THY_NOTIFY_DEFAULT_CONFIG_VALUE = {
    hasBackdrop: false,
    panelClass: '',
    offset: '20',
    closeOnNavigation: true,
    placement: 'topRight' as NotifyPlacement,
    backdropClosable: false,
    insideClosable: false,
    manualClosure: false,
    originActiveClass: 'thy-notify-origin-active',
    autoAdaptive: false
};

export const THY_NOTIFY_DEFAULT_CONFIG_PROVIDER = {
    provide: THY_NOTIFY_DEFAULT_CONFIG,
    useValue: THY_NOTIFY_DEFAULT_CONFIG_VALUE
};
