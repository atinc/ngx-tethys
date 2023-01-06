import { Inject, Injectable } from '@angular/core';
import { ThyMessageQueue } from 'ngx-tethys/message';
import { BehaviorSubject } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ThyNotifyRef } from './notify-ref';
import { ThyGlobalNotifyConfig, THY_NOTIFY_DEFAULT_CONFIG } from './notify.config';

/**
 * @internal
 */
@Injectable({
    providedIn: 'root'
})
export class ThyNotifyQueue extends ThyMessageQueue {
    queues$ = new BehaviorSubject<ThyNotifyRef[]>([]);

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

    constructor(@Inject(THY_NOTIFY_DEFAULT_CONFIG) defaultConfig: ThyGlobalNotifyConfig) {
        super(defaultConfig);
    }

    add(notifyRef: ThyNotifyRef) {
        super.add(notifyRef);
    }

    remove(id: string) {
        super.remove(id);
    }
}
