import { Component, HostBinding, effect, signal, computed, inject } from '@angular/core';
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
    host: {
        '[class]': "'thy-notify thy-notify-' + config().type"
    },
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
    imports: [ThyIcon, NgClass, ThyViewOutletDirective, NgTemplateOutlet]
})
export class ThyNotify extends ThyAbstractMessageComponent<ThyNotifyConfig> {
    @HostBinding('@flyInOut') animationState?: string;

    extendContentClass = signal(false);

    isShowDetail = signal(false);

    readonly contentIsString = computed(() => isString(this.config()?.content));

    protected queue = inject(ThyNotifyQueue);

    private placement = computed<ThyNotifyPlacement>(() => {
        const config = this.config();
        return config?.placement || 'topRight';
    });

    constructor() {
        super();
        effect(() => {
            const placement = this.placement();
            if (placement === 'topLeft' || placement === 'bottomLeft') {
                this.animationState = 'flyInOutLeft';
            } else {
                this.animationState = 'flyInOutRight';
            }
        });
    }

    extendContent() {
        this.extendContentClass.set(true);
    }

    showDetailToggle() {
        this.isShowDetail.set(!this.isShowDetail());
    }

    triggerDetail() {
        const config = this.config();
        if ( helpers.isFunction((config?.detail as ThyNotifyDetail).action)) {
            (config!.detail as ThyNotifyDetail)!.action!();
        }
        if ((config?.detail as ThyNotifyDetail).content) {
            this.showDetailToggle();
        }
    }
}
