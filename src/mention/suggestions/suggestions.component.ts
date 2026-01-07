import { ThySelectionListChange, ThySelectionList } from 'ngx-tethys/list';
import { ThyPopoverRef } from 'ngx-tethys/popover';
import { Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, switchMap, take } from 'rxjs/operators';
import {
    Component,
    ElementRef,
    NgZone,
    OnDestroy,
    OnInit,
    inject,
    signal,
    input,
    afterNextRender,
    EnvironmentInjector
} from '@angular/core';
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
    imports: [NgTemplateOutlet, ThyLoading, ThySelectionList, ThyListOption, SlicePipe],
    host: { class: 'thy-mention-suggestions' }
})
export class ThyMentionSuggestions<TItem = MentionDefaultDataItem> implements OnInit, OnDestroy {
    readonly mention = input<Mention<TItem>>();

    data = signal<TItem[]>([]);

    suggestionSelect$ = new Subject<MentionSuggestionSelectEvent>();

    debounce = 150;

    loadingDone = signal(true);

    private search$ = new Subject<SeekQueryResult>();

    private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

    private injector = inject(EnvironmentInjector);

    private popoverRef = inject<ThyPopoverRef<any>>(ThyPopoverRef);

    constructor() {
        this.search$
            .pipe(
                switchMap(query => {
                    const data = this.mention()!.search!(query.term, this.mention()?.data);
                    if (data instanceof Observable) {
                        this.loadingDone.set(false);
                        return (data as Observable<TItem[]>).pipe(debounceTime(this.debounce));
                    } else {
                        return of(data as TItem[]);
                    }
                }),
                catchError(() => {
                    this.loadingDone.set(false);
                    return of([]);
                })
            )
            .subscribe(data => {
                this.loadingDone.set(true);
                this.data.set(data || []);

                if (this.popoverRef) {
                    if (this.mention()?.autoClose && this.data().length === 0) {
                        this.popoverRef.close();
                    }
                    afterNextRender(
                        () => {
                            this.popoverRef.updatePosition();
                        },
                        {
                            injector: this.injector
                        }
                    );
                }
            });
    }

    ngOnInit(): void {
        if (this.mention()?.popoverClass) {
            this.elementRef.nativeElement.classList.add(this.mention()!.popoverClass!);
        }
    }

    search(query: SeekQueryResult) {
        this.search$.next(query);
    }

    select(item: TItem, event: Event) {
        this.suggestionSelect$.next({ event, item });
    }

    selectionChange(event: ThySelectionListChange<TItem>) {
        this.select(event.value, event.event);
    }

    ngOnDestroy() {
        this.search$.complete();
    }
}
