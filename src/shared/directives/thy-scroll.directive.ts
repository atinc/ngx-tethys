import { Directive, ElementRef, OnInit, NgZone, OnDestroy, Output, EventEmitter, Input, inject } from '@angular/core';
import { Subject, Observable, Observer, fromEvent, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { normalizePassiveListenerOptions } from '@angular/cdk/platform';
import { coerceBooleanProperty } from 'ngx-tethys/util';

const passiveEventListenerOptions = <AddEventListenerOptions>normalizePassiveListenerOptions({ passive: true });

/**
 * @name thyScroll
 */
@Directive({
    selector: '[thyScroll]'
})
export class ThyScrollDirective implements OnInit, OnDestroy {
    private elementRef = inject<ElementRef<any>>(ElementRef);
    private ngZone = inject(NgZone);

    private _destroyed = new Subject<void>();
    private _enable = true;
    private _initialled = false;
    private _subscription: Subscription;

    private _elementScrolled: Observable<Event> = new Observable((observer: Observer<Event>) =>
        this.ngZone.runOutsideAngular(() =>
            fromEvent(this.elementRef.nativeElement, 'scroll', passiveEventListenerOptions)
                .pipe(takeUntil(this._destroyed))
                .subscribe(observer)
        )
    );

    @Input({ transform: coerceBooleanProperty })
    set thyEnable(value: boolean) {
        this._enable = value;
        if (this._initialled) {
            if (this._enable && this._subscription === null) {
                this._subscription = this._elementScrolled.subscribe(() => this.thyOnScrolled.emit(this.elementRef));
            } else {
                if (this._subscription) {
                    this._subscription.unsubscribe();
                    this._subscription = null;
                }
            }
        }
    }

    /**
     * @description
     *
     * Note: the `thyOnScrolled` emits outside of the Angular zone since the `scroll` listener
     * is installed within the `<root>` zone.
     *
     * Consumers need to re-enter the Angular zone theirselves when the change detection is needeed to be run:
     * ```ts
     * @Component({
     *   template: '<div thyScroll (thyOnScrolled)="onScrolled()"></div>'
     * })
     * class ThyScrollComponent {
     *   onScrolled(): void {
     *     console.log(Zone.current); // <root>
     *     console.log(NgZone.isInAngularZone()); // false
     *   }
     * }
     * ```
     */
    @Output() thyOnScrolled: EventEmitter<ElementRef> = new EventEmitter<ElementRef>();

    ngOnInit() {
        if (this._enable) {
            this._subscription = this._elementScrolled.subscribe(() => this.thyOnScrolled.emit(this.elementRef));
        }
        this._initialled = true;
    }

    ngOnDestroy() {
        this._destroyed.next();
        this._destroyed.complete();
    }

    getElementRef(): ElementRef<HTMLElement> {
        return this.elementRef;
    }
}
