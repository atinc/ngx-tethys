import { Overlay, ScrollDispatcher } from '@angular/cdk/overlay';
import { Inject, Injectable, NgZone, ElementRef } from '@angular/core';
import { ThyTooltipRef } from './tooltip-ref';
import { ThyGlobalTooltipConfig, ThyTooltipConfig, THY_TOOLTIP_DEFAULT_CONFIG_TOKEN } from './tooltip.config';

@Injectable({ providedIn: 'root' })
export class ThyTooltipService {
    constructor(
        private overlay: Overlay,
        private scrollDispatcher: ScrollDispatcher,
        private ngZone: NgZone,
        @Inject(THY_TOOLTIP_DEFAULT_CONFIG_TOKEN)
        private defaultTooltipConfig: ThyGlobalTooltipConfig
    ) {}

    /**
     * 创建一个 Tooltip
     */
    create(host: ElementRef<HTMLElement> | HTMLElement, config: ThyTooltipConfig = {}) {
        config = Object.assign({}, this.defaultTooltipConfig, config);
        const tooltipRef = new ThyTooltipRef(host, config, this.overlay, this.scrollDispatcher, this.ngZone);
        return tooltipRef;
    }
}
