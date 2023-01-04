import { InjectionToken, TemplateRef } from '@angular/core';

export type ThyMessageType = 'success' | 'error' | 'warning' | 'info' | 'loading';

export interface ThyGlobalMessageConfig {
    pauseOnHover?: boolean;

    duration?: number;

    maxStack?: number;

    offset?: string;

    showClose?: boolean;
}

export const THY_MESSAGE_DEFAULT_CONFIG = new InjectionToken<ThyGlobalMessageConfig>('thy-message-default-config');

export const THY_MESSAGE_DEFAULT_CONFIG_VALUE: ThyGlobalMessageConfig = {
    offset: '20',
    duration: 4500,
    pauseOnHover: true,
    maxStack: 8,
    showClose: true
};

export const THY_MESSAGE_DEFAULT_CONFIG_PROVIDER = {
    provide: THY_MESSAGE_DEFAULT_CONFIG,
    useValue: THY_MESSAGE_DEFAULT_CONFIG_VALUE
};

export interface ThyMessageConfig {
    id?: string;

    type?: ThyMessageType;

    content?: string | TemplateRef<any>;

    pauseOnHover?: boolean;

    duration?: number;

    showClose?: boolean;
}
