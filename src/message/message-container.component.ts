import { Component, ElementRef, HostBinding, Inject } from '@angular/core';
import { ThyAbstractMessageContainerComponent } from './abstract';
import { ThyMessageQueue } from './message-queue.service';
import { ThyGlobalMessageConfig, THY_MESSAGE_DEFAULT_CONFIG, THY_MESSAGE_DEFAULT_CONFIG_VALUE } from './message.config';
import { ThyMessage } from './message.component';
import { NgFor, AsyncPipe } from '@angular/common';

/**
 * @internal
 */
@Component({
    selector: 'thy-message-container',
    template: ` <thy-message *ngFor="let message of messageQueue.queues$ | async" [thyConfig]="message.config"></thy-message> `,
    standalone: true,
    imports: [NgFor, ThyMessage, AsyncPipe]
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
