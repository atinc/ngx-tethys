import { Component, OnInit, HostBinding } from '@angular/core';
import { CONTAINER_PLACEMENT, NotifyPlacement } from './notify-option.interface';
import { NotifyQueueStore } from './notify-queue.store';

@Component({
    selector: 'thy-notify-container',
    templateUrl: './notify.container.component.html'
})
export class ThyNotifyContainerComponent implements OnInit {
    @HostBinding('class.thy-notify-root') className = true;
    @HostBinding('class.thy-notify-bottomRight') bottomRight: boolean;
    @HostBinding('class.thy-notify-bottomLeft') bottomLeft: boolean;
    @HostBinding('class.thy-notify-topLeft') topLeft: boolean;
    @HostBinding('class.thy-notify-topRight') topRight: boolean;

    initialState: any;

    public notifyQueue: any;
    public topLeftQueue: any;
    public topRightQueue: any;
    public bottomLeftQueue: any;
    public bottomRightQueue: any;

    placement: NotifyPlacement;

    constructor(public queueStore: NotifyQueueStore) {}

    ngOnInit() {
        this.placement = this.initialState.placement;
        let queue$, queueKey: string;
        if (this.placement === 'bottomRight') {
            this.bottomRight = true;
        } else if (this.placement === 'bottomLeft') {
            this.bottomLeft = true;
        } else if (this.placement === 'topLeft') {
            this.topLeft = true;
        } else {
            this.topRight = true;
        }
        if (this.placement === 'topLeft') {
            queueKey = 'topLeftQueue';
            queue$ = this.queueStore.select(NotifyQueueStore.topLeftSelector);
        } else if (this.placement === 'topRight') {
            queueKey = 'topRightQueue';
            queue$ = this.queueStore.select(NotifyQueueStore.topRightSelector);
        } else if (this.placement === 'bottomLeft') {
            queueKey = 'bottomLeftQueue';
            queue$ = this.queueStore.select(NotifyQueueStore.bottomLeftSelector);
        } else if (this.placement === 'bottomRight') {
            queueKey = 'bottomRightQueue';
            queue$ = this.queueStore.select(NotifyQueueStore.bottomRightSelector);
        }
        queue$.subscribe(data => {
            this[queueKey] = data;
        });
    }
}
