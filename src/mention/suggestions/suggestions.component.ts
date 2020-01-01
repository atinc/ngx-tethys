import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ThySelectionListChange } from '../../list';

@Component({
    selector: 'thy-mention-suggestions',
    templateUrl: './suggestions.component.html'
})
export class ThyMentionSuggestionsComponent<TItem = any> implements OnInit {
    data: TItem[];

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
