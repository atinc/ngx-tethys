import { Inject, Injectable } from '@angular/core';
import { MiniStore, MiniAction } from 'ngx-tethys/core';
import { ThyMessageConfig, ThyMessageOption, THY_MESSAGE_DEFAULT_CONFIG } from './message.config';

interface MessageQueueState {
    queue: ThyMessageOption[];
}

/**
 * @internal
 */
@Injectable()
export class ThyMessageStore extends MiniStore<MessageQueueState> {
    constructor(@Inject(THY_MESSAGE_DEFAULT_CONFIG) private defaultConfig: ThyMessageConfig) {
        super({
            queue: []
        });
    }

    @MiniAction()
    add(options: ThyMessageOption) {
        if (this.snapshot.queue.length >= this.defaultConfig.maxStack) {
            this.setState({
                queue: [...this.snapshot.queue.slice(1)]
            });
        }
        this.setState({
            queue: [...this.snapshot.queue, options]
        });
    }

    @MiniAction()
    remove(id?: string) {
        const notRemoveItems: ThyMessageOption[] = [];
        this.snapshot.queue.forEach(item => {
            if (!id || item.id === id) {
                item.onClose.next();
                item.onClose.complete();
            } else {
                notRemoveItems.push(item);
            }
        });
        this.setState({
            queue: notRemoveItems
        });
    }
}
