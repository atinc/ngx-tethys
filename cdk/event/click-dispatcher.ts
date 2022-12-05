import { Injectable, Inject, NgZone, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Observable } from 'rxjs';
import { ThyEventDispatcher } from './event-dispatcher';

const DEFAULT_CLICKED_TIME = 100;

@Injectable({
    providedIn: 'root'
})
export class ThyClickDispatcher extends ThyEventDispatcher {
    constructor(@Inject(DOCUMENT) document: any, ngZone: NgZone) {
        super(document, ngZone, 'click');
    }

    clicked(auditTimeInMs: number = DEFAULT_CLICKED_TIME): Observable<Event> {
        return this.subscribe(auditTimeInMs);
    }
}
