import { Component, HostBinding, Input, OnInit, ContentChildren, QueryList, NgZone, OnDestroy, AfterContentInit } from '@angular/core';
import { Observable, defer, Subject, merge, combineLatest } from 'rxjs';
import { ThyOptionVisibleChangeEvent, ThyOption } from '../option.component';
import { take, switchMap, startWith, takeUntil, reduce, debounceTime, map } from 'rxjs/operators';
import { THY_OPTION_GROUP_COMPONENT } from '../option.token';
import { InputBoolean } from 'ngx-tethys/core';

/**
 * @private
 */
@Component({
    selector: 'thy-option-group',
    templateUrl: './option-group.component.html',
    providers: [
        {
            provide: THY_OPTION_GROUP_COMPONENT,
            useExisting: ThySelectOptionGroup
        }
    ],
    standalone: true
})
export class ThySelectOptionGroup implements OnDestroy, AfterContentInit {
    _hidden = false;
    @Input()
    @InputBoolean()
    @HostBinding(`class.disabled`)
    thyDisabled: boolean;

    @HostBinding('class.thy-option-item-group') _isOptionGroup = true;

    @HostBinding('class.thy-select-option-group-hidden')
    get hidden(): boolean {
        return this._hidden;
    }

    @Input() thyGroupLabel: string;

    @ContentChildren(ThyOption) options: QueryList<ThyOption>;

    _destroy$: Subject<void> = new Subject<void>();

    optionVisibleChanges: Observable<ThyOptionVisibleChangeEvent> = defer(() => {
        if (this.options) {
            return merge(...this.options.map(option => option.visibleChange));
        }
        return this._ngZone.onStable.asObservable().pipe(
            take(1),
            switchMap(() => this.optionVisibleChanges)
        );
    }) as Observable<ThyOptionVisibleChangeEvent>;

    constructor(private _ngZone: NgZone) {}

    ngAfterContentInit() {
        this.options.changes.pipe(startWith(null), takeUntil(this._destroy$)).subscribe(() => {
            this._resetOptions();
        });
    }

    _resetOptions() {
        const changedOrDestroyed$ = merge(this.options.changes, this._destroy$);
        merge(...this.options.map(option => option.visibleChange))
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
            });
    }

    ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.complete();
    }
}
