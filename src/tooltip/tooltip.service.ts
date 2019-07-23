import {
    Directive,
    ElementRef,
    ViewContainerRef,
    NgZone,
    Input,
    OnInit,
    OnDestroy,
    TemplateRef,
    Injectable
} from '@angular/core';
import { Overlay, ScrollDispatcher } from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import { FocusMonitor } from '@angular/cdk/a11y';
import { ThyTooltipDirective } from './tooltip.directive';

@Injectable()
export class TooltipService {
    thyTooltipDirective: ThyTooltipDirective;

    constructor(
        private overlay: Overlay,
        private scrollDispatcher: ScrollDispatcher,
        private ngZone: NgZone,
        private platform: Platform,
        private focusMonitor: FocusMonitor
    ) {}

    attach(elementRef: ElementRef, viewContainerRef: ViewContainerRef, trigger?: 'hover' | 'focus' | 'click') {
        this.thyTooltipDirective = new ThyTooltipDirective(
            this.overlay,
            elementRef,
            this.scrollDispatcher,
            viewContainerRef,
            this.ngZone,
            this.platform,
            this.focusMonitor
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
