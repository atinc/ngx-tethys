import { Overlay, ScrollStrategy } from '@angular/cdk/overlay';
import { InjectionToken } from '@angular/core';
import { ThyPlacement } from 'ngx-tethys/core';

export const THY_SELECT_SCROLL_STRATEGY = new InjectionToken<() => ScrollStrategy>('thy-select-scroll-strategy');

export const THY_SELECT_SCROLL_STRATEGY_FACTORY = (overlay: Overlay) => {
    return () => overlay.scrollStrategies.reposition();
};

export const THY_SELECT_SCROLL_STRATEGY_PROVIDER = {
    provide: THY_SELECT_SCROLL_STRATEGY,
    deps: [Overlay],
    useFactory: THY_SELECT_SCROLL_STRATEGY_FACTORY
};

export type ThyDropdownWidthMode = 'match-select' | 'min-width' | { minWidth: number };

/**
 * 打开select下拉菜单的配置
 * @public
 * @order 30
 */
export interface ThySelectConfig {
    /**
     * 下拉菜单的最小宽度
     */
    dropdownWidthMode?: ThyDropdownWidthMode;

    /**
     * 下拉菜单的弹出位置
     */
    placement?: ThyPlacement;
}

export const DEFAULT_SELECT_CONFIG: ThySelectConfig = {
    dropdownWidthMode: 'match-select',
    placement: 'bottom'
};

export const THY_SELECT_CONFIG = new InjectionToken<ThySelectConfig>('thy-select-config');

export const THY_SELECT_CONFIG_PROVIDER = {
    provide: THY_SELECT_CONFIG,
    useValue: DEFAULT_SELECT_CONFIG
};
