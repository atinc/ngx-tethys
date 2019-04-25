import {
    Component,
    HostBinding,
    Input,
    OnInit,
    ContentChildren,
    QueryList,
    NgZone,
    OnDestroy,
    AfterContentInit
} from '@angular/core';
import { Observable, defer, Subject, merge, combineLatest } from 'rxjs';
import { OptionVisiableChange, ThyOptionComponent } from './option.component';
import { take, switchMap, startWith, takeUntil, reduce, debounceTime, map } from 'rxjs/operators';

@Component({
    selector: 'thy-option-group',
    templateUrl: './option-group.component.html'
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

    @ContentChildren(ThyOptionComponent) options: QueryList<ThyOptionComponent>;

    _destroy$: Subject<any> = new Subject<any>();

    optionVisiableChanges: Observable<OptionVisiableChange> = defer(() => {
        if (this.options) {
            return merge(...this.options.map(option => option.visiableChange));
        }
        return this._ngZone.onStable.asObservable().pipe(
            take(1),
            switchMap(() => this.optionVisiableChanges)
        );
    }) as Observable<OptionVisiableChange>;

    constructor(private _ngZone: NgZone) {}

    ngAfterContentInit() {
        this.options.changes
            .pipe(
                startWith(null),
                takeUntil(this._destroy$)
            )
            .subscribe(() => {
                this._resetOptions();
            });
    }

    _resetOptions() {
        const changedOrDestroyed$ = merge(this.options.changes, this._destroy$);
        merge(...this.options.map(option => option.visiableChange))
            .pipe(
                takeUntil(changedOrDestroyed$),
                debounceTime(10),
                map((data: OptionVisiableChange) => {
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
