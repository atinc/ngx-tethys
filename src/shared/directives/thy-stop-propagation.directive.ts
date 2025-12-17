import { Directive, ElementRef, NgZone, OnDestroy, computed, effect, inject, input } from '@angular/core';
import { fromEvent, Observable, Subject } from 'rxjs';
import { startWith, switchMap, takeUntil } from 'rxjs/operators';
import { SafeAny } from 'ngx-tethys/types';

/**
 * 阻止事件冒泡
 * @name thyStopPropagation
 */
@Directive({
    selector: '[thyStopPropagation]'
})
export class ThyStopPropagationDirective implements OnDestroy {
    readonly thyStopPropagation = input<string | boolean>(true);

    private readonly _eventName = computed(() => {
        const stopPropagation = this.thyStopPropagation();
        if (stopPropagation !== false) {
            if (!stopPropagation || stopPropagation === true || stopPropagation === 'true') {
                return 'click';
            } else {
                return stopPropagation as string;
            }
        }
    });

    private readonly _shouldStopPropagation = computed(() => {
        const stopPropagation = this.thyStopPropagation();
        return stopPropagation === false || stopPropagation === 'false' ? false : true;
    });

    private _changes$ = new Subject<string | boolean>();
    private _destroy$ = new Subject<void>();

    constructor() {
        const _host = inject<ElementRef<HTMLElement>>(ElementRef);
        const _ngZone = inject(NgZone);

        effect(() => {
            this._changes$.next(this.thyStopPropagation());
        });

        this._changes$
            .pipe(
                // Note: we start the stream immediately since the `thyStopPropagation` setter may never be reached.
                startWith(null),
                switchMap(
                    () =>
                        new Observable<Event>(subscriber =>
                            _ngZone.runOutsideAngular(() =>
                                fromEvent<Event>(_host!.nativeElement! as SafeAny, this._eventName()!).subscribe(subscriber)
                            )
                        )
                ),
                takeUntil(this._destroy$)
            )
            .subscribe(event => {
                if (this._shouldStopPropagation()) {
                    event.stopPropagation();
                }
            });
    }

    ngOnDestroy() {
        this._destroy$.next();
    }
}
