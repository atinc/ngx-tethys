import { coerceCssPixelValue } from '@angular/cdk/coercion';
import { Component, ElementRef, HostBinding, Inject } from '@angular/core';
import { ThyMessageQueue } from './message-queue.service';
import { ThyGlobalMessageConfig, THY_MESSAGE_DEFAULT_CONFIG } from './message.config';

/**
 * @internal
 */
@Component({
    selector: 'thy-message-container',
    template: `
        <thy-message *ngFor="let message of messageQueue.queues$ | async" [thyConfig]="message.config"></thy-message>
    `
})
export class ThyMessageContainerComponent {
    @HostBinding('style.top') offset: string;

    @HostBinding('class') className = 'thy-message-container';

    constructor(
        public messageQueue: ThyMessageQueue,
        private elementRef: ElementRef,
        @Inject(THY_MESSAGE_DEFAULT_CONFIG) defaultConfig: ThyGlobalMessageConfig
    ) {
        this.offset = coerceCssPixelValue(defaultConfig.offset);
    }

    toOverlayTop() {
        const globalOverlayWrapper = this.elementRef.nativeElement.closest('.cdk-global-overlay-wrapper');
        const overlayContainer = globalOverlayWrapper.parentElement;
        overlayContainer.appendChild(globalOverlayWrapper);
    }
}
