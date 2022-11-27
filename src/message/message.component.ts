import { Component, Input, HostBinding, OnInit, HostListener, OnDestroy, NgZone, ElementRef } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { UpdateHostClassService } from 'ngx-tethys/core';
import { MessageQueueStore } from './message-queue.store';
import { ThyMessageConfig } from './message.config';
import { ThyMNComponent } from './base';

const ANIMATION_IN_DURATION = 100;
const ANIMATION_OUT_DURATION = 150;
const HIDE_STYLE = { transform: 'translateX(0)', opacity: 0, height: 0, paddingTop: 0, paddingBottom: 0, margin: 0 };

@Component({
    selector: 'thy-message',
    templateUrl: './message.component.html',
    providers: [UpdateHostClassService],
    animations: [
        trigger('flyInOut', [
            state('flyInOutTop', style({ transform: 'translateY(0)', opacity: 1, height: '*' })),
            transition('void => flyInOutTop', [
                style({ transform: 'translateY(-100%)', opacity: 0, height: '*' }),
                animate(ANIMATION_IN_DURATION)
            ]),
            transition('flyInOutTop => componentHide', [animate(ANIMATION_OUT_DURATION, style(HIDE_STYLE))]),
            transition('flyInOutTop => void', [animate(ANIMATION_IN_DURATION, style(HIDE_STYLE))]),

            state('componentHide', style(HIDE_STYLE))
        ])
    ]
})
export class ThyMessageComponent extends ThyMNComponent {
    @HostBinding('@flyInOut') flyInOut = 'flyInOutTop';

    @HostBinding('class') className = '';

    @Input()
    set thyOption(value: ThyMessageConfig) {
        this.option = value;
        const type = value.type;
        this.className = `thy-message thy-message-${type}`;
    }

    constructor(elementRef: ElementRef, private store: MessageQueueStore, private _ngZone: NgZone) {
        super(elementRef);
    }

    close() {
        this._ngZone.runOutsideAngular(() => {
            this.flyInOut = 'componentHide';
            setTimeout(() => {
                this.store.remove(this.option.id);
            }, ANIMATION_OUT_DURATION);
        });
    }
}
