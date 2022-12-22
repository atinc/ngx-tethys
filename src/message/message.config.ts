import { InjectionToken } from '@angular/core';
import { Subject } from 'rxjs';

export type ThyMessageType = 'success' | 'error' | 'warning' | 'info' | 'loading';

export class ThyMessageConfig {
    type?: ThyMessageType;

    content?: string;

    pauseOnHover?: boolean;

    duration?: number;

    maxStack?: number;

    offset?: string;
}

export const THY_MESSAGE_DEFAULT_CONFIG = new InjectionToken<ThyMessageConfig>('thy-message-default-config');

export const THY_MESSAGE_DEFAULT_CONFIG_VALUE: ThyMessageConfig = {
    offset: '20',
    type: 'success',
    duration: 30000,
    pauseOnHover: true,
    maxStack: 8
};

export const THY_MESSAGE_DEFAULT_CONFIG_PROVIDER = {
    provide: THY_MESSAGE_DEFAULT_CONFIG,
    useValue: THY_MESSAGE_DEFAULT_CONFIG_VALUE
};

export interface ThyMessageOption {
    id?: string;

    type?: ThyMessageType;

    content?: string;

    pauseOnHover?: boolean;

    duration?: number;

    onClose?: Subject<void>;
}

export type ThyMessageRef = Pick<ThyMessageOption, 'onClose' | 'id'>;
