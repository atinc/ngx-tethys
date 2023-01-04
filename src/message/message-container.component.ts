import { Component, ElementRef, Inject } from '@angular/core';
import { ThyMessageContainerBaseComponent } from './base';
import { ThyMessageQueue } from './message-queue.service';
import { ThyGlobalMessageConfig, THY_MESSAGE_DEFAULT_CONFIG } from './message.config';

/**
 * @internal
 */
@Component({
    selector: 'thy-message-container',
    template: `
        <thy-message *ngFor="let message of messageQueue.queues$ | async" [thyConfig]="message.config"></thy-message>
    `,
    host: {
        class: 'thy-message-container'
    }
})
export class ThyMessageContainerComponent extends ThyMessageContainerBaseComponent {
    constructor(
        public messageQueue: ThyMessageQueue,
        elementRef: ElementRef,
        @Inject(THY_MESSAGE_DEFAULT_CONFIG) defaultConfig: ThyGlobalMessageConfig
    ) {
        super(elementRef, defaultConfig);
    }
}
