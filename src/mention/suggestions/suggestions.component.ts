import { Component, OnInit, OnDestroy, HostBinding, ElementRef, NgZone } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import { ThySelectionListChange } from '../../list';
import { MentionDefaultDataItem, Mention, MentionSuggestionSelectEvent } from '../interfaces';
import { debounceTime, switchMap, catchError, take } from 'rxjs/operators';
import { SeekQueryResult } from '../adapter/adapter';
import { ThyPopoverRef } from '../../popover';

@Component({
    selector: 'thy-mention-suggestions',
    templateUrl: './suggestions.component.html'
})
export class ThyMentionSuggestionsComponent<TItem = MentionDefaultDataItem> implements OnInit, OnDestroy {
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
                    const data = this.filterData(query.term, this.mention);
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
                this.data = data;

                if (this.popoverRef) {
                    this.ngZone.onStable.pipe(take(1)).subscribe(() => {
                        this.popoverRef.updatePosition();
                    });
                }
            });
    }

    private filterData(term: string, mention: Mention<MentionDefaultDataItem>) {
        const data = mention.data;
        if (mention.search) {
            return mention.search(term, data);
        } else {
            return data.filter(item => {
                return !item.name || item.name.toLowerCase().includes(term.toLowerCase());
            });
        }
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
        this.search$.next();
        this.search$.complete();
    }
}
