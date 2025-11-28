import { Component, ElementRef, inject } from '@angular/core';
import { ThyAbstractMessageContainerComponent } from './abstract';
import { ThyMessageQueue } from './message-queue.service';
import { THY_MESSAGE_DEFAULT_CONFIG, THY_MESSAGE_DEFAULT_CONFIG_VALUE } from './message.config';
import { ThyMessage } from './message.component';
import { AsyncPipe } from '@angular/common';

/**
 * @internal
 */
@Component({
    selector: 'thy-message-container',
    template: `
        @for (message of messageQueue.queues(); track message.id) {
            <thy-message [thyConfig]="message.config"></thy-message>
        }
    `,
    imports: [ThyMessage],
    host: {
        class: 'thy-message-container'
    }
})
export class ThyMessageContainer extends ThyAbstractMessageContainerComponent {
    messageQueue = inject(ThyMessageQueue);

    public defaultConfig = (() => {
        const defaultConfig = inject(THY_MESSAGE_DEFAULT_CONFIG);
        return {
            ...THY_MESSAGE_DEFAULT_CONFIG_VALUE,
            ...defaultConfig
        };
    })();
}
