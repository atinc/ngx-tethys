import { ElementRef, InjectionToken } from '@angular/core';
import { ComponentTypeOrTemplateRef } from 'ngx-tethys/core';
import { ThyMessageBaseConfig } from 'ngx-tethys/message';

export type ThyNotifyPlacement = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
export type ThyNotifyType = 'blank' | 'success' | 'error' | 'warning' | 'info';

export interface ThyGlobalNotifyConfig {
    placement?: ThyNotifyPlacement;

    pauseOnHover?: boolean;

    duration?: number;

    maxStack?: number;

    offset?: string;
}

export interface ThyNotifyDetail {
    link?: string;
    content?: string;
    action?: (event?: Event) => void;
}

export interface ThyNotifyConfig extends ThyMessageBaseConfig {
    placement?: ThyNotifyPlacement;

    type?: ThyNotifyType;

    title?: string;

    content?: string | ComponentTypeOrTemplateRef<any>;

    contentInitialState?: any;

    detail?: string | ThyNotifyDetail;

    html?: ElementRef;
}

export const THY_NOTIFY_DEFAULT_CONFIG = new InjectionToken<ThyGlobalNotifyConfig>('thy-notify-default-config');

export const THY_NOTIFY_DEFAULT_CONFIG_VALUE: ThyGlobalNotifyConfig = {
    placement: 'topRight',
    offset: '20',
    duration: 4500,
    pauseOnHover: true,
    maxStack: 8
};

export const THY_NOTIFY_DEFAULT_CONFIG_PROVIDER = {
    provide: THY_NOTIFY_DEFAULT_CONFIG,
    useValue: THY_NOTIFY_DEFAULT_CONFIG_VALUE
};
