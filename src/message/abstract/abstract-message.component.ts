import { Directive, HostListener, Input, NgZone, OnDestroy, OnInit, inject } from '@angular/core';
import { ThyMessageBaseConfig } from '../message.config';
import { ThyAbstractMessageQueue } from './abstract-message-queue.service';

export const ANIMATION_IN_DURATION = 100;
export const ANIMATION_OUT_DURATION = 150;
export const HIDE_STYLE = { transform: 'translateX(0)', opacity: 0, height: 0, paddingTop: 0, paddingBottom: 0, margin: 0 };

/**
 * @internal
 */
@Directive()
export class ThyAbstractMessageComponent<TConfig extends ThyMessageBaseConfig> implements OnInit, OnDestroy {
    private _ngZone = inject(NgZone);

    animationState: string;

    config: TConfig;

    iconName = '';

    private closeTimer: any;

    private queue: ThyAbstractMessageQueue;

    @Input()
    set thyConfig(value: TConfig) {
        this.config = value;
    }

    constructor(queue: ThyAbstractMessageQueue) {
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
