import { Overlay, ScrollDispatcher } from '@angular/cdk/overlay';
import { ElementRef, inject, Injectable, NgZone } from '@angular/core';
import { ThyTooltipPoolService } from './tooltip-pool.service';
import { ThyTooltipRef } from './tooltip-ref';
import { THY_TOOLTIP_DEFAULT_CONFIG_TOKEN, ThyTooltipConfig } from './tooltip.config';

@Injectable({ providedIn: 'root' })
export class ThyTooltipService {
    private overlay = inject(Overlay);
    private scrollDispatcher = inject(ScrollDispatcher);
    private ngZone = inject(NgZone);
    private defaultTooltipConfig = inject(THY_TOOLTIP_DEFAULT_CONFIG_TOKEN);
    private poolService = inject(ThyTooltipPoolService);

    /**
     * 创建一个 Tooltip，优先从池中复用实例
     */
    create(host: ElementRef<HTMLElement> | HTMLElement, config: ThyTooltipConfig = {}) {
        config = Object.assign({}, this.defaultTooltipConfig, config);
        return this.poolService.acquire(host, config);
    }

    /**
     * 释放 tooltip 实例回池中
     */
    release(tooltipRef: ThyTooltipRef): void {
        this.poolService.release(tooltipRef);
    }

    /**
     * 获取池状态信息（用于调试）
     */
    getPoolStats() {
        return this.poolService.getPoolStats();
    }
}
