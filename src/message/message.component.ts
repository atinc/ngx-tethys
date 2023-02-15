import { Component, Input, HostBinding, NgZone } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ThyMessageConfig } from './message.config';
import { ThyMessageQueue } from './message-queue.service';
import { ANIMATION_IN_DURATION, ANIMATION_OUT_DURATION, HIDE_STYLE, ThyAbstractMessageComponent } from './abstract';

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
    ]
})
export class ThyMessageComponent extends ThyAbstractMessageComponent<ThyMessageConfig> {
    @HostBinding('@flyInOut') animationState = 'flyIn';

    config: ThyMessageConfig;

    iconName = '';

    @Input()
    set thyConfig(value: ThyMessageConfig) {
        this.config = value;
    }

    constructor(ngZone: NgZone, messageQueue: ThyMessageQueue) {
        super(ngZone, messageQueue);
    }
}
