import {
    Component,
    HostBinding,
    NgZone,
    OnDestroy,
    AfterContentInit,
    ChangeDetectorRef,
    inject,
    input,
    ContentChildren,
    QueryList
} from '@angular/core';
import { Observable, defer, Subject, merge } from 'rxjs';
import { ThyOptionVisibleChangeEvent, ThyOption } from '../option.component';
import { take, switchMap, startWith, takeUntil, debounceTime, map } from 'rxjs/operators';
import { coerceBooleanProperty } from 'ngx-tethys/util';
import { outputToObservable } from '@angular/core/rxjs-interop';

/**
 * @private
 */
@Component({
    selector: 'thy-option-group',
    templateUrl: './option-group.component.html'
})
export class ThySelectOptionGroup implements OnDestroy, AfterContentInit {
    private _ngZone = inject(NgZone);
    private cdr = inject(ChangeDetectorRef);

    _hidden = false;
    @HostBinding(`class.disabled`)
    readonly thyDisabled = input(false, { transform: coerceBooleanProperty });

    @HostBinding('class.thy-option-item-group') _isOptionGroup = true;

    @HostBinding('class.thy-select-option-group-hidden')
    get hidden(): boolean {
        return this._hidden;
    }

    readonly thyGroupLabel = input<string>(undefined);

    @ContentChildren(ThyOption) options: QueryList<ThyOption>;

    _destroy$: Subject<void> = new Subject<void>();

    optionVisibleChanges: Observable<ThyOptionVisibleChangeEvent> = defer(() => {
        if (this.options) {
            return merge(...this.options.map(option => outputToObservable(option.visibleChange)));
        }
        return this._ngZone.onStable.asObservable().pipe(
            take(1),
            switchMap(() => this.optionVisibleChanges)
        );
    });

    ngAfterContentInit() {
        this.options.changes.pipe(startWith(null), takeUntil(this._destroy$)).subscribe(() => {
            this._resetOptions();
        });
    }

    _resetOptions() {
        const changedOrDestroyed$ = merge(this.options.changes, this._destroy$);
        merge(...this.options.map(option => outputToObservable(option.visibleChange)))
            .pipe(
                takeUntil(changedOrDestroyed$),
                debounceTime(10),
                map((event: ThyOptionVisibleChangeEvent) => {
                    const hasOption = this.options.find(option => {
                        if (!option.hidden) {
                            return true;
                        }
                    });
                    if (hasOption) {
                        return false;
                    } else {
                        return true;
                    }
                })
            )
            .subscribe((data: boolean) => {
                this._hidden = data;
                this.cdr.markForCheck();
            });
    }

    ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.complete();
    }
}
