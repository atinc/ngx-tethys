/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ThyEventDispatcher } from './event-dispatcher';

const DEFAULT_KEYDOWN_TIME = 100;

@Injectable({
    providedIn: 'root'
})
export class ThyKeyboardDispatcher extends ThyEventDispatcher {
    eventName = 'keydown';

    keydown(auditTimeInMs: number = DEFAULT_KEYDOWN_TIME): Observable<Event> {
        return this.subscribe(auditTimeInMs);
    }
}
