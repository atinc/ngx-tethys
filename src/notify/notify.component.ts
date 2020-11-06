import { Component, Input, HostBinding, OnInit, HostListener, OnDestroy, ElementRef } from '@angular/core';
import { NotifyPlacement, ThyNotifyOption } from './notify-option.interface';
import { ThyNotifyService } from './notify.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { UpdateHostClassService } from '../shared/update-host-class.service';
import { NotifyQueueStore } from './notify-queue.store';

const ANIMATION_IN_DURATION = 100;
const ANIMATION_OUT_DURATION = 150;

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
            transition('flyInOutRight => rightHide', [
                animate(
                    ANIMATION_OUT_DURATION,
                    style({ transform: 'translateX(0)', height: 0, opacity: 0, paddingTop: 0, paddingBottom: 0, margin: 0 })
                )
            ]),
            transition('flyInOutRight => void', [
                animate(
                    ANIMATION_IN_DURATION,
                    style({ transform: 'translateX(0)', height: 0, opacity: 0, paddingTop: 0, paddingBottom: 0, margin: 0 })
                )
            ]),

            state('flyInOutLeft', style({ transform: 'translateX(0)', opacity: 1, height: '*' })),
            transition('void => flyInOutLeft', [
                style({ transform: 'translateX(-100%)', opacity: 0, height: '*' }),
                animate(ANIMATION_IN_DURATION)
            ]),
            transition('flyInOutLeft => leftHide', [
                animate(
                    ANIMATION_OUT_DURATION,
                    style({ transform: 'translateX(0)', height: 0, opacity: 0, paddingTop: 0, paddingBottom: 0, margin: 0 })
                )
            ]),
            transition('flyInOutLeft => void', [
                animate(
                    ANIMATION_IN_DURATION,
                    style({ transform: 'translateX(0)', height: 0, opacity: 0, paddingTop: 0, paddingBottom: 0, margin: 0 })
                )
            ]),

            state('rightHide', style({ transform: 'translateX(0)', opacity: 0, height: 0, paddingTop: 0, paddingBottom: 0, margin: 0 })),
            state('leftHide', style({ transform: 'translateX(0)', opacity: 0, height: 0, paddingTop: 0, paddingBottom: 0, margin: 0 }))
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

    constructor(private _queueStore: NotifyQueueStore, private notifyService: ThyNotifyService) {}

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
        if (this.placement === 'topLeft' || this.placement === 'bottomLeft') {
            this.flyInOut = 'leftHide';
        } else {
            this.flyInOut = 'rightHide';
        }
        setTimeout(() => {
            this._queueStore.removeNotify(this.placement, this.option.id);
        }, ANIMATION_OUT_DURATION);
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
