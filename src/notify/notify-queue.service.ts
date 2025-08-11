import { Injectable, inject } from '@angular/core';
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
    topLeftQueues$ = this.queues$.pipe(
        map(queues => queues.filter(item => item.config.placement === 'topLeft')),
        shareReplay()
    );

    topRightQueues$ = this.queues$.pipe(
        map(queues => queues.filter(item => item.config.placement === 'topRight')),
        shareReplay()
    );

    bottomLeftQueues$ = this.queues$.pipe(
        map(queues => queues.filter(item => item.config.placement === 'bottomLeft')),
        shareReplay()
    );

    bottomRightQueues$ = this.queues$.pipe(
        map(queues => queues.filter(item => item.config.placement === 'bottomRight')),
        shareReplay()
    );

    constructor() {
        const defaultConfig = inject(THY_NOTIFY_DEFAULT_CONFIG);

        super({
            ...THY_NOTIFY_DEFAULT_CONFIG_VALUE,
            ...defaultConfig
        });
    }
}
