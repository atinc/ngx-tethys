import { Injectable } from '@angular/core';
import { Store, Action } from 'ngx-tethys/store';
import { NotifyPlacement, ThyNotifyConfig } from './notify.config';

export interface NotifyQueueState {
    topLeftQueue: ThyNotifyConfig[];
    topRightQueue: ThyNotifyConfig[];
    bottomLeftQueue: ThyNotifyConfig[];
    bottomRightQueue: ThyNotifyConfig[];
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
    addNotify(placement: NotifyPlacement, options: ThyNotifyConfig) {
        const key = this.convertQueueKey(placement);
        const state = this.snapshot;
        if (state[key].length >= options.maxStack) {
            state[key].shift();
        }
        state[key].push(options);
        this.next(state);
    }

    @Action()
    removeNotify(id: string, placement?: NotifyPlacement) {
        const state = this.snapshot;
        if (placement) {
            const queueKey = this.convertQueueKey(placement);
            if (state.hasOwnProperty(queueKey) && state[queueKey].length) {
                state[queueKey] = state[queueKey].filter((item: any) => {
                    return item.id !== id;
                });
            }
        } else {
            Object.keys(state).forEach(queueKey => {
                if (state.hasOwnProperty(queueKey) && state[queueKey].length) {
                    state[queueKey] = state[queueKey].filter((item: any) => {
                        return item.id !== id;
                    });
                }
            });
        }
        this.next(state);
    }
}
