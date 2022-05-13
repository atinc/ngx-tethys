import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NotifyQueueStore } from './notify-queue.store';
import { NotifyPlacement } from './notify.config';

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
    public notifyQueue: any;
    public topLeftQueue: any;
    public topRightQueue: any;
    public bottomLeftQueue: any;
    public bottomRightQueue: any;

    placement: NotifyPlacement;

    private destroy$ = new Subject<void>();

    beforeAttachPortal(): void {}

    constructor(public queueStore: NotifyQueueStore, private cdr: ChangeDetectorRef) {}

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
        console.log('container', queue$);
        queue$ = this.queueStore.select(state => state.notifyQueue);

        queue$.pipe(takeUntil(this.destroy$)).subscribe(data => {
            console.log('-----', data);
            this[queueKey] = data;
            this.cdr.detectChanges();
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
    }
}
