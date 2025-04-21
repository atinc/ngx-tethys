import { Component, ElementRef, HostBinding, inject } from '@angular/core';
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
        @for (message of messageQueue.queues$ | async; track message.id) {
            <thy-message [thyConfig]="message.config"></thy-message>
        }
    `,
    imports: [ThyMessage, AsyncPipe]
})
export class ThyMessageContainer extends ThyAbstractMessageContainerComponent {
    messageQueue = inject(ThyMessageQueue);

    @HostBinding('class') className = 'thy-message-container';

    constructor() {
        const elementRef = inject(ElementRef);
        const defaultConfig = inject(THY_MESSAGE_DEFAULT_CONFIG);

        super({
            ...THY_MESSAGE_DEFAULT_CONFIG_VALUE,
            ...defaultConfig
        });
    }
}
