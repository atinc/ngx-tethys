import { Component, ElementRef, HostBinding, Inject } from '@angular/core';
import { coerceCssPixelValue } from 'ngx-tethys/util';
import { ThyMessageQueueService } from './message-queue.service';
import { ThyGlobalMessageConfig, THY_MESSAGE_DEFAULT_CONFIG } from './message.config';

/**
 * @internal
 */
@Component({
    selector: 'thy-message-container',
    template: `
        <thy-message *ngFor="let message of messageQueueService.queues$ | async" [thyOption]="message.config"></thy-message>
    `,
    host: {
        class: 'thy-message-container'
    }
})
export class ThyMessageContainerComponent {
    @HostBinding('style.top') private top: string;

    constructor(
        public messageQueueService: ThyMessageQueueService,
        private elementRef: ElementRef,
        @Inject(THY_MESSAGE_DEFAULT_CONFIG) defaultConfig: ThyGlobalMessageConfig
    ) {
        this.top = coerceCssPixelValue(defaultConfig.offset);
    }

    toOverlayTop() {
        const globalOverlayWrapper = this.elementRef.nativeElement.closest('.cdk-global-overlay-wrapper');
        const overlayContainer = globalOverlayWrapper.parentElement;
        overlayContainer.appendChild(globalOverlayWrapper);
    }
}
