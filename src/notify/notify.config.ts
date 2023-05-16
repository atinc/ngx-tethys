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

/**
 * 打开notify通知的配置
 * @public
 * @order 10
 */
export interface ThyNotifyConfig extends ThyMessageBaseConfig {
    /**
     * 通知弹出位置
     */
    placement?: ThyNotifyPlacement;

    /**
     * 弹出通知的类型
     */
    type?: ThyNotifyType;

    /**
     * 标题
     */
    title?: string;

    /**
     * 提示内容
     */
    content?: string | ComponentTypeOrTemplateRef<any>;

    contentInitialState?: any;

    /**
     * 提示内容的详情，是对内容的详情描述，也可以是能够操作的链接，link是链接名，content是详情描述，action是点击的方法
     */
    detail?: string | ThyNotifyDetail;

    /**
     * 自定义传入html模板
     */
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
