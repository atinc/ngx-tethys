import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ThyMessageRef } from './message-ref';
import { ThyGlobalMessageConfig, THY_MESSAGE_DEFAULT_CONFIG } from './message.config';

/**
 * @internal
 */
@Injectable({
    providedIn: 'root'
})
export class ThyMessageQueue {
    queues$ = new BehaviorSubject<ThyMessageRef[]>([]);

    get queues() {
        return this.queues$.getValue();
    }

    constructor(@Inject(THY_MESSAGE_DEFAULT_CONFIG) protected defaultConfig: ThyGlobalMessageConfig) {}

    add(messageRef: ThyMessageRef) {
        const queues = this.queues$.getValue();
        if (this.queues.length >= this.defaultConfig.maxStack) {
            const closedRef = queues.shift();
            closedRef.close();
        }
        this.queues$.next([...queues, messageRef]);
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
