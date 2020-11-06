import { Component, Input, HostBinding, OnInit, HostListener, OnDestroy, NgZone } from '@angular/core';
import { NotifyPlacement, ThyNotifyOption } from './notify-option.interface';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { UpdateHostClassService } from '../shared/update-host-class.service';
import { NotifyQueueStore } from './notify-queue.store';

const ANIMATION_IN_DURATION = 100;
const ANIMATION_OUT_DURATION = 150;
const HIDE_STYLE = { transform: 'translateX(0)', opacity: 0, height: 0, paddingTop: 0, paddingBottom: 0, margin: 0 };

@Component({
    selector: 'thy-notify',
    templateUrl: './notify.component.html',
    providers: [UpdateHostClassService],
    animations: [
        trigger('flyInOut', [
            state('flyInOutRight', style({ transform: 'translateX(0)', opacity: 1, height: '*' })),
            transition('void => flyInOutRight', [
                style({ transform: 'translateX(100%)', opacity: 0, height: '*' }),
                animate(ANIMATION_IN_DURATION)
            ]),
            transition('flyInOutRight => componentHide', [animate(ANIMATION_OUT_DURATION, style(HIDE_STYLE))]),
            transition('flyInOutRight => void', [animate(ANIMATION_IN_DURATION, style(HIDE_STYLE))]),

            state('flyInOutLeft', style({ transform: 'translateX(0)', opacity: 1, height: '*' })),
            transition('void => flyInOutLeft', [
                style({ transform: 'translateX(-100%)', opacity: 0, height: '*' }),
                animate(ANIMATION_IN_DURATION)
            ]),
            transition('flyInOutLeft => componentHide', [animate(ANIMATION_OUT_DURATION, style(HIDE_STYLE))]),
            transition('flyInOutLeft => void', [animate(ANIMATION_IN_DURATION, style(HIDE_STYLE))]),

            state('componentHide', style(HIDE_STYLE))
        ])
    ]
})
export class ThyNotifyComponent implements OnInit, OnDestroy {
    @HostBinding('@flyInOut') flyInOut: string;

    @HostBinding('class') className = '';

    option: ThyNotifyOption;

    notifyIconName = '';

    extendContentClass = false;

    closeTimer: any;

    isShowDetail = false;

    placement: NotifyPlacement;

    @Input()
    set thyOption(value: ThyNotifyOption) {
        this.option = value;
        const type = value.type;
        this.placement = value.placement || 'topRight';
        if (this.placement === 'topLeft' || this.placement === 'bottomLeft') {
            this.flyInOut = 'flyInOutLeft';
        } else {
            this.flyInOut = 'flyInOutRight';
        }
        this.className = `thy-notify thy-notify-${type}`;
    }

    constructor(private _queueStore: NotifyQueueStore, private _ngZone: NgZone) {}

    ngOnInit() {
        const iconName = {
            success: 'check-circle-fill',
            info: 'info-circle-fill',
            warning: 'waring-fill',
            error: 'close-circle-fill'
        };

        this.notifyIconName = iconName[this.option.type];
        this._creatCloseTimer();
    }

    ngOnDestroy() {
        this._clearCloseTimer();
    }

    extendContent() {
        this.extendContentClass = true;
    }

    showDetailToggle() {
        this.isShowDetail = !this.isShowDetail;
    }

    closeNotify() {
        this._ngZone.runOutsideAngular(() => {
            this.flyInOut = 'componentHide';
            setTimeout(() => {
                this._queueStore.removeNotify(this.placement, this.option.id);
            }, ANIMATION_OUT_DURATION);
        });
    }

    @HostListener('mouseenter') mouseenter() {
        if (this.option.pauseOnHover) {
            this._clearCloseTimer();
        }
    }

    @HostListener('mouseleave') mouseleave() {
        if (this.option.pauseOnHover) {
            this._creatCloseTimer();
        }
    }

    private _creatCloseTimer() {
        if (this.option.duration) {
            this.closeTimer = setInterval(() => {
                clearInterval(this.closeTimer);
                this.closeNotify();
            }, this.option.duration);
        }
    }

    private _clearCloseTimer() {
        clearInterval(this.closeTimer);
    }
}
