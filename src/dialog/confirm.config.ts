import { ComponentType } from '@angular/cdk/portal';
import { Observable } from 'rxjs';
import { InjectionToken } from '@angular/core';

export interface ThyConfirmConfig {
    title?: string;
    content: string;
    okText?: string;
    okType?: 'primary' | 'danger';
    okLoadingText?: string;
    onOk?: () => Observable<boolean> | void;
    cancelText?: string;
    onCancel?: void;
}


export const THY_CONFIRM_DEFAULT_OPTIONS = new InjectionToken<ThyConfirmConfig>('thy-confirm-default-options');

export const THY_CONFIRM_DEFAULT_OPTIONS_PROVIDER = {
    provide: THY_CONFIRM_DEFAULT_OPTIONS,
    useValue: {
        title: '确认删除',
        okText: '确认',
        okType: 'danger',
        cancelText: '取消'
    }
};
