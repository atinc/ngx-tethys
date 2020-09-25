import { Directive, ElementRef, Input, OnInit, EventEmitter, Output, NgZone } from '@angular/core';
import { Mention, MentionSuggestionSelectEvent, MentionDefaultDataItem } from './interfaces';
import { ThyPopover, ThyPopoverRef, ThyPopoverConfig } from '../popover';
import { ThyMentionSuggestionsComponent } from './suggestions/suggestions.component';
import { CaretPositioner } from './caret-positioner';
import { MentionAdapter, createMentionAdapter, MatchedMention } from './adapter';

const SUGGESTION_BACKDROP_CLASS = 'thy-mention-suggestions-backdrop';

const POPOVER_DEFAULT_CONFIG = {
    backdropClass: SUGGESTION_BACKDROP_CLASS,
    placement: 'bottomLeft'
};

const DEFAULT_MENTION_CONFIG: Partial<Mention> = {
    autoClose: true,
    emptyText: '无匹配数据，按空格完成输入',
    search: (term: string, data: MentionDefaultDataItem[]) => {
        return data.filter(item => {
            return !item.name || item.name.toLowerCase().includes(term.toLowerCase());
        });
    }
};

@Directive({
    selector: '[thyMention]'
})
export class ThyMentionDirective implements OnInit {
    private adapter: MentionAdapter = null;

    private openedSuggestionsRef: ThyPopoverRef<ThyMentionSuggestionsComponent>;

    private _mentions: Mention<any>[];
    get mentions() {
        return this._mentions;
    }
    @Input('thyMention') set mentions(value: Mention<any>[]) {
        this._mentions = value;
        if (this._mentions) {
            this._mentions = this._mentions.map(mention => {
                if (!mention.trigger) {
                    throw new Error(`mention trigger is required`);
                }
                return Object.assign({}, DEFAULT_MENTION_CONFIG, mention);
            });
        }
    }

    @Input('thyPopoverConfig') popoverConfig: ThyPopoverConfig;

    @Output('thySelectSuggestion')
    select = new EventEmitter<MentionSuggestionSelectEvent>();

    constructor(private elementRef: ElementRef<HTMLElement>, private thyPopover: ThyPopover, private ngZone: NgZone) {
        this.adapter = createMentionAdapter(elementRef.nativeElement);
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
        const matched = this.adapter.lookup(event, this.mentions);
        if (matched) {
            this.openSuggestions(matched);
        } else {
            this.closeSuggestions();
        }
    }

    private openSuggestions(matched: MatchedMention) {
        if (!this.openedSuggestionsRef) {
            const inputElement = this.elementRef.nativeElement as HTMLInputElement;
            const position = CaretPositioner.getCaretPosition(inputElement, matched.query.start);
            const fontSize = parseInt(getComputedStyle(this.elementRef.nativeElement).fontSize, 10);
            this.openedSuggestionsRef = this.thyPopover.open(
                ThyMentionSuggestionsComponent,
                Object.assign({}, POPOVER_DEFAULT_CONFIG, this.popoverConfig, {
                    origin: this.elementRef,
                    originPosition: {
                        x: position.left,
                        y: position.top,
                        width: fontSize,
                        height: fontSize
                    },
                    initialState: {
                        mention: matched.mention
                    }
                })
            );
            this.openedSuggestionsRef.afterClosed().subscribe(() => {
                this.openedSuggestionsRef = null;
            });
            this.openedSuggestionsRef.componentInstance.suggestionSelect$.subscribe(event => {
                this.adapter.insertMention(event.item);
                this.openedSuggestionsRef.close();
                this.select.emit(event);
            });
        }

        if (this.openedSuggestionsRef) {
            this.openedSuggestionsRef.componentInstance.search(matched.query);
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
