import { Component, Inject, ElementRef, HostBinding } from '@angular/core';
import { ThyAbstractMessageContainerComponent } from 'ngx-tethys/message';
import { ThyNotifyQueue } from './notify-queue.service';
import { ThyGlobalNotifyConfig, THY_NOTIFY_DEFAULT_CONFIG, THY_NOTIFY_DEFAULT_CONFIG_VALUE } from './notify.config';
import { ThyNotifyComponent } from './notify.component';
import { NgFor, AsyncPipe } from '@angular/common';

@Component({
    selector: 'thy-notify-container',
    templateUrl: './notify-container.component.html',
    standalone: true,
    imports: [NgFor, ThyNotifyComponent, AsyncPipe]
})
export class ThyNotifyContainerComponent extends ThyAbstractMessageContainerComponent {
    @HostBinding('class') className = 'thy-notify-container';

    constructor(
        public notifyQueue: ThyNotifyQueue,
        elementRef: ElementRef,
        @Inject(THY_NOTIFY_DEFAULT_CONFIG) defaultConfig: ThyGlobalNotifyConfig
    ) {
        super(elementRef, {
            ...THY_NOTIFY_DEFAULT_CONFIG_VALUE,
            ...defaultConfig
        });
    }
}
