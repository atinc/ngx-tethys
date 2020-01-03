import { Component, OnInit, TemplateRef, OnDestroy } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import { ThySelectionListChange } from '../../list';
import { MentionDefaultDataItem, Mention } from '../interfaces';
import { debounceTime, switchMap, catchError } from 'rxjs/operators';
import { MatchedMention, SeekQueryResult } from '../adapter/adapter';

@Component({
    selector: 'thy-mention-suggestions',
    templateUrl: './suggestions.component.html'
})
export class ThyMentionSuggestionsComponent<TItem = MentionDefaultDataItem> implements OnInit, OnDestroy {
    data: TItem[];

    mention: Mention<TItem>;

    suggestionSelect$ = new Subject<TItem>();

    debounce = 150;

    loadingDone = true;

    private search$ = new Subject<SeekQueryResult>();

    constructor() {
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

    ngOnInit(): void {}

    search(query: SeekQueryResult) {
        this.search$.next(query);
    }

    select(item: TItem) {
        this.suggestionSelect$.next(item);
    }

    selectionChange(event: ThySelectionListChange<TItem>) {
        this.select(event.value);
    }

    ngOnDestroy() {
        this.search$.next();
        this.search$.complete();
    }
}
