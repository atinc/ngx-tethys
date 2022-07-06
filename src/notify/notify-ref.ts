import { ThyNotifyContainerRef } from './notify-container-ref';
import { NotifyQueueStore } from './notify-queue.store';
import { ThyNotifyConfig } from './notify.config';

export class ThyNotifyRef {
    constructor(
        private queueStore: NotifyQueueStore,
        private thyNotifyContainerRef: ThyNotifyContainerRef<unknown>,
        private option: ThyNotifyConfig
    ) {}

    get containerRef() {
        return this.thyNotifyContainerRef;
    }

    close() {
        this.queueStore.removeNotify(this.option);
    }
}
