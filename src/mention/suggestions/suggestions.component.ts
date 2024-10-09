import { ThySelectionListChange, ThySelectionList } from 'ngx-tethys/list';
import { ThyPopoverRef } from 'ngx-tethys/popover';
import { Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, switchMap, take } from 'rxjs/operators';

import { Component, ElementRef, HostBinding, NgZone, OnDestroy, OnInit } from '@angular/core';

import { SeekQueryResult } from '../adapter/adapter';
import { Mention, MentionDefaultDataItem, MentionSuggestionSelectEvent } from '../interfaces';
import { ThyListOption } from 'ngx-tethys/shared';
import { ThyLoading } from 'ngx-tethys/loading';
import { NgTemplateOutlet, SlicePipe } from '@angular/common';

/**
 * @private
 */
@Component({
    selector: 'thy-mention-suggestions',
    templateUrl: './suggestions.component.html',
    standalone: true,
    imports: [NgTemplateOutlet, ThyLoading, ThySelectionList, ThyListOption, SlicePipe]
})
export class ThyMentionSuggestions<TItem = MentionDefaultDataItem> implements OnInit, OnDestroy {
    data: TItem[];

    mention: Mention<TItem>;

    suggestionSelect$ = new Subject<MentionSuggestionSelectEvent>();

    debounce = 150;

    loadingDone = true;

    private search$ = new Subject<SeekQueryResult>();

    @HostBinding('class.thy-mention-suggestions') suggestionsClass = true;

    constructor(
        public elementRef: ElementRef<HTMLElement>,
        private ngZone: NgZone,
        private popoverRef: ThyPopoverRef<any>
    ) {
        this.search$
            .pipe(
                switchMap(query => {
                    const data = this.mention.search(query.term, this.mention.data);
                    if (data instanceof Observable) {
                        this.loadingDone = false;
                        return (data as Observable<TItem[]>).pipe(debounceTime(this.debounce));
                    } else {
                        return of(data as TItem[]);
                    }
                }),
                catchError(() => {
                    this.loadingDone = false;
                    return [];
                })
            )
            .subscribe(data => {
                this.loadingDone = true;
                this.data = data || [];

                if (this.popoverRef) {
                    if (this.mention.autoClose && this.data.length === 0) {
                        this.popoverRef.close();
                    }
                    this.ngZone.onStable.pipe(take(1)).subscribe(() => {
                        this.popoverRef.updatePosition();
                    });
                }
            });
    }

    ngOnInit(): void {
        if (this.mention.popoverClass) {
            this.elementRef.nativeElement.classList.add(this.mention.popoverClass);
        }
    }

    search(query: SeekQueryResult) {
        this.search$.next(query);
    }

    select(item: TItem, event: Event) {
        this.suggestionSelect$.next({
            event,
            item
        });
    }

    selectionChange(event: ThySelectionListChange<TItem>) {
        this.select(event.value, event.event);
    }

    ngOnDestroy() {
        this.search$.complete();
    }
}
