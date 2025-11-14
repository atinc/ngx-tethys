import { Component, effect, inject } from '@angular/core';
import { ThyAbstractMessageContainerComponent } from 'ngx-tethys/message';
import { ThyNotifyQueue } from './notify-queue.service';
import { THY_NOTIFY_DEFAULT_CONFIG, THY_NOTIFY_DEFAULT_CONFIG_VALUE } from './notify.config';
import { ThyNotify } from './notify.component';
import { AsyncPipe } from '@angular/common';

/**
 * @private
 */
@Component({
    selector: 'thy-notify-container',
    templateUrl: './notify-container.component.html',
    imports: [ThyNotify],
    host: {
        class: 'thy-notify-container'
    }
})
export class ThyNotifyContainer extends ThyAbstractMessageContainerComponent {
    notifyQueue = inject(ThyNotifyQueue);

    public defaultConfig = (() => {
        const defaultConfig = inject(THY_NOTIFY_DEFAULT_CONFIG);
        return {
            ...THY_NOTIFY_DEFAULT_CONFIG_VALUE,
            ...defaultConfig
        };
    })();
}
