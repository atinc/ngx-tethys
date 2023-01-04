import { Subject } from 'rxjs';
import { ThyNotifyConfig } from './notify.config';

export class ThyNotifyRef {
    id: string;

    config: ThyNotifyConfig;

    private _afterClosed = new Subject<void>();

    constructor(config: ThyNotifyConfig) {
        this.id = config.id;
        this.config = config;
    }

    close() {
        this._afterClosed.next();
        this._afterClosed.complete();
    }

    afterClosed() {
        return this._afterClosed.asObservable();
    }
}
