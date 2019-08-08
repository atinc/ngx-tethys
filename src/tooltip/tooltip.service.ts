import {
    Directive,
    ElementRef,
    ViewContainerRef,
    NgZone,
    Input,
    OnInit,
    OnDestroy,
    TemplateRef,
    Injectable,
    Inject
} from '@angular/core';
import { Overlay, ScrollDispatcher } from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import { FocusMonitor } from '@angular/cdk/a11y';
import { ThyTooltipDirective } from './tooltip.directive';
import { ThyTooltipConfig, THY_TOOLTIP_DEFAULT_CONFIG_TOKEN } from './tooltip.config';

@Injectable()
export class TooltipService {
    thyTooltipDirective: ThyTooltipDirective;

    constructor(
        private overlay: Overlay,
        private scrollDispatcher: ScrollDispatcher,
        private ngZone: NgZone,
        private platform: Platform,
        private focusMonitor: FocusMonitor,
        @Inject(THY_TOOLTIP_DEFAULT_CONFIG_TOKEN)
        private thyTooltipConfig: ThyTooltipConfig
    ) {}

    attach(elementRef: ElementRef, viewContainerRef: ViewContainerRef, trigger?: 'hover' | 'focus' | 'click') {
        this.thyTooltipDirective = new ThyTooltipDirective(
            this.overlay,
            elementRef,
            this.scrollDispatcher,
            viewContainerRef,
            this.ngZone,
            this.platform,
            this.focusMonitor,
            this.thyTooltipConfig
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
