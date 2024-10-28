import { Component, ElementRef, HostBinding, inject } from '@angular/core';
import { ThyAbstractMessageContainerComponent } from 'ngx-tethys/message';
import { ThyNotifyQueue } from './notify-queue.service';
import { ThyGlobalNotifyConfig, THY_NOTIFY_DEFAULT_CONFIG, THY_NOTIFY_DEFAULT_CONFIG_VALUE } from './notify.config';
import { ThyNotify } from './notify.component';
import { AsyncPipe } from '@angular/common';

/**
 * @private
 */
@Component({
    selector: 'thy-notify-container',
    templateUrl: './notify-container.component.html',
    standalone: true,
    imports: [ThyNotify, AsyncPipe]
})
export class ThyNotifyContainer extends ThyAbstractMessageContainerComponent {
    notifyQueue = inject(ThyNotifyQueue);

    @HostBinding('class') className = 'thy-notify-container';

    constructor() {
        const elementRef = inject(ElementRef);
        const defaultConfig = inject(THY_NOTIFY_DEFAULT_CONFIG);

        super(elementRef, {
            ...THY_NOTIFY_DEFAULT_CONFIG_VALUE,
            ...defaultConfig
        });
    }
}
