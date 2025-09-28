import { Injectable, inject, computed } from '@angular/core';
import { ThyAbstractMessageQueue } from 'ngx-tethys/message';
import { map, shareReplay } from 'rxjs/operators';
import { ThyNotifyRef } from './notify-ref';
import { THY_NOTIFY_DEFAULT_CONFIG, THY_NOTIFY_DEFAULT_CONFIG_VALUE } from './notify.config';

/**
 * @internal
 */
@Injectable({
    providedIn: 'root'
})
export class ThyNotifyQueue extends ThyAbstractMessageQueue<ThyNotifyRef> {
    topLeftQueues = computed(() => {
        return this.queues().filter(item => item.config.placement === 'topLeft');
    });

    topRightQueues = computed(() => {
        return this.queues().filter(item => item.config.placement === 'topRight');
    });

    bottomLeftQueues = computed(() => {
        return this.queues().filter(item => item.config.placement === 'bottomLeft');
    });

    bottomRightQueues = computed(() => {
        return this.queues().filter(item => item.config.placement === 'bottomRight');
    });

    constructor() {
        const defaultConfig = inject(THY_NOTIFY_DEFAULT_CONFIG);

        super({
            ...THY_NOTIFY_DEFAULT_CONFIG_VALUE,
            ...defaultConfig
        });
    }
}
