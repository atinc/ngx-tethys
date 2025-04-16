import { Component, Input, HostBinding, NgZone, inject } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ThyMessageConfig } from './message.config';
import { ThyMessageQueue } from './message-queue.service';
import { ANIMATION_IN_DURATION, ANIMATION_OUT_DURATION, HIDE_STYLE, ThyAbstractMessageComponent } from './abstract';
import { ThyStringOrTemplateOutletDirective } from 'ngx-tethys/shared';
import { ThyIcon } from 'ngx-tethys/icon';

import { coerceArray } from 'ngx-tethys/util';
import { useHostRenderer } from '@tethys/cdk/dom';

/**
 * @internal
 */
@Component({
    selector: 'thy-message',
    templateUrl: './message.component.html',
    host: {
        '[class]': "'thy-message thy-message-' + config.type"
    },
    animations: [
        trigger('flyInOut', [
            state('flyIn', style({ transform: 'translateY(0)', opacity: 1, height: '*' })),
            transition('void => flyIn', [
                style({ transform: 'translateY(-100%)', opacity: 0, height: '*' }),
                animate(ANIMATION_IN_DURATION)
            ]),
            transition('flyIn => componentHide', [animate(ANIMATION_OUT_DURATION, style(HIDE_STYLE))]),
            state('componentHide', style(HIDE_STYLE))
        ])
    ],
    imports: [ThyIcon, ThyStringOrTemplateOutletDirective]
})
export class ThyMessage extends ThyAbstractMessageComponent<ThyMessageConfig> {
    @HostBinding('@flyInOut') animationState = 'flyIn';

    config: ThyMessageConfig;

    private hostRenderer = useHostRenderer();

    @Input()
    set thyConfig(value: ThyMessageConfig) {
        this.config = value;

        if (this.config?.hostClass) {
            const hostClass = coerceArray(this.config.hostClass);
            this.hostRenderer.updateClass(hostClass);
        }
    }

    constructor() {
        const messageQueue = inject(ThyMessageQueue);
        super(messageQueue);
    }
}
