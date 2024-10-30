import { Directive, ElementRef, Input, NgZone, OnDestroy, inject } from '@angular/core';
import { fromEvent, Observable, Subject } from 'rxjs';
import { startWith, switchMap, takeUntil } from 'rxjs/operators';

/**
 * 阻止事件冒泡
 * @name thyStopPropagation
 */
@Directive({
    selector: '[thyStopPropagation]',
    standalone: true
})
export class ThyStopPropagationDirective implements OnDestroy {
    private _eventName = 'click';

    private _shouldStopPropagation = true;

    @Input()
    set thyStopPropagation(value: string | boolean) {
        if (value === false || value === 'false') {
            this._shouldStopPropagation = false;
        } else {
            this._shouldStopPropagation = true;
            if (!value || value === true || value === 'true') {
                this._eventName = 'click';
            } else {
                this._eventName = value as string;
            }
        }

        this._changes$.next();
    }

    private _changes$ = new Subject<void>();
    private _destroy$ = new Subject<void>();

    constructor() {
        const _host = inject<ElementRef<HTMLElement>>(ElementRef);
        const _ngZone = inject(NgZone);

        this._changes$
            .pipe(
                // Note: we start the stream immediately since the `thyStopPropagation` setter may never be reached.
                startWith<null, null>(null),
                switchMap(
                    () =>
                        new Observable<Event>(subscriber =>
                            _ngZone.runOutsideAngular(() => fromEvent(_host.nativeElement, this._eventName).subscribe(subscriber))
                        )
                ),
                takeUntil(this._destroy$)
            )
            .subscribe(event => {
                if (this._shouldStopPropagation) {
                    event.stopPropagation();
                }
            });
    }

    ngOnDestroy() {
        this._destroy$.next();
    }
}
