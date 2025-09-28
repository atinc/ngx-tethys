import { BehaviorSubject } from 'rxjs';
import { ThyGlobalMessageConfig } from '../message.config';
import { IThyAbstractMessageQueue, ThyAbstractMessageRef } from './abstract-message-ref';
import { signal } from '@angular/core';

/**
 * @internal
 */
export class ThyAbstractMessageQueue<TReference extends ThyAbstractMessageRef = ThyAbstractMessageRef> implements IThyAbstractMessageQueue {
    queues = signal<TReference[]>([]);

    protected defaultConfig: ThyGlobalMessageConfig;

    setQueues(newValue: TReference[]) {
        this.queues.set(newValue);
    }

    constructor(defaultConfig: ThyGlobalMessageConfig) {
        this.defaultConfig = defaultConfig;
    }

    add(messageRef: TReference) {
        const queues = this.queues();
        if (this.queues.length >= this.defaultConfig.maxStack) {
            const closedRef = queues.shift();
            closedRef.close();
        }
        this.queues.set([...queues, messageRef]);
    }

    remove(id: string) {
        if (!id) {
            this.queues().forEach(item => item.close());
            this.queues.set([]);
        } else {
            const removeItem = this.queues().find(item => item.id === id);
            removeItem?.close();
            const afterRemovedQueues = this.queues().filter(item => item.id !== id);
            this.queues.set(afterRemovedQueues);
        }
    }
}
