import { Overlay, ScrollDispatcher } from '@angular/cdk/overlay';
import { Injectable, NgZone, ElementRef, inject } from '@angular/core';
import { ThyTooltipRef } from './tooltip-ref';
import { ThyGlobalTooltipConfig, ThyTooltipConfig, THY_TOOLTIP_DEFAULT_CONFIG_TOKEN } from './tooltip.config';

@Injectable({ providedIn: 'root' })
export class ThyTooltipService {
    private overlay = inject(Overlay);
    private scrollDispatcher = inject(ScrollDispatcher);
    private ngZone = inject(NgZone);
    private defaultTooltipConfig = inject(THY_TOOLTIP_DEFAULT_CONFIG_TOKEN);


    /**
     * 创建一个 Tooltip
     */
    create(host: ElementRef<HTMLElement> | HTMLElement, config: ThyTooltipConfig = {}) {
        config = Object.assign({}, this.defaultTooltipConfig, config);
        const tooltipRef = new ThyTooltipRef(host, config, this.overlay, this.scrollDispatcher, this.ngZone);
        return tooltipRef;
    }
}
