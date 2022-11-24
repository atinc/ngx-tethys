import { Component, Input, HostBinding, OnInit, HostListener, OnDestroy, NgZone, ElementRef } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { NotifyQueueStore } from './notify-queue.store';
import { helpers } from 'ngx-tethys/util';
import { NotifyPlacement, ThyNotifyConfig, ThyNotifyDetail } from './notify.config';
import { ThyMNComponent } from './base';

const ANIMATION_IN_DURATION = 100;
const ANIMATION_OUT_DURATION = 150;
const HIDE_STYLE = { transform: 'translateX(0)', opacity: 0, height: 0, paddingTop: 0, paddingBottom: 0, margin: 0 };

@Component({
    selector: 'thy-notify',
    templateUrl: './notify.component.html',
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
export class ThyNotifyComponent extends ThyMNComponent implements OnInit {
    @HostBinding('@flyInOut') flyInOut: string;

    @HostBinding('class') className = '';

    option: ThyNotifyConfig;

    iconName = '';

    extendContentClass = false;

    isShowDetail = false;

    placement: NotifyPlacement;

    @Input()
    set thyOption(value: ThyNotifyConfig) {
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

    constructor(elementRef: ElementRef, private _queueStore: NotifyQueueStore, private _ngZone: NgZone) {
        super(elementRef);
    }

    ngOnInit() {
        const iconName = {
            success: 'check-circle-fill',
            info: 'info-circle-fill',
            warning: 'waring-fill',
            error: 'close-circle-fill'
        };

        this.iconName = iconName[this.option.type];
        this.createCloseTimer();
    }

    close() {
        this._ngZone.runOutsideAngular(() => {
            this.flyInOut = 'componentHide';
            setTimeout(() => {
                this._queueStore.removeNotify(this.option.id, this.placement);
            }, ANIMATION_OUT_DURATION);
        });
    }

    extendContent() {
        this.extendContentClass = true;
    }

    showDetailToggle() {
        this.isShowDetail = !this.isShowDetail;
    }

    triggerDetail() {
        if (helpers.isFunction((this.option.detail as ThyNotifyDetail).action)) {
            (this.option.detail as ThyNotifyDetail).action();
        }
        if ((this.option.detail as ThyNotifyDetail).content) {
            this.showDetailToggle();
        }
    }
}
