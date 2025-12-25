import { AfterContentInit, ContentChildren, DestroyRef, Directive, QueryList, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, ReplaySubject, combineLatest, merge } from 'rxjs';
import { map, mergeMap, startWith, switchMap } from 'rxjs/operators';

import { ThyNativeTableThDirective } from '../cell/th.directive';
import { ThyNativeTableStyleService } from '../services/table-style.service';

/* eslint-disable @angular-eslint/directive-selector */
@Directive({
    selector: 'tr:not([thyNativeTableMeasureRow]):not([thyNativeTableFixedRow])',
    host: {
        '[class.thy-native-table-row]': 'isInsideNativeTable'
    }
})
export class ThyNativeTableTrDirective implements AfterContentInit {
    private destroyRef = inject(DestroyRef);
    private styleService = inject(ThyNativeTableStyleService, { optional: true });

    @ContentChildren(ThyNativeTableThDirective) listOfThDirective!: QueryList<ThyNativeTableThDirective>;

    private listOfColumns$ = new ReplaySubject<ThyNativeTableThDirective[]>(1);

    listOfColumnsChanges$: Observable<ThyNativeTableThDirective[]> = this.listOfColumns$.pipe(
        switchMap(list => merge(this.listOfColumns$, ...list.map(c => c.changes$)).pipe(mergeMap(() => this.listOfColumns$))),
        takeUntilDestroyed(this.destroyRef)
    );

    isInsideNativeTable = !!this.styleService;

    ngAfterContentInit(): void {
        if (this.styleService) {
            this.listOfThDirective.changes
                .pipe(startWith(this.listOfThDirective), takeUntilDestroyed(this.destroyRef))
                .subscribe(thDirectives => {
                    const thList = thDirectives.toArray();
                    this.listOfColumns$.next(thList);
                });
        }
    }
}
