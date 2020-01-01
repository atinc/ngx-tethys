import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { Mention } from './interfaces';
import { ThyPopover, ThyPopoverRef } from '../popover';
import { helpers } from '../util';
import { ThyMentionSuggestionsComponent } from './suggestions/suggestions.component';
import { Dictionary } from '../typings';
import { CaretPositioner } from './caret-positioner';
import { getElementOffset } from '../util/dom';

@Directive({
    selector: '[thyMention]'
})
export class ThyMentionDirective implements OnInit {
    private isInput = false;

    private triggers: string[] = [];
    private mentionMap: Dictionary<Mention<unknown>> = {};
    private cursor: {
        start: number;
        end: number;
        mention: string;
        trigger?: string;
    };
    private openedSuggestionsRef: ThyPopoverRef<ThyMentionSuggestionsComponent>;

    @Input('thyMention') mentions: Mention<unknown>[];

    constructor(private elementRef: ElementRef<HTMLElement>, private thyPopover: ThyPopover) {
        this.isInput = ['TEXTAREA', 'INPUT'].indexOf(elementRef.nativeElement.nodeName) >= 0;
        this.bindEvents();
    }

    ngOnInit() {
        if (helpers.isEmpty(this.mentions)) {
            throw new Error(`thyMention is not empty`);
        }
        this.mentions.forEach(mention => {
            if (mention.trigger) {
                this.mentionMap[mention.trigger] = mention;
                this.triggers.push(mention.trigger);
            } else {
                throw new Error(`mention trigger is required`);
            }
        });
    }

    bindEvents() {
        this.elementRef.nativeElement.addEventListener('input', (event: Event) => {
            this.onInput(event);
        });
    }

    onInput(event: Event) {
        const element = this.elementRef.nativeElement as HTMLInputElement;
        const selectionStart = element.selectionStart;
        const value = element.value.replace(/[\r\n]/g, ' ');

        this.cursor = {
            start: -1,
            end: -1,
            mention: null
        };

        this.triggers.forEach(trigger => {
            // @123 | @456 => 0(start) => @123
            // @123 @456 | => 5(start) => @456
            const start = value.lastIndexOf(trigger, selectionStart);
            const fistSpaceIndexFromStart = value.indexOf(' ', selectionStart);
            const end = fistSpaceIndexFromStart > -1 ? fistSpaceIndexFromStart : value.length;
            const mention = value.substring(start, end);
            // start > 0
            const startBeforeHasSpace = start > 0 && value[start - 1] === ' ';
            if ((startBeforeHasSpace || start === 0) && !mention.includes(' ') && !mention.includes(trigger, 1)) {
                this.cursor = {
                    start: start,
                    end: end,
                    mention: mention,
                    trigger: trigger
                };
            }
        });

        if (this.cursor.mention && this.isEditable()) {
            this.openSuggestions();
        }
    }

    private openSuggestions() {
        if (!this.openedSuggestionsRef) {
            const inputElement = this.elementRef.nativeElement as HTMLInputElement;
            const position = CaretPositioner.getCaretPosition(inputElement, inputElement.selectionEnd);
            this.openedSuggestionsRef = this.thyPopover.open(ThyMentionSuggestionsComponent, {
                origin: this.elementRef,
                backdropClass: 'thy-mention-suggestions',
                position: position
            });
            this.openedSuggestionsRef.afterClosed().subscribe(() => {
                this.openedSuggestionsRef = null;
            });
            this.openedSuggestionsRef.componentInstance.suggestionSelect$.subscribe(item => {
                this.insertMention(item.name);
                this.openedSuggestionsRef.close();
            });
        }
        this.openedSuggestionsRef.componentInstance.data = this.mentionMap[this.cursor.trigger].data;
    }

    private insertMention(mentionValue: string) {
        const value: string = this.getInputValue();
        const insertValue = mentionValue.trim() + ' ';
        const newValue = [
            value.slice(0, this.cursor.start + 1),
            insertValue,
            value.slice(this.cursor.end, value.length)
        ].join('');
        this.setInputValue(newValue);
        this.focus(this.cursor.start + insertValue.length + 1);
    }

    private isEditable() {
        const element = this.elementRef.nativeElement as HTMLInputElement | HTMLTextAreaElement;
        return !element.readOnly && !element.disabled;
    }

    private getInputValue() {
        const element = this.elementRef.nativeElement as HTMLInputElement;
        return element.value;
    }

    private setInputValue(value: string) {
        const element = this.elementRef.nativeElement as HTMLInputElement;
        element.value = value;
    }

    private focus(caretPosition?: number): void {
        const element = this.elementRef.nativeElement as HTMLInputElement;
        element.focus();
        element.setSelectionRange(caretPosition, caretPosition);
    }
}
