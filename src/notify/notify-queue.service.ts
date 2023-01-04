import { Inject, Injectable } from '@angular/core';
import { ThyMessageQueue } from 'ngx-tethys/message';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ThyNotifyRef } from './notify-ref';
import { ThyGlobalNotifyConfig, THY_NOTIFY_DEFAULT_CONFIG } from './notify.config';

/**
 * @internal
 */
@Injectable({
    providedIn: 'root'
})
export class ThyNotifyQueue extends ThyMessageQueue {
    queues$: BehaviorSubject<ThyNotifyRef[]>;

    topLeftQueues$: Observable<ThyNotifyRef[]>;
    topRightQueues$: Observable<ThyNotifyRef[]>;
    bottomLeftQueues$: Observable<ThyNotifyRef[]>;
    bottomRightQueues$: Observable<ThyNotifyRef[]>;

    constructor(@Inject(THY_NOTIFY_DEFAULT_CONFIG) defaultConfig: ThyGlobalNotifyConfig) {
        super(defaultConfig);

        this.topLeftQueues$ = this.queues$.pipe(map(queues => queues.filter(item => item.config.placement === 'topLeft')));
        this.topRightQueues$ = this.queues$.pipe(map(queues => queues.filter(item => item.config.placement === 'topRight')));
        this.bottomLeftQueues$ = this.queues$.pipe(map(queues => queues.filter(item => item.config.placement === 'bottomLeft')));
        this.bottomRightQueues$ = this.queues$.pipe(map(queues => queues.filter(item => item.config.placement === 'bottomRight')));
    }

    add(notifyRef: ThyNotifyRef) {
        super.add(notifyRef);
    }

    remove(id: string) {
        super.remove(id);
    }
}
