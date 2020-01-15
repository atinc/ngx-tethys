import { Directive, ElementRef, Input, OnInit, EventEmitter, Output, NgZone } from '@angular/core';
import { Mention, MentionSuggestionSelectEvent } from './interfaces';
import { ThyPopover, ThyPopoverRef } from '../popover';
import { ThyMentionSuggestionsComponent } from './suggestions/suggestions.component';
import { CaretPositioner } from './caret-positioner';
import { MentionAdapter, createMentionAdapter, MatchedMention } from './adapter';
import { take } from 'rxjs/operators';
const SUGGESTION_BACKDROP_CLASS = 'thy-mention-suggestions-backdrop';

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
        if (this.mentions) {
            this.mentions.forEach(mention => {
                if (!mention.trigger) {
                    throw new Error(`mention trigger is required`);
                }
            });
        }
    }

    @Output('thySelectSuggestion') select = new EventEmitter<MentionSuggestionSelectEvent>();

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
            this.openedSuggestionsRef = this.thyPopover.open(ThyMentionSuggestionsComponent, {
                origin: this.elementRef,
                backdropClass: SUGGESTION_BACKDROP_CLASS,
                originPosition: {
                    x: position.left,
                    y: position.top,
                    width: fontSize,
                    height: fontSize
                },
                placement: 'bottomLeft',
                initialState: {
                    mention: matched.mention
                }
            });
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
