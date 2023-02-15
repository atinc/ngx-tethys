import { OverlayRef } from '@angular/cdk/overlay';
import { Subject } from 'rxjs';
import { ThyMessageBaseConfig, ThyMessageConfig } from './message.config';

export class ThyMessageBaseRef<TConfig extends ThyMessageBaseConfig = ThyMessageBaseConfig> {
    id: string;

    config: TConfig;

    overlayRef: OverlayRef;

    private _afterClosed = new Subject<void>();

    constructor(config: TConfig, overlayRef: OverlayRef) {
        this.id = config.id;
        this.config = config;
        this.overlayRef = overlayRef;
    }

    close() {
        this._afterClosed.next();
        this._afterClosed.complete();
    }

    afterClosed() {
        return this._afterClosed.asObservable();
    }
}

export class ThyMessageRef extends ThyMessageBaseRef<ThyMessageConfig> {}
