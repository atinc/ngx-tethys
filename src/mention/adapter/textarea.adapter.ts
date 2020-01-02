import { MentionAdapter, SeekQueryResult } from './adapter';
import { Mention, MentionDefaultDataItem } from '../interfaces';

export class TextareaMentionAdapter extends MentionAdapter {
    inputor: HTMLTextAreaElement | HTMLInputElement;

    constructor(inputor: HTMLElement, mention: Mention) {
        super(inputor, mention);
    }

    private getInsertValue(item: MentionDefaultDataItem) {
        if (this.mention.insertTransform) {
            return this.mention.insertTransform(item).trim() + ' ';
        } else {
            return `${this.mention.trigger}${item['name']}`.trim() + ' ';
        }
    }

    seekQuery(event: Event): SeekQueryResult {
        const selectionStart = this.inputor.selectionStart;
        const value = this.inputor.value.replace(/[\r\n]/g, ' ');

        // @123 | @456 => 0(start) => @123
        // @123 @456 | => 5(start) => @456
        const start = value.lastIndexOf(this.mention.trigger, selectionStart);
        const fistSpaceIndexFromStart = value.indexOf(' ', selectionStart);
        const end = fistSpaceIndexFromStart > -1 ? fistSpaceIndexFromStart : value.length;
        const mention = value.substring(start, end);
        const startBeforeHasSpace = start > 0 && value[start - 1] === ' ';
        if (
            (startBeforeHasSpace || start === 0) &&
            !mention.includes(' ') &&
            !mention.includes(this.mention.trigger, 1)
        ) {
            return {
                start: start,
                end: end,
                term: mention.substring(this.mention.trigger.length)
            };
        } else {
            return null;
        }
    }

    lookup(event: Event) {}

    insertMention(query: SeekQueryResult, item: MentionDefaultDataItem) {
        const insertValue = this.getInsertValue(item);
        const value: string = this.inputor.value;
        const newValue = [value.slice(0, query.start), insertValue, value.slice(query.end, value.length)].join('');
        this.inputor.value = newValue;
        this.focus(query.start + insertValue.length + 1);
    }

    private focus(caretPosition?: number): void {
        this.inputor.focus();
        this.inputor.setSelectionRange(caretPosition, caretPosition);
    }
}
