import { OverlayRef } from '@angular/cdk/overlay';
import { Subject } from 'rxjs';
import { ThyMessageBaseConfig } from '../message.config';
import { ThyAbstractMessageQueue } from './abstract-message-queue.service';

export class ThyAbstractMessageRef<TConfig extends ThyMessageBaseConfig = ThyMessageBaseConfig> {
    id: string;

    config: TConfig;

    private overlayRef: OverlayRef;

    private queueService: ThyAbstractMessageQueue;

    private _afterClosed = new Subject<void>();

    constructor(config: TConfig, overlayRef: OverlayRef, queueService: ThyAbstractMessageQueue) {
        this.id = config.id;
        this.config = config;
        this.overlayRef = overlayRef;
        this.queueService = queueService;
    }

    close() {
        this.queueService.queues$.next(this.queueService.queues.filter(item => item.id !== this.id));
        this._afterClosed.next();
        this._afterClosed.complete();
    }

    afterClosed() {
        return this._afterClosed.asObservable();
    }

    getOverlayRef() {
        return this.overlayRef;
    }
}
