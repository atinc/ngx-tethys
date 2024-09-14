import { Component, ElementRef, HostBinding, Inject } from '@angular/core';
import { ThyAbstractMessageContainerComponent } from './abstract';
import { ThyMessageQueue } from './message-queue.service';
import { ThyGlobalMessageConfig, THY_MESSAGE_DEFAULT_CONFIG, THY_MESSAGE_DEFAULT_CONFIG_VALUE } from './message.config';
import { ThyMessage } from './message.component';
import { AsyncPipe } from '@angular/common';

/**
 * @internal
 */
@Component({
    selector: 'thy-message-container',
    template: `
        @for (message of messageQueue.queues$ | async; track $index) {
            <thy-message [thyConfig]="message.config"></thy-message>
        }
    `,
    standalone: true,
    imports: [ThyMessage, AsyncPipe]
})
export class ThyMessageContainer extends ThyAbstractMessageContainerComponent {
    @HostBinding('class') className = 'thy-message-container';

    constructor(
        public messageQueue: ThyMessageQueue,
        elementRef: ElementRef,
        @Inject(THY_MESSAGE_DEFAULT_CONFIG) defaultConfig: ThyGlobalMessageConfig
    ) {
        super(elementRef, {
            ...THY_MESSAGE_DEFAULT_CONFIG_VALUE,
            ...defaultConfig
        });
    }
}
