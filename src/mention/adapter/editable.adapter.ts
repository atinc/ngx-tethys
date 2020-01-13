import { MentionAdapter, SeekQueryResult } from './adapter';
import { Mention, MentionDefaultDataItem } from '../interfaces';

export class EditableMentionAdapter extends MentionAdapter {
    inputor: HTMLElement;

    constructor(inputor: HTMLElement) {
        super(inputor);
    }

    seekQuery(event: Event, mention: Mention): SeekQueryResult {
        return null;
    }

    insertMention(item: MentionDefaultDataItem): void {
        throw new Error('Method not implemented.');
    }
}
