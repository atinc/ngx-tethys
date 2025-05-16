import { ThyPopover, ThyPopoverConfig, ThyPopoverRef } from 'ngx-tethys/popover';
import { EMPTY, fromEvent, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

import { Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, computed, inject, input, output } from '@angular/core';
import { NgControl } from '@angular/forms';

import { createMentionAdapter, MatchedMention, MentionAdapter, MentionInputorElement } from './adapter';
import { CaretPositioner } from './caret-positioner';
import { Mention, MentionDefaultDataItem, MentionSuggestionSelectEvent } from './interfaces';
import { ThyMentionSuggestions } from './suggestions/suggestions.component';
import { isInputOrTextarea } from 'ngx-tethys/util';

const SUGGESTION_BACKDROP_CLASS = 'thy-mention-suggestions-backdrop';

const POPOVER_DEFAULT_CONFIG = { backdropClass: SUGGESTION_BACKDROP_CLASS, placement: 'bottomLeft' };

const DEFAULT_MENTION_CONFIG: Partial<Mention> = {
    autoClose: true,
    emptyText: '无匹配数据，按空格完成输入',
    search: (term: string, data: MentionDefaultDataItem[]) => {
        return data.filter(item => {
            return !item.name || item.name.toLowerCase().includes(term.toLowerCase());
        });
    }
};

/**
 * @name thyMention
 * @order 10
 */
@Directive({ selector: '[thyMention]' })
export class ThyMentionDirective implements OnInit, OnDestroy {
    private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
    private thyPopover = inject(ThyPopover);
    private ngControl = inject(NgControl, { optional: true, self: true })!;

    private adapter: MentionAdapter = null;

    public openedSuggestionsRef: ThyPopoverRef<ThyMentionSuggestions>;

    /**
     * 提及输入配置参数，同时支持多个提及规则
     * @type Mention<any>[]
     */
    readonly thyMention = input<Mention<any>[]>([]);

    /**
     * Popover 弹出层参数配置
     */
    readonly thyPopoverConfig = input<ThyPopoverConfig>();

    /**
     * 选择后的回调函数
     */
    readonly thySelectSuggestion = output<MentionSuggestionSelectEvent>();

    get isOpened() {
        return !!this.openedSuggestionsRef;
    }

    mentions = computed(() => {
        if (this.thyMention()) {
            return this.thyMention().map(mention => {
                if ((typeof ngDevMode === 'undefined' || ngDevMode) && !mention.trigger) {
                    throw new Error(`mention trigger is required`);
                }
                return Object.assign({}, DEFAULT_MENTION_CONFIG, mention);
            });
        } else {
            return [];
        }
    });

    private destroy$ = new Subject<void>();

    private openedSuggestionsRef$ = new Subject<ThyPopoverRef<ThyMentionSuggestions> | null>();

    constructor() {
        const elementRef = this.elementRef;

        this.adapter = createMentionAdapter(elementRef.nativeElement as MentionInputorElement);
    }

    ngOnInit() {
        fromEvent(this.elementRef.nativeElement, 'input')
            .pipe(takeUntil(this.destroy$))
            .subscribe(event => this.onInput(event));

        fromEvent(this.elementRef.nativeElement, 'click')
            .pipe(takeUntil(this.destroy$))
            .subscribe(event => this.onClick(event));

        this.openedSuggestionsRef$
            .pipe(
                switchMap(openedSuggestionsRef =>
                    // Re-subscribe to `suggestionSelect$` every time the suggestions component is re-created,
                    // otherwise, unsubscribe, if it gets closed.
                    openedSuggestionsRef ? openedSuggestionsRef.componentInstance.suggestionSelect$ : EMPTY
                ),
                takeUntil(this.destroy$)
            )
            .subscribe(event => {
                const newValue = this.adapter.insertMention(event.item);
                if (isInputOrTextarea(this.elementRef.nativeElement)) {
                    if (this.ngControl && this.ngControl.control) {
                        this.ngControl.control.setValue(newValue);
                    }
                } else {
                    this.elementRef.nativeElement.innerText = newValue;
                }
                this.openedSuggestionsRef.close();
                this.thySelectSuggestion.emit(event);
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
    }

    onClick(event: Event) {
        this.lookup(event);
    }

    onInput(event: Event) {
        this.lookup(event);
    }

    private lookup(event: Event) {
        const matched = this.adapter.lookup(event, this.mentions());
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
                ThyMentionSuggestions,
                Object.assign(
                    {},
                    POPOVER_DEFAULT_CONFIG,
                    {
                        origin: this.elementRef,
                        originPosition: { x: position.left, y: position.top, width: fontSize, height: fontSize },
                        initialState: { mention: matched.mention }
                    },
                    this.thyPopoverConfig()
                )
            );
            this.openedSuggestionsRef.afterClosed().subscribe(() => {
                this.openedSuggestionsRef = null;
                this.openedSuggestionsRef$.next(null);
            });

            this.openedSuggestionsRef$.next(this.openedSuggestionsRef);
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
}
