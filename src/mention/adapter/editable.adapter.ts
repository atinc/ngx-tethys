import { MentionAdapter, SeekQueryResult } from './adapter';
import { Mention, MentionDefaultDataItem } from '../interfaces';

export class EditableMentionAdapter extends MentionAdapter {
    inputor: HTMLElement;

    constructor(inputor: HTMLElement, mention: Mention) {
        super(inputor, mention);
    }

    seekQuery(event: Event): SeekQueryResult {
        return null;
    }

    insertMention(query: SeekQueryResult, item: MentionDefaultDataItem): void {
        throw new Error('Method not implemented.');
    }
}
