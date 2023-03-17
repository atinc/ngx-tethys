import { InjectionToken } from '@angular/core';
import { ThyFormGroupFooterAlign } from 'ngx-tethys/form';
import { Observable } from 'rxjs';

/**
 * 确认框配置
 */
export interface ThyConfirmConfig {
    /**
     * 标题
     */
    title?: string;

    /**
     * 提示内容
     */
    content: string;

    /**
     * 确认按钮的文案
     */
    okText?: string;

    /**
     * 确认按钮的类型，primary | danger
     */
    okType?: 'primary' | 'danger';

    /**
     * 确认按钮处于提交状态时的文案
     */
    okLoadingText?: string;

    /**
     * 底部对齐方式，left | center | right
     */
    footerAlign?: ThyFormGroupFooterAlign;

    /**
     * 确认后的回调事件
     */
    onOk?: () => Observable<boolean> | void;

    /**
     * 取消按钮的文案
     */
    cancelText?: string;

    /**
     * 取消后的回调事件
     */
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
