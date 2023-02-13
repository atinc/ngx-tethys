import { Component, Input, HostBinding, NgZone, Directive, OnInit, OnDestroy, HostListener } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ThyMessageBaseConfig, ThyMessageConfig } from './message.config';
import { ThyMessageBaseQueue, ThyMessageQueue } from './message-queue.service';

export const ANIMATION_IN_DURATION = 100;
export const ANIMATION_OUT_DURATION = 150;
export const HIDE_STYLE = { transform: 'translateX(0)', opacity: 0, height: 0, paddingTop: 0, paddingBottom: 0, margin: 0 };

/**
 * @internal
 */
@Directive()
export class ThyMessageBaseComponent<TConfig extends ThyMessageBaseConfig> implements OnInit, OnDestroy {
    animationState: string;

    config: TConfig;

    iconName = '';

    private closeTimer: any;

    private queue: ThyMessageBaseQueue;

    @Input()
    set thyConfig(value: TConfig) {
        this.config = value;
    }

    constructor(private _ngZone: NgZone, queue: ThyMessageBaseQueue) {
        this.queue = queue;
    }

    ngOnInit() {
        const iconName = {
            success: 'check-circle-fill',
            info: 'info-circle-fill',
            warning: 'waring-fill',
            error: 'close-circle-fill'
        };

        this.iconName = iconName[this.config.type];
        this.createCloseTimer();
    }

    @HostListener('mouseenter')
    mouseenter() {
        if (this.config.pauseOnHover) {
            this.clearCloseTimer();
        }
    }

    @HostListener('mouseleave')
    mouseleave() {
        if (this.config.pauseOnHover) {
            this.createCloseTimer();
        }
    }

    close() {
        this._ngZone.runOutsideAngular(() => {
            this.animationState = 'componentHide';
            setTimeout(() => {
                this.queue.remove(this.config.id);
            }, ANIMATION_OUT_DURATION);
        });
    }

    private createCloseTimer() {
        if (this.config.duration) {
            this.closeTimer = setInterval(() => {
                this.clearCloseTimer();
                this.close();
            }, this.config.duration);
        }
    }

    private clearCloseTimer() {
        clearInterval(this.closeTimer);
    }

    ngOnDestroy() {
        this.clearCloseTimer();
    }
}

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
export class ThyMessageComponent extends ThyMessageBaseComponent<ThyMessageConfig> {
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
