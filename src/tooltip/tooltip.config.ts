import { InjectionToken } from '@angular/core';

export class ThyTooltipConfig {
    offset: number;
    tooltipPin: boolean;
    scrollThrottleSeconds: number;
    tooltipPanelClass: string;
}

export const THY_TOOLTIP_DEFAULT_CONFIG_TOKEN = new InjectionToken<ThyTooltipConfig>('thy-tooltip-default-config');

export const thyTooltipDefaultConfig: ThyTooltipConfig = {
    offset: 4,
    tooltipPin: false,
    scrollThrottleSeconds: 20,
    tooltipPanelClass: 'thy-tooltip-panel'
};

export const THY_TOOLTIP_DEFAULT_CONFIG_PROVIDER = {
    provide: THY_TOOLTIP_DEFAULT_CONFIG_TOKEN,
    useValue: thyTooltipDefaultConfig
};
