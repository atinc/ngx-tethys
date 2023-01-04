import { Inject, Injectable } from '@angular/core';
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
export class ThyNotifyQueue {
    queues$: BehaviorSubject<ThyNotifyRef[]>;

    topLeftQueues$: Observable<ThyNotifyRef[]>;
    topRightQueues$: Observable<ThyNotifyRef[]>;
    bottomLeftQueues$: Observable<ThyNotifyRef[]>;
    bottomRightQueues$: Observable<ThyNotifyRef[]>;

    get queues() {
        return this.queues$.getValue();
    }

    constructor(@Inject(THY_NOTIFY_DEFAULT_CONFIG) private defaultConfig: ThyGlobalNotifyConfig) {
        this.defaultConfig = defaultConfig;
        this.queues$ = new BehaviorSubject([]);

        this.topLeftQueues$ = this.queues$.pipe(map(queues => queues.filter(item => item.config.placement === 'topLeft')));
        this.topRightQueues$ = this.queues$.pipe(map(queues => queues.filter(item => item.config.placement === 'topRight')));
        this.bottomLeftQueues$ = this.queues$.pipe(map(queues => queues.filter(item => item.config.placement === 'bottomLeft')));
        this.bottomRightQueues$ = this.queues$.pipe(map(queues => queues.filter(item => item.config.placement === 'bottomRight')));
    }

    add(notifyRef: ThyNotifyRef) {
        const queues = this.queues$.getValue();
        if (this.queues.length >= this.defaultConfig.maxStack) {
            const closedRef = queues.shift();
            closedRef.close();
        }
        this.queues$.next([...queues, notifyRef]);
    }

    remove(id: string) {
        if (!id) {
            this.queues.forEach(item => item.close());
            this.queues$.next([]);
        } else {
            const removeItem = this.queues.find(item => item.id === id);
            removeItem?.close();
            const afterRemovedQueues = this.queues.filter(item => item.id !== id);
            this.queues$.next(afterRemovedQueues);
        }
    }
}
