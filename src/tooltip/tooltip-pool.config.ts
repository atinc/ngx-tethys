import { InjectionToken } from '@angular/core';

export interface ThyTooltipPoolConfig {
    /**
     * 最大池大小
     * @default 10
     */
    maxPoolSize: number;

    /**
     * 最大空闲时间（毫秒）
     * @default 30000 (30秒)
     */
    maxIdleTime: number;

    /**
     * 是否启用实例池
     * @default true
     */
    enabled: boolean;
}

export const THY_TOOLTIP_POOL_DEFAULT_CONFIG: ThyTooltipPoolConfig = {
    maxPoolSize: 10,
    maxIdleTime: 30000,
    enabled: true
};

export const THY_TOOLTIP_POOL_CONFIG_TOKEN = new InjectionToken<ThyTooltipPoolConfig>('thy-tooltip-pool-config', {
    providedIn: 'root',
    factory: () => THY_TOOLTIP_POOL_DEFAULT_CONFIG
});
