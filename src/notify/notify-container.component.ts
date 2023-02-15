import { Component, Inject, ElementRef, HostBinding } from '@angular/core';
import { ThyMessageBaseContainerComponent } from 'ngx-tethys/message';
import { ThyNotifyQueue } from './notify-queue.service';
import { ThyGlobalNotifyConfig, THY_NOTIFY_DEFAULT_CONFIG } from './notify.config';

@Component({
    selector: 'thy-notify-container',
    templateUrl: './notify-container.component.html'
})
export class ThyNotifyContainerComponent extends ThyMessageBaseContainerComponent {
    @HostBinding('class') className = 'thy-notify-container';

    constructor(
        public notifyQueue: ThyNotifyQueue,
        elementRef: ElementRef,
        @Inject(THY_NOTIFY_DEFAULT_CONFIG) defaultConfig: ThyGlobalNotifyConfig
    ) {
        super(elementRef, defaultConfig);
    }
}
