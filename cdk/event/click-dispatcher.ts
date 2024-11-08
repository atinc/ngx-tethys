import { Injectable, NgZone, OnDestroy, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Observable } from 'rxjs';
import { ThyEventDispatcher } from './event-dispatcher';

const DEFAULT_CLICKED_TIME = 100;

@Injectable({
    providedIn: 'root'
})
export class ThyClickDispatcher extends ThyEventDispatcher {
    constructor() {
        const document = inject(DOCUMENT);
        const ngZone = inject(NgZone);

        super(document, ngZone, 'click');
    }

    clicked(auditTimeInMs: number = DEFAULT_CLICKED_TIME): Observable<Event> {
        return this.subscribe(auditTimeInMs);
    }
}
