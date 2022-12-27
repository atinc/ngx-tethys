import { Subject } from 'rxjs';

export class ThyMessageRef {
    id: string;

    private _afterClosed = new Subject<void>();

    constructor(id: string) {
        this.id = id;
    }

    close() {
        this._afterClosed.next();
        this._afterClosed.complete();
    }

    afterClosed() {
        return this._afterClosed.asObservable();
    }
}
