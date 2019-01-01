/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { DOCUMENT } from '@angular/common';
import {
    Inject,
    Injectable,
    NgZone
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ThyEventDispatcher } from './event-dispatcher';

const DEFAULT_KEYDOWN_TIME = 100;

@Injectable({
    providedIn: 'root'
})
export class ThyKeyboardDispatcher extends ThyEventDispatcher {

    constructor(
        @Inject(DOCUMENT) document: any,
        ngZone: NgZone
    ) {
        super(document, ngZone, 'keydown');
    }

    keydown(auditTimeInMs: number = DEFAULT_KEYDOWN_TIME): Observable<Event> {
        return this.subscribe(auditTimeInMs);
    }
}


// @Injectable({ providedIn: 'root' })
// export class ThyKeyboardDispatcher implements OnDestroy {
//     /** Currently attached keydown refs in the order they were attached. */
//     _attachedKeydownSubjects: Subject<KeyboardEvent>[] = [];

//     private _document: Document;

//     private _isAttached: boolean;

//     /** Keyboard event listener that will be attached to the body. */
//     private _keydownListener = (event: KeyboardEvent) => {
//         const keydownRefs = this._attachedKeydownSubjects;

//         for (let i = keydownRefs.length - 1; i > -1; i--) {
//             keydownRefs[i].next(event);
//             break;
//         }
//     }

//     /** Detaches the global keyboard event listener. */
//     private _detach() {
//         if (this._isAttached) {
//             this._document.body.removeEventListener(
//                 'keydown',
//                 this._keydownListener,
//                 true
//             );
//             this._isAttached = false;
//         }
//     }

//     constructor(@Inject(DOCUMENT) document: any) {
//         this._document = document;
//     }

//     ngOnDestroy() {
//         this._detach();
//     }

//     /** Add a new overlay to the list of attached overlay refs. */
//     add(keydownSubject: Subject<KeyboardEvent>): void {
//         // Ensure that we don't get the same overlay multiple times.
//         this.remove(keydownSubject);

//         // Lazily start dispatcher once first overlay is added
//         if (!this._isAttached) {
//             this._document.body.addEventListener(
//                 'keydown',
//                 this._keydownListener,
//                 true
//             );
//             this._isAttached = true;
//         }

//         this._attachedKeydownSubjects.push(keydownSubject);
//     }

//     /** Remove an keydown ref from the list of attached keydown refs. */
//     remove(keydownRef: Subject<KeyboardEvent>): void {
//         const index = this._attachedKeydownSubjects.indexOf(keydownRef);

//         if (index > -1) {
//             this._attachedKeydownSubjects.splice(index, 1);
//         }

//         // Remove the global listener once there are no more refs.
//         if (this._attachedKeydownSubjects.length === 0) {
//             this._detach();
//         }
//     }
// }
