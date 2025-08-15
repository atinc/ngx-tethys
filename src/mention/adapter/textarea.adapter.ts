import { MentionAdapter, MentionInputorElement, SeekQueryResult } from './adapter';
import { Mention, MentionDefaultDataItem } from '../interfaces';

export class TextareaMentionAdapter extends MentionAdapter {
    inputor: MentionInputorElement;

    constructor(inputor: MentionInputorElement) {
        super(inputor);
    }

    public seekQuery(event: Event, mention: Mention): SeekQueryResult {
        const selectionStart = this.inputor.selectionStart;
        const value = this.inputor.value.replace(/[\r\n]/g, ' ');
        // @123 | @456 => 0(start) => @123
        // @123 @456 | => 5(start) => @456
        const start = value.lastIndexOf(mention.trigger, selectionStart);
        const fistSpaceIndexFromStart = value.indexOf(' ', selectionStart);
        const end = fistSpaceIndexFromStart > -1 ? fistSpaceIndexFromStart : value.length;
        const termWithTrigger = value.substring(start, end);
        const startBeforeHasSpace = start > 0 && value[start - 1] === ' ';
        if ((startBeforeHasSpace || start === 0) && !termWithTrigger.includes(' ') && !termWithTrigger.includes(mention.trigger, 1)) {
            return {
                start: start,
                end: end,
                term: termWithTrigger.substring(mention.trigger.length)
            };
        } else {
            return null;
        }
    }

    public insertMention(item: MentionDefaultDataItem): string {
        if ((typeof ngDevMode === 'undefined' || ngDevMode) && !this.matchedMention) {
            throw new Error(`matchedMention is null`);
        }
        const insertValue = this.getInsertValue(item);
        const value: string = this.inputor.value;
        const newValue = [
            value.slice(0, this.matchedMention.query.start),
            insertValue,
            value.slice(this.matchedMention.query.end, value.length)
        ].join('');
        this.inputor.value = newValue;
        this.focus(this.matchedMention.query.start + insertValue.length);
        return newValue;
    }

    private getInsertValue(item: MentionDefaultDataItem) {
        if (this.matchedMention.mention.insertTransform) {
            return `${this.matchedMention.mention.insertTransform(item).trim()} `;
        } else {
            return `${`${this.matchedMention.mention.trigger}${item['name']}`.trim()} `;
        }
    }

    private focus(caretPosition?: number): void {
        this.inputor.focus();
        this.inputor.setSelectionRange(caretPosition, caretPosition);
    }

    private isEditable() {
        return !this.inputor.readOnly && !this.inputor.disabled;
    }
}
