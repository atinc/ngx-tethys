import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ThyNotifyContainerRef } from './notify-container-ref';
import { NotifyQueueStore } from './notify-queue.store';
import { NotifyPlacement, ThyNotifyConfig } from './notify.config';

@Component({
    selector: 'thy-notify-content',
    template: `
        <thy-notify *ngFor="let item of notifyItems" [thyOption]="item"></thy-notify>
    `
})
export class ThyNotifyContentComponent implements OnInit, OnDestroy {
    notifyItems: ThyNotifyConfig[];

    @Input()
    placement: NotifyPlacement;

    private destroy$ = new Subject<void>();

    beforeAttachPortal(): void {}

    constructor(public queueStore: NotifyQueueStore, public notifyContainerRef: ThyNotifyContainerRef<ThyNotifyContentComponent>) {}

    ngOnInit() {
        this.placement = this.placement;
        let queue$: Observable<ThyNotifyConfig[]>;
        if (this.placement === 'topLeft') {
            queue$ = this.queueStore.select(NotifyQueueStore.topLeftSelector);
        } else if (this.placement === 'topRight') {
            queue$ = this.queueStore.select(NotifyQueueStore.topRightSelector);
        } else if (this.placement === 'bottomLeft') {
            queue$ = this.queueStore.select(NotifyQueueStore.bottomLeftSelector);
        } else if (this.placement === 'bottomRight') {
            queue$ = this.queueStore.select(NotifyQueueStore.bottomRightSelector);
        }
        queue$.pipe(takeUntil(this.destroy$)).subscribe(data => {
            this.notifyItems = data;
            if (data.length === 0) {
                this.notifyContainerRef.close();
            }
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
