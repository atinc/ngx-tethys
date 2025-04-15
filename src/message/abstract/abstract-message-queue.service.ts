import { BehaviorSubject } from 'rxjs';
import { ThyGlobalMessageConfig } from '../message.config';
import { IThyAbstractMessageQueue, ThyAbstractMessageRef } from './abstract-message-ref';

/**
 * @internal
 */
export class ThyAbstractMessageQueue<TReferences extends ThyAbstractMessageRef = ThyAbstractMessageRef>
    implements IThyAbstractMessageQueue
{
    queues$ = new BehaviorSubject<TReferences[]>([]);

    protected defaultConfig: ThyGlobalMessageConfig;

    get queues(): TReferences[] {
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
