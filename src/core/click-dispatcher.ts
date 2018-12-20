import { Injectable, Inject, NgZone, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { fromEvent, Subject, Observable, Observer, Subscription } from 'rxjs';
import { auditTime } from 'rxjs/operators';

const DEFAULT_CLICKED_TIME = 200;

@Injectable({
    providedIn: 'root'
})
export class ClickDispatcher implements OnDestroy {
    private _globalSubscription: Subscription = null;

    private _clickEvent$ = new Subject<Event>();

    private _clickCount = 0;

    private _addGlobalListener() {
        this._globalSubscription = this.ngZone.runOutsideAngular(() => {
            return fromEvent(this.document, 'click').subscribe(
                (event: Event) => {
                    this._clickEvent$.next(event);
                }
            );
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

    constructor(
        @Inject(DOCUMENT) private document: any,
        private ngZone: NgZone
    ) {}

    clicked(auditTimeInMs: number = DEFAULT_CLICKED_TIME): Observable<Event> {
        return Observable.create((observer: Observer<Event | void>) => {
            if (!this._globalSubscription) {
                this._addGlobalListener();
            }
            // In the case of a 0ms delay, use an observable without auditTime
            // since it does add a perceptible delay in processing overhead.
            const subscription =
                auditTimeInMs > 0
                    ? this._clickEvent$
                          .pipe(auditTime(auditTimeInMs))
                          .subscribe(observer)
                    : this._clickEvent$.subscribe(observer);

            this._clickCount++;
            return () => {
                subscription.unsubscribe();
                this._clickCount--;

                if (!this._clickCount) {
                    this._removeGlobalListener();
                }
            };
        });
    }

    ngOnDestroy() {
        this._removeGlobalListener();
        this._clickEvent$.complete();
    }
}
