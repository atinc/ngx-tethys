import { InputBoolean } from 'ngx-tethys/core';
import { defer, merge, Observable, Subject } from 'rxjs';
import { debounceTime, map, startWith, switchMap, take, takeUntil } from 'rxjs/operators';

import { AfterContentInit, Component, ContentChildren, HostBinding, Input, NgZone, OnDestroy, QueryList } from '@angular/core';

import { ThyOptionComponent, ThyOptionVisibleChangeEvent } from '../option.component';
import { THY_OPTION_GROUP_COMPONENT } from '../option.token';

@Component({
    selector: 'thy-option-group',
    templateUrl: './option-group.component.html',
    providers: [
        {
            provide: THY_OPTION_GROUP_COMPONENT,
            useExisting: ThySelectOptionGroupComponent
        }
    ]
})
export class ThySelectOptionGroupComponent implements OnDestroy, AfterContentInit {
    _hidden = false;
    @Input()
    @HostBinding(`class.disabled`)
    thyDisabled: boolean;

    @HostBinding('class.thy-option-item-group') _isOptionGroup = true;

    @HostBinding('class.thy-select-option-group-hidden')
    get hidden(): boolean {
        return this._hidden;
    }

    @Input() thyGroupLabel: string;

    @HostBinding(`class.thy-option-item-group-collapsible`)
    @Input()
    @InputBoolean()
    thyCollapsible = false;

    @HostBinding(`class.thy-option-item-group-collapsed`)
    @Input()
    @InputBoolean()
    thyCollapsed = false;

    @ContentChildren(ThyOptionComponent) options: QueryList<ThyOptionComponent>;

    _destroy$: Subject<any> = new Subject<any>();

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

    click(event: Event) {
        if (this.thyCollapsible) {
            this.thyCollapsed = !this.thyCollapsed;
        }
    }

    ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.complete();
    }
}
