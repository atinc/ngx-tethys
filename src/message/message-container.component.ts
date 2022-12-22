import { Component, HostBinding, Inject, OnDestroy, OnInit } from '@angular/core';
import { coerceCssPixelValue } from 'ngx-tethys/util';
import { Subject } from 'rxjs';
import { ThyMessageStore } from './message-queue.store';
import { ThyMessageConfig, ThyMessageOption, THY_MESSAGE_DEFAULT_CONFIG } from './message.config';

/**
 * @internal
 */
@Component({
    selector: 'thy-message-container',
    template: `
        <thy-message *ngFor="let message of queue" [thyOption]="message"></thy-message>
    `
})
export class ThyMessageContainerComponent implements OnInit, OnDestroy {
    @HostBinding('class') className = 'thy-message-root';

    @HostBinding('style.top') private top: string;

    queue: ThyMessageOption[] = [];

    readonly destroy$ = new Subject<void>();

    constructor(public store: ThyMessageStore, @Inject(THY_MESSAGE_DEFAULT_CONFIG) defaultConfig: ThyMessageConfig) {
        this.top = coerceCssPixelValue(defaultConfig.offset);
    }

    ngOnInit() {
        this.store.state$.subscribe(data => {
            this.queue = data.queue;
        });
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
