import { Component, Input, HostBinding, NgZone, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { helpers, isString } from 'ngx-tethys/util';
import { ThyNotifyConfig, ThyNotifyDetail, ThyNotifyPlacement } from './notify.config';
import { ANIMATION_IN_DURATION, ANIMATION_OUT_DURATION, HIDE_STYLE, ThyAbstractMessageComponent } from 'ngx-tethys/message';
import { ThyNotifyQueue } from './notify-queue.service';
import { ThyViewOutletDirective } from 'ngx-tethys/shared';
import { ThyIcon } from 'ngx-tethys/icon';
import { NgClass, NgTemplateOutlet } from '@angular/common';

/**
 * @private
 */
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
            state('flyInOutLeft', style({ transform: 'translateX(0)', opacity: 1, height: '*' })),
            transition('void => flyInOutLeft', [
                style({ transform: 'translateX(-100%)', opacity: 0, height: '*' }),
                animate(ANIMATION_IN_DURATION)
            ]),
            transition('flyInOutLeft => componentHide', [animate(ANIMATION_OUT_DURATION, style(HIDE_STYLE))]),
            state('componentHide', style(HIDE_STYLE))
        ])
    ],
    standalone: true,
    imports: [ThyIcon, NgClass, ThyViewOutletDirective, NgTemplateOutlet]
})
export class ThyNotify extends ThyAbstractMessageComponent<ThyNotifyConfig> implements OnInit {
    @HostBinding('@flyInOut') animationState: string;

    @HostBinding('class') className = '';

    config: ThyNotifyConfig;

    extendContentClass = false;

    isShowDetail = false;

    contentIsString = false;

    placement: ThyNotifyPlacement;

    @Input()
    set thyConfig(value: ThyNotifyConfig) {
        this.config = value;
        const type = value.type;
        this.placement = value.placement || 'topRight';
        if (this.placement === 'topLeft' || this.placement === 'bottomLeft') {
            this.animationState = 'flyInOutLeft';
        } else {
            this.animationState = 'flyInOutRight';
        }
        this.className = `thy-notify thy-notify-${type}`;
    }

    constructor(ngZone: NgZone, notifyQueue: ThyNotifyQueue) {
        super(ngZone, notifyQueue);
    }

    ngOnInit() {
        super.ngOnInit();
        this.contentIsString = isString(this.config.content);
    }

    extendContent() {
        this.extendContentClass = true;
    }

    showDetailToggle() {
        this.isShowDetail = !this.isShowDetail;
    }

    triggerDetail() {
        if (helpers.isFunction((this.config.detail as ThyNotifyDetail).action)) {
            (this.config.detail as ThyNotifyDetail).action();
        }
        if ((this.config.detail as ThyNotifyDetail).content) {
            this.showDetailToggle();
        }
    }
}
