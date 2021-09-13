import { fromEvent, Observable, Subject, Subscription } from 'rxjs';
import { auditTime } from 'rxjs/operators';

import { Directive, NgZone, OnDestroy } from '@angular/core';

const DEFAULT_EVENT_TIME = 100;

@Directive()
export abstract class ThyEventDispatcher implements OnDestroy {
    private _globalSubscription: Subscription = null;

    private _event$ = new Subject<Event>();

    private _subscriptionCount = 0;

    private _addGlobalListener() {
        this._globalSubscription = this.ngZone.runOutsideAngular(() => {
            return fromEvent(this.document, this.eventName).subscribe((event: Event) => {
                this._event$.next(event);
            });
        });
    }

    private _removeGlobalListener() {
        if (this._globalSubscription) {
            this._globalSubscription.unsubscribe();
            this._globalSubscription = null;
        }
    }

    get globalSubscription(): Subscription {
        return this._globalSubscription;
    }

    constructor(private document: Document, private ngZone: NgZone, private eventName: string) {}

    protected subscribe(auditTimeInMs: number = DEFAULT_EVENT_TIME): Observable<Event> {
        return new Observable(observer => {
            if (!this._globalSubscription) {
                this._addGlobalListener();
            }
            // In the case of a 0ms delay, use an observable without auditTime
            // since it does add a perceptible delay in processing overhead.
            const subscription =
                auditTimeInMs > 0 ? this._event$.pipe(auditTime(auditTimeInMs)).subscribe(observer) : this._event$.subscribe(observer);

            this._subscriptionCount++;
            return () => {
                subscription.unsubscribe();
                this._subscriptionCount--;

                if (!this._subscriptionCount) {
                    this._removeGlobalListener();
                }
            };
        });
    }

    ngOnDestroy() {
        this._removeGlobalListener();
        this._event$.complete();
    }
}
