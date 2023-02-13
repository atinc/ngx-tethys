import { coerceCssPixelValue } from '@angular/cdk/coercion';
import { Component, Directive, ElementRef, HostBinding, Inject } from '@angular/core';
import { ThyMessageQueue } from './message-queue.service';
import { ThyGlobalMessageConfig, THY_MESSAGE_DEFAULT_CONFIG } from './message.config';

/**
 * @internal
 */
@Directive()
export class ThyMessageBaseContainerComponent {
    @HostBinding('style.top') offset: string;

    @HostBinding('class') className = 'thy-message-container';

    constructor(private elementRef: ElementRef, defaultConfig: ThyGlobalMessageConfig) {
        this.offset = coerceCssPixelValue(defaultConfig.offset);
    }

    toOverlayTop() {
        const globalOverlayWrapper = this.elementRef.nativeElement.closest('.cdk-global-overlay-wrapper');
        const overlayContainer = globalOverlayWrapper.parentElement;
        overlayContainer.appendChild(globalOverlayWrapper);
    }
}

/**
 * @internal
 */
@Component({
    selector: 'thy-message-container',
    template: `
        <thy-message *ngFor="let message of messageQueue.queues$ | async" [thyConfig]="message.config"></thy-message>
    `
})
export class ThyMessageContainerComponent extends ThyMessageBaseContainerComponent {
    constructor(
        public messageQueue: ThyMessageQueue,
        elementRef: ElementRef,
        @Inject(THY_MESSAGE_DEFAULT_CONFIG) defaultConfig: ThyGlobalMessageConfig
    ) {
        super(elementRef, defaultConfig);
    }
}
