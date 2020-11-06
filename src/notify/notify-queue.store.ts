import { Injectable } from '@angular/core';
import { Store, Action } from '../store';
import { NotifyPlacement, ThyNotifyOption } from './notify-option.interface';

export interface NotifyQueueState {
    topLeftQueue: ThyNotifyOption[];
    topRightQueue: ThyNotifyOption[];
    bottomLeftQueue: ThyNotifyOption[];
    bottomRightQueue: ThyNotifyOption[];
}

export const notifyQueueInitialState: NotifyQueueState = {
    topLeftQueue: [],
    topRightQueue: [],
    bottomLeftQueue: [],
    bottomRightQueue: []
};

@Injectable()
export class NotifyQueueStore extends Store<NotifyQueueState> {
    static topRightSelector(state: NotifyQueueState) {
        return state.topRightQueue;
    }
    static topLeftSelector(state: NotifyQueueState) {
        return state.topLeftQueue;
    }
    static bottomLeftSelector(state: NotifyQueueState) {
        return state.bottomLeftQueue;
    }
    static bottomRightSelector(state: NotifyQueueState) {
        return state.bottomRightQueue;
    }

    constructor() {
        super(notifyQueueInitialState);
    }

    private convertQueueKey(placement: NotifyPlacement): string {
        let key: string;
        if (placement === 'topLeft') {
            key = 'topLeftQueue';
        } else if (placement === 'topRight') {
            key = 'topRightQueue';
        } else if (placement === 'bottomLeft') {
            key = 'bottomLeftQueue';
        } else if (placement === 'bottomRight') {
            key = 'bottomRightQueue';
        }
        return key;
    }

    @Action()
    addNotify(placement: NotifyPlacement, notify: ThyNotifyOption) {
        const key = this.convertQueueKey(placement);
        const state = this.snapshot;
        if (state[key].length > notify.maxStack) {
            state[key].shift();
        }
        state[key].push(notify);
        this.next(state);
    }

    @Action()
    removeNotify(placement: NotifyPlacement, id: number) {
        const key = this.convertQueueKey(placement);
        const state = this.snapshot;
        state[key] = state[key].filter((item: any) => {
            return item.id !== id;
        });
        this.next(state);
    }
}
