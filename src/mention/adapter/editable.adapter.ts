import { MentionAdapter, MentionInputorElement, SeekQueryResult } from './adapter';
import { Mention, MentionDefaultDataItem } from '../interfaces';

export class EditableMentionAdapter extends MentionAdapter {
    inputor: MentionInputorElement;

    constructor(inputor: MentionInputorElement) {
        super(inputor);
    }

    seekQuery(event: Event, mention: Mention): SeekQueryResult {
        return null;
    }

    insertMention(item: MentionDefaultDataItem): string {
        throw new Error('Method not implemented.');
    }
}
