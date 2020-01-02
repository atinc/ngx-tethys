import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { Mention, MentionDefaultDataItem } from './interfaces';
import { ThyPopover, ThyPopoverRef } from '../popover';
import { ThyMentionSuggestionsComponent } from './suggestions/suggestions.component';
import { Dictionary } from '../typings';
import { CaretPositioner } from './caret-positioner';
import { MentionAdapter, createMentionAdapter, SeekQueryResult } from './adapter';
import { isEmpty } from '../util/helpers';

const SUGGESTION_BACKDROP_CLASS = 'thy-mention-suggestions-backdrop';

@Directive({
    selector: '[thyMention]'
})
export class ThyMentionDirective implements OnInit {
    private triggers: string[] = [];
    private mentionsMap: Dictionary<Mention<MentionDefaultDataItem>> = {};
    private queryResult: SeekQueryResult;
    private mentionAdapters: MentionAdapter[] = [];

    private openedSuggestionsRef: ThyPopoverRef<ThyMentionSuggestionsComponent>;

    private _mentions: Mention<any>[];
    get mentions() {
        return this._mentions;
    }
    @Input('thyMention') set mentions(value: Mention<any>[]) {
        this._mentions = value;
        if (this.mentions) {
            this.mentions.forEach(mention => {
                this.mentionAdapters.push(createMentionAdapter(this.elementRef.nativeElement, mention));
                if (!mention.trigger) {
                    throw new Error(`mention trigger is required`);
                }
            });
        }
    }

    constructor(private elementRef: ElementRef<HTMLElement>, private thyPopover: ThyPopover) {
        this.bindEvents();
    }

    ngOnInit() {}

    bindEvents() {
        this.elementRef.nativeElement.addEventListener('input', (event: Event) => {
            this.onInput(event);
        });
        this.elementRef.nativeElement.addEventListener('click', (event: Event) => {
            this.onClick(event);
        });
    }

    onClick(event: Event) {
        this.lookup(event);
    }

    onInput(event: Event) {
        this.lookup(event);
    }

    private lookup(event: Event) {
        for (const adapter of this.mentionAdapters) {
            const query = adapter.seekQuery(event);
            if (query && this.isEditable()) {
                this.queryResult = query;
                this.openSuggestions(adapter);
                break;
            }
        }
        if (!this.queryResult) {
            this.closeSuggestions();
        }
    }

    private openSuggestions(adapter: MentionAdapter) {
        const data = this.filterData(this.queryResult.term, adapter.mention);

        if (!this.openedSuggestionsRef && !isEmpty(data)) {
            const inputElement = this.elementRef.nativeElement as HTMLInputElement;
            const position = CaretPositioner.getCaretPosition(inputElement, inputElement.selectionEnd);
            this.openedSuggestionsRef = this.thyPopover.open(ThyMentionSuggestionsComponent, {
                origin: this.elementRef,
                backdropClass: SUGGESTION_BACKDROP_CLASS,
                position: position
            });
            this.openedSuggestionsRef.afterClosed().subscribe(() => {
                this.openedSuggestionsRef = null;
            });
            this.openedSuggestionsRef.componentInstance.suggestionSelect$.subscribe(item => {
                adapter.insertMention(this.queryResult, item);
                this.openedSuggestionsRef.close();
            });
            this.openedSuggestionsRef.componentInstance.displayTemplateRef = adapter.mention.displayTemplateRef;
        }

        if (this.openedSuggestionsRef) {
            this.openedSuggestionsRef.componentInstance.data = data;
        }
    }

    private filterData(term: string, mention: Mention<MentionDefaultDataItem>) {
        const data = mention.data;
        if (term) {
            if (mention.search) {
                return mention.search(term, data);
            } else {
                return data.filter(item => {
                    return !item.name || item.name.toLowerCase().includes(term.toLowerCase());
                });
            }
        } else {
            return data;
        }
    }

    private closeSuggestions() {
        if (this.openedSuggestionsRef) {
            this.openedSuggestionsRef.close();
        }
    }

    private isEditable() {
        const element = this.elementRef.nativeElement as HTMLInputElement | HTMLTextAreaElement;
        return !element.readOnly && !element.disabled;
    }
}
