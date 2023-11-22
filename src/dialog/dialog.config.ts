import { ThyAbstractOverlayConfig, ThyAbstractOverlayPosition } from 'ngx-tethys/core';

import { ScrollStrategy } from '@angular/cdk/overlay';
import { InjectionToken } from '@angular/core';

/** Valid ARIA roles for a dialog element. */
export type ThyDialogRole = 'dialog' | 'alertdialog';

export enum ThyDialogSizes {
    lg = 'lg',
    /**
     * 已废弃，命名错误，请使用 superLg
     * @deprecated
     */
    supperLg = 'supper-lg',
    superLg = 'super-lg',
    maxLg = 'max-lg',
    md = 'md',
    sm = 'sm',
    full = 'full'
}

/**
 * 通过ThyDialog服务端打开模态框的配置
 * @description.en-us Configuration for opening a modal dialog with the ThyDialog service.
 * @public
 * @order 20
 */
export class ThyDialogConfig<TData = unknown> extends ThyAbstractOverlayConfig<TData> {
    /**
     * 对话框元素的 ARIA 角色
     * @description.en-us The ARIA role of the dialog element.
     */
    role?: ThyDialogRole = 'dialog';

    /**
     * 定位模态框的弹出位置
     * @description.en-us Position overrides.
     */
    position?: ThyAbstractOverlayPosition;

    /**
     * 模态框的大小，ThyDialogSizes: sm (400)、md (660)、lg (800)、maxLg (980)、superLg (94vw)、full (全屏)
     * @default md
     * @description.en-us Dialog size md, lg, sm
     */
    size?: ThyDialogSizes;

    /**
     * 用于模态框的滚动策略
     * @description.en-us Scroll strategy to be used for the dialog.
     */
    scrollStrategy?: ScrollStrategy;
}

/** Injection token that can be used to specify default dialog options. */
export const THY_DIALOG_DEFAULT_OPTIONS = new InjectionToken<ThyDialogConfig>('thy-dialog-default-options');

export const THY_DIALOG_DEFAULT_OPTIONS_PROVIDER = {
    provide: THY_DIALOG_DEFAULT_OPTIONS,
    useValue: {
        role: 'dialog',
        hasBackdrop: true,
        backdropClass: '',
        panelClass: '',
        backdropClosable: true,
        closeOnNavigation: true,
        autoFocus: true,
        restoreFocus: true,
        restoreFocusOptions: {
            preventScroll: true
        },
        hostClass: 'thy-dialog-content'
    }
};

export type ThyDialogFooterAlign = 'left' | 'right' | 'center';

export class ThyDialogLayoutConfig {
    footerAlign?: ThyDialogFooterAlign;
    footerDivided?: boolean;
}

export const THY_DIALOG_LAYOUT_CONFIG = new InjectionToken<ThyDialogLayoutConfig>('thy-dialog-layout-config');

export const THY_DIALOG_LAYOUT_CONFIG_PROVIDER = {
    provide: THY_DIALOG_LAYOUT_CONFIG,
    useValue: {
        footerAlign: 'left',
        footerDivided: false
    }
};
