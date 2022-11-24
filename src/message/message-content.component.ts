import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MessageQueueStore } from './message-queue.store';
import { ThyMessageConfig } from './message.config';

@Component({
    selector: 'thy-message-content',
    template: `
        <thy-message *ngFor="let item of queue" [thyOption]="item"></thy-message>
    `
})
export class ThyMessageContentComponent implements OnInit, OnDestroy {
    public queue: ThyMessageConfig[];

    private destroy$ = new Subject<void>();

    constructor(public queueStore: MessageQueueStore) {}

    ngOnInit() {
        this.queueStore.state$.pipe(takeUntil(this.destroy$)).subscribe(data => {
            this.queue = data.queue;
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
    }
}
