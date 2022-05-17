import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NotifyQueueStore } from './notify-queue.store';
import { NotifyPlacement, ThyNotifyConfig } from './notify.config';

@Component({
    selector: 'thy-notify-content',
    template: `
        <thy-notify *ngFor="let item of topLeftQueue" [thyOption]="item"></thy-notify>
        <thy-notify *ngFor="let item of topRightQueue" [thyOption]="item"></thy-notify>
        <thy-notify *ngFor="let item of bottomLeftQueue" [thyOption]="item"></thy-notify>
        <thy-notify *ngFor="let item of bottomRightQueue" [thyOption]="item"></thy-notify>
    `
})
export class ThyNotifyContentComponent implements OnInit, OnDestroy {
    public topLeftQueue: ThyNotifyConfig[];
    public topRightQueue: ThyNotifyConfig[];
    public bottomLeftQueue: ThyNotifyConfig[];
    public bottomRightQueue: ThyNotifyConfig[];

    public placement: NotifyPlacement;

    private destroy$ = new Subject<void>();

    beforeAttachPortal(): void {}

    constructor(public queueStore: NotifyQueueStore) {}

    ngOnInit() {
        this.placement = this.placement;
        let queue$, queueKey: string;

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
        queue$.pipe(takeUntil(this.destroy$)).subscribe(data => {
            this[queueKey] = data;
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
    }
}
