import { InjectionToken, ViewContainerRef } from '@angular/core';
import { ThyPlacement } from 'ngx-tethys/core';

export interface ThyTooltipConfig {
    placement?: ThyPlacement;
    viewContainerRef?: ViewContainerRef;
    showDelay?: number;
    hideDelay?: number;
    touchendHideDelay?: number;
    offset?: number;
    contentClass?: string | string[];
    panelClass?: string | string[];
    hasBackdrop?: boolean;
    tooltipPin?: boolean;
    scrollThrottleSeconds?: number;
}

export type ThyGlobalTooltipConfig = Pick<
    ThyTooltipConfig,
    'placement' | 'offset' | 'scrollThrottleSeconds' | 'tooltipPin' | 'panelClass' | 'showDelay' | 'hideDelay' | 'touchendHideDelay'
>;

export const THY_TOOLTIP_DEFAULT_CONFIG_TOKEN = new InjectionToken<ThyGlobalTooltipConfig>('thy-tooltip-default-config');

export const thyTooltipDefaultConfig: ThyGlobalTooltipConfig = {
    placement: 'top',
    showDelay: 200,
    hideDelay: 100,
    touchendHideDelay: 1500,
    offset: 4,
    panelClass: 'thy-tooltip-panel',
    tooltipPin: false,
    scrollThrottleSeconds: 20
};

export const THY_TOOLTIP_DEFAULT_CONFIG_PROVIDER = {
    provide: THY_TOOLTIP_DEFAULT_CONFIG_TOKEN,
    useValue: thyTooltipDefaultConfig
};
