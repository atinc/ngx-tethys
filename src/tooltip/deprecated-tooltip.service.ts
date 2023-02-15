import { ElementRef, ViewContainerRef, NgZone, Injectable, Inject } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { FocusMonitor } from '@angular/cdk/a11y';
import { ThyTooltipDirective } from './tooltip.directive';
import { ThyTooltipService } from './tooltip.service';
import { ThyGlobalTooltipConfig, THY_TOOLTIP_DEFAULT_CONFIG_TOKEN } from './tooltip.config';


/**
 * @internal
 * @deprecated TooltipService deprecated,please use ThyTooltipService
 */
@Injectable()
export class TooltipService {
    thyTooltipDirective: ThyTooltipDirective;

    constructor(
        private ngZone: NgZone,
        private platform: Platform,
        private focusMonitor: FocusMonitor,
        private thyTooltipService: ThyTooltipService,
        @Inject(THY_TOOLTIP_DEFAULT_CONFIG_TOKEN)
        private defaultTooltipConfig: ThyGlobalTooltipConfig
    ) {}

    attach(elementRef: ElementRef, viewContainerRef: ViewContainerRef, trigger?: 'hover' | 'focus' | 'click') {
        this.thyTooltipDirective = new ThyTooltipDirective(
            elementRef,
            this.ngZone,
            this.platform,
            this.focusMonitor,
            viewContainerRef,
            this.thyTooltipService,
            this.defaultTooltipConfig
        );
        if (trigger) {
            this.thyTooltipDirective.trigger = trigger;
        }

        this.thyTooltipDirective.ngOnInit();
    }

    detach() {
        this.thyTooltipDirective.ngOnDestroy();
    }
}
