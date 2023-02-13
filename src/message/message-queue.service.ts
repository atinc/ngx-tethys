import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ThyMessageBaseRef, ThyMessageRef } from './message-ref';
import { ThyGlobalMessageConfig, THY_MESSAGE_DEFAULT_CONFIG } from './message.config';

/**
 * @internal
 */
export class ThyMessageBaseQueue<TReferences extends ThyMessageBaseRef = ThyMessageBaseRef> {
    queues$ = new BehaviorSubject<TReferences[]>([]);

    protected defaultConfig: ThyGlobalMessageConfig;

    get queues() {
        return this.queues$.getValue();
    }

    constructor(defaultConfig: ThyGlobalMessageConfig) {
        this.defaultConfig = defaultConfig;
    }

    add(messageRef: TReferences) {
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

/**
 * @internal
 */
@Injectable({
    providedIn: 'root'
})
export class ThyMessageQueue extends ThyMessageBaseQueue<ThyMessageRef> {
    constructor(@Inject(THY_MESSAGE_DEFAULT_CONFIG) defaultConfig: ThyGlobalMessageConfig) {
        super(defaultConfig);
    }
}
