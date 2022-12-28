import { Subject } from 'rxjs';
import { ThyMessageConfig } from './message.config';

export class ThyMessageRef {
    id: string;

    config: ThyMessageConfig;

    private _afterClosed = new Subject<void>();

    constructor(config: ThyMessageConfig) {
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
