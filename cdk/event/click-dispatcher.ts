import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ThyEventDispatcher } from './event-dispatcher';

const DEFAULT_CLICKED_TIME = 100;

@Injectable({
    providedIn: 'root'
})
export class ThyClickDispatcher extends ThyEventDispatcher {
    eventName = 'click';

    clicked(auditTimeInMs: number = DEFAULT_CLICKED_TIME): Observable<Event> {
        return this.subscribe(auditTimeInMs);
    }
}
