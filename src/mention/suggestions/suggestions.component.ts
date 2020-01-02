import { Component, OnInit, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';
import { ThySelectionListChange } from '../../list';
import { MentionDefaultDataItem } from '../interfaces';

@Component({
    selector: 'thy-mention-suggestions',
    templateUrl: './suggestions.component.html'
})
export class ThyMentionSuggestionsComponent<TItem = MentionDefaultDataItem> implements OnInit {
    data: TItem[];

    displayTemplateRef: TemplateRef<TItem>;

    suggestionSelect$ = new Subject<TItem>();

    constructor() {}

    ngOnInit(): void {}

    select(item: TItem) {
        this.suggestionSelect$.next(item);
    }

    selectionChange(event: ThySelectionListChange<TItem>) {
        this.select(event.value);
    }
}
