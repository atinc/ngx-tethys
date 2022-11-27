import { Injectable } from '@angular/core';
import { MiniStore, MiniAction } from 'ngx-tethys/core';
import { ThyMessageConfig } from './message.config';

export interface MessageQueueState {
    queue: ThyMessageConfig[];
}

export const messageQueueInitialState: MessageQueueState = {
    queue: []
};

@Injectable()
export class MessageQueueStore extends MiniStore<MessageQueueState> {
    constructor() {
        super(messageQueueInitialState);
    }

    @MiniAction()
    add(options: ThyMessageConfig) {
        if (this.snapshot.queue.length >= options.maxStack) {
            this.setState({
                queue: [...this.snapshot.queue.slice(1)]
            });
        }
        this.setState({
            queue: [...this.snapshot.queue, options]
        });
    }

    @MiniAction()
    remove(id: string) {
        this.setState({
            queue: this.snapshot.queue.filter(item => item.id !== id)
        });
    }
}
