import { Component, Inject, ElementRef } from '@angular/core';
import { ThyMessageContainerBaseComponent } from 'ngx-tethys/message';
import { ThyNotifyQueue } from './notify-queue.service';
import { ThyGlobalNotifyConfig, THY_NOTIFY_DEFAULT_CONFIG } from './notify.config';

@Component({
    selector: 'thy-notify-container',
    templateUrl: './notify-container.component.html',
    host: {
        class: 'thy-notify-container',
        '[attr.role]': `'notify'`
    }
})
export class ThyNotifyContainerComponent extends ThyMessageContainerBaseComponent {
    offset: string;

    constructor(
        public notifyQueue: ThyNotifyQueue,
        elementRef: ElementRef,
        @Inject(THY_NOTIFY_DEFAULT_CONFIG) defaultConfig: ThyGlobalNotifyConfig
    ) {
        super(elementRef, defaultConfig);
    }
}
