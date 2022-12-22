import { Component, Input, HostBinding, OnInit, HostListener, OnDestroy, NgZone, ElementRef } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ThyMessageStore } from './message-queue.store';
import { ThyMessageOption } from './message.config';

const ANIMATION_IN_DURATION = 100;
const ANIMATION_OUT_DURATION = 150;
const HIDE_STYLE = { transform: 'translateX(0)', opacity: 0, height: 0, paddingTop: 0, paddingBottom: 0, margin: 0 };

/**
 * @internal
 */
@Component({
    selector: 'thy-message',
    templateUrl: './message.component.html',
    animations: [
        trigger('flyInOut', [
            state('flyIn', style({ transform: 'translateY(0)', opacity: 1, height: '*' })),
            transition('void => flyIn', [
                style({ transform: 'translateY(-100%)', opacity: 0, height: '*' }),
                animate(ANIMATION_IN_DURATION)
            ]),
            transition('flyIn => componentHide', [animate(ANIMATION_OUT_DURATION, style(HIDE_STYLE))]),
            transition('flyIn => void', [animate(ANIMATION_IN_DURATION, style(HIDE_STYLE))]),

            state('componentHide', style(HIDE_STYLE))
        ])
    ]
})
export class ThyMessageComponent implements OnInit, OnDestroy {
    @HostBinding('@flyInOut') flyInOut = 'flyIn';

    @HostBinding('class') className = '';

    option: ThyMessageOption;

    iconName = '';

    private closeTimer: any;

    @Input()
    set thyOption(value: ThyMessageOption) {
        this.option = value;
        const type = value.type;
        this.className = `thy-message thy-message-${type}`;
    }

    constructor(private elementRef: ElementRef, private messageStore: ThyMessageStore, private _ngZone: NgZone) {}

    ngOnInit() {
        const iconName = {
            success: 'check-circle-fill',
            info: 'info-circle-fill',
            warning: 'waring-fill',
            error: 'close-circle-fill',
            loading: 'clock-circle-open'
        };

        this.iconName = iconName[this.option.type];
        this.createCloseTimer();
    }

    ngOnDestroy() {
        this.clearCloseTimer();
        this.elementRef.nativeElement.remove();
    }

    @HostListener('mouseenter') mouseenter() {
        if (this.option.pauseOnHover) {
            this.clearCloseTimer();
        }
    }

    @HostListener('mouseleave') mouseleave() {
        if (this.option.pauseOnHover) {
            this.createCloseTimer();
        }
    }

    close() {
        this._ngZone.runOutsideAngular(() => {
            this.flyInOut = 'componentHide';
            setTimeout(() => {
                this.messageStore.remove(this.option.id);
                this.elementRef.nativeElement.remove();
            }, ANIMATION_OUT_DURATION);
        });
    }

    private createCloseTimer() {
        if (this.option.duration) {
            this.closeTimer = setInterval(() => {
                this.clearCloseTimer();
                this.close();
            }, this.option.duration);
        }
    }

    private clearCloseTimer() {
        clearInterval(this.closeTimer);
    }
}
