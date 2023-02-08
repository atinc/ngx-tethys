import { InjectionToken } from '@angular/core';
import { ThyFormGroupFooterAlign } from 'ngx-tethys/form';
import { Observable } from 'rxjs';

export interface ThyConfirmConfig {
    title?: string;
    content: string;
    okText?: string;
    okType?: 'primary' | 'danger';
    okLoadingText?: string;
    footerAlign?: ThyFormGroupFooterAlign;
    onOk?: () => Observable<boolean> | void;
    cancelText?: string;
    onCancel?: () => void;
}

export const THY_CONFIRM_DEFAULT_OPTIONS = new InjectionToken<ThyConfirmConfig>('thy-confirm-default-options');

export const THY_CONFIRM_DEFAULT_OPTIONS_VALUE = {
    title: '确认删除',
    okText: '确定',
    okType: 'danger',
    cancelText: '取消',
    footerAlign: 'left'
};

export const THY_CONFIRM_DEFAULT_OPTIONS_PROVIDER = {
    provide: THY_CONFIRM_DEFAULT_OPTIONS,
    useValue: THY_CONFIRM_DEFAULT_OPTIONS_VALUE
};
